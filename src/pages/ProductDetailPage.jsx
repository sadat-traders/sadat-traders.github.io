import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  ThermometerSnowflake, 
  Scale, 
  Plus, 
  Minus, 
  Check, 
  FileText 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BUSINESS_CONFIG, generateProductWhatsAppMessage, getWhatsAppUrl } from '../config/businessConfig';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({ onQuickView }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(product?.minOrderKg || 10);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <Link to="/products" className="text-burgundy underline">Return to Products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductWhatsAppMessage(product, quantity, product.unit || "KG");
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="bg-cream-soft min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-burgundy mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-luxury overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image Column */}
            <div className="lg:col-span-6 bg-cream/60 p-8 sm:p-14 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-neutral-200">
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-burgundy text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Halal Slaughter
                </span>
              </div>

              <div className="w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center my-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    if (product.fallbackImage) e.currentTarget.src = product.fallbackImage;
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-4 text-xs text-neutral-600">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200">
                  <ThermometerSnowflake className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Chilled 0°C to 4°C Fresh</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Insulated Delivery Crate</span>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-burgundy uppercase tracking-wider block mb-1 font-heading">
                  Wholesale Cut Dossier
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-heading font-black text-charcoal leading-tight">
                  {product.name}
                </h1>

                {/* Rate Row */}
                <div className="flex items-center gap-2 mt-4 pb-4 border-b border-neutral-100">
                  <span className="text-2xl sm:text-3xl font-black text-burgundy font-heading">
                    Contact for Price
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    (Daily Wholesale Market Rate)
                  </span>
                </div>

                <p className="text-neutral-600 text-sm sm:text-base mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="mt-6 bg-cream/40 rounded-2xl p-4 sm:p-5 border border-neutral-200">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-3 font-heading">
                    Technical Cut Specifications
                  </h3>
                  <dl className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <dt className="text-neutral-400 font-medium">Cut Type:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.cutType || 'Skinless'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Min Order Volume:</dt>
                      <dd className="font-semibold text-neutral-800">{product.minOrderKg || 5} {product.unit}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Packaging:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.packaging || 'Master Poly Carton'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-medium">Preservation:</dt>
                      <dd className="font-semibold text-neutral-800">{product.specifications?.temperature || 'Chilled 2°C'}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Quantity & Order Controls */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-neutral-700 font-heading">
                    Select Quantity (KG):
                  </span>
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
                    <div className="flex items-center px-2 bg-neutral-50/50">
                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setQuantity(isNaN(val) ? 1 : Math.max(1, val));
                        }}
                        className="w-16 text-center text-sm font-extrabold text-charcoal bg-transparent focus:outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold shadow transition-all ${
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
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black font-heading text-charcoal mb-6">
              Related Chicken Cuts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
