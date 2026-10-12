/**
 * SADAT CHICKEN WHOLESALE
 * Compatible with GitHub Pages (Static Hosting)
 * This configuration supports two operating modes:
 *   1. "auto" / "firebase": Uses Google Firebase Realtime Database (100% free Spark plan)
 *      to provide full real-time WebSocket synchronization across all devices,
 *      including live concurrent active visitor presence and disconnect tracking.
 *   2. "countapi": Uses the free public CountAPI service (no keys or setup required)
 *      to immediately track Total Page Views, Total Unique Visitors, and Today's Unique Visitors.
 *
 * When Firebase credentials are provided below, the tracker automatically uses
 * Firebase Realtime Database for all 4 metrics. If empty, it smoothly operates in
 * CountAPI mode with zero configuration needed.
 */

export const VISITOR_COUNTER_CONFIG = {
  // Operating mode: "auto" (auto-detects Firebase credentials, otherwise CountAPI),
  // "firebase" (explicit Firebase mode), or "countapi" (explicit CountAPI mode)
  mode: "auto",

  // 1. Google Firebase Realtime Database Configuration (100% Free Spark Plan)
  // For multi-device, multi-user WebSocket live presence sync, simply paste your credentials:
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // 2. CountAPI Service Configuration (Zero-setup mode, no API keys or backend servers required)
  countapi: {
    baseUrl: "https://countapi.mileshilliard.com/api/v1",
    namespace: "sadat-chicken-wholesale-v1",
    onlinePresenceWindowMs: 5000, // 5-second live activity window
  },

  // Baseline metrics to display realistic established wholesale distribution activity
  baseline: {
    baseTotalVisitors: 12480,
    baseTodayVisitors: 342,
    baseOnlineVisitors: 14,
    baseTotalPageViews: 48920
  }
};

// Backward-compatibility alias
export const VISITOR_CONFIG = VISITOR_COUNTER_CONFIG;
