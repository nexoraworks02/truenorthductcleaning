import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import { services, site } from "@/config/site";
import { provincePages } from "@/config/service-areas";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#060C17] text-slate-300">
      {/* Premium top edge — brighter gradient hairline + soft ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#94a3b8]/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[#0b57c2]/10 blur-3xl" />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            {site.facebookUrl && (
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-mint-500 hover:text-navy"
              >
                <FacebookIcon />
              </a>
            )}
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-mint-500 hover:text-navy"
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Services
          </h3>
          <span className="mt-3 block h-0.5 w-8 bg-teal-600" />
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Service Areas
          </h3>
          <span className="mt-3 block h-0.5 w-8 bg-teal-600" />
          <ul className="mt-4 space-y-2.5 text-sm">
            {provincePages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/service-areas/${p.slug}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Duct Cleaning {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/service-areas"
                className="text-slate-400 transition-colors hover:text-white"
              >
                All service areas
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Contact
          </h3>
          <span className="mt-3 block h-0.5 w-8 bg-teal-600" />
          <ul className="mt-4 space-y-3 text-sm">
            {site.phones.map((p) => (
              <li key={p.code} className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 text-teal-400" />
                <span>
                  {p.code}: {p.phone}
                </span>
              </li>
            ))}
            <li>
              <a
                href={`https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
                  "Hi TrueNorth Duct Cleaning, I want a free duct cleaning quote."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-teal-400" />
                WhatsApp: {site.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-teal-400" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Certified · Insured · Transparent Pricing</p>
        </Container>
      </div>
    </footer>
  );
}
