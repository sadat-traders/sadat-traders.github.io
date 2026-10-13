import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../../config/businessConfig';
import { CATEGORIES } from '../../data/products';
import VisitorStatsSection from './VisitorStatsSection';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-neutral-300 border-t border-charcoal-border">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Info (2 columns on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-burgundy bg-white p-1">
                <img
                  src="./assets/logo.png"
                  alt="Sadat Chicken Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white tracking-tight">
                  SADAT CHICKEN WHOLESALE
                </h3>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                  Premium Quality Poultry Distribution
                </p>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              "Freshness, Quality & Trust in Every Order." <br />
              Leading wholesale supplier of fresh, hygienic, and certified 100% Halal chicken meat cuts for hotels, restaurants, catering, supermarkets, and bulk distributors.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to make an inquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp: +92 349 2355072</span>
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-neutral-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> All Products
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> Wholesale & Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> About Sadat Chicken
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Chicken Cuts
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="hover:text-gold transition-colors flex items-center gap-1.5 text-neutral-400"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600" /> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider border-b border-neutral-800 pb-2">
              Wholesale Desk
            </h4>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-meatRed shrink-0 mt-1" />
                <span>{BUSINESS_CONFIG.headquarters}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{BUSINESS_CONFIG.businessHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Halal Slaughtered</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Visitor Traffic Analytics Section */}
      <VisitorStatsSection />

      {/* Bottom Sub-footer */}
      <div className="border-t border-neutral-900 bg-black/60 py-6 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 sm:pl-20 sm:pr-24">
          <div>
            © {currentYear} <span className="text-neutral-300 font-semibold">{BUSINESS_CONFIG.brandName}</span>. All rights reserved. Registered Halal Food Supply.
          </div>

          {/* Developer Portfolio Link */}
          <div className="flex items-center gap-2 text-neutral-400">
            <span>Developed</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href={BUSINESS_CONFIG.developerPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-amber-300 font-semibold inline-flex items-center gap-1 transition-colors underline decoration-gold/40 underline-offset-4"
            >
              <span>Murtuza Developer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
