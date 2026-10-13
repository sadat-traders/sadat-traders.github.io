import React, { useState } from 'react';
import { X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../../config/businessConfig';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = "Hello Sadat Chicken Wholesale, I would like to inquire about fresh chicken supply.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-charcoal text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-neutral-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span className="font-medium">Need bulk rates? Chat on WhatsApp!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5 ml-1 transition-colors rounded hover:bg-neutral-800"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl(defaultMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative border-2 border-white"
        aria-label="Chat with Sadat Chicken on WhatsApp"
        title="WhatsApp Support +92 349 2355072"
      >
        {/* Real-time online notification badge */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 text-[10px] font-extrabold text-white items-center justify-center border-2 border-white shadow-md">
            1
          </span>
        </span>
        <WhatsAppIcon className="w-8 h-8 fill-white drop-shadow-sm" />
      </a>
    </div>
  );
}
