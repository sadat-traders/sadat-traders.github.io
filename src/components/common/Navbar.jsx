import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  Search, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../../config/businessConfig';
import { useCart } from '../../context/CartContext';
import WhatsAppIcon from './WhatsAppIcon';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Wholesale Orders', path: '/wholesale' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-charcoal text-white text-xs py-2 px-4 border-b border-charcoal-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Zabiha Halal Certified Wholesale
            </span>
            <span className="hidden md:inline text-neutral-500">|</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-burgundy-400" /> {BUSINESS_CONFIG.businessHours}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_CONFIG.phone}`} 
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <span className="text-neutral-500">|</span>
            <a 
              href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to inquire about wholesale chicken supply.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Quick Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-neutral-200' 
            : 'bg-white py-3.5 border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-burgundy shadow-sm group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-1">
                <img 
                  src="./assets/logo.png" 
                  alt="Sadat Chicken Wholesale Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image not ready
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-burgundy tracking-tight leading-none group-hover:text-meatRed transition-colors">
                  SADAT CHICKEN
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-charcoal tracking-widest uppercase">
                  Wholesale & Supply
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? 'text-burgundy bg-burgundy-50 border-b-2 border-burgundy'
                        : 'text-neutral-700 hover:text-burgundy hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Cart, WhatsApp CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="p-2 text-neutral-600 hover:text-burgundy hover:bg-neutral-100 rounded-full transition-colors"
                  title="Search cuts & products"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-800 hover:text-burgundy hover:bg-burgundy-50 rounded-full transition-colors group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-neutral-800" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalItemsCount > 99 ? '99+' : totalItemsCount}
                  </span>
                )}
              </button>

              {/* Direct WhatsApp Call to Action */}
              <a
                href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to order fresh chicken wholesale.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>+92 349 2355072</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-burgundy hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-xl transition-all animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                      active
                        ? 'bg-burgundy-50 text-burgundy font-semibold border-l-4 border-burgundy'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-neutral-100 flex flex-col gap-3">
                <a
                  href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow text-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp (+92 349 2355072)</span>
                </a>

                <div className="text-center text-xs text-neutral-500 py-1">
                  Operating Hours: {BUSINESS_CONFIG.businessHours}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
