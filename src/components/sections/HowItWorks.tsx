import { ClipboardList, Sparkles, Wind } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Get Your Quote",
    body: "Use our instant calculator or call us. Transparent pricing in under a minute — no obligation.",
  },
  {
    icon: Sparkles,
    title: "We Clean",
    body: "Certified technicians arrive on time and deep-clean your system in 2–3 hours, leaving no mess behind.",
  },
  {
    icon: Wind,
    title: "Breathe Easy",
    body: "Enjoy fresher air, lower energy bills and a healthier home — guaranteed.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="Simple process"
        title="Cleaner air in 3 easy steps"
      />
      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12}>
            <div className="relative h-full rounded-lg border border-slate-200 bg-white p-8 text-center shadow-[0_14px_40px_-26px_rgba(0,0,0,0.45)]">
              <span className="pointer-events-none absolute right-4 top-2 font-display text-6xl font-extrabold text-slate-100">
                {i + 1}
              </span>
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-[#0b57c2] text-white shadow-md">
                <s.icon className="h-7 w-7" />
              </div>
              <span className="relative mt-4 inline-block font-display text-xs font-bold uppercase tracking-[0.16em] text-[#0b57c2]">
                Step {i + 1}
              </span>
              <h3 className="relative mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="relative mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
