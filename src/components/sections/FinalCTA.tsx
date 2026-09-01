import { Phone, MessageCircle } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { site } from "@/config/site";

export function FinalCTA() {
  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;
  const waUrl = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
    "Hi TrueNorth Duct Cleaning, I want a free duct cleaning quote."
  )}`;
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-navy px-8 py-20 text-center shadow-soft sm:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(234,124,0,0.24),transparent_55%)]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
              Ready to breathe cleaner air?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
              Get your free, no-obligation quote today and see why thousands of
              Canadian homeowners trust TrueNorth Duct Cleaning.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/#quote" size="lg">
                Get My Free Quote
              </Button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-display font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#eef5fc]"
              >
                <MessageCircle className="h-5 w-5" />
                Get a Free Quote on WhatsApp
              </a>
              <a
                href={tel}
                className="inline-flex items-center gap-2 font-display text-lg font-semibold text-white hover:text-teal-300"
              >
                <Phone className="h-5 w-5" />
                {site.defaultPhone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
