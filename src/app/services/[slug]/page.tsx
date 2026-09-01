import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Wind, 
  Thermometer, 
  Snowflake, 
  Flame, 
  Filter, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { serviceDetails } from "@/config/services";
import { services, site } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button, onDarkSecondary } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFAQ } from "@/components/ServiceFAQ";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ElementType> = {
  "air-duct-cleaning": Wind,
  "furnace-cleaning": Thermometer,
  "ac-cleaning": Snowflake,
  "dryer-vent-cleaning": Flame,
  "filter-change": Filter,
};

export async function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) return {};
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      url: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];

  if (!detail) {
    notFound();
  }

  const IconComponent = iconMap[slug] || Wind;
  const otherServices = services.filter((s) => s.slug !== slug);
  const whatsappUrl = `https://wa.me/${site.whatsappDigits}?text=Hi%20TrueNorth Duct Cleaning,%20I'd%20like%20to%20book%20or%20ask%20about%20the%20${encodeURIComponent(detail.name)}%20service.`;

  // FAQ rich-result schema — mirrors the FAQs visible on this page.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="theme-dark relative min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Background ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#0b57c2]/5 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-[#94a3b8]/5 blur-[120px]" />
      </div>

      <Container className="py-12">
        {/* Back Link */}
        <Reveal>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a3f8f] hover:text-[#94a3b8] transition-colors group mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>
        </Reveal>

        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy shadow-[0_8px_20px_-6px_rgba(234,124,0,0.5)] mb-6">
                <IconComponent className="h-6 w-6" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                {detail.headline}
              </h1>
              <p className="text-lg md:text-xl text-[#c7d2e0] leading-relaxed mb-8">
                {detail.intro}
              </p>
              
              {/* Trust markers */}
              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck className="h-5 w-5 text-[#94a3b8] shrink-0" />
                  <span>Licensed & Certified Technicians</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Zap className="h-5 w-5 text-[#94a3b8] shrink-0" />
                  <span>Same-Day Booking Options</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4">
                <Button href="/#quote" variant="primary" size="lg">
                  Book Service Now
                </Button>
                <Button href={`tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`} variant="secondary" size="lg" className={onDarkSecondary}>
                  <Phone className="h-4 w-4" />
                  Call {site.defaultPhone}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Pricing Card & Quick Info */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[#0b57c2]/10 to-[#94a3b8]/10 rounded-full blur-2xl -z-10" />
                <h3 className="font-display text-lg font-semibold text-[#9FB4D4] mb-2 uppercase tracking-wider">
                  Pricing Details
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">
                    {detail.priceValue || "Quote"}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {slug === "air-duct-cleaning" ? "taxes included" : "add-on price"}
                  </span>
                </div>
                <p className="text-slate-300 text-sm md:text-base mb-6 pb-6 border-b border-white/10">
                  {detail.priceNote}. Can be combined with other cleaning services for maximum home efficiency.
                </p>

                <h4 className="font-semibold text-white mb-4">Service Checklist:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Free HVAC inspection during visit</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Before & after photo documentation</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>100% satisfaction guarantee</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>No hidden fees, travel charges or surprises</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* What's Included */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b57c2]">
                  Deep Dive
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                  What&apos;s Included in the Service
                </h2>
                <p className="text-[#c7d2e0] leading-relaxed mb-6">
                  Our professional cleaning process covers all vital components. We utilize industry-leading techniques and state-of-the-art tools to ensure the highest standards of cleanliness.
                </p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                  <h4 className="font-display font-semibold text-white mb-2">
                    Why it matters
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {detail.whyItMatters}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <Reveal delay={0.1}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {detail.whatIsIncluded.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-colors hover:border-[#0b57c2]/20"
                    >
                      <CheckCircle2 className="h-6 w-6 text-[#94a3b8] shrink-0" />
                      <span className="text-slate-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Cleaning Process Step-by-Step */}
      <Section>
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works"
          subtitle="Our systematic, premium approach ensures a thorough clean every time."
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {detail.process.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#94a3b8]/40 relative overflow-hidden group">
                {/* Number indicator */}
                <div className="absolute top-4 right-4 text-4xl font-extrabold text-white/5 group-hover:text-[#94a3b8]/10 transition-colors duration-300 font-display">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy font-bold font-display shadow-md mb-6">
                  {idx + 1}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-white/[0.02] border-t border-white/5">
        <Container>
          <SectionHeading
            eyebrow="FAQs"
            title="Service Questions"
            subtitle="Everything you need to know about our cleaning methods and packages."
          />
          <Reveal delay={0.1}>
            <ServiceFAQ faqs={detail.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* Other Services We Offer */}
      <Section>
        <SectionHeading
          eyebrow="Explore"
          title="Our Other Services"
          subtitle="Keep your entire home's air systems healthy and lint-free with our full suite of cleaning options."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((s, i) => {
            const OtherIcon = iconMap[s.slug] || Wind;
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#94a3b8]/40 hover:shadow-soft"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy shadow-md transition-transform duration-300 group-hover:scale-110">
                    <OtherIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#c7d2e0]">
                    {s.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#9FB4D4] group-hover:text-[#94a3b8] transition-colors">
                    Learn More
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Final Premium CTA */}
      <section className="py-24 relative overflow-hidden border-t border-white/10 bg-[#060C17]">
        {/* Decorative circle glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#94a3b8]/10 blur-[100px] pointer-events-none" />
        <Container className="relative z-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Breathe Cleaner, Fresher Air?
            </h2>
            <p className="text-[#c7d2e0] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Don&apos;t let dust, pollen, and allergens circulate in your living space. Schedule your service with TrueNorth Duct Cleaning today for professional, transparent service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/#quote" variant="primary" size="lg">
                Book Your Cleaning Online
              </Button>
              <Button href={whatsappUrl} variant="secondary" size="lg" className={onDarkSecondary}>
                <MessageCircle className="h-5 w-5 text-emerald-400" />
                Chat on WhatsApp
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              Available across{" "}
              <Link
                href="/service-areas"
                className="font-semibold text-[#0a3f8f] transition-colors hover:text-[#94a3b8]"
              >
                6 Canadian provinces
              </Link>{" "}
              — Ontario, Alberta, Quebec, British Columbia, Manitoba &amp;
              Saskatchewan.
            </p>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
