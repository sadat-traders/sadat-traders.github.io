import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../../config/businessConfig';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = "Hello Sadat Chicken Wholesale, I would like to inquire about fresh chicken supply.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-charcoal text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-neutral-700 animate-bounce">
          <span>Need bulk rates? Chat on WhatsApp!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl(defaultMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative border-2 border-white"
        aria-label="Chat with Sadat Chicken on WhatsApp"
        title="WhatsApp Support +92 349 2355072"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </div>
  );
}
