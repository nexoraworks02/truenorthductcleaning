import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/config/site";

export function MobileCTABar() {
  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t-2 border-teal-100 bg-white/95 backdrop-blur-md lg:hidden">
      <a
        href={tel}
        className="flex items-center justify-center gap-2 border-r border-slate-200 py-4 font-display font-bold uppercase tracking-wide text-[#0a3f8f]"
      >
        <Phone className="h-5 w-5" />
        Call Now
      </a>
      <Link
        href="/#quote"
        className="flex items-center justify-center gap-2 bg-[#0b57c2] py-4 font-display font-bold uppercase tracking-wide text-white"
      >
        <CalendarCheck className="h-5 w-5" />
        Get Quote
      </Link>
    </div>
  );
}
