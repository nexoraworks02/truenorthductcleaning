# PureFlow — Complete Project Analysis & Developer Guide

> Senior architect's full audit of the PureFlow duct-cleaning website.
> Generated 2026-07-01. Covers every file in `src/`, all config, and all routing.
> **Read this before modifying anything.** Sections flagged ⚠️ are the risk areas.

---

## 1. High-Level Project Overview

**What it is.** A single-page marketing/lead-generation website for **PureFlow**, a Canadian residential air-duct, furnace, dryer-vent and AC cleaning company. It is a Next.js (App Router) front-end with one lightweight API route. Its centerpiece is a scroll-driven 3D "air journey" (Three.js) that X-rays a house, flies into the ductwork, and shows it being scrubbed clean.

**Problem it solves (for the business).** Converts paid-ad and organic traffic into booked cleaning jobs. The entire page is a funnel: build trust → explain the problem → demonstrate the result → capture a lead via an instant price calculator → hand the lead off by email + WhatsApp.

**Target audience.** Canadian homeowners (6 provinces) concerned about indoor air quality, allergies, energy bills, or dryer-fire safety. Secondary audience: the business owner who edits pricing/contact info via a single config file.

**Main business purpose.** Lead capture. Success = a completed quote form (name + phone + email + home details), delivered to the business and tracked as a Meta "Lead" conversion for ad optimization.

**Overall architecture.**
- **Rendering:** Mostly static/server-rendered marketing sections + a few `"use client"` interactive islands. No database, no auth, no user accounts.
- **One page:** `/` composes ~12 section components in a fixed vertical order.
- **One API route:** `POST /api/lead` — currently **unused** (see §10/§23); it only validates + `console.log`s.
- **Lead delivery happens client-side** in `QuoteCalculator` via **Web3Forms** (3rd-party email relay) + a **WhatsApp deep link**, plus a **Meta Pixel** conversion event.
- **Config-driven:** `src/config/site.ts` is the single source of truth for brand, phones, pricing, provinces, services, nav, and integration keys.

**Technology stack.**
| Layer | Tech |
|---|---|
| Framework | Next.js **16.2.9** (App Router, Turbopack dev) |
| Language | TypeScript 5 (strict) |
| UI runtime | React **19.2.4** |
| Styling | Tailwind CSS **v4** (CSS-first `@theme`, no `tailwind.config.js`) |
| Animation (2D) | Framer Motion 12 |
| 3D | Three.js 0.184 + @react-three/fiber 9 + drei 10 + postprocessing |
| Icons | lucide-react |
| Utilities | clsx + tailwind-merge (`cn()`) |
| Forms | react-hook-form (installed, **not used yet**) |
| Lead email | Web3Forms (no backend) |
| Analytics | Meta (Facebook) Pixel |

**Folder structure (top level).**
```
pureflow/
├── AGENTS.md / CLAUDE.md     # AI-agent instructions (Next is "not the one you know")
├── README.md                 # default create-next-app readme (stale)
├── package.json              # deps + scripts
├── next.config.ts            # empty config
├── tsconfig.json             # @/* path alias → src/*
├── postcss.config.mjs        # wires @tailwindcss/postcss
├── eslint.config.mjs         # next core-web-vitals + ts
├── public/                   # default Next SVGs (all unused)
└── src/
    ├── app/                  # App Router: layout, page, globals, api, favicon
    ├── components/           # all UI
    │   ├── sections/         # the page's stacked sections
    │   ├── three/            # the 3D journey
    │   └── ui/               # design-system primitives
    ├── config/site.ts        # SINGLE SOURCE OF TRUTH
    └── lib/utils.ts          # cn() helper
```

---

## 2. Project Structure (every folder, why it exists, how it interacts)

```
src/
├── app/
│   ├── layout.tsx            # Root HTML shell: fonts, metadata, global chrome
│   ├── page.tsx              # The one page — composes all sections
│   ├── globals.css           # Tailwind import + design tokens (@theme)
│   ├── favicon.ico           # Browser tab icon
│   └── api/
│       └── lead/route.ts     # POST /api/lead (validate + log) — UNUSED
├── components/
│   ├── Navbar.tsx            # Fixed top nav (client) — scroll state + mobile menu
│   ├── Footer.tsx            # Site footer (server) — services/areas/contact
│   ├── Logo.tsx              # Inline SVG wordmark
│   ├── MobileCTABar.tsx      # Fixed bottom Call/Quote bar (mobile only)
│   ├── MetaPixel.tsx         # Meta Pixel loader + trackMeta() helper
│   ├── sections/             # ↓ the page body, top to bottom
│   │   ├── Hero.tsx          # 2D fallback hero (when 3D disabled)
│   │   ├── Stats.tsx         # 4 animated stat counters
│   │   ├── Problem.tsx       # 3 "why it matters" cards
│   │   ├── Services.tsx      # 5 service cards (link to /services/*)
│   │   ├── BeforeAfter.tsx   # Draggable dirty/clean comparison slider
│   │   ├── HowItWorks.tsx    # 3-step process
│   │   ├── QuoteCalculator.tsx # ⭐ Lead engine: calc → form → success
│   │   ├── Pricing.tsx       # Province price table + "what's included"
│   │   ├── Reviews.tsx       # 6 testimonials
│   │   ├── Areas.tsx         # 6 province/city cards (link to /areas/*)
│   │   ├── FAQ.tsx           # Accordion
│   │   └── FinalCTA.tsx      # Closing call-to-action band
│   ├── three/
│   │   ├── AirJourney.tsx    # Gate + scroll-progress driver + captions
│   │   └── Scene.tsx         # The actual R3F canvas (house, ducts, brush, dust)
│   └── ui/
│       ├── Button.tsx        # Polymorphic link/button, 3 variants
│       ├── Container.tsx     # Max-width centered wrapper
│       ├── Section.tsx       # <Section> + <SectionHeading> layout primitives
│       ├── Reveal.tsx        # Scroll-in fade/translate wrapper
│       ├── CountUp.tsx       # Animated number counter
│       └── ScrollProgress.tsx# Top reading-progress bar
├── config/site.ts            # Brand, contacts, pricing, provinces, services, nav
└── lib/utils.ts              # cn() class merge helper
```

**How layers interact:**
- `app/layout.tsx` wraps every page with `MetaPixel → ScrollProgress → Navbar → {children} → Footer → MobileCTABar`.
- `app/page.tsx` renders the section stack. The first item, `AirJourney`, decides at runtime whether to show the heavy 3D `Scene` or the lightweight `Hero`.
- Every section pulls copy/data from `config/site.ts` (or local const arrays) and lays out with `ui/` primitives.
- `lib/utils.ts#cn` is used by nearly every component to merge Tailwind classes.

