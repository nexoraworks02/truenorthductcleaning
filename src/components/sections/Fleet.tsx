import { BadgeCheck, Phone, ShieldCheck, Truck } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { site } from "@/config/site";

const points = [
  { icon: Truck, title: "Fully-equipped fleet", text: "Professional truck-mounted equipment arrives ready for the job." },
  { icon: ShieldCheck, title: "Certified & insured", text: "Trained, background-checked technicians on every visit." },
  { icon: BadgeCheck, title: "No hidden charges", text: "The price we quote is the price you pay — nothing extra." },
];

export function Fleet() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-lg border-2 border-slate-200 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/van.jpg"
              alt="TrueNorth Duct Cleaning branded service van outside a home"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-[#0b57c2]">
              <span className="h-px w-6 bg-[#eef5fc]0/60" />
              Trusted at your door
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
              A local team that shows up ready to work
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              From the first call to the final vent, {site.name} brings the
              equipment, the certifications, and the honest, flat-rate pricing
              our customers count on across Canada.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-400/30 bg-[#eef5fc] text-teal-400">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink">{p.title}</h3>
                    <p className="text-sm text-ink-soft">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/#quote" size="lg">
                Get a Free Quote
              </Button>
              <Button
                href={`tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`}
                size="lg"
                variant="secondary"
              >
                <Phone className="h-5 w-5" />
                {site.defaultPhone}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
