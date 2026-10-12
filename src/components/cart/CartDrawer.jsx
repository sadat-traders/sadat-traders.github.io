import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  MapPin, 
  User, 
  Phone, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const { 
    cartItems, 
    customerInfo, 
    setCustomerInfo, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotalPkr, 
    isTotalCalculable,
    proceedToWhatsAppCheckout
  } = useCart();

  const [validationError, setValidationError] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    setValidationError('');

    if (cartItems.length === 0) {
      setValidationError("Your cart is empty. Please select products to continue.");
      return;
    }

    if (!customerInfo.name || customerInfo.name.trim().length < 2) {
      setValidationError("Please enter your Full Name / Business Name (Required to proceed).");
      return;
    }

    if (!customerInfo.location || customerInfo.location.trim().length < 4) {
      setValidationError("Please enter your Complete Delivery Location (Required to confirm dispatch).");
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const success = proceedToWhatsAppCheckout();
    if (success) {
      setIsCartOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="p-5 bg-charcoal text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-heading font-bold text-base">Wholesale Order Cart</h3>
                <p className="text-xs text-neutral-400">Sadat Chicken Direct Order Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {cartItems.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-4 border border-burgundy/10">
                  <ShoppingBag className="w-10 h-10 text-burgundy/40" />
                </div>
                <h4 className="font-heading font-bold text-neutral-800 text-lg">Your Cart is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mt-1 mb-6">
                  Explore our premium skinless chicken cuts and bulk wholesale offerings.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-burgundy hover:bg-burgundy-800 text-white font-medium text-xs px-5 py-2.5 rounded-full shadow transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 text-xs text-neutral-500">
                  <span>{cartItems.length} Products Selected</span>
                  <button 
                    onClick={clearCart} 
                    className="text-red-600 hover:text-red-700 font-medium hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 pb-3 flex gap-3 items-center group">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-contain rounded-lg border border-neutral-200 bg-cream/40 p-1 shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = './assets/logo.png';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-neutral-800 truncate font-heading">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Rate: Confirmed on WhatsApp
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-neutral-800">
                            {item.quantity} {item.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-[11px] font-semibold text-burgundy ml-auto">
                          Quote on Order
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 p-1 rounded-md transition-colors"
                      title="Remove cut"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Mandatory Customer Information Form */}
            {cartItems.length > 0 && (
              <div className="mt-6 pt-5 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-burgundy" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading">
                    Customer Details (Required for WhatsApp Order)
                  </h4>
                </div>

                {validationError && (
                  <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Full Name / Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Ahmed / Al-Bake Restaurant"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Delivery Location & City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shop #4, Commercial Area, Karachi"
                      value={customerInfo.location}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, location: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0349 2355072"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Special Cutting / Packing Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need 10 KG packets, deliver before 12 PM"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & WhatsApp Order Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 shadow-lg">
              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Total Order Volume:</span>
                  <span className="font-semibold text-neutral-800">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} KG
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Cold-Chain Delivery:</span>
                  <span className="text-emerald-700 font-medium">Wholesale Standard</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-charcoal pt-2 border-t border-neutral-200 font-heading">
                  <span>Total Wholesale Cost:</span>
                  <span className="text-burgundy text-sm sm:text-base">
                    Quoted on WhatsApp
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 pt-1">
                  *After placing your order, we will reply with the exact total cost according to the items, cuts, and quantities selected.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Place Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct dispatch to +92 349 2355072</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
