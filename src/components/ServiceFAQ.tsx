"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function ServiceFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/5"
            >
              <span className="font-display font-semibold text-white">
                {f.question}
              </span>
              <span className="shrink-0 text-[#0b57c2]">
                {isOpen ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 leading-relaxed text-[#c7d2e0] text-sm md:text-base">
                  {f.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
