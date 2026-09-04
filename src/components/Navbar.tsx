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

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;

  // Solid white bar when scrolled OR when the mobile menu is open;
  // otherwise transparent so the hero shows through with light text.
  const solid = scrolled || open;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-line bg-white/95 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="relative z-10 flex h-20 max-w-7xl items-center justify-between lg:h-24">
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
    </header>

      {/* Mobile drawer — half-width, full-height slide-in from the right */}
      {/* Dimmed backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-1/2 min-w-[264px] max-w-[380px] flex-col bg-white shadow-[-24px_0_60px_-30px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header: logo + close */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-ink transition-colors hover:bg-[#eef5fc]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-bold text-ink transition-colors hover:bg-[#eef5fc] hover:text-[#0a3f8f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer actions (extra bottom padding clears the mobile CTA bar) */}
        <div className="border-t border-line px-4 pt-5 pb-24 lg:pb-5">
          <a
            href={tel}
            className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-ink"
          >
            <Phone className="h-4 w-4 text-[#0b57c2]" />
            {site.defaultPhone}
          </a>
          <Link
            href="/#quote"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b57c2] px-6 py-3.5 font-display font-extrabold text-white transition-colors hover:bg-[#0a3f8f]"
          >
            Book Now
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </aside>
    </>
  );
}

