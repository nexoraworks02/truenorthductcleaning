import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-14 scroll-mt-24 sm:py-24 lg:py-28", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn("max-w-2xl", center && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4",
            dark ? "text-teal-300" : "text-[#0b57c2]"
          )}
        >
          <span
            className={cn(
              "h-px w-6",
              dark ? "bg-teal-300/70" : "bg-[#0b57c2]/60"
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:mt-5 sm:text-xl",
            dark ? "text-slate-300" : "text-ink-soft"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
