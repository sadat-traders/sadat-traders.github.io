import React, { useState } from 'react';
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
  FileText 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_CONFIG, generateProductWhatsAppMessage, getWhatsAppUrl } from '../../config/businessConfig';
import { PRODUCTS } from '../../data/products';

export default function ProductDetailModal({ product, onClose, onSelectProduct }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.minOrderKg || 10);
  const [justAdded, setJustAdded] = useState(false);

  // Find related products from same category or random
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
    const message = `Hello Sadat Chicken Wholesale,\n\nI would like to request a bulk wholesale quotation for:\nProduct: ${product.name}\nEstimated Volume: ${quantity * 5} KG\n\nPlease let me know your tier rates and logistics schedule.`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-neutral-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center shadow-md transition-all"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Large Product Image Section */}
          <div className="bg-cream/70 p-6 sm:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="absolute top-5 left-5 flex flex-col gap-1.5">
              <span className="bg-burgundy text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category.replace('-', ' ')}
              </span>
              <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Halal Slaughtered
              </span>
            </div>

            <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
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
            <div className="grid grid-cols-2 gap-2 w-full mt-4 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-neutral-200">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Chilled 0°C to 4°C</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-neutral-200">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Insulated Van Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right: Specifications & Ordering Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-burgundy uppercase tracking-wider mb-1">
                Wholesale Product Dossier
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-charcoal leading-tight">
                {product.name}
              </h2>

              {/* Rate Row */}
              <div className="flex items-center gap-2 mt-3 pb-3 border-b border-neutral-100">
                <span className="text-xl sm:text-2xl font-black text-burgundy font-heading">
                  Contact for Price
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  (Daily Wholesale Market Rate)
                </span>
              </div>

              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="mt-5 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2 font-heading">
                  Technical Cut Specifications
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
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
                <div className="mt-4">
                  <span className="text-xs font-bold text-neutral-500 block mb-1.5">
                    Recommended For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.popularFor.map((item, idx) => (
                      <span key={idx} className="bg-cream border border-neutral-200 text-neutral-700 text-[11px] font-medium px-2.5 py-0.5 rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-neutral-700 font-heading">
                  Select Quantity (KG):
                </span>
                
                <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.minOrderKg || 5, quantity - 5))}
                    className="p-2 hover:bg-neutral-100 text-neutral-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-extrabold text-charcoal font-heading">
                    {quantity} {product.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 5)}
                    className="p-2 hover:bg-neutral-100 text-neutral-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold shadow transition-all ${
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
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-sm font-bold shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Order</span>
                </button>
              </div>

              {/* Wholesale Quotation Button */}
              <button
                type="button"
                onClick={handleQuoteInquiry}
                className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-burgundy py-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Need 100+ KG commercial volume? Request Customized Wholesale Quotation</span>
              </button>
            </div>

          </div>

        </div>

        {/* Related Products Bar */}
        {displayRelated.length > 0 && (
          <div className="bg-cream/50 p-6 border-t border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-3 font-heading">
              Related Chicken Cuts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {displayRelated.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-neutral-200/80 hover:border-burgundy hover:shadow-sm cursor-pointer transition-all"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-12 h-12 object-contain rounded-lg bg-cream/40 p-1 shrink-0"
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

    </div>
  );
}
