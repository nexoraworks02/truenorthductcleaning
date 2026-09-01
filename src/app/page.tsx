import { AirJourney } from "@/components/three/AirJourney";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Fleet } from "@/components/sections/Fleet";
import { QuoteCalculator } from "@/components/sections/QuoteCalculator";
import { Reviews } from "@/components/sections/Reviews";
import { Areas } from "@/components/sections/Areas";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/config/faqs";
import { FinalCTA } from "@/components/sections/FinalCTA";

// FAQ rich-result schema — mirrors the FAQ section visible on this page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AirJourney />
      <TrustBar />
      <Stats />
      <Problem />
      <Services />
      <BeforeAfter />
      <HowItWorks />
      <Fleet />
      <QuoteCalculator />
      <Reviews />
      <Areas />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
