"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Trash2,
  Wind,
  Activity,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── The four results, in rotation order. Each is a matched before/after
//    pair of the SAME duct so the wipe stays aligned. ──────────────────────
type Item = {
  icon: LucideIcon;
  iconAccent: string;
  title: string;
  desc: string;
  before: string;
  after: string;
};

const ITEMS: Item[] = [
  {
    icon: Trash2,
    iconAccent: "text-amber-400",
    title: "Removes dust buildup",
    desc: "Breaks loose heavy dust layers, lint, pet hair, and debris built up inside your ductwork.",
    before: "/images/benefits/dust-before.jpg",
    after: "/images/benefits/dust-after.jpg",
  },
  {
    icon: Wind,
    iconAccent: "text-cyan-400",
    title: "Improves airflow",
    desc: "Restores optimal system efficiency, allowing clean air to circulate freely without obstruction.",
    before: "/images/benefits/airflow-before.jpg",
    after: "/images/benefits/airflow-after.jpg",
  },
  {
    icon: Activity,
    iconAccent: "text-orange-400",
    title: "Helps reduce allergens",
    desc: "Minimizes airborne contaminants like pollen, pet dander, mold spores, and dust mites.",
    before: "/images/benefits/allergens-before.jpg",
    after: "/images/benefits/allergens-after.jpg",
  },
  {
    icon: Sparkles,
    iconAccent: "text-emerald-400",
    title: "Leaves ducts visibly cleaner",
    desc: "Shows the duct interior after cleaning, with clearer metal surfaces and less loose debris.",
    before: "/images/benefits/cleaner-before.jpg",
    after: "/images/benefits/cleaner-after.jpg",
  },
];

const INTERVAL = 5500;
const pad = (n: number) => String(n + 1).padStart(2, "0");

