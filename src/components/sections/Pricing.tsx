"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { provinces, packageIncludes, packageNote } from "@/config/site";

const addons = [
  { label: "Furnace Cleaning", price: 100 },
  { label: "AC Cleaning", price: 100 },
  { label: "Dryer Vent Cleaning", price: 50 },
  { label: "Filter Change", price: 50 },
  { label: "Brush Cleaning", price: 150 },
];

export function Pricing() {
  const [prov, setProv] = useState("ON");
  const selectedProvince =
    provinces.find((p) => p.code === prov) ?? provinces[0];
  const price = selectedProvince.priceFrom;

  return (
    <Section id="pricing" className="bg-canvas">
      <SectionHeading
        eyebrow="Pricing"
        title="Affordable solutions for a healthier home"
        subtitle="One complete flat-rate package, with optional extras you can add only when needed."
      />

      <div className="mx-auto mt-14 grid max-w-4xl items-stretch gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-soft">
            <span className="absolute right-6 top-6 rounded-full bg-[#0b57c2] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Most popular
            </span>
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink">
              Basic Package
            </h3>

            <div className="mt-3">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-soft">
                Your province
              </label>
              <select
                value={prov}
                onChange={(e) => setProv(e.target.value)}
                aria-label="Select your province to see the price"
                className="w-full rounded-full border border-line bg-[#eef5fc] px-4 py-2 text-sm font-medium text-ink focus:border-[#0b57c2] focus:outline-none"
              >
                {provinces.map((p) => (
                  <option
                    key={p.code}
                    value={p.code}
                    style={{ backgroundColor: "#ffffff", color: "#282828" }}
                  >
                    {p.name} - ${p.priceFrom}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-6xl font-extrabold tracking-tight text-[#0b57c2]">
                ${price}
              </span>
              <span className="text-sm font-medium text-ink-soft">
                taxes incl.
              </span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {packageIncludes.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#0b57c2]" />
                  <span className="text-sm text-ink-soft">
                    <span className="font-semibold text-ink">{item.title}</span>
                    {item.desc && <span> — {item.desc}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-[#eef5fc] px-3 py-2 text-xs text-ink-soft">
              <span className="font-semibold text-ink">Note:</span> {packageNote}
            </p>
            <Button href="/#quote" size="lg" className="mt-8 w-full">
              Book Appointment
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-soft">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink">
              Optional Add-ons
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Customize your clean with extra services.
            </p>
            <ul className="mt-6 flex-1 divide-y divide-line">
              {addons.map((a) => (
                <li
                  key={a.label}
                  className="flex items-center justify-between py-4"
                >
                  <span className="font-medium text-ink">{a.label}</span>
                  <span className="font-display text-lg font-extrabold text-[#0a3f8f]">
                    +${a.price}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              href="/#quote"
              size="lg"
              variant="secondary"
              className="mt-8 w-full"
            >
              Add During Booking
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
