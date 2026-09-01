import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Circular TrueNorth brand badge — the full round logo, clipped to a clean
 *  circle. `light` is accepted for API compatibility but the badge is a fixed
 *  image, so it renders the same over light or dark backgrounds. */
export function Logo({ className }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo/truenorth-badge.png"
        alt={site.name}
        className="h-14 w-14 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-black/5"
      />
    </span>
  );
}
