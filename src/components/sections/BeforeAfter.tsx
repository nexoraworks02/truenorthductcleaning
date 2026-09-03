"use client";

import { AlertCircle } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { ResultsShowcase } from "./ResultsShowcase";

export function BeforeAfter() {
  return (
    <Section id="results" className="bg-navy" containerClassName="max-w-[1560px] px-4 sm:px-8 2xl:px-10">
      <SectionHeading
        tone="dark"
        eyebrow="The True North Difference"
        title="Cleaner Ducts. Healthier Home."
        subtitle="Professional duct cleaning delivers measurable results you can see and feel."
        center={true}
      />

      <div className="mx-auto mt-10 w-full max-w-none px-0 sm:px-2">
        {/* Featured before/after slider + results timeline. */}
        <ResultsShowcase />

        {/* ── Disclaimer ─────────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Results may vary depending on duct condition and service requirements.</span>
        </div>
      </div>
    </Section>
  );
}

