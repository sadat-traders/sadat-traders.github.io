
/**
 * SADAT CHICKEN WHOLESALE
 * Professional Real-Time Visitor Counter
 * Compatible with GitHub Pages
 */

export const VISITOR_COUNTER_CONFIG = {
  // Operating mode
  // auto | firebase | countapi
  mode: "auto",

  // Firebase Realtime Database
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // CountAPI configuration
  countapi: {
    baseUrl: "https://countapi.mileshilliard.com/api/v1",
    namespace: "sadat-chicken-wholesale-v1",

    // Online activity expires after 10 seconds
    onlinePresenceWindowMs: 10000
  },

  // Pakistan Standard Time
  timezone: "Asia/Karachi",

  // Online tracking
  onlineWindowMinutes: 10 / 60,

  // Update visitor heartbeat every 5 seconds
  heartbeatIntervalMs: 5000,

  // Refresh counters every 5 seconds
  pollIntervalMs: 5000,

  // Smooth counter animation
  countUpDurationMs: 5000,

  // Actual visitor statistics only
  baseline: {
    baseTotalVisitors: 0,
    baseTodayVisitors: 0,
    baseOnlineVisitors: 0,
    baseTotalPageViews: 0
  }
};

// Backward-compatible alias
export const VISITOR_CONFIG = VISITOR_COUNTER_CONFIG;
