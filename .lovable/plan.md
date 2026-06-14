# Site 4 — Minimalist (`/site4`)

A fourth direction added alongside the existing three. Pulls from the same `src/content/olea.ts`. No new dependencies. Plain React + Tailwind, same conventions as the other sites.

## Design philosophy

True restraint, not "clean tech startup." Closer to a printed program or a gallery wall label than a website. The opposite of Site 1 (warm/editorial), Site 2 (magazine), and Site 3 (brutalist). The differentiator is **information density and stillness** — almost no decoration, very small type, generous whitespace, monochrome.

- **Palette**: paper white (`#ffffff`) background, near-black ink (`#111`), one mid-grey (`#888`) for secondary lines. No accent color. No shadows, no rounded corners, no gradients.
- **Type**: a single sans-serif throughout — Inter Tight (already loaded). Two sizes only on the page: one display size for the wordmark and one body size (~14px) for everything else. Numbers use tabular figures. Generous line-height (1.6+).
- **Grid**: a fixed 640px content column, left-aligned, with `visit`/meta info anchored top-right in small caps. Every section starts at the same left edge — no centered hero, no full-bleed photo.
- **Imagery**: one single small square photo (Olea hero image) at ~280×280, sitting inline in the flow. That is the only image on the page. No chef portrait, no dish photos, no press logos.
- **Rules**: 1px hairline rules between sections, full column width. Nothing else divides content.
- **Interaction**: links are underlined on hover only. The Order/Reserve buttons are plain text links with a single hairline underline — no pill, no fill, no color.

## Structure (single scroll, no anchors)

```text
┌────────────────────────────────────────────────────────┐
│ Olea                                  Open until 10 pm │  <- nav: wordmark left, status right
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ A small neighborhood eatery serving a seasonal,         │  <- positioning, set as the lead
│ ingredient-led menu from an open kitchen.               │
│                                                         │
│ Order online · Reserve a table                          │  <- two text-link CTAs, separated by middot
│                                                         │
│ ──────────────────────────────────────────────────────── │
│ [ small square photo, 280×280 ]                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Menu      Wood-roasted carrots                 14       │  <- two-col list: name left, price right
│           Hand-cut tagliatelle                 26       │
│           Whole grilled bream                  34       │
│           Olive oil cake                       11       │
│                                                         │
│           Four-course chef's tasting           85       │  <- tonight, same row treatment
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Wine      Etna Bianco · Pietradolce '22    16 / 64      │
│           Beaujolais · Lapierre Morgon '21 18 / 72      │
│           Txakoli · Ameztoi Rubentis '23   14 / 56      │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Chef      Marco Aiello, Chef & Owner                    │  <- label-left, content-right pattern
│           Two short bio sentences. No quote box. The    │
│           credential line in grey beneath.              │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Events    Mon 24 Mar    Pasta night                     │  <- date as 3rd column
│           Thu 11 Apr    Wine dinner · Domaine Roulot    │
│           From 1 May    Spring tasting menu             │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Press     The New York Times, Eater, Infatuation 4.0,   │  <- one comma-separated line, grey
│           Michelin Bib Gourmand, Food & Wine            │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Visit     48 Linden Lane, Brooklyn NY 11217             │
│           Wed–Thu 6–10pm · Fri–Sat 6–11pm · Sun 5–9pm   │
│           (347) 555 0142 · hello@olea.kitchen           │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Newsletter   [   email   ]  Subscribe                   │  <- single hairline-bottom input, no box
│              Sent when the menu changes.                │
│                                                         │
│ ──────────────────────────────────────────────────────── │
│                                                         │
│ Olea · Est. 2025                                        │
│ Private dining · Gift cards · Careers · Instagram       │  <- plain text links
└────────────────────────────────────────────────────────┘
```

The `Menu / Wine / Chef / Events / Press / Visit / Newsletter` left labels stay in a fixed narrow column (e.g. 96px), so every row aligns. On mobile, labels stack above their content but keep the same small-caps treatment.

## Anti-vibe-coding guardrails

- No gradients, no blurred blobs, no glassmorphism, no `backdrop-filter`.
- No emoji, no icon set, no Lucide icons anywhere on this page.
- No card components, no shadow, no rounded corners (`rounded-none` everywhere).
- No hover scale, no parallax, no scroll-triggered animation. Only one transition: link underline on hover.
- No "Get started" / "Learn more" generic CTAs. Copy stays restaurant-specific.
- No accent color, no dark mode toggle, no theme switcher.
- No marquee, no auto-scrolling strip (that's Site 3's territory).
- No full-bleed hero image (that's Sites 1–3).

## Status pill, reused

The existing `getStatus()` helper from `src/content/olea.ts` powers the top-right status text. Rendered as plain inline text ("Open until 10 pm" / "Closed today · opens Wed at 6 pm"), no pill background, no colored dot — the only visual concession is a single 6px black square `■` before the text.

## Mobile

Same column, just 24px side padding instead of centered 640px. Labels move from left-of-content to above-content. Status text wraps below the wordmark. Everything else is identical — that's the point.

## Files to change

- `src/pages/Site4Minimalist.tsx` — new component, self-contained, mirrors the file pattern of the other three sites.
- `src/App.tsx` — add `<Route path="/site4" element={<Site4Minimalist />} />`.
- `src/pages/Index.tsx` — add the fourth tile to the chooser so it's discoverable.
- `.lovable/plan.md` — append a short Site 4 entry so the spec doc stays in sync.

No changes to `src/content/olea.ts`, no new dependencies, no styling tokens added. The page uses inline styles for its three colors so it cannot accidentally pick up the shared shadcn theme.