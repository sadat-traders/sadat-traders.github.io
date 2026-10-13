import React, { useState } from 'react';
import { 
  Building2, 
  Utensils, 
  Truck, 
  ShieldCheck, 
  MessageCircle, 
  Send, 
  FileCheck, 
  Layers, 
  ThermometerSnowflake, 
  Scale, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { BUSINESS_CONFIG, generateWholesaleQuoteWhatsAppMessage, getWhatsAppUrl } from '../config/businessConfig';
import confetti from 'canvas-confetti';
import WhatsAppIcon from '../components/common/WhatsAppIcon';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    businessType: 'Restaurant / Hotel',
    estimatedWeeklyVolume: '100 KG - 500 KG',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.businessName || !formData.contactPerson || !formData.phone) {
      alert("Please fill in Business Name, Contact Person, and Phone.");
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const message = generateWholesaleQuoteWhatsAppMessage(formData);
    window.open(getWhatsAppUrl(message), '_blank');
    setSubmitted(true);
  };

  const b2bAdvantages = [
    {
      title: "Contract Volume Pricing",
      desc: "Guaranteed tier discounts for restaurants, hotels, and food factories with steady weekly consumption.",
      icon: Scale
    },
    {
      title: "Custom Machine & Hand Trimming",
      desc: "Order specific skinless calibrations, tenderloin separation, or customized bone-in pieces.",
      icon: Layers
    },
    {
      title: "Unbroken Cold-Chain Logistics",
      desc: "Delivered chilled at 0°C to 4°C in temperature-monitored refrigerated vehicles with ice-packed liners.",
      icon: ThermometerSnowflake
    },
    {
      title: "Daily Scheduled Deliveries",
      desc: "Early morning dispatches to meet kitchen prep deadlines before peak dining hours.",
      icon: Truck
    }
  ];

  return (
    <div className="bg-cream-soft min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy bg-burgundy-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3 font-heading">
            <Building2 className="w-4 h-4" /> B2B Commercial Food Supply
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-charcoal tracking-tight">
            Wholesale & Bulk Chicken Supply
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 leading-relaxed">
            Supplying premium skinless chicken cuts, boneless breasts, and bulk poultry to leading hotel chains, catering houses, supermarkets, and culinary brands across Pakistan.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {b2bAdvantages.map((adv, idx) => {
            const IconComp = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:border-burgundy/40 hover:shadow-luxury transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-charcoal mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Form & Direct Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quotation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-luxury">
            <div className="mb-6">
              <span className="text-xs font-bold text-burgundy uppercase tracking-wider font-heading">
                Instant Quotation Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-charcoal mt-1">
                Request a Custom Wholesale Quote
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Fill in your commercial requirements below to generate an official WhatsApp quote inquiry.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your quotation parameters have been routed to WhatsApp. Our wholesale representative will confirm rates immediately.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Business Name / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palace Hotel"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Contact Person Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chef Kashif Khan"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0349 2355072"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Business Sector
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                  >
                    <option value="Restaurant / Hotel">Restaurant / Hotel</option>
                    <option value="Catering & Banquets">Catering & Banquets</option>
                    <option value="Meat Shop / Retailer">Meat Shop / Retailer</option>
                    <option value="Supermarket / Grocery Chain">Supermarket / Grocery Chain</option>
                    <option value="Food Distributor">Food Distributor / Exporter</option>
                    <option value="Individual Bulk Buyer">Individual Bulk Buyer (50+ KG)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Estimated Weekly Volume
                </label>
                <select
                  value={formData.estimatedWeeklyVolume}
                  onChange={(e) => setFormData({ ...formData, estimatedWeeklyVolume: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                >
                  <option value="50 KG - 100 KG">50 KG - 100 KG / week</option>
                  <option value="100 KG - 500 KG">100 KG - 500 KG / week</option>
                  <option value="500 KG - 2,000 KG">500 KG - 2,000 KG / week</option>
                  <option value="2,000 KG+ (Institutional)">2,000 KG+ (Institutional / Daily Crate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Required Chicken Cuts & Custom Specifications
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Need 200 KG boneless breast, 100 KG mid-joint wings, delivered Tuesdays and Fridays at 8:00 AM."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.01]"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Submit Wholesale Request on WhatsApp</span>
              </button>

              <p className="text-[11px] text-neutral-400 text-center">
                Your inquiry routes directly to Sadat Chicken Wholesale Management (+92 349 2355072).
              </p>
            </form>
          </div>

          {/* Right Column: Wholesale Specifications & Fast Line */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-charcoal text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2 font-heading">
                Direct Corporate Hotline
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-3">
                Need Immediate Supply for Tomorrow?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                Our procurement managers are active from 10:00 AM to 10:00 PM PKT to coordinate urgent banquets, wedding bulk orders, and commercial restaurant deliveries.
              </p>

              <div className="space-y-3 mb-6 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Karachi city same-day/next-morning deliveries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Intercity reefer logistics for Sindh & nationwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Formal GST invoices available upon request</span>
                </div>
              </div>

              <a
                href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I need urgent bulk chicken supply for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow text-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Wholesale Desk (+92 349 2355072)</span>
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
              <h4 className="font-heading font-bold text-base text-charcoal mb-4">
                Packaging & Delivery Formats
              </h4>
              <ul className="space-y-3 text-xs text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-burgundy mt-1.5 shrink-0"></div>
                  <span><strong>Poly Liner Crates:</strong> 15 KG to 25 KG fresh chilled sanitized food-grade plastic containers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-burgundy mt-1.5 shrink-0"></div>
                  <span><strong>Vacuum Pouches:</strong> 2 KG and 5 KG vacuum-sealed portions for extended restaurant freshness.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-burgundy mt-1.5 shrink-0"></div>
                  <span><strong>Export Cartons:</strong> 10 KG & 20 KG corrugated master cartons with moisture barrier liners.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
