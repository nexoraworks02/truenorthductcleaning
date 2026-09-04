"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { HeroVideoBubble } from "./HeroVideoBubble";
import { site, services } from "@/config/site";

// --- Hero media ------------------------------------------------------------
// Background = the supplied duct-cleaning clip. The three circular "process"
// windows have dedicated slots; drop the files below and flip CIRCLE_VIDEOS_READY
// to true. Until then each circle shows a real duct-cleaning poster frame, so
// the composition looks complete with no broken/blank media.
const HERO_BG_VIDEO = "/videos/hero.mp4";

// Set to true once /videos/hero-inspection.mp4, hero-brush.mp4 and
// hero-extraction.mp4 exist. (Kept false so no 404s appear meanwhile.)
const CIRCLE_VIDEOS_READY = false;

const circles = {
  inspection: {
    poster: "/images/hero/hero-inspection.jpg",
    video: "/videos/hero-inspection.mp4",
    label: "Technician inspecting a home HVAC vent register with a flashlight",
  },
  brush: {
    poster: "/images/hero/hero-brush.jpg",
    video: "/videos/hero-brush.mp4",
    label: "Rotary brush deep-cleaning the inside of an air duct",
  },
  extraction: {
    poster: "/images/hero/hero-extraction.jpg",
    video: "/videos/hero-extraction.mp4",
    label: "Blue commercial vacuum extracting dust and debris from a floor vent",
  },
} as const;

const src = (v: string) => (CIRCLE_VIDEOS_READY ? v : undefined);

export function AirJourney() {
  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;
  const reduce = useReducedMotion();

  // Gentle scroll-out: content drifts up, background scales a touch as the
  // hero leaves. Disabled under reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.14]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate overflow-hidden bg-navy text-white"
      style={{ minHeight: "max(640px, 100svh)" }}
    >
      {/* --- Full-bleed background video + cinematic treatment --- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <motion.video
          className="absolute inset-0 h-full w-full scale-105 bg-navy object-cover blur-[2px]"
          style={{ scale: bgScale }}
          src={HERO_BG_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Light wash for overall legibility. */}
        <div className="absolute inset-0 bg-navy/30" />
        {/* Stronger ink on the LEFT behind the text, footage more visible right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-navy/5" />
        {/* Subtle vignette. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_58%,rgba(6,18,36,0.5)_100%)]" />
      </div>

      {/* Restrained dotted decoration near the collage (desktop only). */}
      <div
        aria-hidden="true"
        className="hero-dots pointer-events-none absolute right-[6%] top-[16%] hidden h-40 w-40 text-white/40 opacity-[0.14] lg:block"
      />

      <Container className="grid min-h-[inherit] items-center gap-5 pb-24 pt-24 sm:gap-8 sm:pb-14 sm:pt-32 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-4">
        {/* ------------------------------- LEFT: the offer ------------------------------- */}
        <motion.div style={{ y: contentY }} className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-[#6fb0f2]"
          >
            <span className="inline-block h-px w-6 bg-[#6fb0f2]/70 align-middle" />
            Professional Duct Cleaning
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-[2.55rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            Cleaner ducts.
            <br />
            <span className="text-[#6fb0f2]">Calmer homes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 sm:mt-5 sm:text-lg"
          >
            Certified air duct, furnace, AC &amp; dryer vent cleaning across six
            provinces. Transparent pricing, no surprises — just fresh, healthy
            air.
          </motion.p>

          {/* Compact premium service checklist — real services only. */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 grid max-w-md grid-cols-1 gap-x-6 gap-y-2 sm:mt-6 sm:grid-cols-2 sm:gap-y-2.5"
          >
            {services.map((s) => (
              <li key={s.slug} className="flex items-center gap-2.5 text-sm text-white/90">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0b57c2] text-white shadow-sm shadow-[#0b57c2]/30">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {s.name}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 hidden gap-3 lg:flex lg:items-center"
          >
            <Button href="/#quote" size="lg">
              Get Free Quote
            </Button>
            <a
              href={tel}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 font-display text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[#6fb0f2]" />
              Call Now
            </a>
          </motion.div>
        </motion.div>

        {/* ---------------------- RIGHT: 3 overlapping video circles (desktop) ---------------------- */}
        <div className="hero-media-cluster hidden lg:block">
          <HeroVideoBubble
            poster={circles.inspection.poster}
            videoSrc={src(circles.inspection.video)}
            label={circles.inspection.label}
            size="var(--hero-circle-top)"
            className="hero-circle-top"
            z={20}
            delay={0.15}
            float={[3, 8]}
          />
          <HeroVideoBubble
            poster={circles.brush.poster}
            videoSrc={src(circles.brush.video)}
            label={circles.brush.label}
            size="var(--hero-circle-main)"
            className="hero-circle-main"
            z={30}
            delay={0.3}
            float={[4, 9]}
          />
          <HeroVideoBubble
            poster={circles.extraction.poster}
            videoSrc={src(circles.extraction.video)}
            label={circles.extraction.label}
            size="var(--hero-circle-bottom)"
            className="hero-circle-bottom"
            z={20}
            delay={0.45}
            float={[3, 10]}
          />
        </div>

        {/* ---------------------- RIGHT/BELOW: horizontal 3-circle arc (mobile + tablet) ---------------------- */}
        <div className="hero-mobile-media-cluster relative mx-auto w-full max-w-[420px] lg:hidden">
          {/* Left — round brush */}
          <HeroVideoBubble
            poster={circles.brush.poster}
            videoSrc={src(circles.brush.video)}
            label={circles.brush.label}
            size="var(--hero-mobile-side)"
            className="hero-mobile-circle-left"
            z={20}
            delay={0.22}
            float={[2, 9]}
          />
          {/* Centre — vent register (largest, raised) */}
          <HeroVideoBubble
            poster={circles.inspection.poster}
            videoSrc={src(circles.inspection.video)}
            label={circles.inspection.label}
            size="var(--hero-mobile-main)"
            className="hero-mobile-circle-main"
            z={30}
            delay={0.1}
            float={[3, 8]}
          />
          {/* Right — vacuum extraction */}
          <HeroVideoBubble
            poster={circles.extraction.poster}
            videoSrc={src(circles.extraction.video)}
            label={circles.extraction.label}
            size="var(--hero-mobile-side)"
            className="hero-mobile-circle-right"
            z={20}
            delay={0.34}
            float={[2, 10]}
          />
        </div>
      </Container>
    </section>
  );
}

