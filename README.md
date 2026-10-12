# Sadat Chicken Wholesale — Professional E-Commerce & B2B Wholesale Portal

> **Fresh Chicken. Premium Quality. Wholesale Prices.**  
> *"Your Trusted Partner for Fresh, Hygienic & Quality Chicken Supply across Pakistan."*

A modern, responsive, production-ready React web application engineered specifically for **Sadat Chicken Wholesale**. Built with a component-based architecture, luxury brand aesthetics, automated WhatsApp checkout with customer verification, and a live visitor traffic analytics engine.

---

## 🌟 Key Features

1. **Brand Aesthetic & Palette**:
   - Deep Burgundy (`#7A1020`), Premium Red (`#C62828`), Dark Charcoal (`#171717`), Pure White (`#FFFFFF`), Warm Cream (`#FFF8F2`), and Gold Accent (`#D4AF37`).
   - Clean studio photography showcasing all 17 distinct skinless cuts.
2. **Complete 17-Product Skinless Catalog**:
   - `Skinless Chicken Wing Tip`
   - `Skinless Chicken Mid-Joint Wing`
   - `Skinless Chicken Drumette`
   - `Skinless Chicken Neck`
   - `Skinless Chicken Whole Leg`
   - `Skinless Chicken Breast Boneless`
   - `Skinless Chicken 3-Joint Wing`
   - `Skinless Chicken Forequarter (Breast & Wing)`
   - `Skinless Chicken Leg Quarter With Back Bone`
   - `Skinless Chicken Thigh`
   - `Skinless Chicken Drumstick`
   - `Skinless Chicken Heart`
   - `Skinless Chicken Liver`
   - `Skinless Chicken Gizzard`
   - `Skinless Chicken Feet`
   - `Skinless Chicken Meat`
   - `Skinless Chicken Whole`
3. **WhatsApp Ordering System (`+92 349 2355072`)**:
   - Direct click-to-chat integration using `https://wa.me/923492355072?text=...`.
   - **Mandatory Customer Verification**: Orders cannot proceed unless **Customer Name** and **Delivery Location** are entered, preventing incomplete dispatches.
   - Dynamic message formatting with line items, quantities, and estimated totals.
4. **Live Visitor Statistics System**:
   - Tracks 4 real-time metrics in the footer:
     1. **Total Unique Visitors**: All-time deduplicated unique visitors (tracked via an anonymous browser UUID in `localStorage`).
     2. **Today's Visitors**: Unique visitors today, auto-reset at midnight.
     3. **Live Active Online**: Currently active visitors calculated within a 5-second presence heartbeat window.
     4. **Catalog Page Views**: Total visits to the wholesale catalog.
   - **Zero-Setup Mode**: Default out-of-the-box tracking with no server or API keys required.
   - **Firebase Mode (Optional)**: Free-tier Google Firebase Realtime Database WebSocket presence sync.
5. **Full B2B Quotation Desk**:
   - Custom bulk requests for hotels, banquet caterers, fast food chains, and supermarkets with volume selection and instant WhatsApp transmission.
6. **Zero-Cost Deployment (GitHub Pages Ready)**:
   - Configured with `HashRouter` and `base: './'` for flawless static hosting without paid servers or 404 rewrite issues.
   - Automated GitHub Actions workflow (`.github/workflows/deploy.yml`).
