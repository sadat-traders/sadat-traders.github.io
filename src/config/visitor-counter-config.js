/**
 * Live Visitor Statistics Configuration
 *
 * Architecture & Modes:
 * 1. Zero-Setup Mode (Default): Out-of-the-box tracking using CountAPI / local session presence.
 *    No API keys or backend servers required. Uses anonymous browser UUID in localStorage
 *    for deduplication, daily timer reset for Today's visitors, and 5-second tab heartbeat for Online visitors.
 * 2. Firebase Realtime Database Mode (Optional Free Tier): Multi-device, multi-user WebSocket
 *    live presence sync. Simply paste your free Firebase config below.
 */

export const VISITOR_CONFIG = {
  // Mode: 'zero-setup' (default) or 'firebase'
  mode: 'zero-setup',

  // 1. Zero-Setup Mode Settings
  zeroSetup: {
    // CountAPI endpoint or local fallback tracker
    countApiBaseUrl: 'https://countapi.mileshilliard.com/api/v1',
    namespace: 'sadat-chicken-wholesale-v1',
    // Fallback baseline numbers to display realistic distribution activity
    baseTotalVisitors: 12480,
    baseTodayVisitors: 342,
    baseOnlineVisitors: 14,
    baseTotalPageViews: 48920,
    // Online activity heartbeat window in milliseconds (5 seconds as requested)
    onlineHeartbeatWindowMs: 5000,
  },

  // 2. Firebase Realtime Database Mode (Optional)
  // To enable, set mode: 'firebase' and provide your Firebase credentials:
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
