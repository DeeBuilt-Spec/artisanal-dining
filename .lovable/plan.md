# Olea — Three Design Directions (Spec Repo)

A static, dependency-light prototype repo. Plain React + React Router + Tailwind. No TanStack, no backend, no data layer. Placeholder name "Olea" used everywhere for easy find-and-replace.

## Scope

- Index page `/` listing three directions.
- Three standalone homepages at `/site1`, `/site2`, `/site3`.
- Each homepage contains the same five content blocks (hero, signature dishes, story, location & hours, reservation/contact CTA) but styled and laid out completely differently.
- GitHub Pages friendly: `public/404.html` redirects to `index.html` so deep routes resolve.

## Tech & routing

- The current project is a TanStack Start scaffold. Per the user's hard requirement, TanStack will NOT be used. I will replace the bootstrap with a plain Vite + React + React Router setup:
  - Remove TanStack Router/Start files (`src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routeTree.gen.ts`, `src/start.ts`, `src/server.ts`).
  - Update `vite.config.ts` to a plain React plugin config, and add `index.html` + `src/main.tsx` + `src/App.tsx`.
  - Add `react-router-dom`; remove TanStack packages.
- Tailwind via the existing `src/styles.css` import stays.
- Router: `BrowserRouter` with routes for `/`, `/site1`, `/site2`, `/site3`, and a catch-all redirecting to `/`.
- `public/404.html` contains a tiny script that rewrites the path to `/` so GitHub Pages deep-link refreshes work.

## File layout

```text
index.html
public/404.html
src/
  main.tsx
  App.tsx
  styles.css                  (existing, kept)
  pages/
    Index.tsx                 (the chooser at "/")
    Site1Artisan.tsx
    Site2Boutique.tsx
    Site3Edgy.tsx
  components/site1/...        (Nav, Hero, Dishes, Story, Visit, Footer)
  components/site2/...        (same set, boutique styling)
  components/site3/...        (same set, edgy styling)
  content/olea.ts             (shared copy + dish data, single source so find-and-replace is one file)
```

Each site's components live in their own folder so the three are visually unmistakable and cannot accidentally share styling.

## Index page `/`

Quiet, neutral. Title "Olea — Design Directions", one-line description, three large clickable panels: "Direction One — Artisan", "Direction Two — Boutique", "Direction Three — Edgy". No marketing copy.

## Direction One — Artisan (`/site1`)

- Palette: warm cream `#f6efe4`, clay `#b9542d`, terracotta `#d98b5f`, deep olive `#3f4a26`, charcoal `#1f1b16`.
- Type: serif headings (Fraunces), humanist sans body (Inter), loaded via Google Fonts `<link>` in `index.html`.
- Hero: full-bleed Unsplash food photo, restaurant name set large in serif overlapping the image bottom-left, one-line positioning to the right. Slow CSS-translate parallax on the hero image on scroll (simple `useScroll`-like effect with `requestAnimationFrame`, no library).
- Signature dishes: asymmetric editorial list — alternating large photo left / type block right and vice versa, varying widths, italic serif dish names, small caps ingredient lines. Not cards.
- Story: short single-column passage, drop cap, ample margins.
- Location & hours: two-column block, hours as a clean text table, address with a placeholder map image.
- CTA: "Reserve a table" as a quiet underlined link in serif, not a button-on-card.
- Copy tone: declarative, no exclamation marks.

## Direction Two — Boutique (`/site2`)

- Palette: near-white `#fafaf7`, ink `#0c0c0c`, one accent — deep plum `#3b1f3b` used sparingly (rules, small marks).
- Type: high-contrast display serif (Playfair Display) headings, clean grotesque (Inter Tight) body. Hierarchy via size/weight, not color.
- Hero: magazine cover composition — small label top-left, oversized name centered, fine hairline rule, single tall portrait-orientation image right column on desktop, stacked on mobile.
- Signature dishes: restrained two-column editorial spread, dish name + one-line description + price, hairline dividers between rows, one supporting image floated to one side.
- Story: narrow measure, justified text, pull-quote in plum.
- Location & hours: precise grid, address / hours / phone in three aligned columns on desktop, stacked on mobile.
- CTA: "Reservations" as a small caps link with hairline underline.
- Motion: subtle fade-and-rise on scroll via IntersectionObserver utility (no animation lib).

## Direction Three — Edgy (`/site3`)

- Palette: near-black `#0a0a0a`, off-white `#ededed`, acid lime `#d4ff00` accent.
- Type: oversized condensed grotesque (Bebas Neue or Archivo Black) for display, JetBrains Mono for labels, Inter for the few body lines.
- Hero: massive type "OLEA" breaking the grid, mono label "EST. 2025 / SEASONAL KITCHEN", one-liner positioning bottom-right, an off-axis image block.
- Marquee strip under the hero scrolling the positioning line in mono, infinite CSS keyframes.
- Signature dishes: oversized numbered list, full-width rows ("01 / DISH NAME ———— short line"), thick top/bottom borders, hover swaps row background to acid lime with black text. Not cards.
- Story: two big asymmetric blocks of type, one rotated tag.
- Location & hours: full-width block, hours as a mono table, address as oversized type.
- CTA: full-bleed acid-lime band with black condensed type "BOOK A TABLE →".

## Mobile-first rules (all three)

- Every layout is designed at ~375px first; multi-column variants only kick in at `md:` and above.
- Hero type uses `clamp()` so nothing overflows narrow viewports.
- Images use `object-cover` with explicit aspect ratios; no fixed pixel heights that break on mobile.
- Nav collapses to a small text-link menu (no hamburger drawer needed at this scope) — three to four anchors per site, styled per direction.

## Food-truck swap note (in repo README only)

A short note in `README.md` explains: to convert to a food truck, edit `src/content/olea.ts` — change the positioning line from neighborhood/reservations wording to street-kitchen/find-our-truck wording, and swap the reservation CTA label + href for a location/schedule CTA. Structure stays identical.

## What I will explicitly NOT do

- No three-up feature card grids anywhere.
- No generic centered hero with subtitle + two buttons.
- No gradient blobs, glassmorphism, emoji, stock startup illustrations.
- No TanStack anything.
- No backend, auth, API, or database wiring.

## Build steps

1. Remove TanStack files and dependencies; add `react-router-dom`.
2. Add plain Vite entry (`index.html`, `src/main.tsx`, `src/App.tsx` with routes).
3. Add `public/404.html` redirect shim.
4. Build `src/content/olea.ts` with shared copy + dish list.
5. Build Index page.
6. Build Site 1 (Artisan) components and page.
7. Build Site 2 (Boutique) components and page.
8. Build Site 3 (Edgy) components and page.
9. Verify dev build, check each route at mobile width and desktop width.
