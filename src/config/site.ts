// Single source of truth for the TrueNorth Duct Cleaning brand.
// Change the name, phones, pricing, or service areas here and the whole site updates.

export const site = {
  name: "TrueNorth Duct Cleaning",
  // Canonical site URL (apex, no www). Powers sitemap.xml, robots.txt,
  // canonical tags, Open Graph/social links, and JSON-LD structured data.
  url: "https://truenorthductcleaning.com",
  tagline: "Clean air. Better health. A better home.",
  description:
    "TrueNorth Duct Cleaning provides professional air duct cleaning, dryer vent cleaning, furnace cleaning, AC cleaning, and filter replacement for homes and businesses across Ontario, Alberta, Quebec, Manitoba, Saskatchewan, and British Columbia. Expect clear pricing, careful technicians, and a cleaner indoor-air system from the first visit.",
  email: "truenorthductcleaning318@gmail.com",
  whatsapp: "(647) 556-2321",
  // WhatsApp number in full international digits (no +, spaces or symbols) for wa.me links.
  whatsappDigits: "16475562321",
  googleRating: 4.9,
  googleReviewCount: 150,
  // Regional contact numbers (one line for all service areas).
  phones: [
    { region: "All service areas", code: "Call", phone: "(647) 556-2321" },
  ],
  defaultPhone: "(647) 556-2321",

  // --- Social / marketing (leave "" to hide the icon until provided) ---
  facebookUrl:
    "https://www.facebook.com/share/19FxxNZXKX/?mibextid=wwXIfr",
  instagramUrl: "https://www.instagram.com/truenorth2060",

  // --- Meta Pixel (Facebook/Instagram Ads tracking) ---
  // Get it from Meta Events Manager → Data sources → your pixel (a numeric id
  // like 1234567890). Two ways to set it, pick either:
  //   • Vercel env var  NEXT_PUBLIC_META_PIXEL_ID  (preferred), or
  //   • paste the id inside the quotes on the fallback line below.
  // While empty, the Pixel simply doesn't load (no errors). Never use a fake id.
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",

  // --- Google Analytics 4 ---
  // GA4 Measurement ID (analytics.google.com → Admin → Data streams → a
  // "G-XXXXXXXXXX" id). Set it the same two ways:
  //   • Vercel env var  NEXT_PUBLIC_GA_MEASUREMENT_ID  (preferred), or
  //   • paste the id inside the quotes on the fallback line below.
  // While empty, GA simply doesn't load (no errors). Never use a fake id.
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",

  // --- Google Search Console ---
  // Set this to Google's HTML tag verification content value.
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",

  // --- Booking email delivery (Web3Forms - free, no backend) ---
  // SETUP (one time, ~30 seconds):
  //   1. Go to https://web3forms.com
  //   2. In "Create Access Key", enter the client's real inbox.
  //      (every booking is emailed to that inbox - the destination lives on
  //       Web3Forms' side, tied to the key, not in this file).
  //   3. Check that inbox for the Access Key, then paste it between the quotes.
  // Until a valid key is set, the booking form shows an error on submit
  // (it never silently "succeeds").
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    "c620f8c3-0c40-4ac9-b22b-bbd13f0c2ae3",
} as const;

// What every Basic Package includes — single source of truth used by the
// booking form, city pages, and the pricing card so they never drift.
export type PackageItem = { title: string; desc?: string };
export const packageIncludes: PackageItem[] = [
  {
    title: "Complete Air Duct Cleaning",
    desc: "Cleaning of all accessible air ducts throughout the home.",
  },
  { title: "Hot & Cold Air Vent Cleaning" },
  { title: "J-Panel Cleaning" },
  {
    title: "Duct Sanitization Treatment",
    desc: "A natural disinfectant sanitizer is applied to the main duct line. Safe for children, pets, and food-preparation areas.",
  },
  {
    title: "FREE HVAC System Inspection",
    desc: "Complimentary inspection of the furnace, main duct lines, and AC system.",
  },
];
export const packageNote = "No extra tax on cash payments after the work.";

export type Service = {
  slug: string;
  name: string;
  short: string;
  benefit: string;
  icon: string; // lucide icon name
};

export const services: Service[] = [
  {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    short: "Unlimited ducts & vents cleaned, with a natural sanitizer.",
    benefit: "Cleaner air in every room",
    icon: "Wind",
  },
  {
    slug: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    short: "Prevent fire hazards and help your dryer run efficiently.",
    benefit: "Safer, faster drying",
    icon: "Flame",
  },
  {
    slug: "furnace-cleaning",
    name: "Furnace Cleaning",
    short: "Keep your heating system clean, safe and efficient all winter.",
    benefit: "Lower energy bills",
    icon: "Thermometer",
  },
  {
    slug: "ac-cleaning",
    name: "AC Cleaning",
    short: "Improve cooling performance and indoor air quality.",
    benefit: "Cooler, fresher air",
    icon: "Snowflake",
  },
  {
    slug: "filter-change",
    name: "Filter Change",
    short: "Replace clogged filters to ensure fresh, clean air circulation.",
    benefit: "Cleaner system breathing",
    icon: "Filter",
  },
];

export type Province = {
  code: string;
  name: string;
  city: string;
  citySlug: string;
  priceFrom: number;
};

// Provinces served (6). Basic Package price per province drives the
// "Where We Serve" cards AND the province selector in the booking calculator.
// Ontario $149, every other province $199.
export const provinces: Province[] = [
  { code: "ON", name: "Ontario", city: "Toronto", citySlug: "toronto", priceFrom: 149 },
  { code: "AB", name: "Alberta", city: "Calgary", citySlug: "calgary", priceFrom: 199 },
  { code: "QC", name: "Quebec", city: "Montreal", citySlug: "montreal", priceFrom: 199 },
  { code: "BC", name: "British Columbia", city: "Vancouver", citySlug: "vancouver", priceFrom: 199 },
  { code: "MB", name: "Manitoba", city: "Winnipeg", citySlug: "winnipeg", priceFrom: 199 },
  { code: "SK", name: "Saskatchewan", city: "Saskatoon", citySlug: "saskatoon", priceFrom: 199 },
];

export const nav = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#results" },
  { label: "Contact", href: "/#quote" },
];
