"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;

  // Solid white bar when scrolled OR when the mobile menu is open;
  // otherwise transparent so the hero shows through with light text.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-line bg-white/95 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="relative z-10 flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" aria-label={site.name}>
          <Logo light={!solid} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-colors",
                solid
                  ? "text-ink hover:text-[#0b57c2]"
                  : "text-white/90 hover:text-white"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
                  solid ? "bg-[#0b57c2]" : "bg-white"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={tel}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap text-base font-bold transition-colors",
              solid ? "text-ink hover:text-[#0b57c2]" : "text-white hover:text-white/80"
            )}
          >
            <Phone className={cn("h-5 w-5", solid ? "text-[#0b57c2]" : "text-[#6fb0f2]")} />
            {site.defaultPhone}
          </a>
          <Link
            href="/#quote"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#0b57c2] px-6 py-3 font-display text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0a3f8f]"
          >
            Book Now
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        <button
          className={cn("p-2 lg:hidden", solid ? "text-ink" : "text-white")}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white/98 shadow-[0_22px_55px_-30px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-ink hover:bg-[#eef5fc] hover:text-[#0a3f8f]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={tel}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-bold text-ink"
            >
              <Phone className="h-4 w-4" />
              {site.defaultPhone}
            </a>
            <div onClick={() => setOpen(false)}>
              <Link
                href="/#quote"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b57c2] px-6 py-4 font-display font-extrabold text-white"
              >
                Book Now
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
