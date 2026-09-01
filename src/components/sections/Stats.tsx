import { Home, Star, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";

const stats = [
  { icon: Home, to: 12000, suffix: "+", label: "Homes cleaned" },
  { icon: Star, to: 4.9, decimals: 1, label: "Average rating" },
  { icon: MapPin, to: 6, label: "Provinces served" },
  { icon: ShieldCheck, to: 100, suffix: "%", label: "Satisfaction guarantee" },
];

export function Stats() {
  return (
    <section className="bg-canvas">
      <Container className="py-6">
        {/* Dark navy stat panel — icon, big number, uppercase label per column. */}
        <div className="rounded-3xl bg-gradient-to-b from-[#12365f] to-[#0a2340] p-8 shadow-[0_30px_70px_-34px_rgba(10,35,64,0.65)] sm:p-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 0.1} className="text-center">
                  <Icon
                    className="mx-auto h-8 w-8 text-[#4f9be0]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    <CountUp to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
                    {s.label}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