---

## 3. Page Analysis

This is effectively a **single-page application**. There is exactly **one user-facing route**.

### Page: Home `/`
- **File:** `src/app/page.tsx` (+ `layout.tsx` shell).
- **Purpose:** The entire marketing funnel and lead capture.
- **Route:** `/` (App Router, statically rendered with client islands).
- **Components used (in order):** `AirJourney` (→ `Scene` or `Hero`), `Stats`, `Problem`, `Services`, `BeforeAfter`, `HowItWorks`, `QuoteCalculator`, `Pricing`, `Reviews`, `Areas`, `FAQ`, `FinalCTA`. Plus the layout chrome (Navbar, Footer, MobileCTABar, ScrollProgress, MetaPixel).
- **Data flow:** Static. All content is hardcoded in components or read from `config/site.ts`. No fetching, no props drilled from the page.
- **State management:** None at the page level. State is local to interactive islands (see §11).
- **API calls:** None on load. One outbound call at form-submit time → `api.web3forms.com` (3rd party), **not** the local `/api/lead`.
- **Animations:** Framer-Motion reveals on most sections; the Three.js scroll journey; CountUp counters; hover transitions. (Full list §7.)
- **Forms:** The multi-step `QuoteCalculator` (§9).
- **SEO elements:** Title template + description + `metadataBase` from `layout.tsx`. **Missing:** per-section OG image, structured data, sitemap, robots (§15).
- **Performance:** 3D is gated to desktop + motion-enabled and lazy-loaded with `ssr:false` (§16). Fonts use `next/font` with `display:swap`.

> **Routes referenced but NOT implemented (⚠️ dead links → 404):**
> `Services.tsx` & `Footer.tsx` link to `/services/{slug}` (5 links).
> `Areas.tsx` & `Footer.tsx` link to `/areas/{citySlug}` (6 links).
> Those page files do not exist. See §23.

---

## 4. Component Analysis

