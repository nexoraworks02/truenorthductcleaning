"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Poster image shown immediately (and as the fallback until a video file exists). */
  poster: string;
  /** Optional video file. When provided it autoplays over the poster; when omitted the poster shows alone. */
  videoSrc?: string;
  /** Screen-reader label describing the footage (the media itself is decorative / aria-hidden). */
  label: string;
  /** Circle diameter as any CSS length, e.g. "clamp(150px,15vw,220px)". */
  size: string;
  /** Positioning / layout classes (absolute top/right, etc.). */
  className?: string;
  /** Entrance stagger. */
  delay?: number;
  /** Continuous float: [amplitudePx, durationSec]. Omit for a perfectly stable circle. */
  float?: [number, number];
  /** Stacking order. */
  z?: number;
};

/**
 * A perfectly-circular video "window" for the hero cluster: poster base,
 * optional autoplaying muted video, thin light border, editorial shadow,
 * elegant entrance, gentle float, and a subtle hover lift. All motion is
 * disabled under prefers-reduced-motion.
 */
export function HeroVideoBubble({
  poster,
  videoSrc,
  label,
  size,
  className = "",
  delay = 0,
  float,
  z = 10,
}: Props) {
  const reduce = useReducedMotion();
  const amp = float?.[0] ?? 6;
  const dur = float?.[1] ?? 7;
  const doFloat = !reduce && !!float;

  return (
    <motion.div
      className={`hero-bubble-enter group absolute overflow-hidden rounded-full border-[3px] border-white/90 shadow-[0_24px_48px_-24px_rgba(2,8,23,0.72)] ${className}`}
      style={{ width: size, height: size, zIndex: z, animationDelay: `${delay}s` }}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.025, zIndex: 50, boxShadow: "0 28px 56px -24px rgba(2,8,23,0.78)" }
      }
    >
      <motion.div
        className="h-full w-full"
        animate={doFloat ? { y: [0, -amp, 0] } : undefined}
        transition={
          doFloat
            ? { duration: dur, repeat: Infinity, ease: "easeInOut", delay }
            : undefined
        }
      >
        {/* Poster base — guarantees an instant, complete-looking circle. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
      </motion.div>
      <span className="sr-only">{label}</span>
    </motion.div>
  );
}
