"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Button, onDarkSecondary } from "../ui/Button";
import { site, provinces, packageIncludes, packageNote } from "@/config/site";
import { trackMeta } from "../MetaPixel";
import { cn } from "@/lib/utils";

/* ---------------- Offer: one package (price varies by province) + add-ons ---------------- */

type Addon = { id: string; label: string; price: number };
const ADDONS: Addon[] = [
  { id: "furnace", label: "Furnace Cleaning", price: 100 },
  { id: "ac", label: "AC Cleaning", price: 100 },
  { id: "dryer", label: "Dryer Vent Cleaning", price: 50 },
  { id: "filter", label: "Filter Change", price: 50 },
  { id: "brush", label: "Brush Cleaning", price: 150 },
];

type Step = "form" | "done";

/* Smoothly-animated dollar amount (spring) — used for the live total. */
function AnimatedAmount({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 20 });
  const text = useTransform(spring, (v) => `$${Math.round(v)}`);
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return <motion.span className={className}>{text}</motion.span>;
}

function formatDate(d: string) {
  if (!d) return "—";
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// A booking is a 2-hour arrival window. Picking a start time shows the full
// window, e.g. "4:00 PM" → "4:00 PM – 6:00 PM".
function formatTimeWindow(t: string) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const fmt = (hh: number) => {
    const am = hh < 12;
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${am ? "AM" : "PM"}`;
  };
  return `${fmt(h)} – ${fmt((h + 2) % 24)}`;
}

// Selectable arrival windows: 8:00 AM start through 6:00 PM start.
const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
  const value = `${String(8 + i).padStart(2, "0")}:00`;
  return { value, label: formatTimeWindow(value) };
});

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// Fields that get inline validation (province always has a default, so it's
// never "missing"). Order here = order we scroll to the first problem.
type FieldName = "firstName" | "phone" | "email" | "address" | "date" | "time";
type FieldErrors = Partial<Record<FieldName, string>>;
const FIELD_ORDER: FieldName[] = [
  "firstName",
  "phone",
  "email",
  "address",
  "date",
  "time",
];

function validateForm(form: {
  firstName: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  time: string;
}): FieldErrors {
  const e: FieldErrors = {};
  if (!form.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!form.phone.trim()) e.phone = "Please enter your contact number.";
  else if (!isValidPhone(form.phone))
    e.phone = "Enter a valid 10-digit phone number.";
  if (!form.email.trim()) e.email = "Please enter your email address.";
  else if (!isValidEmail(form.email))
    e.email = "Enter a valid email address, e.g. name@example.com.";
  if (!form.address.trim()) e.address = "Please enter your service address.";
  if (!form.date) e.date = "Please choose a preferred date.";
  if (!form.time) e.time = "Please choose a preferred time.";
  return e;
}

export function QuoteCalculator() {
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // true only when the send actually failed (offer WhatsApp fallback then);
  // false for plain validation problems.
  const [deliveryFailed, setDeliveryFailed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const submittingRef = useRef(false);
  const fieldRefs = useRef<
    Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement | null>>
  >({});
  // Honeypot anti-spam: real users never see or fill this hidden field; bots do.
  const honeypot = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
    province: "ON",
    date: "",
    time: "",
    message: "",
  });
  const [selected, setSelected] = useState<string[]>([]);

  // Earliest bookable day = today (YYYY-MM-DD), so past dates can't be picked.
  const minDate = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

  // Basic Package price is set by the customer's province.
  const selectedProvince =
    provinces.find((p) => p.code === form.province) ?? provinces[0];
  const basePrice = selectedProvince.priceFrom;

  const selectedAddons = ADDONS.filter((a) => selected.includes(a.id));
  const total = basePrice + selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const toggleAddon = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  // Update a field and clear its error the moment the user starts fixing it.
  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((fe) =>
      fe[field as FieldName] ? { ...fe, [field]: undefined } : fe
    );
  };

  // Pre-filled WhatsApp booking message (used on the success screen).
  const waMessage = encodeURIComponent(
    [
      "New Booking — TrueNorth Duct Cleaning",
      "",
      `Customer: ${form.firstName}`,
      `Address: ${form.address}`,
      `Province: ${selectedProvince.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Preferred Date: ${formatDate(form.date)}`,
      `Preferred Time: ${formatTimeWindow(form.time)}`,
      "",
      `Package: Basic Package ($${basePrice})`,
      selectedAddons.length ? "Add-ons:" : "Add-ons: None",
      ...selectedAddons.map((a) => `• ${a.label} (+$${a.price})`),
      "",
      `Total: $${total}`,
    ].join("\n")
  );
  const waUrl = `https://wa.me/${site.whatsappDigits}?text=${waMessage}`;
  const tel = `tel:${site.defaultPhone.replace(/[^\d+]/g, "")}`;

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();

    if (submittingRef.current) return;

    // Honeypot tripped → it's a bot. Abort silently: no success, no error.
    if (honeypot.current?.value) return;

    // Validate every field; highlight problems and scroll to the first one.
    const errs = validateForm(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setDeliveryFailed(false);
      setError("Please fix the highlighted fields above, then try again.");
      const first = FIELD_ORDER.find((k) => errs[k]);
      if (first) {
        const el = fieldRefs.current[first];
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError(null);
    setDeliveryFailed(false);

    try {
      if (!site.web3formsAccessKey) {
        throw new Error("missing-web3forms-key");
      }

      // Email the booking to the business via Web3Forms.
      // Success is shown ONLY when Web3Forms confirms delivery.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          // Web3Forms built-in honeypot: must stay empty. If a bot fills it,
          // Web3Forms rejects the submission.
          botcheck: honeypot.current?.value ?? "",
          subject: `New Booking — ${form.firstName} ($${total})`,
          from_name: "TrueNorth Duct Cleaning Website",
          firstName: form.firstName,
          address: form.address,
          province: selectedProvince.name,
          phone: form.phone,
          // "email" is special in Web3Forms: it becomes the reply-to address.
          email: form.email,
          message: form.message || "None",
          preferredDate: formatDate(form.date),
          preferredTime: formatTimeWindow(form.time),
          packageName: `Basic Package ($${basePrice})`,
          addons: selectedAddons.map((a) => a.label).join(", ") || "None",
          total: `$${total}`,
          source: "quote-calculator",
        }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !data.success) throw new Error(data.message || "submit-failed");

      // Only on confirmed delivery: track the lead + show success.
      trackMeta("Lead", { value: total, currency: "CAD" });
      setStep("done");
    } catch {
      setDeliveryFailed(true);
      setError(
        "Sorry — we couldn't send your booking just now. Please try again, or message us on WhatsApp below."
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <Section id="quote" className="bg-canvas">
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 shadow-soft sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(79,155,224,0.16),transparent_55%)]"
        />
        <div className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Book online"
            title="Book Your Duct Cleaning"
            subtitle="Book your duct cleaning in less than one minute. Choose your package, add optional services, and submit your booking request."
          />

          <div className="mt-10">
        {step === "form" && (
          <form onSubmit={submitBooking} noValidate className="space-y-10">
            {/* Step 1 — Customer information */}
            <div>
              <StepLabel n={1} title="Your details" />
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="First name *" error={fieldErrors.firstName}>
                  <input
                    ref={(el) => {
                      fieldRefs.current.firstName = el;
                    }}
                    suppressHydrationWarning
                    aria-invalid={!!fieldErrors.firstName}
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={cn("input", fieldErrors.firstName && "input-error")}
                  />
                </Field>
                <Field label="Contact number *" error={fieldErrors.phone}>
                  <input
                    ref={(el) => {
                      fieldRefs.current.phone = el;
                    }}
                    suppressHydrationWarning
                    type="tel"
                    inputMode="tel"
                    aria-invalid={!!fieldErrors.phone}
                    placeholder="(647) 556-2321"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={cn("input", fieldErrors.phone && "input-error")}
                  />
                </Field>
                <div>
                  <Field label="Email *" error={fieldErrors.email}>
                    <input
                      ref={(el) => {
                        fieldRefs.current.email = el;
                      }}
                      suppressHydrationWarning
                      type="email"
                      inputMode="email"
                      aria-invalid={!!fieldErrors.email}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={cn("input", fieldErrors.email && "input-error")}
                    />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Address *" error={fieldErrors.address}>
                    <input
                      ref={(el) => {
                        fieldRefs.current.address = el;
                      }}
                      suppressHydrationWarning
                      aria-invalid={!!fieldErrors.address}
                      placeholder="123 Main St, Toronto"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      className={cn("input", fieldErrors.address && "input-error")}
                    />
                  </Field>
                </div>
                <div>
                  <Field label="Province * (sets your package price)">
                    <select
                      suppressHydrationWarning
                      value={form.province}
                      onChange={(e) => update("province", e.target.value)}
                      className="input"
                    >
                      {provinces.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name} (${p.priceFrom})
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Preferred date *" error={fieldErrors.date}>
                  <input
                    ref={(el) => {
                      fieldRefs.current.date = el;
                    }}
                    suppressHydrationWarning
                    type="date"
                    min={minDate}
                    aria-invalid={!!fieldErrors.date}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className={cn("input", fieldErrors.date && "input-error")}
                  />
                </Field>
                <Field label="Preferred arrival time *" error={fieldErrors.time}>
                  <select
                    ref={(el) => {
                      fieldRefs.current.time = el;
                    }}
                    suppressHydrationWarning
                    aria-invalid={!!fieldErrors.time}
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className={cn("input", fieldErrors.time && "input-error")}
                  >
                    <option value="">Select a 2-hour window</option>
                    {TIME_SLOTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Each visit takes about 2 hours — we arrive within your
                    chosen window.
                  </p>
                </Field>
                <div className="md:col-span-3">
                  <Field label="Anything we should know? (optional)">
                    <textarea
                      rows={3}
                      suppressHydrationWarning
                      placeholder="e.g. two pets, basement vents, parking notes…"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="input resize-y"
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Step 2 — Package (single, selected by default) */}
            <div>
              <StepLabel n={2} title="Your package" />
              <div className="relative overflow-hidden rounded-lg border-2 border-teal-400/50 bg-gradient-to-b from-[#0d241e] to-navy p-6 shadow-soft">
                <span className="absolute right-5 top-5 rounded-md bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#0a3f8f]">
                  Selected
                </span>
                <div className="flex items-end justify-between gap-4 pr-20">
                  <div>
                    <h4 className="font-display text-xl font-extrabold uppercase tracking-tight text-white">
                      Basic Package
                    </h4>
                    <p className="mt-1 text-sm text-slate-300">
                      Our most complete clean
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl font-extrabold text-white">
                      ${basePrice}
                    </p>
                    <p className="text-xs text-slate-400">
                      {selectedProvince.name} · taxes included
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-teal-300">
                  Your package includes
                </p>
                <ul className="mt-3 space-y-2.5">
                  {packageIncludes.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                      <span className="text-slate-100">
                        <span className="font-semibold text-white">
                          {item.title}
                        </span>
                        {item.desc && (
                          <span className="text-slate-300"> — {item.desc}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
                  <span className="font-semibold text-white">Note:</span>{" "}
                  {packageNote}
                </p>
              </div>
            </div>

            {/* Step 3 — Optional add-ons */}
            <div>
              <StepLabel n={3} title="Optional add-ons" />
              <div className="grid gap-3 md:grid-cols-2">
                {ADDONS.map((a) => {
                  const on = selected.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleAddon(a.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all hover:-translate-y-0.5",
                        on
                          ? "border-teal-400 bg-teal-400/15"
                          : "border-white/12 bg-white/5 hover:border-white/30"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                          on
                            ? "border-teal-400 bg-[#0b57c2] text-white"
                            : "border-white/25 bg-white/5 text-transparent"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="flex-1 font-semibold text-white">{a.label}</span>
                      <span className="font-display font-extrabold text-teal-300">
                        +${a.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 — Live booking summary */}
            <div>
              <StepLabel n={4} title="Booking summary" />
              <div className="rounded-2xl border border-white/10 bg-navy/60 p-6 text-white backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200">
                    Basic Package · {selectedProvince.name}
                  </span>
                  <span className="font-semibold">${basePrice}</span>
                </div>
                <AnimatePresence initial={false}>
                  {selectedAddons.map((a) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between overflow-hidden text-sm"
                    >
                      <span className="pt-2 text-slate-300">{a.label}</span>
                      <span className="pt-2 text-mint-400">+${a.price}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <AnimatedAmount
                    value={total}
                    className="font-display text-2xl font-bold text-mint-400"
                  />
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                "Book My Service"
              )}
            </Button>

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center"
              >
                <p className="flex items-center gap-2 text-sm font-medium text-red-300">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </p>
                {deliveryFailed && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Message on WhatsApp
                  </a>
                )}
              </div>
            )}

            {/* Honeypot anti-spam field — invisible to humans, off-screen and
                out of the tab order. Bots that auto-fill every input trip it
                and the submission is blocked silently. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="company-website">Company website</label>
              <input
                ref={honeypot}
                id="company-website"
                name="company-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-teal-300" />
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
              Booking Request Received
            </h3>
            <p className="mx-auto mt-2 max-w-md text-slate-300">
              Thank you for booking with TrueNorth Duct Cleaning. Our team will
              contact you shortly to confirm your appointment.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={tel} size="lg" variant="secondary" className={onDarkSecondary}>
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #ffffff;
          outline: none;
          color-scheme: dark;
        }
        .input::placeholder {
          color: #64748b;
        }
        .input:focus {
          border-color: var(--color-cyan);
          box-shadow: 0 0 0 3px rgba(11, 87, 194, 0.25);
        }
        /* Invalid field: red border + soft red ring (kept on focus too). */
        .input-error,
        .input-error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.22);
        }
        /* Force readable option list (fixes white-on-white dropdown on Windows) */
        .input option {
          background-color: #242424;
          color: #ffffff;
        }
      `}</style>
    </Section>
  );
}

function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0b57c2] text-sm font-extrabold text-white">
        {n}
      </span>
      <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-white">{title}</h3>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-200">{label}</label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

