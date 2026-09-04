import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { provinces } from "@/config/site";
import { provinceSlugOf } from "@/config/cities";

export function Areas() {
  return (
    <Section id="areas" className="bg-white">
      <SectionHeading
        eyebrow="Where we serve"
        title="Proudly serving 6 provinces"
        subtitle="Find TrueNorth Duct Cleaning in your province. Local certified technicians, coast to coast."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((p, i) => (
          <Reveal key={p.code} delay={(i % 3) * 0.08}>
            <Link
              href={`/service-areas/${provinceSlugOf(p.name)}`}
              className="group flex items-center justify-between rounded-lg border border-slate-200 border-l-4 border-l-teal-500 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-l-teal-600 hover:bg-white hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#0b57c2] text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                    {p.name}
                  </p>
                  <p className="text-sm font-semibold text-[#0a3f8f]">
                    View cities
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-teal-500 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/service-areas" size="lg" variant="secondary">
          View all service areas
        </Button>
      </div>
    </Section>
  );
}
