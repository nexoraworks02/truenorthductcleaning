import Link from "next/link";
import * as Icons from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { services } from "@/config/site";

type IconName = keyof typeof Icons;

// The five real services plus a general "Inspection & More" card (6th).
const cards = [
  ...services.map((s) => ({
    name: s.name,
    short: s.short,
    icon: s.icon as IconName,
    href: `/services/${s.slug}`,
  })),
  {
    name: "Inspection & More",
    short: "We inspect, test and optimize your entire air system.",
    icon: "ShieldCheck" as IconName,
    href: "/#quote",
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-canvas">
      <div className="relative overflow-hidden rounded-2xl bg-navy p-8 shadow-soft sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(79,155,224,0.16),transparent_55%)]"
        />
        <div className="relative">
          <SectionHeading
            eyebrow="Complete air quality care"
            title="One trusted team for every part of your home's air system."
            tone="dark"
          />
        </div>
        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = (Icons[c.icon] || Icons.Wind) as Icons.LucideIcon;
            return (
              <Reveal key={c.name} delay={i * 0.07}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#4f9be0]/40 hover:bg-white/[0.07]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b57c2]/20 text-[#4f9be0] ring-1 ring-[#4f9be0]/20">
                    <Icon className="h-6 w-6" strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-extrabold uppercase tracking-tight text-white">
                    {c.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300/90">
                    {c.short}
                  </p>
                  <Icons.ArrowRight className="mt-5 h-5 w-5 text-[#4f9be0] transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
