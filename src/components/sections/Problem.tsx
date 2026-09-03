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
      <div className="rounded-[1.75rem] border border-line bg-white p-8 shadow-[0_30px_70px_-40px_rgba(10,35,64,0.45)] sm:p-12 lg:p-16">
        <SectionHeading
          eyebrow="Why it matters"
          title="What's hiding in your air ducts?"
          subtitle="Over time, your duct system becomes a reservoir for everything you'd rather not breathe. TrueNorth Duct Cleaning clears it out — for good."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5fd] text-[#0b57c2] ring-1 ring-[#0b57c2]/10">
                <p.icon className="h-7 w-7" strokeWidth={1.9} />
              </div>
              <h3 className="mt-6 font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
