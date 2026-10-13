import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  ThermometerSnowflake, 
  Package, 
  Plus, 
  Minus, 
  Check, 
  FileText,
  Scale
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_CONFIG, generateProductWhatsAppMessage, getWhatsAppUrl } from '../../config/businessConfig';
import { PRODUCTS } from '../../data/products';
import WhatsAppIcon from './WhatsAppIcon';

export default function ProductDetailModal({ product, onClose, onSelectProduct }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.minOrderKg || 10);
  const [justAdded, setJustAdded] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Find related products
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const displayRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductWhatsAppMessage(product, quantity, product.unit || "KG");
    window.open(getWhatsAppUrl(message), '_blank');
  };

  const handleQuoteInquiry = () => {
    const message = `Hello Sadat Chicken Wholesale,\n\nI would like to request a bulk wholesale quotation for:\nProduct: ${product.name}\nEstimated Volume: ${quantity} KG\n\nPlease let me know your tier rates and logistics schedule.`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  const handleManualQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setQuantity(isNaN(val) ? 1 : Math.max(1, val));
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Container - Responsive for mobile screens & desktop computer screens */}
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar for Mobile & Computer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-charcoal text-white border-b border-neutral-800 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold text-gold uppercase tracking-wider font-heading">
              Quick View Cut Specifications
            </span>
            <span className="hidden sm:inline-block text-neutral-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Halal
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex items-center gap-1 text-xs"
            aria-label="Close specifications"
            title="Close (Esc)"
          >
            <span className="hidden sm:inline text-xs font-semibold">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image Section */}
            <div className="bg-cream/60 p-4 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-200">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="bg-burgundy text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Halal Slaughter
                </span>
              </div>

              {/* Product Image */}
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center my-2 sm:my-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    if (product.fallbackImage) e.currentTarget.src = product.fallbackImage;
                  }}
                />
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-2 gap-2 w-full text-[10px] sm:text-[11px] text-neutral-600">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-neutral-200 shadow-xs">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>Chilled 0°C to 4°C</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-neutral-200 shadow-xs">
                  <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Insulated Van Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications & Ordering Controls */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-burgundy uppercase tracking-wider mb-1 block">
                  Wholesale Cut Profile
                </span>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-charcoal leading-tight">
                  {product.name}
                </h2>

                {/* Rate Row */}
                <div className="flex items-center gap-2 mt-2.5 pb-2.5 border-b border-neutral-100">
                  <span className="text-lg sm:text-xl font-black text-burgundy font-heading">
                    Contact for Price
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    (Daily Wholesale Market Rate)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications Table */}
                <div className="mt-4 bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200/80">
                  <h4 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-2 font-heading">
                    Technical Cut Specifications
                  </h4>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    <div>
                      <dt className="text-neutral-400 font-medium">Cut Type:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.cutType || 'Skinless'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Min Order:</dt>
                      <dd className="font-semibold text-neutral-800">{product.minOrderKg || 5} {product.unit}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Packaging:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.packaging || 'Master Poly Carton'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Storage Temp:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.temperature || 'Chilled 2°C'}</dd>
                    </div>
                  </dl>
                </div>

                {/* Popular Applications */}
                {product.popularFor && (
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-neutral-500 block mb-1">
                      Recommended For:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.popularFor.map((item, idx) => (
                        <span key={idx} className="bg-cream border border-neutral-200 text-neutral-700 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-lg">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector & Action Controls */}
              <div className="mt-5 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-3.5">
                  <div>
                    <span className="text-xs font-bold text-neutral-700 font-heading block">
                      Order Quantity (KG):
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Type manually or use +/- buttons
                    </span>
                  </div>
                  
                  {/* Manual Numeric Input + Quick Buttons (+1 Increment) */}
                  <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-burgundy/20 focus-within:border-burgundy">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 sm:p-2.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
                      title="Decrease 1 KG (-1)"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center px-1 sm:px-2 bg-neutral-50/50">
                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={quantity}
                        onChange={handleManualQuantityChange}
                        className="w-12 sm:w-16 text-center text-sm font-extrabold text-charcoal bg-transparent focus:outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        title="Insert quantity in KG manually"
                        aria-label="Quantity in KG"
                      />
                      <span className="text-xs font-bold text-neutral-600 select-none pr-1">KG</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 sm:p-2.5 hover:bg-neutral-100 text-neutral-700 transition-colors"
                      title="Increase 1 KG (+1)"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow transition-all ${
                      justAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-burgundy hover:bg-burgundy-800 text-white hover:shadow-lg'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add {quantity} KG to Cart
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>

                {/* Wholesale Quotation Link */}
                <button
                  type="button"
                  onClick={handleQuoteInquiry}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-neutral-600 hover:text-burgundy py-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Need 100+ KG commercial contract? Request Wholesale Quotation</span>
                </button>
              </div>

            </div>

          </div>

          {/* Related Products Bar */}
          {displayRelated.length > 0 && (
            <div className="bg-cream/50 p-4 sm:p-6 border-t border-neutral-200">
              <h4 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-2.5 font-heading">
                Related Chicken Cuts
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {displayRelated.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="flex items-center gap-2.5 bg-white p-2 sm:p-2.5 rounded-xl border border-neutral-200/80 hover:border-burgundy hover:shadow-sm cursor-pointer transition-all"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg bg-cream/40 p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-800 truncate font-heading">{rel.name}</p>
                      <p className="text-[11px] text-burgundy font-semibold">
                        Contact for Price
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Bar with explicit Close button */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Sadat Chicken Wholesale • 100% Halal Verified</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-200 text-neutral-700 font-semibold transition-colors"
          >
            Close Specifications
          </button>
        </div>

      </div>

    </div>
  );
}
