# Hero videos — drop-in slots

The homepage hero (`src/components/three/AirJourney.tsx`) is a cinematic
composition: a full-bleed **background video** plus **three circular "process"
video windows** (Inspect → Deep Clean → Extract). Every slot has a real
duct-cleaning **poster frame**, so nothing looks broken before the clips arrive.

## 1. Background (already wired)

- `hero.mp4` — full-cover background, blurred + darkened behind the text.
  Already present and playing. Heavily compressed is fine (it's blurred).

## 2. The three circular windows (optional, add when ready)

Drop these three files here:

| File                      | Content                                             |
| ------------------------- | --------------------------------------------------- |
| `hero-inspection.mp4`     | HVAC vent inspection / technician removing register |
| `hero-brush.mp4`          | Inside-duct rotary brush cleaning                   |
| `hero-extraction.mp4`     | Blue commercial vacuum extraction                   |

Then open `src/components/three/AirJourney.tsx` and flip:

```ts
const CIRCLE_VIDEOS_READY = true;
```

The circles then autoplay the footage (muted / loop / playsInline) over their
poster frames. While `false`, the poster images show alone — no 404s.

## Encode tips

- Circles: ~720×720 square-ish crop, 6–12s seamless loop, H.264, muted.
- Background: 1920×1080, short loop, target < 4 MB (it's blurred anyway).
- Keep files web-appropriate — do **not** ship 4K masters.
