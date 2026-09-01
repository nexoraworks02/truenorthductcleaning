"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Wind, Activity, Sparkles, AlertCircle } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────
// Benefit cards metadata
// ─────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: Trash2,
    title: "Removes dust buildup",
    description: "Breaks loose heavy dust layers, lint, pet hair, and debris built up inside your ductwork.",
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    image: "/images/benefits/dust-buildup.jpg",
    images: ["/images/benefits/blower-dusty.jpg", "/images/benefits/blower-clean.jpg"],
    gradient: "from-amber-500/25 to-amber-900/10",
  },
  {
    icon: Wind,
    title: "Improves airflow",
    description: "Restores optimal system efficiency, allowing clean air to circulate freely without obstruction.",
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    image: "/images/benefits/airflow.jpg",
    gradient: "from-cyan-500/25 to-cyan-900/10",
  },
  {
    icon: Activity,
    title: "Helps reduce allergens",
    description: "Minimizes airborne contaminants like pollen, pet dander, mold spores, and dust mites.",
    accent: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    image: "/images/benefits/allergens.jpg",
    gradient: "from-teal-500/25 to-teal-900/10",
  },
  {
    icon: Sparkles,
    title: "Leaves ducts visibly cleaner",
    description: "Shows the duct interior after cleaning, with clearer metal surfaces and less loose debris.",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    image: "/images/benefits/clean-ducts.jpg",
    images: ["/images/benefits/duct-dusty-frame.jpg", "/images/benefits/duct-clean-frame.jpg"],
    gradient: "from-emerald-500/25 to-emerald-900/10",
  },
];

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────────────────────────
  // Mouse & Touch Interaction logic
  // ─────────────────────────────────────────────────────────────────
  const updateSliderPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, percentage)));
  }, []);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    updateSliderPosition(clientX);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [isDragging, updateSliderPosition]);

  // ─────────────────────────────────────────────────────────────────
  // Keyboard accessibility handler
  // ─────────────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setPos((prev) => Math.max(0, prev - 5));
        break;
      case "ArrowRight":
        e.preventDefault();
        setPos((prev) => Math.min(100, prev + 5));
        break;
      case "Home":
        e.preventDefault();
        setPos(0);
        break;
      case "End":
        e.preventDefault();
        setPos(100);
        break;
      default:
        break;
    }
  };

  return (
    <Section id="results" className="bg-navy">
      <SectionHeading
        tone="dark"
        eyebrow="Proven Results"
        title="See the Difference Professional Cleaning Makes"
        subtitle="From dust-filled ducts to fresh, clean airflow — our process removes buildup, allergens, lint, and debris from your home’s air system."
        center={true}
      />

      <div className="mx-auto mt-10 max-w-5xl px-2 sm:px-6">
        {/* ── Premium cinematic slider — gradient frame + deep glow ── */}
        <div className="rounded-[26px] bg-gradient-to-br from-[#0b57c2]/40 via-white/10 to-[#94a3b8]/30 p-[1.5px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85),0_0_60px_rgba(234,124,0,0.12)]">
        <div
          ref={containerRef}
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after duct cleaning comparison"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "relative aspect-[4/3] w-full select-none overflow-hidden rounded-[25px] bg-[#020912] sm:aspect-video",
            "transition-all duration-300",
            isFocused ? "ring-2 ring-cyan-400/60" : ""
          )}
          style={{ cursor: "ew-resize" }}
          onMouseDown={(e) => {
            if (e.button !== 0) return; // only left click
            handleStart(e.clientX);
          }}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => updateSliderPosition(e.touches[0].clientX)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* AFTER (clean) image — base layer */}
          <div className="absolute inset-0 h-full w-full">
            <img
              src="/images/after-duct.jpg"
              alt="Clean air vent after professional duct cleaning in Ontario"
              className="absolute inset-0 h-full w-full object-cover animate-fade-in"
              draggable={false}
            />
            {/* Ambient Cyan Overlay */}
            <div className="absolute inset-0 bg-cyan-950/15 mix-blend-color" />
            
            {/* After Tag */}
            <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#020912]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200 shadow-lg backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.15em]">
                <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(249,115,22,0.9)] sm:h-1.5 sm:w-1.5" />
                After
              </span>
            </div>
          </div>

          {/* BEFORE (dirty) image — clipped overlay */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src="/images/before-duct.jpg"
              alt="Dirty air duct with heavy dust buildup before professional cleaning"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            {/* Ambient Dust/Amber Overlay */}
            <div className="absolute inset-0 bg-amber-950/10 mix-blend-color" />

            {/* Before Tag */}
            <div className="absolute left-3 top-3 z-20 sm:left-6 sm:top-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#020912]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-amber-200 shadow-lg backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.15em]">
                <span className="h-1 w-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] sm:h-1.5 sm:w-1.5" />
                Before
              </span>
            </div>
          </div>

          {/* Separator / Drag Line */}
          <div
            className="absolute inset-y-0 z-30 w-[3px] bg-gradient-to-b from-cyan-300 via-white to-cyan-300 shadow-[0_0_16px_rgba(249,115,22,0.9)]"
            style={{ left: `${pos}%` }}
          >
            {/* Drag Handle Knob */}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                "flex h-10 w-10 items-center justify-center rounded-full sm:h-14 sm:w-14",
                "border-2 border-white/80 bg-[#0a1a2e]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md",
                "transition-transform duration-200",
                isDragging ? "scale-110 border-cyan-300" : "hover:scale-105 hover:border-cyan-300"
              )}
            >
              {/* Cyan glow behind handle */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 opacity-50 blur-md" />

              {/* Directional arrows */}
              <div className="relative z-10 flex items-center gap-0.5 text-white">
                <svg className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <svg className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subtle instruction hint — compact pill, fades out on first interaction */}
          {pos === 50 && !isDragging && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm sm:bottom-5 sm:text-xs">
              ← Drag to compare →
            </div>
          )}
        </div>
        </div>

        {/* ── Benefit Cards ──────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]",
                  "backdrop-blur-sm transition-all duration-300",
                  "hover:border-cyan-500/20 hover:bg-white/[0.04]",
                  "hover:shadow-[0_10px_30px_rgba(6,19,33,0.5),0_5px_15px_rgba(249,115,22,0.02)]"
                )}
              >
                {/* Media header — real photo with gradient + icon fallback until images are added */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div className={cn("absolute inset-0 flex items-center justify-center bg-gradient-to-br", benefit.gradient)}>
                    <Icon className={cn("h-10 w-10 opacity-70", benefit.accent.split(" ")[0])} />
                  </div>
                  {benefit.images && (
                    <div className="absolute inset-0 grid grid-cols-2 gap-[2px] bg-[#040D18]">
                      {benefit.images.map((image, index) => (
                        <div key={image} className="relative overflow-hidden">
                          <img
                            src={image}
                            alt={`${benefit.title} ${index === 0 ? "before" : "after"} cleaning result`}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Hides itself gracefully if the image file isn't present yet */}
                  <img
                    src={benefit.image}
                    alt={`${benefit.title} — professional air duct cleaning result`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                      benefit.images ? "hidden" : ""
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#040D18] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={cn("inline-flex items-center justify-center rounded-lg p-2 mb-3 border", benefit.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Disclaimer ─────────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Results may vary depending on duct condition and service requirements.</span>
        </div>
      </div>
    </Section>
  );
}
