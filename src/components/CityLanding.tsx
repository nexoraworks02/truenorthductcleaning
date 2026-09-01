import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CityPage } from "@/config/cities";
import { cityPages, cityPath, provinceSlugOf } from "@/config/cities";
import { site, provinces } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, onDarkSecondary } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFAQ } from "@/components/ServiceFAQ";

const INCLUDED = [
  "All air ducts & vents cleaned",
  "Natural disinfectant sanitizer",
  "Furnace, AC & dryer vent inspection",
  "Before & after photos",
  "No hidden fees — price confirmed upfront",
  "100% satisfaction guarantee",
];

export function CityLanding({ page }: { page: CityPage }) {
  const cityPrice =
    provinces.find((p) => p.code === page.provinceCode)?.priceFrom ?? 99;
  const waUrl = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
    `Hi TrueNorth Duct Cleaning, I want a free duct cleaning quote in ${page.city}.`
  )}`;
  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;
  const provincePath = `/service-areas/${provinceSlugOf(page.provinceName)}`;
  const otherCities = cityPages.filter((c) => c.citySlug !== page.citySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Air Duct Cleaning",
    provider: {
      "@type": "HVACBusiness",
      name: site.name,
      telephone: site.defaultPhone,
      email: site.email,
      url: site.url,
    },
    areaServed: { "@type": "City", name: `${page.city}, ${page.provinceName}` },
    description: page.metaDescription,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="theme-dark relative min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#0b57c2]/5 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-[#94a3b8]/5 blur-[120px]" />
      </div>

      <Container className="py-12">
        <Reveal>
          <Link
            href={provincePath}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0a3f8f] transition-colors hover:text-[#94a3b8]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All {page.provinceName} Service Areas
          </Link>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-cyan-100">
                <MapPin className="h-4 w-4 text-[#94a3b8]" />
                {page.city}, {page.provinceName}
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#c7d2e0]">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get a Free Quote on WhatsApp
                </a>
                <Button href="/#quote" size="lg" variant="secondary" className={onDarkSecondary}>
                  Book Online
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-[#94a3b8]" />
                Or call{" "}
                <a href={tel} className="font-semibold text-[#0a3f8f] hover:text-mint-400">
                  {site.defaultPhone}
                </a>
              </p>
            </Reveal>
          </div>

          {/* Price card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <h2 className="font-display text-lg font-semibold uppercase tracking-wider text-[#9FB4D4]">
                  {page.city} Pricing
                </h2>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    ${cityPrice}
                  </span>
                  <span className="text-sm text-slate-400">
                    Basic Package · taxes included
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Local angles */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16">
        <Container>
          <SectionHeading
            eyebrow="Local know-how"
            title={`Why ${page.city} homes book TrueNorth Duct Cleaning`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {page.localPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy shadow-md">
                    {i === 0 ? (
                      <Sparkles className="h-5 w-5" />
                    ) : i === 1 ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display font-semibold text-white">
                Neighbourhoods we serve in {page.city}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {page.neighbourhoods.join(" · ")} — and everywhere in between.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <Section>
        <SectionHeading
          eyebrow="FAQs"
          title={`${page.city} duct cleaning questions`}
        />
        <Reveal delay={0.1}>
          <ServiceFAQ
            faqs={page.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
          />
        </Reveal>
      </Section>

      {/* CTA + other cities */}
      <section className="border-t border-white/5 bg-white/[0.02] py-16">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Book your {page.city} duct cleaning today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Free quotes, upfront pricing from ${cityPrice}, and a 100%
            satisfaction guarantee.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#quote" size="lg">
              Book Online
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Message Us on WhatsApp
            </a>
          </div>

          <p className="mt-12 text-sm text-slate-500">
            Also serving:{" "}
            {otherCities.map((c, i) => (
              <span key={c.citySlug}>
                <Link
                  href={cityPath(c)}
                  className="text-[#0b57c2] transition-colors hover:text-mint-400"
                >
                  {c.city}
                </Link>
                {i < otherCities.length - 1 ? " · " : ""}
              </span>
            ))}{" "}
            ·{" "}
            <Link
              href={provincePath}
              className="text-[#0b57c2] transition-colors hover:text-mint-400"
            >
              All of {page.provinceName}
            </Link>{" "}
            ·{" "}
            <Link
              href="/services/air-duct-cleaning"
              className="inline-flex items-center gap-1 text-[#0b57c2] transition-colors hover:text-mint-400"
            >
              About our duct cleaning service
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