7. **Developer Attribution**:
   - Portfolio link: [Murtuza Developer](https://murtuzadeveloper.github.io/)

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM (HashRouter for GitHub Pages)
- **Styling**: Tailwind CSS + Vanilla CSS utilities + Glassmorphism
- **Icons**: Lucide React
- **Animations & Effects**: Framer Motion, Canvas Confetti
- **State & Storage**: React Context API + Browser LocalStorage persistence

---

## 📁 Project Structure

```text
Sadat Chicken Website/
├── .github/
│   └── workflows/
│       └── deploy.yml             # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── assets/
│   │   ├── products/              # Clean slugified 17 product cuts
│   │   ├── logo.png               # Brand logo
│   │   └── ...                    # Original source images
│   ├── robots.txt                 # Search engine crawler instructions
│   └── sitemap.xml                # XML sitemap for SEO
├── src/
│   ├── config/
│   │   ├── businessConfig.js      # Central business info, WhatsApp, phone, hours
│   │   └── visitor-counter-config.js # Live visitor tracking settings
│   ├── data/
│   │   └── products.js            # Central product catalog (17 items, prices, specs)
│   ├── context/
│   │   ├── CartContext.jsx        # Cart management, LocalStorage, validation
│   │   └── VisitorContext.jsx     # Live visitor analytics engine
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx         # Sticky header, logo, search, cart badge
│   │   │   ├── Footer.jsx         # Multi-column footer, developer portfolio link
│   │   │   ├── VisitorStatsSection.jsx # 4 live visitor metrics
│   │   │   ├── ProductCard.jsx    # Product cards with KG stepper & WhatsApp
│   │   │   ├── ProductDetailModal.jsx # Detailed cut specifications modal
│   │   │   ├── SearchModal.jsx    # Real-time search by cut or dish
│   │   │   ├── FloatingWhatsApp.jsx # Floating chat widget
│   │   │   └── BackToTop.jsx      # Smooth scroll-to-top button
│   │   └── cart/
│   │       └── CartDrawer.jsx     # Slideout cart, validation & WhatsApp checkout
│   ├── pages/
│   │   ├── HomePage.jsx           # Hero banner, stats, categories, testimonials
│   │   ├── ProductsPage.jsx       # Grid with category filters, search, sorting
│   │   ├── ProductDetailPage.jsx  # Dedicated deep-linkable product view
│   │   ├── WholesalePage.jsx      # B2B quotation form & logistics info
│   │   ├── AboutPage.jsx          # Hygiene standards & 100% Halal pledge
│   │   └── ContactPage.jsx        # Contact form, operational hours, FAQs
│   ├── App.jsx                    # Route mapping & layout wrapper
│   ├── index.css                  # Global styles & Tailwind directives
│   └── main.jsx                   # React root entry point
├── index.html                     # SEO metadata, Open Graph & schema.org
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Brand theme colors & typography
├── vite.config.js                 # Vite build & relative base config
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Installation
Open your terminal in the project directory:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` (or the URL displayed in the terminal).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
The compiled output is located in the `dist/` directory, ready to be hosted on any static web host or GitHub Pages.

---

## 🌐 Deploying to GitHub Pages

### Method A: Automated GitHub Actions (Recommended)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Sadat Chicken Wholesale website"
   ```
2. Link your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/murtuzakhalid7-hash/<repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

---

## ⚙️ Updating Website Details (Non-Technical Guide)

### 1. Update WhatsApp Number or Phone Number
Open `src/config/businessConfig.js`:
```javascript
export const BUSINESS_CONFIG = {
  phone: "+92 349 2355072",
  phoneDisplay: "+92 349 2355072",
  whatsappNumber: "923492355072", // Digits only, country code first
  whatsappDisplay: "+92 349 2355072",
  businessHours: "10:00 AM to 10:00 PM PKT",
  // ...
};
```

### 2. Update Product Catalog & Rates
Open `src/data/products.js`:
Each product has straightforward editable fields:
```javascript
{
  id: 6,
  slug: "skinless-chicken-breast-boneless",
  name: "SkinLess Chicken Breast Boneless",
  category: "prime-cuts",
  price: 950,           // Change numeric rate in PKR (or null if "Contact for Price")
  inStock: true,        // Toggle stock availability
  isFeatured: true,     // Toggle if displayed on the homepage
  minOrderKg: 10,       // Minimum wholesale order volume
  description: "...",   // Product description
  // ...
}
```

### 3. Update Product Images
Place your new image file in `public/assets/products/` and reference its path in `src/data/products.js`:
```javascript
image: "./assets/products/your-new-image.png"
```

### 4. Configuring Live Visitor Counter
Open `src/config/visitor-counter-config.js`:
This configuration supports two operating modes:
1. **`"auto"` / `"firebase"`**: Uses Google Firebase Realtime Database (100% free Spark plan) to provide full real-time WebSocket synchronization across all devices, including live concurrent active visitor presence and disconnect tracking.
2. **`"countapi"`**: Uses the free public CountAPI service (no keys or setup required) to immediately track Total Page Views, Total Unique Visitors, and Today's Unique Visitors.

When Firebase credentials are provided in `visitor-counter-config.js`, the tracker automatically uses Firebase Realtime Database for all 4 metrics. If empty, it smoothly operates in CountAPI mode with zero configuration needed.

---

## 📞 Business Contacts

- **Brand**: Sadat Chicken Wholesale
- **WhatsApp**: [+92 349 2355072](https://wa.me/923492355072)
- **Phone**: +92 349 2355072
- **Operating Hours**: 10:00 AM to 10:00 PM PKT (Monday - Sunday)
- **Location**: Karachi Wholesale Meat Market, Sindh, Pakistan

---

## 👨‍💻 Developer Information

- **Developer**: Murtuza Khalid
- **Portfolio**: [https://murtuzadeveloper.github.io/](https://murtuzadeveloper.github.io/)
