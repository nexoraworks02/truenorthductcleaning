import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** TrueNorth brand lockup: the maple-leaf + wave mark beside the wordmark.
 *  `light` renders the wordmark white for use over the dark hero navbar. */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo/truenorth-icon.png"
        alt={site.name}
        className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-black uppercase tracking-[0.02em] sm:text-xl",
            light ? "text-white" : "text-[#0b57c2]"
          )}
        >
          TrueNorth
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] sm:text-[11px]",
            light ? "text-white/75" : "text-mint-400"
          )}
        >
          Duct Cleaning
        </span>
      </span>
    </span>
  );
}
