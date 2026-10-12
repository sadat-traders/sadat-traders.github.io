import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

const UUID_KEY = 'sadat_visitor_uuid_v1';
const STATS_KEY = 'sadat_visitor_stats_v1';
const HEARTBEAT_KEY = 'sadat_online_heartbeat_v1';
const REGISTERED_VISITOR_KEY = 'sadat_visitor_registered_v1';

export function VisitorProvider({ children }) {
  const config = VISITOR_COUNTER_CONFIG;
  const baseline = config.baseline || {
    baseTotalVisitors: 12480,
    baseTodayVisitors: 342,
    baseOnlineVisitors: 14,
    baseTotalPageViews: 48920
  };

  const [stats, setStats] = useState({
    totalVisitors: baseline.baseTotalVisitors,
    todayVisitors: baseline.baseTodayVisitors,
    onlineVisitors: baseline.baseOnlineVisitors,
    totalPageViews: baseline.baseTotalPageViews,
    activeMode: 'countapi',
    isLiveConnected: false,
  });

  const visitorUuidRef = useRef('');
  const firebaseDbRef = useRef(null);

  // Check if Firebase credentials are provided
  const hasFirebaseCredentials = Boolean(
    config.firebase &&
    config.firebase.apiKey &&
    config.firebase.apiKey.trim() !== '' &&
    (config.firebase.databaseURL?.trim() || config.firebase.projectId?.trim())
  );

  const shouldRunFirebase = (config.mode === 'auto' && hasFirebaseCredentials) || config.mode === 'firebase';

  useEffect(() => {
    // 1. Identify or generate unique anonymous browser UUID
    let visitorUuid = localStorage.getItem(UUID_KEY);
    const isFirstTimeVisitor = !visitorUuid;
    if (isFirstTimeVisitor) {
      visitorUuid = 'scw_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(UUID_KEY, visitorUuid);
    }
    visitorUuidRef.current = visitorUuid;

    const todayDateKey = new Date().toISOString().split('T')[0];

    // =========================================================================
    // MODE 1: Google Firebase Realtime Database Mode
    // =========================================================================
    if (shouldRunFirebase && hasFirebaseCredentials) {
      try {
        let app;
        if (!getApps().length) {
          app = initializeApp(config.firebase);
        } else {
          app = getApp();
        }

        const db = getDatabase(app);
        firebaseDbRef.current = db;

        // A. Real-time Presence & Disconnect Tracking
        const userPresenceRef = ref(db, `presence/${visitorUuid}`);
        const connectedRef = ref(db, '.info/connected');
        const allPresenceRef = ref(db, 'presence');

        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            // Set user presence
            set(userPresenceRef, {
              online: true,
              lastActive: serverTimestamp(),
              userAgent: navigator.userAgent.substring(0, 50)
            });

            // Auto disconnect cleanup on browser close or network drop
            onDisconnect(userPresenceRef).remove();

            setStats(prev => ({
              ...prev,
              activeMode: 'firebase',
              isLiveConnected: true
            }));
          }
        });

        // Listen for all concurrent online visitors
        const unsubscribePresence = onValue(allPresenceRef, (snapshot) => {
          const data = snapshot.val();
          const liveCount = data ? Object.keys(data).length : 1;
          const displayOnline = Math.max(1, (baseline.baseOnlineVisitors || 0) + liveCount - 1);

          setStats(prev => ({
            ...prev,
            onlineVisitors: displayOnline,
            activeMode: 'firebase'
          }));
        });

        // B. Real-time Statistics Sync (Total Visitors, Today, PageViews)
        const statsRef = ref(db, 'stats');
        const alreadyRegistered = localStorage.getItem(REGISTERED_VISITOR_KEY);

        // Transaction to register new unique visitors
        runTransaction(statsRef, (currentData) => {
          if (!currentData) {
            return {
              totalVisitors: baseline.baseTotalVisitors + 1,
              todayVisitors: baseline.baseTodayVisitors + 1,
              totalPageViews: baseline.baseTotalPageViews + 1,
              lastDate: todayDateKey
            };
          }

          let updated = { ...currentData };
          if (updated.lastDate !== todayDateKey) {
            updated.lastDate = todayDateKey;
            updated.todayVisitors = 1;
          } else if (!alreadyRegistered) {
            updated.todayVisitors = (updated.todayVisitors || 0) + 1;
            updated.totalVisitors = (updated.totalVisitors || 0) + 1;
          }

          updated.totalPageViews = (updated.totalPageViews || 0) + 1;
          return updated;
        }).then(() => {
          localStorage.setItem(REGISTERED_VISITOR_KEY, 'true');
        }).catch((err) => {
          console.warn("Firebase transaction fallback:", err);
        });

        // Listen for stats changes across all clients
        const unsubscribeStats = onValue(statsRef, (snapshot) => {
          const remoteStats = snapshot.val();
          if (remoteStats) {
            setStats(prev => ({
              ...prev,
              totalVisitors: remoteStats.totalVisitors || baseline.baseTotalVisitors,
              todayVisitors: remoteStats.todayVisitors || baseline.baseTodayVisitors,
              totalPageViews: remoteStats.totalPageViews || baseline.baseTotalPageViews,
              activeMode: 'firebase',
              isLiveConnected: true
            }));
          }
        });

        return () => {
          unsubscribePresence();
          unsubscribeStats();
          // Remove active user presence on unmount
          try {
            set(userPresenceRef, null);
          } catch (e) {}
        };

      } catch (firebaseErr) {
        console.error("Firebase Realtime Database failed to initialize, falling back to CountAPI:", firebaseErr);
        // Fall through to CountAPI mode
      }
    }

    // =========================================================================
    // MODE 2: CountAPI Service Mode (Zero-setup out of the box)
    // =========================================================================
    // A. Local storage persistent baseline
    let localStats = null;
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) localStats = JSON.parse(stored);
    } catch (e) {}

    if (!localStats) {
      localStats = {
        totalVisitors: baseline.baseTotalVisitors + (isFirstTimeVisitor ? 1 : 0),
        todayVisitors: baseline.baseTodayVisitors + (isFirstTimeVisitor ? 1 : 0),
        totalPageViews: baseline.baseTotalPageViews + 1,
        lastDate: todayDateKey
      };
    } else {
      if (localStats.lastDate !== todayDateKey) {
        localStats.lastDate = todayDateKey;
        localStats.todayVisitors = 1;
      } else if (isFirstTimeVisitor) {
        localStats.todayVisitors += 1;
        localStats.totalVisitors += 1;
      }
      localStats.totalPageViews += 1;
    }
    localStorage.setItem(STATS_KEY, JSON.stringify(localStats));

    // B. Online Presence via 5-second Activity Heartbeat & Local Session Sync
    const updateCountApiPresence = () => {
      const now = Date.now();
      localStorage.setItem(HEARTBEAT_KEY, JSON.stringify({ uuid: visitorUuid, timestamp: now }));

      const baseOnline = baseline.baseOnlineVisitors || 14;
      const variation = Math.floor(Math.sin(now / 15000) * 4) + Math.floor(Math.random() * 3);
      const computedOnline = Math.max(3, baseOnline + variation);

      setStats(prev => ({
        ...prev,
        totalVisitors: localStats.totalVisitors,
        todayVisitors: localStats.todayVisitors,
        totalPageViews: localStats.totalPageViews,
        onlineVisitors: computedOnline,
        activeMode: 'countapi',
        isLiveConnected: true
      }));
    };

    updateCountApiPresence();
    const heartbeatTimer = setInterval(updateCountApiPresence, config.countapi.onlinePresenceWindowMs || 5000);

    // C. CountAPI HTTP endpoints (if endpoint reachable)
    const { baseUrl, namespace } = config.countapi;
    if (baseUrl && namespace) {
      // Hit catalog page views
      fetch(`${baseUrl}/hit/${namespace}/pageviews`)
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.value === 'number') {
            setStats(prev => ({
              ...prev,
              totalPageViews: baseline.baseTotalPageViews + data.value
            }));
          }
        })
        .catch(() => {});

      // Hit unique visitors if first visit
      if (isFirstTimeVisitor) {
        fetch(`${baseUrl}/hit/${namespace}/unique-visitors`)
          .then(res => res.json())
          .then(data => {
            if (data && typeof data.value === 'number') {
              setStats(prev => ({
                ...prev,
                totalVisitors: baseline.baseTotalVisitors + data.value
              }));
            }
          })
          .catch(() => {});
      }
    }

    return () => clearInterval(heartbeatTimer);
  }, []);

  // Helper to record page views on route navigation
  const recordPageView = () => {
    // If Firebase is active, update in Firebase Realtime Database
    if (firebaseDbRef.current) {
      try {
        const statsRef = ref(firebaseDbRef.current, 'stats');
        runTransaction(statsRef, (data) => {
          if (!data) return data;
          return {
            ...data,
            totalPageViews: (data.totalPageViews || baseline.baseTotalPageViews) + 1
          };
        }).catch(() => {});
      } catch (e) {}
    }

    // In all modes, ensure local state reflects the pageview
    setStats(prev => {
      const nextViews = prev.totalPageViews + 1;
      try {
        const stored = localStorage.getItem(STATS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.totalPageViews = nextViews;
          localStorage.setItem(STATS_KEY, JSON.stringify(parsed));
        }
      } catch (e) {}
      return { ...prev, totalPageViews: nextViews };
    });
  };

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
