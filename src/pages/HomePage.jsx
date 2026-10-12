import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Truck, 
  CheckCircle2, 
  MessageCircle, 
  Award, 
  TrendingUp, 
  Building2, 
  Utensils, 
  ShoppingBag, 
  Star,
  Scale,
  Eye,
  Sparkles
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/businessConfig';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';

const HERO_SHOWCASE_CUTS = [
  {
    id: 6,
    name: "Skinless Chicken Breast Boneless",
    subtitle: "Prime Double Fillet • Hand-Deboned • 0% Fat",
    badge: "Most Demanded B2B Cut",
    image: "./assets/products/skinless-chicken-breast-boneless.png",
    fallback: "./assets/6. SkinLess Chicken Breast Bonless.png",
    tag: "Boneless Breast"
  },
  {
    id: 11,
    name: "Skinless Chicken Drumstick",
    subtitle: "Calibrated 100g-120g • Skinned Clean • High Yield",
    badge: "Franchise & Family Favorite",
    image: "./assets/products/skinless-chicken-drumstick.png",
    fallback: "./assets/11. SkinLess Chicken DrumStick.png",
    tag: "Drumsticks"
  },
  {
    id: 2,
    name: "Skinless Chicken Mid-Joint Wing",
    subtitle: "Uniform Flats • Zero Feathers • Gourmet Grill",
    badge: "Upscale Grill & Cafe Grade",
    image: "./assets/products/skinless-chicken-mid-joint-wing.png",
    fallback: "./assets/2. SkinLess Chicken Mid-Joint Wing.png",
    tag: "Mid-Joint Wings"
  },
  {
    id: 17,
    name: "Skinless Whole Chicken",
    subtitle: "1.0 - 1.4 KG • Clean Cavity • Chargha Ready",
    badge: "Direct Whole Bird Supply",
    image: "./assets/products/skinless-chicken-whole.png",
    fallback: "./assets/17. SkinLess Chicken Whole.png",
    tag: "Whole Bird"
  }
];

