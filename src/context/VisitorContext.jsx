import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { VISITOR_COUNTER_CONFIG } from '../config/visitor-counter-config';

// Dynamic / safe Firebase imports
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  onValue, 
  set, 
  onDisconnect, 
  serverTimestamp, 
  runTransaction 
} from 'firebase/database';

const VisitorContext = createContext();

const UUID_KEY = 'sadat_visitor_uuid_v3';
const STATS_KEY = 'sadat_visitor_stats_real_v1';
const REGISTERED_VISITOR_KEY = 'sadat_visitor_registered_real_v1';
const LAST_VISITED_DATE_KEY = 'sadat_visitor_last_date_real_v1';
const TAB_HB_PREFIX = 'sadat_real_tab_hb_';

// Helper to get current date formatted in Asia/Karachi (or configured timezone)
function getTodayDateString(timezone = 'Asia/Karachi') {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(new Date());
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

// Clean up any legacy localStorage entries that had artificial/fake baselines
function purgeLegacyFakeStats() {
  try {
    ['sadat_visitor_stats_v1', 'sadat_visitor_stats_v2', 'sadat_online_heartbeat_v1'].forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (e) {}
}

// Helper to count active browser tabs in real time
function countActiveLocalTabs() {
  try {
    const now = Date.now();
    let activeTabs = 0;
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(TAB_HB_PREFIX)) {
        const val = parseInt(localStorage.getItem(key) || '0', 10);
        if (now - val < 8000) {
          activeTabs++;
        } else {
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(k => localStorage.removeItem(k));
    return Math.max(1, activeTabs);
  } catch (e) {
    return 1;
  }
}

export function VisitorProvider({ children }) {
  const config = VISITOR_COUNTER_CONFIG;
  const baseline = config.baseline || {
    baseTotalVisitors: 0,
    baseTodayVisitors: 0,
    baseOnlineVisitors: 0,
    baseTotalPageViews: 0
  };

  const baseTotal = baseline.baseTotalVisitors || 0;
  const baseToday = baseline.baseTodayVisitors || 0;
  const baseOnline = baseline.baseOnlineVisitors || 0;
  const baseViews = baseline.baseTotalPageViews || 0;

  // Purge any stale legacy fake-inflated cache
  purgeLegacyFakeStats();

  // Instant hydration from local storage if available
  const initialLocalStats = (() => {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only use parsed stats if they are realistic (< 10000)
        if (parsed && typeof parsed.totalVisitors === 'number' && parsed.totalVisitors < 10000) {
          return {
            totalVisitors: parsed.totalVisitors,
            todayVisitors: parsed.todayVisitors,
            onlineVisitors: Math.max(1, parsed.onlineVisitors || 1),
            totalPageViews: parsed.totalPageViews,
          };
        }
      }
    } catch (e) {}

    return {
      totalVisitors: baseTotal || 1,
      todayVisitors: baseToday || 1,
      onlineVisitors: 1,
      totalPageViews: baseViews || 1,
    };
  })();

  const [stats, setStats] = useState({
    ...initialLocalStats,
    activeMode: 'countapi',
    isLiveConnected: false,
  });

  const visitorUuidRef = useRef('');
  const tabIdRef = useRef('tab_' + Math.random().toString(36).substring(2, 9));
  const firebaseDbRef = useRef(null);
  const broadcastChannelRef = useRef(null);
  const lastPageViewTimeRef = useRef(0);
  const presencePingWindowRef = useRef(0);

  // Check if Firebase credentials are provided
  const hasFirebaseCredentials = Boolean(
    config.firebase &&
    config.firebase.apiKey &&
    config.firebase.apiKey.trim() !== '' &&
    (config.firebase.databaseURL?.trim() || config.firebase.projectId?.trim())
  );

  const shouldRunFirebase = (config.mode === 'auto' && hasFirebaseCredentials) || config.mode === 'firebase';

  // CountAPI helper function
  const countApiRequest = useCallback(async (action, key) => {
    const { baseUrl } = config.countapi;
    if (!baseUrl || !key) return null;
    try {
      const res = await fetch(`${baseUrl}/${action}/${encodeURIComponent(key)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return typeof data.value === 'number' ? data.value : null;
    } catch (err) {
      return null;
    }
  }, [config.countapi]);

  useEffect(() => {
    const todayDateKey = getTodayDateString(config.timezone);

    // 1. Cross-tab real-time broadcast channel
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel('sadat_traffic_analytics_channel');
        broadcastChannelRef.current = bc;
        bc.onmessage = (event) => {
          if (event.data && typeof event.data === 'object') {
            setStats(prev => ({
              ...prev,
              ...event.data,
              isLiveConnected: true
            }));
          }
        };
      } catch (e) {}
    }

    // 2. Identify or generate persistent visitor UUID
    let visitorUuid = localStorage.getItem(UUID_KEY);
    if (!visitorUuid) {
      visitorUuid = 'scw_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(UUID_KEY, visitorUuid);
    }
    visitorUuidRef.current = visitorUuid;

    // 3. Register real tab heartbeat
    const currentTabKey = TAB_HB_PREFIX + tabIdRef.current;
    const writeTabHeartbeat = () => {
      try {
        localStorage.setItem(currentTabKey, Date.now().toString());
      } catch (e) {}
    };
    writeTabHeartbeat();
    const tabHbInterval = setInterval(writeTabHeartbeat, 3000);

    const cleanupTab = () => {
      try {
        localStorage.removeItem(currentTabKey);
      } catch (e) {}
    };
    window.addEventListener('beforeunload', cleanupTab);

    // =========================================================================
    // MODE 1: Google Firebase Realtime Database
    // =========================================================================
    if (shouldRunFirebase && hasFirebaseCredentials) {
      try {
        let app = getApps().length ? getApp() : initializeApp(config.firebase);
        const db = getDatabase(app);
        firebaseDbRef.current = db;

        const userPresenceRef = ref(db, `presence/${visitorUuid}`);
        const connectedRef = ref(db, '.info/connected');
        const allPresenceRef = ref(db, 'presence');
        const statsRef = ref(db, 'stats');

        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            set(userPresenceRef, {
              online: true,
              lastActive: serverTimestamp(),
              userAgent: navigator.userAgent.substring(0, 50)
            });
            onDisconnect(userPresenceRef).remove();
            setStats(prev => ({ ...prev, activeMode: 'firebase', isLiveConnected: true }));
          }
        });

        const unsubscribePresence = onValue(allPresenceRef, (snapshot) => {
          const data = snapshot.val();
          const liveCount = data ? Object.keys(data).length : 1;
          const displayOnline = baseOnline > 0 
            ? Math.max(1, baseOnline + liveCount - 1)
            : Math.max(1, liveCount);

          setStats(prev => ({ ...prev, onlineVisitors: displayOnline, activeMode: 'firebase' }));
        });

        const isRegisteredUnique = localStorage.getItem(REGISTERED_VISITOR_KEY) === 'true';
        const hasVisitedToday = localStorage.getItem(LAST_VISITED_DATE_KEY) === todayDateKey;

        runTransaction(statsRef, (currentData) => {
          if (!currentData) {
            return {
              totalVisitors: 1,
              todayVisitors: 1,
              totalPageViews: 1,
              lastDate: todayDateKey
            };
          }

          let updated = { ...currentData };
          if (updated.lastDate !== todayDateKey) {
            updated.lastDate = todayDateKey;
            updated.todayVisitors = 1;
          } else if (!hasVisitedToday) {
            updated.todayVisitors = (updated.todayVisitors || 0) + 1;
          }

          if (!isRegisteredUnique) {
            updated.totalVisitors = (updated.totalVisitors || 0) + 1;
          }

          updated.totalPageViews = (updated.totalPageViews || 0) + 1;
          return updated;
        }).then(() => {
          localStorage.setItem(REGISTERED_VISITOR_KEY, 'true');
          localStorage.setItem(LAST_VISITED_DATE_KEY, todayDateKey);
        }).catch((err) => {
          console.warn("Firebase transaction fallback:", err);
        });

        const unsubscribeStats = onValue(statsRef, (snapshot) => {
          const remoteStats = snapshot.val();
          if (remoteStats) {
            setStats(prev => ({
              ...prev,
              totalVisitors: remoteStats.totalVisitors || 1,
              todayVisitors: remoteStats.todayVisitors || 1,
              totalPageViews: remoteStats.totalPageViews || 1,
              activeMode: 'firebase',
              isLiveConnected: true
            }));
          }
        });

        return () => {
          unsubscribePresence();
          unsubscribeStats();
          cleanupTab();
          clearInterval(tabHbInterval);
          window.removeEventListener('beforeunload', cleanupTab);
          try {
            set(userPresenceRef, null);
          } catch (e) {}
        };
      } catch (firebaseErr) {
        console.error("Firebase Realtime Database failed to initialize, falling back to CountAPI:", firebaseErr);
      }
    }

    // =========================================================================
    // MODE 2: CountAPI Cloud Synchronization (Pure Genuine Real Analytics)
    // =========================================================================
    const namespace = config.countapi.namespace || 'sadat-chicken-wholesale-v1';
    const pageviewsKey = `${namespace}_pageviews`;
    const uniqueVisitorsKey = `${namespace}_unique_visitors`;
    const todayKey = `${namespace}_today_${todayDateKey}`;

    // A. Real-time active presence calculation
    const updateOnlinePresence = async () => {
      const activeLocalTabs = countActiveLocalTabs();
      let realOnline = activeLocalTabs;

      // Ping a 30-second rolling presence window on CountAPI across all online visitors
      const currentWindow = Math.floor(Date.now() / 30000);
      const presenceKey = `${namespace}_pres_${currentWindow}`;

      if (presencePingWindowRef.current !== currentWindow) {
        presencePingWindowRef.current = currentWindow;
        try {
          const val = await countApiRequest('hit', presenceKey);
          if (typeof val === 'number') {
            realOnline = Math.max(activeLocalTabs, val);
          }
        } catch (e) {}
      } else {
        try {
          const val = await countApiRequest('get', presenceKey);
          if (typeof val === 'number') {
            realOnline = Math.max(activeLocalTabs, val);
          }
        } catch (e) {}
      }

      setStats(prev => ({
        ...prev,
        onlineVisitors: Math.max(1, realOnline),
        activeMode: 'countapi',
        isLiveConnected: true
      }));
    };

    updateOnlinePresence();
    const onlineInterval = setInterval(updateOnlinePresence, config.heartbeatIntervalMs || 5000);

    // B. Check registration status
    const isRegisteredUnique = localStorage.getItem(REGISTERED_VISITOR_KEY) === 'true';
    const hasVisitedToday = localStorage.getItem(LAST_VISITED_DATE_KEY) === todayDateKey;

    // C. Sync genuine metrics with CountAPI
    const syncWithCountApi = async () => {
      try {
        // 1. Unique visitors: HIT if first time ever, GET otherwise
        const uniquePromise = (!isRegisteredUnique)
          ? countApiRequest('hit', uniqueVisitorsKey)
          : countApiRequest('get', uniqueVisitorsKey);

        // 2. Today's visitors: HIT if first visit today, GET otherwise
        const todayPromise = (!hasVisitedToday)
          ? countApiRequest('hit', todayKey)
          : countApiRequest('get', todayKey);

        // 3. Catalog Page Views: GET current count
        const pageviewsPromise = countApiRequest('get', pageviewsKey);

        const [remoteUnique, remoteToday, remoteViews] = await Promise.all([
          uniquePromise,
          todayPromise,
          pageviewsPromise
        ]);

        if (!isRegisteredUnique && remoteUnique !== null) {
          localStorage.setItem(REGISTERED_VISITOR_KEY, 'true');
        }
        if (!hasVisitedToday && remoteToday !== null) {
          localStorage.setItem(LAST_VISITED_DATE_KEY, todayDateKey);
        }

        setStats(prev => {
          const nextTotal = (remoteUnique !== null) ? remoteUnique : prev.totalVisitors;
          const nextToday = (remoteToday !== null) ? remoteToday : prev.todayVisitors;
          const nextViews = (remoteViews !== null) ? remoteViews : prev.totalPageViews;

          const updated = {
            ...prev,
            totalVisitors: Math.max(1, nextTotal),
            todayVisitors: Math.max(1, nextToday),
            totalPageViews: Math.max(1, nextViews),
            activeMode: 'countapi',
            isLiveConnected: true
          };

          // Save genuine stats to local storage
          try {
            localStorage.setItem(STATS_KEY, JSON.stringify({
              totalVisitors: updated.totalVisitors,
              todayVisitors: updated.todayVisitors,
              totalPageViews: updated.totalPageViews,
              onlineVisitors: updated.onlineVisitors,
              lastDate: todayDateKey
            }));
          } catch (e) {}

          // Broadcast to any other open tabs
          if (broadcastChannelRef.current) {
            broadcastChannelRef.current.postMessage(updated);
          }

          return updated;
        });

      } catch (err) {
        console.warn("CountAPI sync warning:", err);
      }
    };

    syncWithCountApi();
    const pollTimer = setInterval(syncWithCountApi, config.pollIntervalMs || 15000);

    return () => {
      clearInterval(onlineInterval);
      clearInterval(pollTimer);
      clearInterval(tabHbInterval);
      cleanupTab();
      window.removeEventListener('beforeunload', cleanupTab);
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, [config, baseOnline, shouldRunFirebase, hasFirebaseCredentials, countApiRequest]);

  // Record real page view on route navigation
  const recordPageView = useCallback(async () => {
    const now = Date.now();
    // Throttle consecutive rapid triggers within 600ms
    if (now - lastPageViewTimeRef.current < 600) {
      return;
    }
    lastPageViewTimeRef.current = now;

    // 1. Optimistically increment real page views
    setStats(prev => {
      const nextViews = prev.totalPageViews + 1;
      const updated = { ...prev, totalPageViews: nextViews };

      try {
        const stored = localStorage.getItem(STATS_KEY);
        const parsed = stored ? JSON.parse(stored) : {};
        parsed.totalPageViews = nextViews;
        localStorage.setItem(STATS_KEY, JSON.stringify(parsed));
      } catch (e) {}

      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({ totalPageViews: nextViews });
      }

      return updated;
    });

    // 2. Persist real hit to Firebase or CountAPI
    if (firebaseDbRef.current) {
      try {
        const statsRef = ref(firebaseDbRef.current, 'stats');
        runTransaction(statsRef, (data) => {
          if (!data) return data;
          return {
            ...data,
            totalPageViews: (data.totalPageViews || 0) + 1
          };
        }).catch(() => {});
      } catch (e) {}
    } else {
      const namespace = config.countapi.namespace || 'sadat-chicken-wholesale-v1';
      const pageviewsKey = `${namespace}_pageviews`;
      try {
        const val = await countApiRequest('hit', pageviewsKey);
        if (typeof val === 'number') {
          setStats(prev => ({
            ...prev,
            totalPageViews: val
          }));
        }
      } catch (e) {}
    }
  }, [config.countapi, countApiRequest]);

  return (
    <VisitorContext.Provider value={{ ...stats, recordPageView }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitorStats() {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitorStats must be used within a VisitorProvider');
  }
  return context;
}
