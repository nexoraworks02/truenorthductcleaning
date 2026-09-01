import { ShieldCheck, BadgeDollarSign, Headphones } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Certified & Insured",
    sub: "Trained, background-checked technicians on every job.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    sub: "Upfront quotes with no hidden fees or surprises.",
  },
  {
    icon: Headphones,
    title: "Friendly Support",
    sub: "Reach our local team 7 days a week by call or WhatsApp.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-canvas">
      <Container className="grid gap-5 pt-10 pb-2 sm:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.title} delay={i * 0.1}>
              <div className="flex items-start gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_12px_34px_-22px_rgba(10,35,64,0.4)] transition-transform hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0b57c2] text-white shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-base font-extrabold uppercase tracking-tight text-ink">
                    {it.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{it.sub}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
