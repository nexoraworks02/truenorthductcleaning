"use client";

import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, Tag } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { site } from "@/config/site";

const trust = [
  { icon: Star, label: `${site.googleRating} Google Rating` },
  { icon: MapPin, label: "6 Provinces" },
  { icon: BadgeCheck, label: "Certified Technicians" },
  { icon: Tag, label: "Transparent Pricing" },
];

// Lightweight "airflow" particles — premium feel, near-zero performance cost.
const particles = Array.from({ length: 14 });

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Soft gradient + airflow backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(234,124,0,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {particles.map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-mint-400/40"
            style={{ top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%` }}
            animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-[#eef5fc] px-4 py-1.5 text-sm font-medium text-[#0a3f8f]"
          >
            🍁 Canada&apos;s trusted air quality experts
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Breathe Cleaner Air in Your Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Certified air duct, furnace &amp; dryer vent cleaning across Canada.
            Transparent pricing, no surprises — just fresh, healthy air.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/#quote" size="lg">
              Get My Free Quote
            </Button>
            <Button href="/#pricing" size="lg" variant="secondary">
              See Pricing
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {trust.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 text-sm font-medium text-ink-soft"
              >
                <t.icon className="h-4 w-4 text-[#0b57c2]" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 shadow-soft">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.35),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="font-display text-6xl font-bold">
                  <CountUp to={99.9} decimals={1} suffix="%" />
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  dust &amp; allergens removed
                </p>
              </div>
              <p className="max-w-xs text-slate-200">
                Indoor air can be up to{" "}
                <span className="font-semibold text-mint-400">5× dirtier</span>{" "}
                than the air outside.
              </p>
            </div>
          </div>

          {/* Floating rating chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-mint-500 text-mint-500" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">
                {site.googleRating}/5
              </p>
              <p className="text-xs text-ink-soft">
                {site.googleReviewCount}+ reviews
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
