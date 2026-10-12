/**
 * Centralized Business Configuration for Sadat Chicken Wholesale
 * Nontechnical owners and developers can update business details in this single file.
 */

export const BUSINESS_CONFIG = {
  brandName: "Sadat Chicken Wholesale",
  shortName: "Sadat Chicken",
  tagline: "Fresh Chicken. Premium Quality. Wholesale Prices.",
  heroHeading: "Premium Fresh Chicken — Wholesale & Retail",
  heroSubheading: "Quality You Can Trust. Freshness You Can Taste.",
  wholesaleHeadline: "Your Trusted Partner for Fresh, Hygienic & Quality Chicken Supply.",
  
  // Contact & Social Details
  phone: "+92 349 2355072",
  phoneDisplay: "+92 349 2355072",
  whatsappNumber: "923492355072", // Format without symbols for wa.me
  whatsappDisplay: "+92 349 2355072",
  email: "orders@sadatchicken.com",
  
  // Operating Hours
  businessHours: "10:00 AM to 10:00 PM PKT",
  businessDays: "Monday to Sunday (7 Days a Week)",
  
  // Locations & Logistics
  headquarters: "Main Wholesale Meat Market, Karachi, Pakistan",
  serviceAreas: ["Karachi Commercial & Retail Hubs", "Wholesale Intercity Logistics", "Sindh & Nationwide Bulk Supply"],
  currency: "PKR",
  currencySymbol: "Rs.",
  
  // Developer attribution
  developerPortfolio: "https://murtuzadeveloper.github.io/",
  developerName: "Murtuza Khalid",
  
  // Brand Colors reference
  colors: {
    burgundy: "#7A1020",
    meatRed: "#C62828",
    charcoal: "#171717",
    white: "#FFFFFF",
    cream: "#FFF8F2",
    gold: "#D4AF37",
  },
  
  // Quality Standards & Badges
  certifications: [
    { title: "100% Halal Slaughter", desc: "Zabiha certified according to strict Islamic dietary guidelines" },
    { title: "Cold-Chain Logistics", desc: "Chilled from processing to your doorstep at 0°C to 4°C" },
    { title: "Zero Antibiotic Residue", desc: "Farm-fresh, healthy birds raised in controlled hygienic environments" },
    { title: "Direct Wholesale Rates", desc: "No middleman markups for commercial bulk buyers and retailers" }
  ]
};

/**
 * Helper to build the direct WhatsApp Click-to-Chat URL
 * @param {string} message - Encoded or plain text message
 * @returns {string} - wa.me URL
 */
export function getWhatsAppUrl(message = "") {
  const cleanPhone = BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds formatted WhatsApp message for single product inquiry
 */
export function generateProductWhatsAppMessage(product, quantity = 1, unit = "KG", gpsLocationUrl = "") {
  return `Hello ${BUSINESS_CONFIG.brandName},

I would like to inquire about this product:

Product: ${product.name}
Quantity: ${quantity} ${unit}
Price: Contact for Daily Wholesale Market Rate${gpsLocationUrl ? `\n• Location Map Pin: ${gpsLocationUrl}` : ""}

Please confirm availability, wholesale pricing, and delivery details.

Thank you.`;
}

/**
 * Builds formatted WhatsApp message for cart checkout
 * Mandatory fields: customerName, deliveryLocation
 */
export function generateCartWhatsAppMessage({ items, customerName, deliveryLocation, contactPhone, notes, gpsLocationUrl }) {
  let itemList = items.map((item, idx) => {
    return `${idx + 1}. ${item.name}\n   - Quantity: ${item.quantity} ${item.unit || "KG"}`;
  }).join("\n\n");

  const totalVolumeKg = items.reduce((sum, i) => sum + i.quantity, 0);

  return `Hello ${BUSINESS_CONFIG.brandName},

I would like to place an order:

*Customer Details:*
• Name: ${customerName}
• Delivery Location: ${deliveryLocation}${gpsLocationUrl ? `\n• GPS Map Pin: ${gpsLocationUrl}` : ""}
• Phone: ${contactPhone || "Same as WhatsApp"}

*Order Items:*
${itemList}

*Total Volume:* ${totalVolumeKg} KG
*Total Amount:* Please reply with total cost according to the item cuts and quantity

${notes ? `*Special Instructions:* ${notes}\n` : ""}Please confirm availability, total wholesale invoice, and delivery schedule.

Thank you.`;
}

/**
 * Builds formatted WhatsApp message for B2B Wholesale quotation request
 */
export function generateWholesaleQuoteWhatsAppMessage({ businessName, contactPerson, phone, businessType, requirements, estimatedWeeklyVolume }) {
  return `Hello ${BUSINESS_CONFIG.brandName},

*WHOLESALE B2B QUOTATION REQUEST*

• Business Name: ${businessName}
• Contact Person: ${contactPerson}
• Phone: ${phone}
• Business Type: ${businessType}
• Estimated Volume: ${estimatedWeeklyVolume || "Not specified"}

*Specific Requirements / Chicken Cuts Needed:*
${requirements}

Please provide your best commercial wholesale quotation and distribution terms.

Thank you.`;
}
