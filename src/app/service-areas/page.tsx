import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin, MessageCircle, Wind } from "lucide-react";
import { provincePages } from "@/config/service-areas";
import { cityPages } from "@/config/cities";
import { site, services, provinces } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Service Areas — 6 Canadian Provinces",
  description:
    "TrueNorth Duct Cleaning provides professional air duct, dryer vent, and furnace cleaning across 6 Canadian provinces: Ontario, Alberta, Quebec, British Columbia, Manitoba, and Saskatchewan.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: `Service Areas — 6 Canadian Provinces | ${site.name}`,
    description:
      "Professional duct cleaning across Ontario, Alberta, Quebec, British Columbia, Manitoba, and Saskatchewan.",
    url: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  const waUrl = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
    "Hi TrueNorth Duct Cleaning, I want a free duct cleaning quote."
  )}`;

  return (
    <div className="theme-dark relative min-h-screen pt-24">
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#0b57c2]/5 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-[#94a3b8]/5 blur-[120px]" />
      </div>

      <Container className="py-12 text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-cyan-100">
            🍁 Coast to coast, Canada
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Serving 6 Canadian Provinces
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#c7d2e0]">
            {site.name} provides professional air duct cleaning, dryer vent
            cleaning, and furnace cleaning for homes across Ontario, Alberta,
            Quebec, British Columbia, Manitoba, and Saskatchewan — with
            transparent province-based pricing and certified technicians.
          </p>
        </Reveal>
      </Container>

      {/* Province cards */}
      <Section className="!py-10">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {provincePages.map((prov, i) => {
            const price =
              provinces.find((p) => p.code === prov.code)?.priceFrom ?? 99;
            const cityCount = cityPages.filter(
              (c) => c.provinceCode === prov.code
            ).length;
            return (
              <Reveal key={prov.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/service-areas/${prov.slug}`}
                  className="group flex h-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0b57c2]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-ink">
                        {prov.name}
                      </p>
                      <p className="text-sm text-ink-soft">
                        from ${price} ·{" "}
                        {cityCount > 1
                          ? `${cityCount} city pages`
                          : "view details"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-teal-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Services available everywhere */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Every service, every province"
            subtitle="The full TrueNorth Duct Cleaning service list is available in all six provinces — for both residential and commercial duct systems."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-400/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy shadow-md">
                    <Wind className="h-5 w-5" />
                  </div>
                  <span className="flex-1 font-display font-semibold text-ink">
                    {s.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-teal-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b57c2] to-[#94a3b8] text-navy shadow-md">
                  <Wind className="h-5 w-5" />
                </div>
                <span className="flex-1 font-display font-semibold text-ink">
                  Residential &amp; Commercial
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Section>
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Not sure if we cover your area?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Message us — if you&apos;re in one of our six provinces, we can
            almost certainly help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#quote" size="lg">
              Get a Free Quote
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
        </Container>
      </Section>
    </div>
  );
}
