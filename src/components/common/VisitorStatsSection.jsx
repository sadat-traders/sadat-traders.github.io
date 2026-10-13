import React, { useState, useEffect, useRef } from 'react';
import { Users, Eye, Activity, Calendar, ShieldCheck, Radio } from 'lucide-react';
import { useVisitorStats } from '../../context/VisitorContext';

// Smooth counting animation component
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    prevValueRef.current = value;

    if (startValue === endValue) {
      setDisplayValue(endValue);
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for ultra smooth landing
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startValue + (endValue - startValue) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
}

export default function VisitorStatsSection() {
  const { 
    totalVisitors, 
    todayVisitors, 
    onlineVisitors, 
    totalPageViews, 
    activeMode,
    isLiveConnected 
  } = useVisitorStats();

  const statsCards = [
    {
      id: 'total-visitors',
      label: 'Total Unique Visitors',
      numericValue: totalVisitors,
      icon: Users,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-transparent',
      sublabel: 'Deduplicated browser UUID'
    },
    {
      id: 'today-visitors',
      label: "Today's Visitors",
      numericValue: todayVisitors,
      icon: Calendar,
      color: 'text-blue-400',
      bgGlow: 'from-blue-500/10 to-transparent',
      sublabel: 'Daily midnight PKT reset'
    },
    {
      id: 'online-visitors',
      label: 'Live Active Online',
      numericValue: onlineVisitors,
      icon: Activity,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      sublabel: 'Realtime active presence window',
      isLive: true
    },
    {
      id: 'page-views',
      label: 'Catalog Page Views',
      numericValue: totalPageViews,
      icon: Eye,
      color: 'text-red-400',
      bgGlow: 'from-red-500/10 to-transparent',
      sublabel: 'Wholesale product inquiries'
    }
  ];

  return (
    <div className="border-t border-charcoal-border bg-charcoal-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-800 gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h4 className="text-white font-heading font-bold text-base sm:text-lg tracking-wide flex items-center gap-2">
              Live Wholesale Portal Traffic Analytics
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span className="inline-flex items-center gap-1.5 flex-wrap">
              <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>
                {activeMode === 'firebase' 
                  ? 'Firebase Realtime WebSocket Synced' 
                  : (isLiveConnected ? 'CountAPI Realtime Cloud Synced' : 'CountAPI Zero-Setup Mode')}
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-neutral-500">Compatible with GitHub Pages</span>
            </span>
          </div>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-xl bg-charcoal border border-neutral-800 p-4 transition-all hover:border-neutral-700 hover:shadow-lg group"
              >
                <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${item.bgGlow} pointer-events-none blur-xl`}></div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-400 tracking-wide">
                    {item.label}
                  </span>
                  <div className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                    <AnimatedNumber value={item.numericValue} />
                  </span>
                  {item.isLive && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-neutral-500 mt-1">
                  {item.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
