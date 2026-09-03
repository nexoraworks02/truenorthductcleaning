"use client";

import { motion } from "framer-motion";
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
    <Section id="how" className="bg-canvas">
      <div className="rounded-[1.75rem] border border-line bg-white p-8 shadow-[0_30px_70px_-40px_rgba(10,35,64,0.45)] sm:p-12 lg:p-16">
        <SectionHeading eyebrow="Simple process" title="Cleaner air in 3 easy steps" />
        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Dashed connector behind the numbered circles (desktop only). */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 hidden border-t-2 border-dashed border-[#0b57c2]/25 md:block"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative text-center">
              <motion.div
                className="rounded-2xl px-3 py-2"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <motion.div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0b57c2] font-display text-lg font-extrabold text-white shadow-lg shadow-[#0b57c2]/30 ring-4 ring-white"
                  animate={{
                    boxShadow: [
                      "0 12px 28px rgba(11,87,194,0.24)",
                      "0 18px 42px rgba(11,87,194,0.38)",
                      "0 12px 28px rgba(11,87,194,0.24)",
                    ],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                >
                  {i + 1}
                </motion.div>
                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fd] text-[#0b57c2] ring-1 ring-[#0b57c2]/10">
                  <s.icon className="h-6 w-6" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

