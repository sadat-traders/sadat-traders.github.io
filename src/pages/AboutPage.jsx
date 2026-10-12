import React from 'react';
import { 
  ShieldCheck, 
  ThermometerSnowflake, 
  Truck, 
  Award, 
  CheckCircle2, 
  Users, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function AboutPage() {
  const values = [
    {
      title: "100% Zabiha Halal Integrity",
      desc: "Every single bird is hand-slaughtered strictly adhering to classical Islamic Zabiha rites under the supervision of qualified Islamic authorities.",
      icon: ShieldCheck
    },
    {
      title: "Zero Compromise on Cold-Chain",
      desc: "Our processing hub and distribution fleet maintain a continuous chilled temperature of 0°C to 4°C, preventing bacterial growth and locking in natural freshness.",
      icon: ThermometerSnowflake
    },
    {
      title: "Precision Butchery & Skinning",
      desc: "Uniform cuts, automated calibration, and thorough removal of skin, pinfeathers, and unwanted fat layers ensure superior cooking yield.",
      icon: Award
    },
    {
      title: "Direct Wholesale Pricing",
      desc: "By bridging commercial poultry farm networks directly to commercial kitchens, we eliminate multiple middleman markups.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="bg-cream-soft min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy bg-burgundy-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-heading">
              <ShieldCheck className="w-4 h-4" /> About Sadat Chicken Wholesale
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-charcoal tracking-tight leading-tight">
              A Legacy of Freshness, Hygiene & Wholesale Reliability
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              <strong>Sadat Chicken Wholesale</strong> was founded with a singular mission: to supply Pakistan's culinary and retail food industry with the cleanest, safest, and most tender skinless chicken meat available.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Unlike traditional open-air wet markets, we operate an organized, temperature-controlled wholesale supply chain. From the moment our birds are processed to their final delivery at your commercial kitchen or retail counter, our strict hygiene protocols and chilled logistics guarantee peak freshness and high cooking yields.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-luxury max-w-md w-full text-center relative overflow-hidden">
              <div className="w-24 h-24 mx-auto rounded-full bg-cream border-2 border-burgundy p-2 mb-4 flex items-center justify-center">
                <img 
                  src="./assets/logo.png" 
                  alt="Sadat Chicken Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="font-heading font-extrabold text-xl text-charcoal">
                Sadat Chicken Wholesale
              </h3>
              <p className="text-xs text-burgundy font-semibold uppercase tracking-wider mt-1">
                Certified Halal Meat Distribution
              </p>

              <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <span className="text-neutral-400 block font-medium">Headquarters</span>
                  <span className="font-bold text-neutral-800">{BUSINESS_CONFIG.headquarters}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-medium">Operating Hours</span>
                  <span className="font-bold text-neutral-800">{BUSINESS_CONFIG.businessHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-burgundy uppercase tracking-wider font-heading">
              Our Core Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-charcoal mt-1">
              The Standards Behind Every Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:border-burgundy/40 hover:shadow-luxury transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-charcoal mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hygiene & Processing Promise */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-gold uppercase tracking-wider font-heading">
              Hygiene & Food Safety Protocol
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white">
              Inspected, Sanitized & Ready for Immediate Cooking
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Every poultry cut supplied by Sadat Chicken Wholesale undergoes stringent quality clearance. We utilize purified water rinses, sanitized food-grade processing surfaces, and sealed packaging liners to eliminate contamination risks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero chemical bleach or water weight inflation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Uniform weight distribution per packet</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full traceability back to biosecure poultry farms</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily freshness audits by master meat cutters</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
