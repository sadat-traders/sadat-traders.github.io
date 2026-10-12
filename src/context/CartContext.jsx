import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUSINESS_CONFIG, generateCartWhatsAppMessage, getWhatsAppUrl } from '../config/businessConfig';

const CartContext = createContext();

const CART_STORAGE_KEY = 'sadat_wholesale_cart_v1';
const USER_INFO_STORAGE_KEY = 'sadat_user_info_v1';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_INFO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { name: '', phone: '', location: '', notes: '' };
    } catch (e) {
      return { name: '', phone: '', location: '', notes: '' };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [cartItems]);

  // Save customer info changes
  useEffect(() => {
    try {
      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.error("Failed to persist customer info", e);
    }
  }, [customerInfo]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 5) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showToast(`Updated ${product.name} quantity (+${quantity} ${product.unit || 'KG'})`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        showToast(`Added ${product.name} (${quantity} ${product.unit || 'KG'}) to wholesale cart`);
        return [...prev, {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          unit: product.unit || 'KG',
          image: product.image,
          minOrderKg: product.minOrderKg || 5,
          quantity: quantity
        }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.name} from cart`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotalPkr = cartItems.reduce((acc, item) => {
    return acc + ((item.price || 0) * item.quantity);
  }, 0);

  const isTotalCalculable = cartItems.length > 0 && cartItems.every(item => typeof item.price === 'number');

  /**
   * Validates and proceeds to WhatsApp checkout.
   * Customer Name and Delivery Location are mandatory!
   */
  const proceedToWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your wholesale cart is empty. Please add products before checking out.");
      return false;
    }

    if (!customerInfo.name || customerInfo.name.trim() === '') {
      alert("Customer Name is required to place a wholesale order via WhatsApp.");
      return false;
    }

    if (!customerInfo.location || customerInfo.location.trim() === '') {
      alert("Delivery Location is required to confirm logistics & order dispatch.");
      return false;
    }

    const message = generateCartWhatsAppMessage({
      items: cartItems,
      customerName: customerInfo.name.trim(),
      deliveryLocation: customerInfo.location.trim(),
      contactPhone: customerInfo.phone?.trim() || "",
      notes: customerInfo.notes?.trim() || ""
    });

    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        customerInfo,
        setCustomerInfo,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        cartTotalPkr,
        isTotalCalculable,
        proceedToWhatsAppCheckout,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
