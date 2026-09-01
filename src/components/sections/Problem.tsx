import { Wind, Dog, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const problems = [
  {
    icon: Wind,
    title: "Dust & Allergens",
    body: "Your ducts collect the dust, pollen and allergens you breathe every day — then recirculate them through your home.",
  },
  {
    icon: Dog,
    title: "Pet Hair & Debris",
    body: "Hair, dander and debris build up out of sight, reducing air quality and triggering allergies and asthma.",
  },
  {
    icon: TrendingUp,
    title: "Higher Energy Bills",
    body: "Clogged ducts and vents force your system to work harder — quietly driving up your heating and cooling costs.",
  },
];

export function Problem() {
  return (
    <Section id="about" className="bg-canvas">
      <SectionHeading
        eyebrow="Why it matters"
        title="What's hiding in your air ducts?"
        subtitle="Over time, your duct system becomes a reservoir for everything you'd rather not breathe. TrueNorth Duct Cleaning clears it out — for good."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="h-full rounded-lg border border-slate-200 border-b-4 border-b-teal-500 bg-white p-8 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0b57c2] text-white shadow-md">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold uppercase tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
