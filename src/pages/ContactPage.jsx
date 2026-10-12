import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  Truck
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/businessConfig';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Wholesale Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please enter Name, Phone, and Message.");
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const text = `Hello Sadat Chicken Wholesale,\n\n*CONTACT FORM INQUIRY*\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email || 'N/A'}\n• Subject: ${formData.subject}\n\n*Message:* ${formData.message}`;
    window.open(getWhatsAppUrl(text), '_blank');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "What is your minimum order quantity (MOQ) for wholesale delivery?",
      a: "Our standard minimum wholesale order is typically 10 KG per cut. For mixed orders or restaurant contracts, we accommodate tailored batches. Retail customers can also order standard packs."
    },
    {
      q: "How do you maintain freshness during transit?",
      a: "All poultry cuts are chilled at 0°C to 4°C immediately after processing. Deliveries are made in sanitized, insulated crates with ice liners or refrigerated transport to preserve the cold chain."
    },
    {
      q: "How does payment and pricing confirmation work?",
      a: "Because poultry wholesale rates can adjust slightly according to daily market benchmarks, final exact amounts are confirmed on WhatsApp upon order dispatch. We accept bank transfer, cash on delivery (COD for verified accounts), and corporate terms for regular partners."
    },
    {
      q: "Can we request custom cutting (e.g., specific gram weight or biryani size)?",
      a: "Yes! We specialize in custom calibrations for commercial kitchens—including specific breast fillet trimming, 8-piece vs 16-piece curry cuts, and lollipop preparations."
    }
  ];

  return (
    <div className="bg-cream-soft min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy bg-burgundy-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3 font-heading">
            <MessageCircle className="w-4 h-4" /> Customer & Corporate Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-charcoal tracking-tight">
            Contact Sadat Chicken Wholesale
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 leading-relaxed">
            Have questions regarding wholesale rates, custom cutting specifications, or delivery routes? Reach our commercial desk directly via WhatsApp or phone.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-7 h-7 fill-emerald-600 text-emerald-600" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-1">
              WhatsApp Order Desk
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Instant inquiries, quotes & live order confirmation
            </p>
            <a
              href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I am contacting you from the website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-extrabold text-sm sm:text-base"
            >
              {BUSINESS_CONFIG.whatsappDisplay}
            </a>
            <span className="text-[11px] text-emerald-600 mt-1 font-medium">Click to chat instantly</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-burgundy-50 text-burgundy flex items-center justify-center mb-4">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-1">
              Direct Phone Call
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Voice line for urgent logistics & kitchen dispatch
            </p>
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="text-burgundy hover:text-meatRed font-extrabold text-sm sm:text-base"
            >
              {BUSINESS_CONFIG.phoneDisplay}
            </a>
            <span className="text-[11px] text-neutral-400 mt-1">Available 7 days a week</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-1">
              Operating Hours
            </h3>
            <p className="text-xs text-neutral-500 mb-2">
              Dispatch & customer support timing
            </p>
            <span className="text-charcoal font-extrabold text-sm sm:text-base">
              {BUSINESS_CONFIG.businessHours}
            </span>
            <span className="text-[11px] text-amber-700 font-medium mt-1">
              {BUSINESS_CONFIG.businessDays}
            </span>
          </div>

        </div>

        {/* Main Section: Form & Logistics Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-luxury">
            <h2 className="text-2xl font-black font-heading text-charcoal mb-2">
              Send an Inquiry Message
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6">
              Our response is routed via WhatsApp for fast, direct communication.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Message sent! You will be redirected to WhatsApp to complete your conversation with our team.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
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
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Subject / Inquiring About
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy"
                >
                  <option value="Wholesale Inquiry">Wholesale Inquiry (50+ KG)</option>
                  <option value="Restaurant Supply Contract">Restaurant / Hotel Supply Contract</option>
                  <option value="Custom Cut Request">Custom Cut Specifications</option>
                  <option value="Retail Order">Retail / Home Delivery Order</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what chicken cuts you are looking for, quantities, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-burgundy hover:bg-burgundy-800 text-white font-heading font-extrabold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp (+92 349 2355072)</span>
              </button>
            </form>
          </div>

          {/* Right: Distribution Hubs & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
              <h3 className="font-heading font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-meatRed" />
                <span>Distribution Center & Hub</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-600">
                <p>
                  <strong>Headquarters:</strong><br/>
                  {BUSINESS_CONFIG.headquarters}
                </p>
                <p>
                  <strong>Logistics & Cold-Chain Routes:</strong><br/>
                  Serving all commercial culinary districts across Karachi, Hyderabad, and major distribution corridors with dedicated refrigerated vehicles.
                </p>
                <p>
                  <strong>Order Cut-Off Time:</strong><br/>
                  For next-morning dawn deliveries, kindly place bulk orders before 9:00 PM PKT.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Chilled delivery vans operating 7 days a week</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-charcoal to-charcoal-card text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl">
              <h4 className="font-heading font-bold text-base text-gold mb-2">
                Need Commercial Terms?
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                We partner with high-volume procurement teams offering bi-weekly reconciliation and dedicated account managers.
              </p>
              <a
                href={getWhatsAppUrl("Hello Sadat Chicken Wholesale, I would like to discuss corporate procurement terms.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Corporate Sales</span>
              </a>
            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-burgundy uppercase tracking-wider font-heading">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-charcoal mt-1">
              Wholesale Ordering Details
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-sm"
              >
                <h4 className="font-heading font-bold text-sm sm:text-base text-charcoal mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
