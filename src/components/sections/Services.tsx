import Link from "next/link";
import * as Icons from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { services } from "@/config/site";

type IconName = keyof typeof Icons;

export function Services() {
  return (
    <Section id="services" className="bg-white">
      <SectionHeading
        eyebrow="Our services"
        title="Complete air quality care"
        subtitle="One trusted team for every part of your home's air system."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = (Icons[s.icon as IconName] ||
            Icons.Wind) as Icons.LucideIcon;
          return (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-lg border border-slate-200 border-t-4 border-t-slate-200 bg-white p-7 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-1 hover:border-t-teal-500 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0b57c2] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold uppercase tracking-tight text-ink">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-soft">
                  {s.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-[#0a3f8f]">
                  {s.benefit}
                  <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
