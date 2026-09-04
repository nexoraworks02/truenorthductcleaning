import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTABar } from "@/components/MobileCTABar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MetaPixel } from "@/components/MetaPixel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImageProtect } from "@/components/ImageProtect";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = site.url;

export const metadata: Metadata = {
  title: {
    default: `Air Duct Cleaning Canada | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "air duct cleaning Canada",
    "duct cleaning near me",
    "dryer vent cleaning",
    "furnace cleaning",
    "HVAC cleaning",
    "TrueNorth Duct Cleaning",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `Air Duct Cleaning Canada | ${site.name}`,
    description: site.description,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `Air Duct Cleaning Canada | ${site.name}`,
    description: site.description,
  },
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  description: site.description,
  url: siteUrl,
  telephone: site.defaultPhone,
  email: site.email,
  priceRange: "$$",
  image: `${siteUrl}/opengraph-image`,
  sameAs: [site.facebookUrl, site.instagramUrl].filter(Boolean),
  areaServed: [
    ...[
      "Ontario",
      "Alberta",
      "Quebec",
      "British Columbia",
      "Manitoba",
      "Saskatchewan",
    ].map((name) => ({ "@type": "State", name })),
    { "@type": "Country", name: "Canada" },
  ],
  makesOffer: [
    "Air Duct Cleaning",
    "Dryer Vent Cleaning",
    "Furnace Cleaning",
    "AC Cleaning",
    "Filter Change",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.googleRating,
    reviewCount: site.googleReviewCount,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink pb-16 lg:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MetaPixel />
        <ImageProtect />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <MobileCTABar />
        <WhatsAppButton />
      </body>
      {/* GA4 loads only once a real Measurement ID is set in site config */}
      {site.gaMeasurementId && <GoogleAnalytics gaId={site.gaMeasurementId} />}
    </html>
  );
}
