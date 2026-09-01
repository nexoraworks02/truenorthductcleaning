"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "../ui/Section";
import { Container } from "../ui/Container";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Sarah M.",
    city: "Hamilton, ON",
    text: "The difference was immediate — no more dust on the furniture and the house smells fresh. Honest pricing, no surprises. Highly recommend!",
  },
  {
    name: "David K.",
    city: "Calgary, AB",
    text: "Professional from start to finish. They showed me before and after photos and my furnace runs so much quieter now. Worth every penny.",
  },
  {
    name: "Émilie R.",
    city: "Montreal, QC",
    text: "Booked in 60 seconds online and the technician arrived right on time. My allergies have noticeably improved. Bilingual and super friendly.",
  },
  {
    name: "James L.",
    city: "Vancouver, BC",
    text: "We have two dogs so the ducts were rough. TrueNorth Duct Cleaning got them spotless and the price was exactly what they quoted. Will use again.",
  },
  {
    name: "Priya S.",
    city: "Winnipeg, MB",
    text: "Finally a company that doesn't pressure you into upsells. Clean, quick, and the air quality feels noticeably better.",
  },
  {
    name: "Marc T.",
    city: "Saskatoon, SK",
    text: "Transparent, punctual, and thorough. They left zero mess behind. This is how a service business should be run.",
  },
];

// Initials from a display name, e.g. "Sarah M." → "SM"
function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const CARD_W = 340; // px
const GAP = 24; // px

export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cw, setCw] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Measure the viewport width so we can centre the active card.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCw(el.clientWidth));
    ro.observe(el);
    setCw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Auto-advance one card at a time (pauses on hover).
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % reviews.length),
      3500
    );
    return () => clearInterval(t);
  }, [paused]);

  const x = cw / 2 - (active * (CARD_W + GAP) + CARD_W / 2);

  return (
    <section
      id="reviews"
      className="scroll-mt-24 overflow-hidden bg-navy py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Loved by homeowners"
          title="Trusted across Canada"
          subtitle={`Rated ${site.googleRating}/5 from ${site.googleReviewCount}+ verified customers.`}
        />
      </Container>

      <div
        ref={wrapRef}
        className="relative mt-14 w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex items-stretch"
          style={{ gap: GAP }}
          animate={{ x }}
          transition={{ type: "spring", stiffness: 55, damping: 18 }}
        >
          {reviews.map((r, i) => {
            const isActive = i === active;
            return (
              <motion.figure
                key={r.name}
                onClick={() => setActive(i)}
                style={{ width: CARD_W }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 130, damping: 18 }}
                className={cn(
                  "flex shrink-0 cursor-pointer flex-col rounded-lg border-2 p-7 backdrop-blur",
                  isActive
                    ? "border-teal-400/70 bg-white/[0.08] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]"
                    : "border-white/10 bg-white/[0.03]"
                )}
              >
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-teal-400/60" />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 leading-relaxed text-slate-200">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0b57c2] text-sm font-bold text-white shadow-lg"
                    aria-hidden="true"
                  >
                    {initials(r.name)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{r.name}</p>
                    <p className="text-sm text-slate-400">{r.city}</p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>

        {/* Progress dots */}
        <div className="mt-10 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to review ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === active ? "w-7 bg-teal-400" : "w-2 bg-white/25 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