| Component | Location | Purpose | Key Props | State | Dependencies | Reusable? | Used On | Relationships |
|---|---|---|---|---|---|---|---|---|
| `RootLayout` | app/layout.tsx | HTML shell, fonts, metadata, global chrome | `children` | — | next/font, site, Navbar, Footer, MobileCTABar, ScrollProgress, MetaPixel | No (root) | all | Parents every component |
| `Home` | app/page.tsx | Section composition | — | — | all sections | No | `/` | Orders the funnel |
| `Navbar` | components/Navbar.tsx | Fixed top nav, scroll style, mobile menu | — | `scrolled`, `open` | Link, lucide, Logo, Button, Container, nav, site, cn | No | all | Uses Button/Logo/Container |
| `Footer` | components/Footer.tsx | Footer nav + contact + socials | — | — | Link, lucide, Logo, Container, services/provinces/site | No | all | ⚠️ links to dead routes |
| `Logo` | components/Logo.tsx | SVG wordmark | `className` | — | cn, site | ✅ | Navbar, Footer | Pure presentational |
| `MobileCTABar` | components/MobileCTABar.tsx | Bottom Call/Quote bar (mobile) | — | — | Link, lucide, site | No | all (mobile) | Mirrors Navbar CTAs |
| `MetaPixel` | components/MetaPixel.tsx | Pixel loader; exports `trackMeta()` | — | — | next/script, site | No | all | `trackMeta` called by QuoteCalculator |
| `AirJourney` | three/AirJourney.tsx | Gate desktop 3D vs Hero; scroll progress; captions | — | `enable3D`, `progress` (MotionValue) | next/dynamic, framer-motion, lucide, Button, Hero, Scene | No | `/` | Chooses Scene or Hero |
| `Scene` | three/Scene.tsx | R3F canvas: house, ducts, brush, dust | `progress` | refs/`useFrame` | @react-three/*, three, postprocessing | No | `/` (desktop) | Driven by AirJourney's progress |
| `Hero` | sections/Hero.tsx | 2D fallback hero | — | — | framer-motion, lucide, Button, Container, CountUp, site | No | `/` (mobile/reduced-motion) | Fallback for Scene |
| `Stats` | sections/Stats.tsx | 4 animated stats | — | — | Container, CountUp, Reveal | No | `/` | Uses CountUp |
| `Problem` | sections/Problem.tsx | 3 problem cards | — | — | lucide, Section, Reveal | No | `/` | Uses Section/Reveal |
| `Services` | sections/Services.tsx | 5 service cards | — | — | Link, lucide(*), Section, Reveal, services | No | `/` | ⚠️ dead route links |
| `BeforeAfter` | sections/BeforeAfter.tsx | Draggable comparison slider | — | `pos`, `dragging` ref | framer-motion, lucide, Section | No | `/` | Self-contained |
| `HowItWorks` | sections/HowItWorks.tsx | 3 steps | — | — | lucide, Section, Reveal | No | `/` | Uses Section/Reveal |
| `QuoteCalculator` | sections/QuoteCalculator.tsx | ⭐ Lead engine | — | `step`, form fields, `submitting` | lucide, Section, Button, provinces/site, trackMeta | No | `/` | Calls Web3Forms + trackMeta |
| `Pricing` | sections/Pricing.tsx | Province price table | — | — | lucide, Section, Reveal, Button, provinces | No | `/` | Reads provinces |
| `Reviews` | sections/Reviews.tsx | 6 testimonials | — | — | lucide, Section, Reveal, site | No | `/` | Static data |
| `Areas` | sections/Areas.tsx | 6 area cards | — | — | Link, lucide, Section, Reveal, provinces | No | `/` | ⚠️ dead route links |
| `FAQ` | sections/FAQ.tsx | Accordion | — | `open` | lucide, Section | No | `/` | Self-contained |
| `FinalCTA` | sections/FinalCTA.tsx | Closing CTA band | — | — | lucide, Container, Button, site | No | `/` | Uses Button |
| `Button` | ui/Button.tsx | Polymorphic link/button | `variant`,`size`,`href`,`className`,`children` | — | Link, cn | ✅✅ | everywhere | Core DS primitive |
| `Container` | ui/Container.tsx | Max-width wrapper | `className`,`children` | — | cn | ✅✅ | everywhere | Layout primitive |
| `Section`/`SectionHeading` | ui/Section.tsx | Section padding + heading block | `id`,`title`,`eyebrow`,`subtitle`,… | — | cn, Container, Reveal | ✅✅ | most sections | Wraps Container + Reveal |
| `Reveal` | ui/Reveal.tsx | Scroll-in animation wrapper | `delay`,`className`,`children` | — | framer-motion | ✅✅ | most sections | whileInView |
| `CountUp` | ui/CountUp.tsx | Animated number | `to`,`decimals`,`duration`,`prefix`,`suffix` | `value` | framer-motion useInView | ✅ | Hero, Stats | rAF counter |
| `ScrollProgress` | ui/ScrollProgress.tsx | Top progress bar | — | spring | framer-motion | ✅ | all | useScroll global |

---

## 5. Styling System

**Architecture: Tailwind CSS v4, CSS-first.** There is **no `tailwind.config.js`**. All theming lives in `src/app/globals.css` under `@theme { … }`, exposed as CSS variables and auto-generated utilities.

- **Entry:** `globals.css` does `@import "tailwindcss";` then defines tokens. `postcss.config.mjs` wires `@tailwindcss/postcss`.
- **Global styles:** `html { scroll-behavior: smooth }`, `body` background/color/font, and a branded `::selection`.
- **Theme tokens (the palette):**
  - Teal scale `teal-50…800` (primary = `teal-600 #0f766e`).
  - Mint scale `mint-400/500/600` (accent = `mint-500 #34d399`).
  - Ink `#0f172a` (text), `ink-soft #475569`, `canvas #fafcfc` (page bg), `surface #f1f5f5`, `line #e2e8e8` (borders).
  - Semantic aliases: `--color-background`, `--color-foreground`, `--color-primary`, `--color-accent`.
- **Typography:** Two Google fonts via `next/font` (`layout.tsx`): **Inter** → `--font-inter` → `--font-sans` (body); **Poppins** (500/600/700) → `--font-poppins` → `--font-display` (headings, `font-display` class). Both `display:swap`.
- **Radius & shadow tokens:** `--radius-card: 1rem`, `--shadow-soft` (the signature teal-tinted soft shadow used on cards/CTAs).
- **Responsive:** Tailwind breakpoints (`sm`, `md`, `lg`). Mobile-first. The 3D scene and desktop nav appear at `lg` (≥1024px); `MobileCTABar` shows below `lg`.
- **Custom CSS:** One scoped `<style>` block inside `QuoteCalculator` defines the `.input` form-field style (border, focus ring). Logo & slider use inline SVG with `var(--color-*)`.

**Important style files:** `src/app/globals.css` (the only global stylesheet). Everything else is utility classes inline.

---

## 6. Assets

- **Images / photos:** **None.** There are no raster images, no `/public` photos, no `next/image` usage anywhere. All "visuals" are CSS gradients, inline SVG, or the procedurally-generated 3D scene.
- **Icons:** `lucide-react` (tree-shaken per-import) throughout. Two hand-rolled inline SVG icons (`FacebookIcon`, `InstagramIcon`) in `Footer.tsx`.
- **Fonts:** Inter + Poppins, loaded/optimized by `next/font/google` (self-hosted at build, no network FOUT).
- **Videos:** None (the "video-like" experience is the live Three.js scene).
- **Logos:** `Logo.tsx` — an inline SVG (teal circle + mint airflow waves) + the word "PureFlow". No image file.
- **SVGs in `/public`:** `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — **all default create-next-app leftovers, none referenced.** Safe to delete.
- **3D textures:** Generated at runtime on `<canvas>` (brick, dusty wall, soft particle) in `Scene.tsx` — no texture files.
- **favicon.ico:** `src/app/favicon.ico` (still the default Next icon unless replaced).

---

## 7. Animation System

**Libraries:** Framer Motion (2D/scroll), Three.js + R3F + drei + postprocessing (3D).

**Scroll animations:**
- `ScrollProgress` — top gradient bar, `useScroll` page progress fed through `useSpring`, `scaleX` transform.
- `Reveal` — `whileInView` fade + 24px rise, `once:true`, `-80px` margin. Used by most sections; staggered via `delay={i*0.x}`.
- `CountUp` — starts when `useInView` fires; `requestAnimationFrame` ease-out-expo over `duration`.
- **The Air Journey** (`AirJourney` + `Scene`) — `Journey3D` computes a 0→1 `progress` MotionValue from the section's `getBoundingClientRect` against a `480vh` tall sticky container. `Scene`'s `useFrame` samples a 6-keyframe camera path (smoothstep eased), fades the house to "glass" (x-ray), advances a spinning brush down the duct with a **clip plane** so dust recedes behind it, and animates a 260-point dust "blast". Captions (`c1/c2/c3`) cross-fade via `useTransform` windows on the same progress.

**Hover animations:** Nav underline grow; service/area cards `-translate-y-1` + shadow + icon color swap + arrow nudge; Button lift (`-translate-y-0.5`) + glow; social icons fill on hover.

**Loading animations:** Quote form submit shows a spinning `Loader2`. Scroll hint chevron bounces (`y:[0,6,0]` infinite). Hero airflow particles + BeforeAfter rising-airflow/dust loops.

**Page transitions:** None (single page).

**Animation flow (3D):** scroll → `Journey3D` recomputes `progress` (rAF-throttled) → MotionValue → `Scene useFrame` reads `progress.get()` each frame → camera/materials/brush/particles update. Captions read the same MotionValue.

**Performance considerations:** 3D only mounts on `≥1024px` **and** when `prefers-reduced-motion` is not set; otherwise the static `Hero` renders. `dpr` capped `[1,1.6]`, `antialias:false` (SMAA in post instead), shadows + environment computed at low res / `frames={1}`. Framer reveals use `once:true` to avoid re-running.

---

## 8. Navigation

- **Navbar (`Navbar.tsx`, client):** Fixed, transparent at top → frosted (`bg-canvas/90 backdrop-blur` + border + shadow) after `scrollY > 8` via a `passive` scroll listener. Desktop (`lg`): nav links with animated underline, a `tel:` phone link, and a "Get a Free Quote" Button. Below `lg`: a hamburger toggles a dropdown menu (`open` state), each link closes it on click.
- **Mobile menu:** Conditional dropdown under the bar; full-width Quote button.
- **MobileCTABar:** A second fixed bar at the **bottom** (mobile only) — split Call Now (`tel:`) / Get Quote (`/#quote`). The body adds `pb-16 lg:pb-0` so content isn't hidden behind it.
- **Footer:** Four columns — brand/socials, Services (→ `/services/*`), Service Areas (→ `/areas/*`), Contact (regional phones, WhatsApp, email) + legal line.
- **Internal routing:** All navigation is **in-page hash anchors** (`/#services`, `/#pricing`, `/#quote`, …). `html{scroll-behavior:smooth}` + `Section` adds `scroll-mt-20` so anchored sections clear the fixed navbar. The Footer's `/services/*` and `/areas/*` are the only non-hash links — and they 404 (⚠️).
- **Active states:** Hover only; no "current section" highlighting (no scroll-spy).
- **Nav source:** `nav` array in `config/site.ts`.

---

## 9. Forms

There is **one** form: the **Quote Calculator** (`QuoteCalculator.tsx`), a 3-step wizard driven by a `step` state machine (`calc → lead → done`).

- **Step 1 `calc` (no inputs submitted yet):** province `<select>`, home-size 3-button toggle, bedrooms `range` slider, pets yes/no toggle, "last cleaned" `<select>`. These drive a **live price estimate**: `low = round(province.priceFrom * sizeMult + petAdd + neglectAdd)`, `high = round(low * 1.35)` where `sizeMult` = small 1 / medium 1.25 / large 1.6, `petAdd` = 40, `neglectAdd` = never 30 / 3y 15 / else 0.
- **Step 2 `lead`:** shows the estimate, then collects **name / phone / email** (all `required`, native HTML validation; `type=tel`/`type=email`).
- **Validation:** Native `required` + input types only. No schema, no regex, no `react-hook-form` (it's installed but unused).
- **Submission flow (`submitLead`):**
  1. If `site.web3formsAccessKey` is set → `fetch` POST to `https://api.web3forms.com/submit` with the full lead payload (wrapped in try/catch, **non-blocking**).
  2. `trackMeta("Lead", { value: low, currency: "CAD" })` fires the Pixel conversion.
  3. `setStep("done")`.
- **API endpoint:** **Web3Forms (3rd party)** — *not* the local `/api/lead`. With an empty key (current default) **no email is sent**; the form silently "succeeds".
- **Email integration:** Web3Forms relays the lead to the email tied to the access key. Subject: `New PureFlow Lead — {name} ({province})`.
- **Step 3 `done`:** Thank-you + a **WhatsApp deep link** (`wa.me/{whatsappDigits}?text=…`) pre-filled with the lead's details and estimate.
- **Error handling:** Web3Forms failure is swallowed (user still sees success + WhatsApp). No error UI.
- **Success handling:** Confirmation screen + WhatsApp CTA.
- **Spam protection:** **None** (no honeypot, no captcha, no rate limit). ⚠️ See §17.

---

## 10. Backend / API

- **Endpoint:** `POST /api/lead` (`src/app/api/lead/route.ts`).
- **Request flow:** Parses JSON; requires `name`, `phone`, `email` → 400 if missing. Builds a `lead` object with `createdAt` + `source:"quote-calculator"`.
- **Response flow:** `{ ok: true }` on success; `{ ok:false, error }` + 400 on validation/parse failure.
- **Current behavior:** `console.log("[LEAD]", …)` only. A `TODO(Phase 10)` notes intent to persist to Firestore.
- **⚠️ Status: DEAD CODE.** Nothing in the app calls `/api/lead` — `QuoteCalculator` posts to Web3Forms directly. This route is currently unreachable from the UI.
- **Authentication / authorization:** None (it's a public, unauthenticated endpoint).
- **Data validation:** Presence check only — no type/format/length validation, no sanitization.
- **External services:** None on the server side. (Web3Forms + Meta + WhatsApp are all client-side.)

---

## 11. State Management

No global state library (no Redux/Zustand/Context/React Query). All state is **local component state**:

| Where | State | Tool |
|---|---|---|
| Navbar | `scrolled`, `open` | `useState` + scroll listener |
| AirJourney | `enable3D` (gate), `progress` | `useState`, `useMotionValue` |
| Scene | per-frame refs (no React state) | `useRef` + `useFrame` |
| BeforeAfter | `pos`, `dragging` | `useState` + `useRef` |
| QuoteCalculator | `step`, `province`, `size`, `bedrooms`, `pets`, `lastCleaned`, `lead{}`, `submitting` | `useState` |
| FAQ | `open` (index) | `useState` |
| CountUp | `value` | `useState` + rAF |

- **Local/session storage, cookies:** **None used by app code.** (Meta Pixel sets its own `_fbp`/`_fbc` cookies via the third-party script.)
- **Derived state:** Price estimate is computed inline from inputs on every render — not stored.

---

## 12. Custom Hooks

No standalone hook files. The "hooks" are local helper hooks inside `Scene.tsx`, all memoized procedural-texture/geometry generators:

| Hook | File | Purpose | Params | Returns | Used by |
|---|---|---|---|---|---|
| `useBrickTexture` | Scene.tsx | Canvas brick texture | — | `THREE.CanvasTexture` | HouseShell |
| `useDustWallTexture` | Scene.tsx | Canvas dusty-wall texture | — | `THREE.CanvasTexture` | Tunnel |
| `useSoftParticle` | Scene.tsx | Radial-gradient particle sprite | `color` | `THREE.CanvasTexture` | Experience (dust blast) |

All wrap `useMemo` so textures are built once. The app otherwise uses React/Framer/R3F built-in hooks (`useState`, `useEffect`, `useRef`, `useInView`, `useScroll`, `useSpring`, `useTransform`, `useMotionValue`, `useFrame`, `useThree`).

---

## 13. Utilities

- **`cn(...inputs)`** — `src/lib/utils.ts`. Merges class names: `clsx` (conditional join) → `twMerge` (dedupe conflicting Tailwind classes). Input: `ClassValue[]`; output: `string`. Used by virtually every component. **Critical, do not break.**
- **Scene math helpers** (`Scene.tsx`): `clamp`, `inv` (inverse-lerp 0..1), `lerp` (THREE), `sample` (camera keyframe interpolation), `makePositions` (Float32 buffer builder). Pure functions, local to the 3D module.
- **`trackMeta(event, params)`** (`MetaPixel.tsx`) — safe `fbq` wrapper; no-op if Pixel not loaded. Used by QuoteCalculator.
- **Inline derived helpers:** `tel:` builders (`site.defaultPhone.replace(/[^\d+]/g,"")`) appear in Navbar, MobileCTABar, FinalCTA (minor duplication, §23).

---

## 14. Business Logic (how the site actually works)

1. **Arrival.** Visitor lands on `/`. On desktop with motion enabled, the 3D Air Journey plays as they scroll (house → x-ray → dirty duct → cleaned). On mobile/reduced-motion, the static Hero shows the same value prop.
2. **Trust building.** `Stats` (12,000+ homes, 4.9★, 6 provinces, 100% guarantee) → `Problem` (dust/pets/energy bills) frames the pain.
3. **Service display.** `Services` renders the 5 services from `config.services` (icon resolved dynamically from lucide by name). Cards *link to* `/services/{slug}` (⚠️ not built yet).
4. **Proof.** `BeforeAfter` interactive slider + `Reviews` testimonials + `Pricing` transparent province table.
5. **Lead generation (the core).** `HowItWorks` and multiple CTAs funnel to `#quote`. The **QuoteCalculator**:
   - User answers 5 quick questions → sees an instant `$low–$high` estimate (pricing logic in §9).
   - Enters name/phone/email → on submit, the lead is emailed via Web3Forms (if key set) **and** logged as a Meta "Lead" conversion.
   - Success screen offers an instant **WhatsApp** booking with everything pre-filled.
6. **CTA functions.** Every "Get a Free Quote / Get My Free Quote / Get My Exact Price" button is an anchor to `#quote`. "Call Now" / phone links are `tel:` deep links. WhatsApp is a `wa.me` deep link.
7. **Lead handoff.** The business receives the lead by email (Web3Forms) and/or WhatsApp message; Meta gets the conversion event for ad optimization/retargeting. **There is no CRM, database, or booking calendar** — handoff is manual from there.

**Service-area logic:** 6 provinces in `config.provinces`, each with a `priceFrom` that seeds the calculator and the Pricing table. `Areas` cards link to `/areas/{citySlug}` (⚠️ not built).

---

## 15. SEO

- **Meta tags:** `layout.tsx` sets a title template (`%s | PureFlow`), default title (`PureFlow — Breathe the difference.`), description, and `metadataBase: https://pureflow.ca`.
- **Structured data (JSON-LD):** ❌ None. A `LocalBusiness`/`Service` schema would be high-value here.
- **Open Graph / Twitter cards:** ❌ None defined (no `openGraph`/`twitter` in metadata, no OG image).
- **Sitemap / robots:** ❌ Neither `sitemap.ts` nor `robots.ts` exists.
- **Headings:** Generally one `<h1>` (Hero/AirJourney) + `<h2>` section headings — reasonable hierarchy. (Note: AirJourney captions use `<h2>`; fine.)
- **Performance (Core Web Vitals):** Good foundations — `next/font` swap, no heavy images, lazy 3D. The `480vh` 3D section and many always-running infinite animations are the main LCP/CPU risks on weaker desktops.
- **Accessibility:** `aria-label`s on icon-only buttons/links; `aria-hidden` on decorative SVGs. **Gaps:** the BeforeAfter slider is mouse/touch only (no keyboard/ARIA slider role); color-only state in some toggles; no `prefers-reduced-motion` fallback for the *2D* infinite animations (only the 3D is gated). See §23.
- **Canonical / lang:** `<html lang="en">` set. No canonical tags; bilingual (FR) content is implied by reviews but the site is English-only.

---

## 16. Performance

- **Lazy loading / code splitting:** `Scene` is `next/dynamic` with `ssr:false` — the entire Three.js bundle (three + r3f + drei + postprocessing, the heaviest dependency by far) is only fetched on desktop with motion enabled. Excellent.
- **Image optimization:** N/A (no images) — but also means no `next/image` benefits where future photos are added.
- **Bundle size:** Marketing JS is small (Framer + lucide). The 3D chunk is large but isolated/gated. `lucide-react` is imported per-icon except `Services.tsx` does `import * as Icons` (⚠️ can pull the full icon set into that chunk — see §23).
- **Caching:** Default Next static caching; page is static apart from client islands. Environment/contact shadows in 3D use `frames={1}` to compute once.
- **Code splitting:** Route-level + the dynamic 3D import.
- **Bottlenecks / risks:**
  - `480vh` sticky 3D with a per-frame `useFrame` doing material traversal + buffer updates — fine on a real GPU, heavy on integrated graphics.
  - Several **infinite** Framer loops (Hero particles ×14, BeforeAfter dust ×16 + airflow ×10, scroll-hint) run continuously even off-screen.
  - `import * as Icons` in `Services.tsx`.
  - Scroll listeners in Navbar + Journey3D (both `passive`/rAF-throttled — acceptable).

---

## 17. Security

- **Input validation:** Client form uses native `required`/types only. Server `/api/lead` checks presence only (and is unused anyway). **No sanitization** anywhere. ⚠️
- **XSS:** React escapes by default — good. **`MetaPixel` injects a raw `<Script>` with template-interpolated `site.metaPixelId`.** Since that value is a hardcoded constant (not user input), it's safe *today*, but treat `site.ts` integration values as trusted-only.
- **CSRF:** N/A for the current flow (no authenticated server mutations; Web3Forms is a third-party POST).
- **Environment variables / secrets:** ⚠️ **The Web3Forms access key and Meta Pixel ID live in `config/site.ts` (client bundle), not env vars.** The Web3Forms key is *designed* to be public-ish (domain-scoped), but it's still better practice to move keys to env. There are no server secrets.
- **Auth / authorization:** None (no protected surface).
- **Spam / abuse:** ⚠️ The lead form has no honeypot/captcha/rate-limit — open to bot submissions (which would burn Web3Forms quota and pollute leads).
- **Headers:** No custom security headers (CSP, etc.) configured in `next.config.ts`.
- **Third-party trust:** Loads scripts from `connect.facebook.net` and posts to `api.web3forms.com`. External links correctly use `rel="noopener noreferrer"`.

---

## 18. Environment Variables

**There are currently ZERO environment variables in use.** No `.env*` files, and `next.config.ts` is empty. `.gitignore` *does* ignore `.env*` (ready for future use).

All "config that should be env" is instead hardcoded in `src/config/site.ts`:
| Value | Field | Notes |
|---|---|---|
| Meta Pixel ID | `site.metaPixelId` | empty → Pixel disabled |
| Web3Forms key | `site.web3formsAccessKey` | empty → no lead email |
| Facebook URL | `site.facebookUrl` | placeholder `facebook.com/` |
| Instagram URL | `site.instagramUrl` | empty |

**Recommendation:** migrate the two integration keys to `NEXT_PUBLIC_*` env vars (§23).

---

## 19. Dependencies

| Package | Why it exists | Where used | Necessary? | Alternatives |
|---|---|---|---|---|
| `next` 16.2.9 | Framework (App Router, routing, build) | everywhere | ✅ core | — |
| `react` / `react-dom` 19.2.4 | UI runtime | everywhere | ✅ core | — |
| `three` 0.184 | 3D engine | Scene.tsx | ✅ (for the journey) | drop = remove 3D |
| `@react-three/fiber` 9 | React renderer for three | Scene.tsx | ✅ with three | vanilla three |
| `@react-three/drei` 10 | R3F helpers (Environment, ContactShadows, Lightformer) | Scene.tsx | ✅ convenience | hand-roll |
| `@react-three/postprocessing` 3 | Bloom/Vignette/SMAA | Scene.tsx | ⚠️ nice-to-have | drop for perf |
| `postprocessing` 6 | peer of the above | (transitive use) | with above | — |
| `@types/three` | TS types | dev-time | ✅ | — |
| `framer-motion` 12 | 2D/scroll animation | many | ✅ | CSS/Motion One |
| `lucide-react` 1.21 | Icons | many | ✅ | react-icons, inline SVG |
| `clsx` 2 | Conditional classNames | cn() | ✅ (tiny) | classnames |
| `tailwind-merge` 3 | Dedupe Tailwind classes | cn() | ✅ | — |
| `react-hook-form` 7.80 | Form state/validation | **NOT USED** | ❌ remove or adopt | native (current) |
| `tailwindcss` 4 (dev) | Styling | globals.css | ✅ core | — |
| `@tailwindcss/postcss` (dev) | Tailwind v4 PostCSS plugin | postcss.config | ✅ | — |
| `typescript` / `@types/*` (dev) | Types/compile | build | ✅ | — |
| `eslint` + `eslint-config-next` (dev) | Linting | dev | ✅ | biome |

**Action items:** `react-hook-form` is dead weight (remove, or refactor QuoteCalculator to use it). Consider whether `@react-three/postprocessing` + `postprocessing` earn their bundle weight.

---

## 20. Reusable Design System

Located in `src/components/ui/` + tokens in `globals.css`.

- **Buttons (`Button.tsx`):** Polymorphic (renders `<Link>` if `href`, else `<button>`). Variants: `primary` (mint, lifts + glow), `secondary` (white/teal outline), `ghost`. Sizes: `sm/md/lg`. Rounded-full, `font-display`, focus ring. **Used everywhere — the canonical CTA.**
- **Cards:** Not a single component but a consistent recipe: `rounded-2xl border border-line bg-white p-7/8`, hover `-translate-y-1 + shadow-soft`. Repeated in Services/Areas/Problem/Reviews. (Candidate to extract — §23.)
- **Sections (`Section` + `SectionHeading`):** Standard vertical rhythm (`py-20 sm:py-28`, `scroll-mt-20`), centered eyebrow/title/subtitle with built-in Reveal. The backbone of every content block.
- **Containers (`Container.tsx`):** `max-w-6xl` centered, `px-5 sm:px-8`. One wrapper to rule horizontal layout.
- **Spacing:** Consistent Tailwind scale; sections `py-20/28`, headings `mt-14` to grids, cards `p-7/8`.
- **Colors:** Teal (brand) + Mint (accent/CTA) + Ink (text) + Canvas/Surface/Line (neutrals). Disciplined, only ~3 hues.
- **Typography:** Poppins (`font-display`) for headings, Inter for body. Sizes scale `text-3xl→4xl→6xl` responsively.
- **Icons:** lucide, sized `h-4/5/6 w-…`, teal/mint tinted.
- **UI consistency:** High. The pages feel cohesive because nearly everything routes through Section/Container/Button/Reveal and the token palette.

---

## 21. User Flow

```
        ┌─────────────────────────────────────────────┐
        │ Land on /  (ad click / organic / direct)     │
        └───────────────────┬──────────────────────────┘
                            ▼
   Desktop+motion?  ──yes──►  3D Air Journey (scroll: house→x-ray→dirty→clean)
        │ no                                   │
        ▼                                      ▼
     Static Hero  ───────────────────────────►  Stats (trust numbers)
                                                 ▼
                                              Problem (why it matters)
                                                 ▼
                                              Services (what we do)  ──(card click → /services/* ⚠️404)
                                                 ▼
                                              BeforeAfter (drag demo)
                                                 ▼
                                              HowItWorks (3 steps)
                                                 ▼
   ┌──────────────────────────── #quote ──────────────────────────────┐
   │  QuoteCalculator:                                                 │
   │   calc (province/size/beds/pets/last-cleaned) → live $low–$high   │
   │     ▼                                                             │
   │   lead (name / phone / email, required)                          │
   │     ▼  submit → Web3Forms email + Meta "Lead" event              │
   │   done (thank-you + WhatsApp deep link)                          │
   └──────────────────────────────────┬──────────────────────────────┘
                                       ▼
                       Pricing → Reviews → Areas(⚠️404 links) → FAQ → FinalCTA
                                       ▼
                   Persistent CTAs everywhere: Navbar "Get a Free Quote",
                   MobileCTABar "Call Now / Get Quote", tel:/wa.me links
```

**Every step explained:** trust (Stats) → pain (Problem) → solution catalog (Services) → proof (BeforeAfter/Reviews) → low-friction conversion (60-second calculator) → instant gratification (price + WhatsApp) → reassurance (Pricing/FAQ) → last push (FinalCTA). Multiple parallel exits to `#quote` and `tel:`/WhatsApp at all times.

---

## 22. File-by-File Documentation

| File | Purpose | Exports | Imported by | Key deps | Important logic | Safe to modify? |
|---|---|---|---|---|---|---|
| `app/layout.tsx` | Root shell, fonts, metadata, chrome | `metadata`, `RootLayout` | Next runtime | next/font, site, chrome comps | font wiring; body padding for MobileCTABar; metadataBase | ⚠️ Careful — global. Copy/metadata = safe; structure = risky |
| `app/page.tsx` | Section composition | `Home` | Next runtime | all sections | section order = the funnel | ✅ Reorder/add sections safely |
| `app/globals.css` | Tailwind + design tokens | — | layout | tailwind v4 | the entire theme | ⚠️ Token changes cascade site-wide |
| `app/api/lead/route.ts` | Lead intake (validate+log) | `POST` | (none) | next/server | presence validation; **unused** | ✅ Safe (nothing depends on it) |
| `config/site.ts` | Single source of truth | `site`, `services`, `provinces`, `nav`, types | ~12 files | — | brand/pricing/contacts/keys | ⚠️ Edit values freely; renaming keys breaks many imports |
| `lib/utils.ts` | `cn()` class merge | `cn` | almost all | clsx, tailwind-merge | merge logic | ❌ Don't change signature |
| `components/Navbar.tsx` | Top nav | `Navbar` | layout | Button/Logo/Container/site | scroll state, mobile menu | ✅ UI-safe |
| `components/Footer.tsx` | Footer | `Footer` | layout | site/services/provinces | ⚠️ links to unbuilt routes | ✅ UI-safe |
| `components/Logo.tsx` | Wordmark | `Logo` | Navbar, Footer | site, cn | inline SVG | ✅ |
| `components/MobileCTABar.tsx` | Bottom mobile CTA | `MobileCTABar` | layout | site | tel + #quote | ✅ |
| `components/MetaPixel.tsx` | Pixel + tracker | `MetaPixel`, `trackMeta` | layout, QuoteCalculator | next/script, site | raw script inject; safe no-op tracker | ⚠️ Don't break trackMeta signature |
| `components/three/AirJourney.tsx` | 3D gate + scroll driver + captions | `AirJourney` | page | dynamic Scene, framer | enable3D gate; progress from rect; caption windows | ⚠️ Progress math is delicate |
| `components/three/Scene.tsx` | The 3D canvas | `Scene` | AirJourney (dynamic) | three/r3f/drei/post | camera path, x-ray, clip-plane cleaning, dust | ❌ Complex — change only with 3D knowledge |
| `components/sections/Hero.tsx` | 2D fallback hero | `Hero` | AirJourney | framer, Button, CountUp, site | particles, rating card | ✅ UI-safe |
| `components/sections/Stats.tsx` | Stat counters | `Stats` | page | CountUp, Reveal | local data array | ✅ |
| `components/sections/Problem.tsx` | Problem cards | `Problem` | page | Section, Reveal | local data | ✅ |
| `components/sections/Services.tsx` | Service cards | `Services` | page | services, Section | ⚠️ `import * as Icons`; dead links | ✅ content; fix import |
| `components/sections/BeforeAfter.tsx` | Comparison slider | `BeforeAfter` | page | framer | clientX→`pos`, clipPath reveal | ✅ (add a11y) |
| `components/sections/HowItWorks.tsx` | 3 steps | `HowItWorks` | page | Section, Reveal | local data | ✅ |
| `components/sections/QuoteCalculator.tsx` | ⭐ Lead engine | `QuoteCalculator` | page | site, Button, trackMeta | pricing math, 3-step state machine, Web3Forms, WhatsApp | ⚠️ Pricing + submit logic — test after edits |
| `components/sections/Pricing.tsx` | Price table | `Pricing` | page | provinces, Section | maps provinces | ✅ |
| `components/sections/Reviews.tsx` | Testimonials | `Reviews` | page | site, Section | local data | ✅ |
| `components/sections/Areas.tsx` | Area cards | `Areas` | page | provinces, Section | ⚠️ dead links | ✅ content |
| `components/sections/FAQ.tsx` | Accordion | `FAQ` | page | Section | open-index state, grid-rows transition | ✅ |
| `components/sections/FinalCTA.tsx` | Closing CTA | `FinalCTA` | page | site, Button | tel builder | ✅ |
| `components/ui/Button.tsx` | DS button | `Button` | many | Link, cn | polymorphic link/button | ❌ Change with care (props used widely) |
| `components/ui/Container.tsx` | Width wrapper | `Container` | many | cn | max-w-6xl | ⚠️ width change is global |
| `components/ui/Section.tsx` | Section + heading | `Section`, `SectionHeading` | most sections | Container, Reveal | rhythm + scroll-mt | ⚠️ spacing change is global |
| `components/ui/Reveal.tsx` | Scroll reveal | `Reveal` | most sections | framer | whileInView once | ✅ |
| `components/ui/CountUp.tsx` | Number animation | `CountUp` | Hero, Stats | framer | rAF ease-out-expo | ✅ |
| `components/ui/ScrollProgress.tsx` | Progress bar | `ScrollProgress` | layout | framer | spring scaleX | ✅ |
| `next.config.ts` | Next config | `nextConfig` | build | — | empty | ✅ |
| `tsconfig.json` | TS config | — | build | — | `@/*` alias | ⚠️ alias is load-bearing |
| `postcss.config.mjs` | PostCSS | `config` | build | — | tailwind plugin | ❌ leave |
| `eslint.config.mjs` | Lint | `eslintConfig` | dev | — | next presets | ✅ |
| `public/*.svg` | Default Next SVGs | — | (none) | — | leftover | ✅ delete |
| `README.md` | Default readme | — | — | — | **stale** (says edit `app/page.tsx`) | ✅ rewrite |
| `AGENTS.md`/`CLAUDE.md` | AI agent rules | — | tooling | — | "read node_modules docs before coding" | ⚠️ keep |

---

## 23. Improvement Suggestions

**Unused files / dead code**
- `src/app/api/lead/route.ts` — not called by anything. Either wire the form to it (recommended) or delete.
- `react-hook-form` dependency — unused. Remove or adopt.
- `public/file.svg, globe.svg, next.svg, vercel.svg, window.svg` — default leftovers, delete.
- `README.md` — stale create-next-app text; rewrite for PureFlow.

**Broken / incomplete**
- ⚠️ **Dead routes:** `/services/{slug}` (5 links) and `/areas/{citySlug}` (6 links) 404. Either build these pages (great for SEO — local + service landing pages) or change links to in-page anchors.
- **Two parallel lead paths:** the form uses Web3Forms while `/api/lead` sits unused. Pick one. Best: POST to `/api/lead`, persist (Firestore/DB) **and** email — server-side, so keys leave the client bundle and you can add spam protection.

**Performance**
- `Services.tsx` `import * as Icons` → switch to named imports to avoid bundling the whole icon set.
- Gate the **2D** infinite animations (Hero particles, BeforeAfter loops) behind `prefers-reduced-motion` too, and/or pause when off-screen.
- Reconsider `@react-three/postprocessing` weight vs. visual gain.

**Accessibility**
- BeforeAfter slider: add keyboard support + `role="slider"`, `aria-valuenow`, focusability.
- Ensure toggle buttons (size/pets) expose selected state to AT (`aria-pressed`).
- Respect reduced motion globally.

**SEO**
- Add `LocalBusiness` + `Service` JSON-LD, `openGraph`/`twitter` metadata + an OG image, `sitemap.ts`, `robots.ts`, canonical URLs.

**Code quality**
- Extract a `<Card>` primitive (Services/Areas/Problem/Reviews share the recipe).
- Extract the `tel:` builder into `lib/utils.ts` (duplicated 3×).
- Move `metaPixelId`/`web3formsAccessKey` to `NEXT_PUBLIC_*` env vars.

**Security**
- Add a honeypot + rate limit (or captcha) to the lead form.
- Add basic security headers/CSP in `next.config.ts`.

**Architecture**
- If `/services` and `/areas` pages are coming, introduce a `[slug]` dynamic route reading from `config/site.ts` so they stay data-driven.

---

## 24. Future Development Roadmap

**Features**
- Build `/services/[slug]` and `/areas/[citySlug]` landing pages (SEO + the existing links).
- Real booking calendar / scheduling (Calendly or custom) instead of manual handoff.
- Lead persistence + admin dashboard (Firestore as the TODO hints).
- Bilingual (FR) support (reviews already imply Quebec/Montreal audience) via i18n routing.
- Blog/resources for organic SEO.

**Architecture / scalability**
- Server-side lead pipeline (`/api/lead` → DB + email + Pixel Conversions API) — more reliable than client-only, dedupes events, hides keys.
- Centralize integration keys in env; add a typed `env.ts`.
- Component library: extract Card, Badge, and form Field primitives.

**Testing strategy**
- Unit-test the calculator pricing math (pure function — extract it first).
- Component tests (React Testing Library) for QuoteCalculator state machine + FAQ/BeforeAfter.
- E2E (Playwright) for the lead funnel and the dead-link regression.
- Visual regression for the 3D/section layout.

**Deployment / monitoring / analytics**
- Vercel deploy (already Next-native); set env vars there.
- Add error monitoring (Sentry) and web-vitals reporting.
- Funnel analytics: track step transitions in QuoteCalculator (calc→lead→done) via Meta + GA4.

---

## 25. Final Summary

**1. Project summary.** PureFlow is a polished, single-page Next.js 16 / React 19 marketing funnel for a Canadian duct-cleaning business. Its standout feature is a scroll-driven Three.js "air journey." The whole page funnels to a 3-step quote calculator that captures leads and hands them off via Web3Forms email + WhatsApp, with Meta Pixel conversion tracking. It is data-driven from a single `config/site.ts`. No database, auth, or CMS — it's a lead-gen front end.

**2. Strengths.** Clean, token-based design system; cohesive UI; excellent performance gating of the heavy 3D; sensible component structure; single config source of truth; thoughtful conversion UX (instant estimate, WhatsApp shortcut, persistent CTAs); good baseline a11y on icons/links.

**3. Weaknesses.** Dead `/services` & `/areas` routes (broken links); two parallel lead paths with the server route unused; integration keys in client config rather than env; no spam protection; minimal SEO infrastructure (no JSON-LD/OG/sitemap/robots); unused `react-hook-form`; stale README; no tests.

**4. Potential bugs.** (a) **404s** on all Services/Areas card + footer links. (b) If `web3formsAccessKey` is empty (current default), the form **silently "succeeds" without sending any lead** — easy to ship unnoticed. (c) `import * as Icons` can bloat the Services chunk. (d) Web3Forms failure is swallowed with no user feedback. (e) BeforeAfter is unusable by keyboard users.

**5. Risk areas.** `three/Scene.tsx` (complex, fragile camera/clip math), `three/AirJourney.tsx` (scroll-progress math), `config/site.ts` (renaming keys cascades), `ui/Section.tsx` & `ui/Container.tsx` (global spacing/width), `globals.css` tokens (site-wide), `lib/utils.ts#cn` (used everywhere).

**6. Files to never modify without understanding dependencies.** `config/site.ts`, `lib/utils.ts`, `app/layout.tsx`, `app/globals.css`, `ui/Button.tsx`, `ui/Section.tsx`, `ui/Container.tsx`, `three/Scene.tsx`, `three/AirJourney.tsx`, `MetaPixel.tsx` (the `trackMeta` contract).

**7. Safe areas for UI changes.** Section copy/data arrays (Stats/Problem/Services/Reviews/FAQ/HowItWorks), `Hero`, `FinalCTA`, `Pricing`, `Footer` content, colors/spacing *values* in `config`/section markup, adding new sections to `page.tsx`.

**8. Recommended workflow for future updates.** (1) Read `AGENTS.md` — this Next version differs from defaults; consult `node_modules/next/dist/docs/` before using APIs. (2) For content/pricing/contact changes, edit `config/site.ts` only. (3) For new sections, copy an existing section + use `Section`/`Reveal`. (4) Run `npm run dev`, verify on desktop **and** mobile (3D vs Hero paths). (5) Run `npm run lint` before committing. (6) Test the quote funnel end-to-end after any QuoteCalculator change.

---

## Developer Guide (onboarding a new dev fast)

**1. Mental model.** One page (`app/page.tsx`) stacks ~12 sections; a root layout (`app/layout.tsx`) adds nav/footer/pixel. Everything brand-related comes from `config/site.ts`. Styling is Tailwind v4 with tokens in `globals.css`. The fancy 3D is isolated in `components/three/` and only runs on desktop.

**2. Run it.**
```bash
npm install
npm run dev        # http://localhost:3000 (Turbopack)
npm run build && npm run start   # prod build
npm run lint
```

**3. Where to make common changes.**
- Price / phone / provinces / services / nav / brand → `src/config/site.ts`.
- Theme colors / fonts / radius → `src/app/globals.css` (`@theme`).
- Section copy → the matching file in `src/components/sections/`.
- Add a section → create it, import in `app/page.tsx`, wrap content in `<Section>`/`<Reveal>`.
- Buttons/links → use `ui/Button` (`href` makes it a link).

**4. Gotchas to internalize.**
- `AGENTS.md`: **this Next.js may differ from your training** — check `node_modules/next/dist/docs/` first.
- The lead form posts to **Web3Forms**, not `/api/lead`. With an empty key, **no email is sent**. Set `web3formsAccessKey` in `site.ts` (ideally migrate to env).
- `/services/*` and `/areas/*` links currently **404** — don't assume those pages exist.
- 3D vs Hero is decided at runtime by screen width + `prefers-reduced-motion`. Test both.
- `cn()` (clsx + tailwind-merge) is how class conflicts are resolved — prefer it over string concatenation.

**5. First good tasks (low-risk, high-value).** Rewrite README; delete the 5 default `public/*.svg`; fix `Services.tsx` icon import to named imports; add `prefers-reduced-motion` guards to 2D animations; add `sitemap.ts`/`robots.ts` + JSON-LD; then tackle the big one — build the `/services` & `/areas` pages and unify the lead pipeline through `/api/lead`.
