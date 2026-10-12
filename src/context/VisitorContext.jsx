import React, { createContext, useContext, useState, useEffect } from 'react';
import { VISITOR_CONFIG } from '../config/visitor-counter-config';

const VisitorContext = createContext();

const UUID_KEY = 'sadat_visitor_uuid_v1';
const STATS_KEY = 'sadat_visitor_stats_v1';
const HEARTBEAT_KEY = 'sadat_online_heartbeat_v1';

export function VisitorProvider({ children }) {
  const [stats, setStats] = useState({
    totalVisitors: VISITOR_CONFIG.zeroSetup.baseTotalVisitors,
    todayVisitors: VISITOR_CONFIG.zeroSetup.baseTodayVisitors,
    onlineVisitors: VISITOR_CONFIG.zeroSetup.baseOnlineVisitors,
    totalPageViews: VISITOR_CONFIG.zeroSetup.baseTotalPageViews,
    isLoaded: false
  });

  useEffect(() => {
    // 1. Identify or register unique browser UUID
    let visitorUuid = localStorage.getItem(UUID_KEY);
    const isFirstTimeVisitor = !visitorUuid;
    if (isFirstTimeVisitor) {
      visitorUuid = 'scw_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem(UUID_KEY, visitorUuid);
    }

    // 2. Load stored stats or seed with default
    const todayDateKey = new Date().toISOString().split('T')[0];
    let localStats = null;
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        localStats = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load stats from localStorage", e);
    }

    if (!localStats) {
      localStats = {
        totalVisitors: VISITOR_CONFIG.zeroSetup.baseTotalVisitors + (isFirstTimeVisitor ? 1 : 0),
        todayVisitors: VISITOR_CONFIG.zeroSetup.baseTodayVisitors + (isFirstTimeVisitor ? 1 : 0),
        totalPageViews: VISITOR_CONFIG.zeroSetup.baseTotalPageViews + 1,
        lastDate: todayDateKey
      };
    } else {
      // Check if day has changed (Midnight reset for Today's Visitors)
      if (localStats.lastDate !== todayDateKey) {
        localStats.lastDate = todayDateKey;
        localStats.todayVisitors = 1; // Reset daily counter
      } else if (isFirstTimeVisitor) {
        localStats.todayVisitors += 1;
        localStats.totalVisitors += 1;
      }
      localStats.totalPageViews += 1;
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(localStats));

    // 3. Heartbeat for Online Visitors (5-second window)
    const updateOnlinePresence = () => {
      const now = Date.now();
      localStorage.setItem(HEARTBEAT_KEY, JSON.stringify({ uuid: visitorUuid, timestamp: now }));
      
      // Calculate realistic live online variation around base (e.g., 12 to 24 active wholesale buyers)
      const baseOnline = VISITOR_CONFIG.zeroSetup.baseOnlineVisitors;
      const variation = Math.floor(Math.sin(now / 15000) * 4) + Math.floor(Math.random() * 3);
      const computedOnline = Math.max(3, baseOnline + variation);

      setStats(prev => ({
        ...prev,
        totalVisitors: localStats.totalVisitors,
        todayVisitors: localStats.todayVisitors,
        totalPageViews: localStats.totalPageViews,
        onlineVisitors: computedOnline,
        isLoaded: true
      }));
    };

    updateOnlinePresence();
    const heartbeatInterval = setInterval(updateOnlinePresence, VISITOR_CONFIG.zeroSetup.onlineHeartbeatWindowMs || 5000);

    // Optional: Attempt CountAPI ping if available and zero-setup
    if (VISITOR_CONFIG.mode === 'zero-setup' && VISITOR_CONFIG.zeroSetup.countApiBaseUrl) {
      fetch(`${VISITOR_CONFIG.zeroSetup.countApiBaseUrl}/hit/${VISITOR_CONFIG.zeroSetup.namespace}/pageviews`)
        .then(res => res.json())
        .then(data => {
          if (data && data.value) {
            setStats(prev => ({
              ...prev,
              totalPageViews: VISITOR_CONFIG.zeroSetup.baseTotalPageViews + data.value
            }));
          }
        })
        .catch(() => {
          // Graceful fallback to local counter
        });
    }

    return () => clearInterval(heartbeatInterval);
  }, []);

  // Helper to record page views on route navigation
  const recordPageView = () => {
    setStats(prev => {
      const updatedViews = prev.totalPageViews + 1;
      try {
        const stored = localStorage.getItem(STATS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.totalPageViews = updatedViews;
          localStorage.setItem(STATS_KEY, JSON.stringify(parsed));
        }
      } catch (e) {}
      return { ...prev, totalPageViews: updatedViews };
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
