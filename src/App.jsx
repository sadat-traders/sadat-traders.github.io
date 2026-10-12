import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import ProductDetailModal from './components/common/ProductDetailModal';
import SearchModal from './components/common/SearchModal';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import BackToTop from './components/common/BackToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WholesalePage from './pages/WholesalePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { useCart } from './context/CartContext';
import { useVisitorStats } from './context/VisitorContext';
import { Check } from 'lucide-react';

function ScrollToTopAndTrack() {
  const { pathname } = useLocation();
  const { recordPageView } = useVisitorStats();

  useEffect(() => {
    window.scrollTo(0, 0);
    recordPageView();
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toastMessage } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal">
      <ScrollToTopAndTrack />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-charcoal text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-gold/40 flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onQuickView={setSelectedProductForModal} />} />
          <Route path="/products" element={<ProductsPage onQuickView={setSelectedProductForModal} />} />
          <Route path="/product/:slug" element={<ProductDetailPage onQuickView={setSelectedProductForModal} />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage onQuickView={setSelectedProductForModal} />} />
        </Routes>
      </main>

      {/* Footer with Live Visitor Statistics */}
      <Footer />

      {/* Slideover Cart Drawer */}
      <CartDrawer />

      {/* Quick View Product Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onSelectProduct={(p) => setSelectedProductForModal(p)}
        />
      )}

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
      />

      {/* Floating Action Elements */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