export default function HomePage({ onQuickView }) {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  // Auto-rotate hero cuts every 4.5 seconds for dynamic presentation (pauses on user interaction)
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setActiveHeroIdx(prev => (prev + 1) % HERO_SHOWCASE_CUTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlayPaused]);

  const handleSelectHeroCut = (idx) => {
    setActiveHeroIdx(idx);
    setIsAutoPlayPaused(true);
    if (window.__heroResumeTimer) clearTimeout(window.__heroResumeTimer);
    window.__heroResumeTimer = setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 10000);
  };

  const currentHeroCut = HERO_SHOWCASE_CUTS[activeHeroIdx];
  const activeProduct = PRODUCTS.find(p => p.id === currentHeroCut.id) || PRODUCTS[0];

  const stats = [
    { label: "Monthly Wholesale Volume", value: "75,000+ KG", icon: TrendingUp },
    { label: "Commercial B2B Clients", value: "280+ Partners", icon: Building2 },
    { label: "Halal & Zabiha Verified", value: "100% Certified", icon: ShieldCheck },
    { label: "Strict Cold Chain", value: "0°C - 4°C Maintained", icon: ThermometerSnowflake },
  ];

  const primarySectors = [
    {
      title: "Hotels & Continental Dining",
      desc: "Uniform boneless breasts, calibrated drumsticks, and tenderloin fillets pre-portioned for international luxury dining standards.",
      icon: Building2,
      badge: "Hospitality Grade"
    },
    {
      title: "Karahi, Biryani & Caterers",
      desc: "Evenly cut skinless curry cuts, drumettes, and thigh pieces optimized for rapid gravy absorption and large banquets.",
      icon: Utensils,
      badge: "High Yield Cuts"
    },
    {
      title: "Fast Food & Burger Franchises",
      desc: "Flawless chicken mid-joints, 3-joint wings, and double breast fillets tailored for crispy frying and burger patties.",
      icon: ShoppingBag,
      badge: "Franchise Standard"
    },
    {
      title: "Retail Meat Shops & Supermarkets",
      desc: "Hygienically pre-packed, vacuum-sealed whole chickens and specialized giblets ready for immediate retail display.",
      icon: Award,
      badge: "Retail Ready"
    }
  ];

  const testimonials = [
    {
      quote: "Sadat Chicken has been our primary poultry partner for over two years. Their consistency in skinless boneless breast cuts and punctual cold-chain delivery has saved our hotel kitchen hundreds of prep hours.",
      name: "Chef Tariq Mehmood",
      designation: "Executive Chef, Grand Palace Hotel & Banquets",
      rating: 5,
      verified: true
    },
    {
      quote: "In the catering business, freshness and strict Halal compliance are non-negotiable. Sadat Chicken provides calibrated cuts with zero bone splinters. Best wholesale pricing in the market.",
      name: "Haji Zubair Al-Ghani",
      designation: "Director of Operations, Al-Ghani Royal Catering",
      rating: 5,
      verified: true
    },
    {
      quote: "Our burger chain relies heavily on uniform mid-joint wings and drumettes. Sadat Chicken's hygiene protocols and direct WhatsApp ordering make re-ordering effortless.",
      name: "Salman Farooq",
      designation: "Procurement Manager, Roasters Fast-Casual Chain",
      rating: 5,
      verified: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-charcoal via-charcoal to-[#22070c] text-white py-16 sm:py-24 lg:py-28">
        {/* Subtle background ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-burgundy/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-meatRed/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headings & CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 self-center lg:self-start bg-burgundy/60 border border-burgundy-400/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>DIRECT FROM WHOLESALE PROCESSING FACILITY</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
                {BUSINESS_CONFIG.heroHeading}
              </h1>

              <p className="text-neutral-300 text-base sm:text-xl font-medium max-w-2xl leading-relaxed">
                "{BUSINESS_CONFIG.heroSubheading}" <br />
                <span className="text-gold font-semibold">{BUSINESS_CONFIG.wholesaleHeadline}</span>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto bg-gradient-to-r from-meatRed to-burgundy hover:from-meatRed-dark hover:to-burgundy-800 text-white font-heading font-extrabold text-base px-8 py-4 rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/wholesale"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-base px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Wholesale Quote</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Zabiha Halal</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThermometerSnowflake className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>0°C - 4°C Fresh Chilled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>Daily Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (Responsive & Interactive) */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div 
                onMouseEnter={() => setIsAutoPlayPaused(true)}
                onMouseLeave={() => setIsAutoPlayPaused(false)}
                className="relative w-full max-w-md lg:max-w-lg bg-gradient-to-tr from-charcoal-card via-charcoal to-[#22070d] border border-burgundy/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden group"
              >
                
                {/* Ambient dynamic radial glow behind chicken */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-burgundy/25 rounded-full blur-3xl pointer-events-none"></div>

                {/* Top Bar inside showcase */}
                <div className="flex items-center justify-between gap-2 z-10 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-black/60 border border-neutral-700 text-emerald-400 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Fresh Chilled 0°C - 4°C
                  </span>

                  <span className="bg-charcoal/90 border border-gold/40 text-gold text-[10px] sm:text-xs font-bold px-3 py-1 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-gold" />
                    <span>Bulk 10 KG - 10,000 KG</span>
                  </span>
                </div>

                {/* Main Chicken Meat Photography Display */}
                <div 
                  onClick={() => onQuickView && onQuickView(activeProduct)}
                  className="relative h-48 sm:h-60 md:h-64 flex items-center justify-center my-2 cursor-pointer z-10 transition-transform duration-500 hover:scale-105"
                  title="Click to view full specifications"
                >
                  <img
                    key={currentHeroCut.id}
                    src={currentHeroCut.image}
                    alt={currentHeroCut.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-2xl animate-float transition-all duration-500"
                    onError={(e) => {
                      if (currentHeroCut.fallback && e.currentTarget.src !== currentHeroCut.fallback) {
                        e.currentTarget.src = currentHeroCut.fallback;
                      } else {
                        e.currentTarget.src = './assets/logo.png';
                      }
                    }}
                  />

                  {/* Hover Quick View Overlay Icon */}
                  <div className="absolute bottom-2 right-2 bg-black/70 hover:bg-burgundy text-white p-2 rounded-xl backdrop-blur-md border border-white/10 opacity-80 hover:opacity-100 transition-all flex items-center gap-1.5 text-[11px] font-semibold">
                    <Eye className="w-3.5 h-3.5 text-gold" />
                    <span className="hidden sm:inline">View Specs</span>
                  </div>
                </div>

                {/* Product Caption Info Card */}
                <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 mt-1 z-10 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                      {currentHeroCut.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-white text-base sm:text-xl truncate">
                    {currentHeroCut.name}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 line-clamp-1">
                    {currentHeroCut.subtitle}
                  </p>

                  {/* Interactive Switcher Buttons - Fully Visible, No Clipping, No Scrollbar */}
                  <div className="mt-3 pt-3 border-t border-white/10 w-full">
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full">
                      {HERO_SHOWCASE_CUTS.map((cut, idx) => {
                        const isActive = activeHeroIdx === idx;
                        return (
                          <button
                            key={cut.id}
                            type="button"
                            onClick={() => handleSelectHeroCut(idx)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all select-none ${
                              isActive
                                ? 'bg-burgundy text-white border border-gold shadow-lg shadow-burgundy/40 scale-105'
                                : 'bg-black/50 hover:bg-black/80 text-neutral-300 hover:text-white border border-white/10'
                            }`}
                            title={`Switch to ${cut.name}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-gold animate-pulse' : 'bg-neutral-500'}`}></span>
                            <span className="whitespace-nowrap">{cut.tag}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Stats Banner */}
      <section className="bg-charcoal-dark border-b border-charcoal-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-burgundy/20 border border-burgundy/30 text-gold">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs text-neutral-400 font-medium">
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Product Categories Section */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy font-heading">
              Catering to Commercial & Retail Needs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-charcoal mt-1 tracking-tight">
              Explore Our Chicken Product Range
            </h2>
            <p className="text-neutral-600 text-sm mt-2">
              All 17 cuts are cleanly skinless, chilled, and certified 100% Zabiha Halal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-burgundy hover:shadow-luxury transition-all text-center flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full bg-cream-soft flex items-center justify-center group-hover:bg-burgundy-50 transition-colors">
                  <Award className="w-7 h-7 text-burgundy group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-charcoal group-hover:text-burgundy transition-colors">
                  {category.name}
                </h3>
                <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1 group-hover:text-burgundy">
                  View Cuts <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Chicken Products Grid */}
      <section className="py-16 sm:py-20 bg-white border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy font-heading">
                Top Commercial Cuts
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-charcoal mt-1 tracking-tight">
                Featured Wholesale Products
              </h2>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-burgundy hover:text-burgundy-800 transition-colors"
            >
              <span>View All 17 Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-black text-white font-heading font-bold px-8 py-3.5 rounded-full shadow transition-all hover:scale-105"
            >
              <span>Browse Full 17-Product Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us & Cold-Chain Excellence */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-cream to-cream-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy font-heading">
                Why Sadat Chicken Wholesale
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-charcoal tracking-tight leading-tight">
                Uncompromising Hygiene, Strict Cold-Chain & Guaranteed Halal Standards
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                Sadat Chicken Wholesale operates with commercial food safety rigor. We don't just supply chicken; we provide a certified, unbroken cold-chain supply pipeline that protects your brand's reputation and culinary standards.
              </p>

              <div className="space-y-4 pt-2">
                {BUSINESS_CONFIG.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-neutral-200/80 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-charcoal">{cert.title}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" /> B2B Partner Guarantee
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
                  Custom Weight, Bulk Cartons & Daily Market Transparency
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  Whether your kitchen requires 50 KG of vacuum-packed boneless breast or 5,000 KG of mixed curry cuts daily, we provide:
                </p>

                <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calibrated gram sizing per piece for menu portion control</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Food-grade insulated master cartons with ice liners</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparent daily wholesale invoices without middleman markups</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp procurement desk with instant dispatch confirmation</span>
                  </li>
                </ul>

                <a
                  href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I am a commercial buyer looking for contract bulk rates.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Connect with Wholesale Manager on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Primary Customer Sectors */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy font-heading">
              Tailored Commercial Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-charcoal mt-1 tracking-tight">
              Bulk Supply Benefits by Industry
            </h2>
            <p className="text-neutral-600 text-sm mt-2">
              Serving the highest standards of the food service and retail ecosystem across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {primarySectors.map((sector, idx) => {
              const IconComp = sector.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-cream/40 rounded-2xl p-6 border border-neutral-200 hover:border-burgundy/40 hover:shadow-luxury transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-burgundy-50 border border-burgundy/20 flex items-center justify-center text-burgundy">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-700 px-2.5 py-0.5 rounded-full">
                        {sector.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-charcoal mb-2">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200/60">
                    <Link 
                      to="/wholesale"
                      className="text-xs font-bold text-burgundy hover:text-burgundy-800 flex items-center gap-1"
                    >
                      <span>Inquire Bulk Rates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Verified Customer Testimonials */}
      <section className="py-16 sm:py-20 bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gold font-heading">
              Proven Commercial Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mt-1 tracking-tight">
              Verified Client Testimonials
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              Feedback from certified executive chefs, catering directors, and restaurant owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-charcoal-card border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-neutral-400">{t.designation}</p>
                  </div>

                  {t.verified && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Strip */}
      <section className="py-16 bg-gradient-to-r from-burgundy via-meatRed to-burgundy-800 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-4">
            Ready to Secure Premium Chicken Supply for Your Business?
          </h2>
          <p className="text-white/90 text-base max-w-2xl mx-auto mb-8">
            Experience the Sadat Chicken Wholesale difference: unbeatable fresh hygiene, accurate machine cuts, and direct WhatsApp ordering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to place an immediate wholesale chicken order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold px-8 py-4 rounded-full shadow-2xl transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp Direct Order: +92 349 2355072</span>
            </a>

            <Link
              to="/wholesale"
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-burgundy font-heading font-extrabold px-8 py-4 rounded-full shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <span>Submit B2B Quotation Form</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
