
/**
 * SADAT CHICKEN WHOLESALE
 * Professional Real-Time Visitor Counter
 * Compatible with GitHub Pages & Static Hosting
 */

export const VISITOR_COUNTER_CONFIG = {
  // Operating mode: "auto" (detects Firebase credentials, else uses CountAPI), "firebase", or "countapi"
  mode: "auto",

  // Firebase Realtime Database (Optional: Paste credentials for WebSocket live sync)
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // CountAPI configuration (Zero-setup public cloud counter)
  countapi: {
    baseUrl: "https://countapi.mileshilliard.com/api/v1",
    namespace: "sadat-chicken-wholesale-v1",

    // Online activity heartbeat window
    onlinePresenceWindowMs: 10000
  },

  // Pakistan Standard Time for accurate midnight reset
  timezone: "Asia/Karachi",

  // Online tracking
  onlineWindowMinutes: 10 / 60,

  // Update visitor heartbeat every 5 seconds
  heartbeatIntervalMs: 5000,

  // Refresh counters from server every 15 seconds
  pollIntervalMs: 15000,

  // Smooth counter animation
  countUpDurationMs: 1500,

  // Pure genuine real-time visitor statistics only - No artificial baselines
  baseline: {
    baseTotalVisitors: 0,
    baseTodayVisitors: 0,
    baseOnlineVisitors: 0,
    baseTotalPageViews: 0
  }
};

// Backward-compatible alias
export const VISITOR_CONFIG = VISITOR_COUNTER_CONFIG;

