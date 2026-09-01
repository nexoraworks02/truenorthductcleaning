import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";

const stats = [
  { to: 12000, suffix: "+", label: "Homes cleaned" },
  { to: 4.9, decimals: 1, label: "Average rating" },
  { to: 6, label: "Provinces served" },
  { to: 100, suffix: "%", label: "Satisfaction guarantee" },
];

export function Stats() {
  return (
    <section className="border-y-4 border-[#0b57c2] bg-navy">
      <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              <CountUp to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </p>
            <span className="mx-auto mt-3 block h-1 w-8 rounded bg-[#eef5fc]0" />
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
              {s.label}
            </p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
