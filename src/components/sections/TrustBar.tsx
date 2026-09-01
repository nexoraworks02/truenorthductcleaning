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
    <section className="border-b-2 border-teal-100 bg-white">
      <Container className="grid gap-5 py-10 sm:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.title} delay={i * 0.1}>
              <div className="flex items-start gap-4 rounded-lg border-l-4 border-[#0b57c2] bg-slate-50 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0b57c2] text-white shadow-md">
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
