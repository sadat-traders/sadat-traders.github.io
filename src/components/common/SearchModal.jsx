import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' 
    ? PRODUCTS.slice(0, 6) 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.popularFor?.some(pop => pop.toLowerCase().includes(query.toLowerCase())) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search chicken cuts, e.g. boneless, wings, drumstick, whole..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base text-neutral-800 placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="p-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 font-medium shrink-0">Popular:</span>
          {["Boneless", "Drumstick", "Mid-Joint", "Whole Chicken", "Liver", "Feet"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 hover:border-burgundy text-neutral-700 hover:text-burgundy transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-neutral-100">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No chicken cuts found matching "{query}". Try another search term.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="p-3 flex items-center gap-4 hover:bg-cream/60 rounded-xl cursor-pointer transition-colors group"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 object-contain rounded-lg bg-white border border-neutral-200 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-neutral-800 group-hover:text-burgundy transition-colors font-heading truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {p.description}
                  </p>
                  <span className="text-xs font-bold text-burgundy mt-1 block">
                    Contact for Price
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-burgundy group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
