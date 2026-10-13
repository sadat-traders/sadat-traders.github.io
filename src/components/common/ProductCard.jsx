import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  Eye, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Scale 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_CONFIG, generateProductWhatsAppMessage, getWhatsAppUrl } from '../../config/businessConfig';
import WhatsAppIcon from './WhatsAppIcon';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [selectedKg, setSelectedKg] = useState(product.minOrderKg || 10);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedKg);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductWhatsAppMessage(product, selectedKg, product.unit || "KG");
    window.open(getWhatsAppUrl(message), '_blank');
  };

  const displayImg = imageError && product.fallbackImage ? product.fallbackImage : product.image;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-luxury hover:border-burgundy/30 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Product Image Section */}
      <div className="relative aspect-square w-full bg-cream/60 p-4 flex items-center justify-center overflow-hidden">
        {/* Availability Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-gold-dark to-gold text-charcoal-dark font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
              ★ Wholesale Prime
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Fresh Daily Stock
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-neutral-700 hover:text-burgundy hover:bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
          title="Quick View Specifications"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Image */}
        <img
          src={displayImg}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
        />

        {/* Min Order Note */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-neutral-100">
          <span className="flex items-center gap-1 font-medium text-neutral-700">
            <Scale className="w-3 h-3 text-burgundy" /> Min: {product.minOrderKg || 5} {product.unit}
          </span>
          <span className="text-[10px] font-semibold text-emerald-700">100% Halal</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-heading font-bold text-neutral-900 text-base sm:text-lg leading-snug group-hover:text-burgundy transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Wholesale Rate & Quantity Stepper */}
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Rate & Quotation
              </span>
              <div className="inline-flex items-center gap-1 text-xs font-extrabold text-burgundy font-heading">
                <span>Contact for Price</span>
              </div>
            </div>

            {/* Quick KG Selector with Manual Input (+1 Increment) */}
            <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50 focus-within:ring-1 focus-within:ring-burgundy focus-within:border-burgundy">
              <button
                type="button"
                onClick={() => setSelectedKg(Math.max(1, selectedKg - 1))}
                className="px-2 py-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                title="Decrease 1 KG (-1)"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex items-center bg-white px-1">
                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={selectedKg}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setSelectedKg(isNaN(val) ? 1 : Math.max(1, val));
                  }}
                  className="w-10 text-center text-xs font-bold text-neutral-800 focus:outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  title="Insert quantity in KG manually"
                  aria-label="Quantity in KG"
                />
                <span className="text-[10px] font-semibold text-neutral-500 pr-1 select-none">KG</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedKg(selectedKg + 1)}
                className="px-2 py-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                title="Increase 1 KG (+1)"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-burgundy-50 text-burgundy hover:bg-burgundy hover:text-white border border-burgundy/20'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow"
              title="Order this cut immediately on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