export function ResultsShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  // Slider wipe position (percentage revealed of the "before" image).
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause auto-rotation while the browser tab is hidden.
  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const autoplay = !reduce && !paused && !pageHidden && !isDragging;

  // Auto-advance. Depends on `active` so the timer restarts on any manual pick.
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % ITEMS.length);
      setPos(50); // recentre the wipe on the freshly shown pair
    }, INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, active]);

  // Jump to a pair (from previews / dots / arrows) and recentre the wipe.
  const select = useCallback((i: number) => {
    setActive(((i % ITEMS.length) + ITEMS.length) % ITEMS.length);
    setPos(50);
  }, []);

  // ── Slider drag / touch / keyboard interaction ──────────────────────────
  const updateSliderPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    updateSliderPosition(clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updateSliderPosition(e.clientX);
    const onEnd = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [isDragging, updateSliderPosition]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setPos((p) => Math.max(0, p - 5));
        break;
      case "ArrowRight":
        e.preventDefault();
        setPos((p) => Math.min(100, p + 5));
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

  const item = ITEMS[active];
  const FeaturedIcon = item.icon;
  // The other three, in upcoming rotation order.
  const previews = [1, 2, 3].map((o) => {
    const idx = (active + o) % ITEMS.length;
    return { idx, item: ITEMS[idx] };
  });

  const pauseOn = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return (
    <div
      className="mt-10"
      {...pauseOn}
      aria-roledescription="carousel"
      aria-label="Professional duct cleaning results"
    >
      <div className="grid gap-5 lg:grid-cols-[1.9fr_1fr]">
        {/* ── FEATURED before/after slider (active pair) ─────────────── */}
        <div className="rounded-[26px] bg-gradient-to-br from-[#0b57c2]/40 via-white/10 to-[#94a3b8]/30 p-[1.5px] shadow-[0_34px_90px_-34px_rgba(0,0,0,0.85),0_0_46px_rgba(11,87,194,0.16)]">
          <div
            ref={containerRef}
            role="slider"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Before and after: ${item.title}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "relative aspect-[16/11] w-full select-none overflow-hidden rounded-[25px] bg-[#020912] sm:aspect-[16/9]",
              "transition-shadow duration-300",
              isFocused ? "ring-2 ring-cyan-400/60" : ""
            )}
            style={{ cursor: "ew-resize" }}
            onMouseDown={(e) => {
              if (e.button !== 0) return;
              handleStart(e.clientX);
            }}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => updateSliderPosition(e.touches[0].clientX)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* AFTER (clean) — base layer */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`after-${active}`}
                src={item.after}
                alt={`${item.title} — duct interior after professional cleaning`}
                draggable={false}
                className="results-img-fade absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
              {/* After tag */}
              <div className="absolute right-3 top-3 z-20 sm:right-5 sm:top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#020912]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200 shadow-lg backdrop-blur-md sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
                  <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] sm:h-1.5 sm:w-1.5" />
                  After
                </span>
              </div>
            </div>

            {/* BEFORE (dirty) — clipped overlay */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`before-${active}`}
                src={item.before}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="results-img-fade absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
              {/* Before tag */}
              <div className="absolute left-3 top-3 z-20 sm:left-5 sm:top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#020912]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-amber-200 shadow-lg backdrop-blur-md sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
                  <span className="h-1 w-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] sm:h-1.5 sm:w-1.5" />
                  Before
                </span>
              </div>
            </div>

            {/* Bottom gradient for the caption legibility. */}
            <div className="pointer-events-none absolute inset-0 z-[25] bg-gradient-to-t from-[#020912]/92 via-[#020912]/25 to-transparent" />

            {/* Caption — active item, bottom-left. Non-interactive so the
                slider still drags underneath it. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[26] p-6 sm:p-7">
              <div key={active} className="results-fade-up max-w-lg">
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm",
                    item.iconAccent
                  )}
                >
                  <FeaturedIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-3.5 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Separator / drag line */}
            <div
              className="absolute inset-y-0 z-30 w-[3px] bg-gradient-to-b from-cyan-300 via-white to-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
              style={{ left: `${pos}%` }}
            >
              <div
                className={cn(
                  "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12",
                  "border-2 border-white/80 bg-[#0a1a2e]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md",
                  "transition-transform duration-200",
                  isDragging
                    ? "scale-110 border-cyan-300"
                    : "hover:scale-105 hover:border-cyan-300"
                )}
              >
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 opacity-50 blur-md" />
                <div className="relative z-10 flex items-center gap-0.5 text-white">
                  <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={3} />
                  <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* Drag hint — bottom-right, fades once interacted. */}
            {pos > 44 && pos < 56 && !isDragging && (
              <div className="pointer-events-none absolute bottom-4 right-4 z-30 whitespace-nowrap rounded-full bg-black/55 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                ← Drag to compare →
              </div>
            )}
          </div>
        </div>

        {/* ── PREVIEWS (desktop / tablet) — timeline of the upcoming three ── */}
        <div className="relative hidden lg:flex lg:flex-col lg:justify-between lg:pl-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-9 left-[15px] top-9 w-px bg-gradient-to-b from-white/5 via-white/25 to-white/5"
          />
          {previews.map(({ idx, item: p }, row) => {
            const PIcon = p.icon;
            return (
              <div key={p.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-11 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy font-display text-xs font-bold text-white/85"
                >
                  {pad(row + 1)}
                </span>
                <button
                  type="button"
                  onClick={() => select(idx)}
                  aria-label={`Show: ${p.title}`}
                  className="group relative flex min-h-[132px] w-full items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 pr-14 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4f9be0]/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f9be0]"
                >
                  <div className="relative h-[92px] w-[112px] shrink-0 overflow-hidden rounded-2xl bg-[#020912]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.after}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-sm font-bold leading-tight text-white">
                      {p.title}
                    </h4>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-snug text-slate-400">
                      {p.desc}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "absolute right-3 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10",
                      p.iconAccent
                    )}
                  >
                    <PIcon className="h-5 w-5" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CONTROLS: prev · dots · next ─────────────────────────────── */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => select(active - 1)}
          aria-label="Previous result"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f9be0]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {ITEMS.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show: ${it.title}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f9be0]",
                i === active
                  ? "w-6 bg-[#0b57c2]"
                  : "w-2 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => select(active + 1)}
          aria-label="Next result"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f9be0]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* ── MOBILE previews: horizontal snap carousel (all four) ─────── */}
      <div className="hero-noscrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 lg:hidden">
        {ITEMS.map((p, i) => {
          const PIcon = p.icon;
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show: ${p.title}`}
              aria-current={i === active}
              className={cn(
                "flex w-[230px] shrink-0 snap-start items-center gap-3 rounded-[20px] border p-3 text-left transition-colors",
                i === active
                  ? "border-[#0b57c2] bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              <div className="relative h-[60px] w-[74px] shrink-0 overflow-hidden rounded-2xl bg-[#020912]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.after}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide",
                    p.iconAccent
                  )}
                >
                  <PIcon className="h-3 w-3" />
                  {pad(i)}
                </span>
                <h4 className="mt-0.5 font-display text-xs font-bold leading-tight text-white">
                  {p.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

