import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "cta";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Solid royal-blue with a chunky bottom edge — works on light or navy.
  primary:
    "btn-primary bg-[#0b57c2] text-white shadow-none hover:bg-[#0a3f8f] hover:-translate-y-0.5",
  // Strong conversion accent — matches the blue hero treatment.
  cta:
    "btn-primary bg-[#0b57c2] text-white shadow-none hover:bg-[#0a3f8f] hover:-translate-y-0.5",
  // Light-default outline. On navy bands pass an override className (see usages).
  secondary:
    "bg-[#0b57c2]/10 text-[#0a3f8f] border border-[#0b57c2]/15 hover:bg-[#0b57c2] hover:text-white",
  ghost: "text-[#0a3f8f] hover:bg-[#eef5fc]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // `rest` carries only native button attributes (onClick, type, disabled, …);
  // variant/size/className/children are already destructured out above.
  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

// Utility for a secondary button placed on a navy/dark band.
export const onDarkSecondary =
  "!bg-transparent !text-white !border-white/40 hover:!bg-white/10 hover:!border-white";

