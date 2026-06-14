# Make Olea feel like a real, orderable restaurant

Each site keeps its current visual personality but gets the "this is a working restaurant business" cues a client would expect. Treatments differ per direction; structure is shared. All interactive elements are visual prototypes only — buttons open hashes or `#` placeholders, no backend.

## Shared additions (every site)

1. **Persistent "Order online" CTA in the nav** (styled per site), plus a secondary "Reserve" link. Sticky on scroll so it stays reachable.
2. **Status pill** — small live-feeling indicator: "Open · closes 10 pm" or "Opens Wednesday at 6 pm", computed from `olea.visit.hours` against the current day/time so it changes if you reload on a different day. Sits in the nav or hero.
3. **Meet the chef** — short bio block with a portrait, name, one quote, and a credential line ("Previously: Frenchette, Roman's"). Replaces some of the food-photo weight.
4. **Upcoming events / specials** — three real-feeling line items with date, title, one-line description, and a "Reserve seat" link. Examples: "Pasta night — Mon 24 Mar", "Wine dinner with Domaine Roulot — Thu 11 Apr", "Spring tasting menu — from 1 May".
5. **Press strip** — three to five quiet credit lines ("New York Times · Eater · Infatuation 4.0 · Michelin Bib Gourmand"). Restaurant credibility shorthand. No logos generated; just typeset names.
6. **Newsletter signup** — one input, one button, "Get the menu when it changes." Visual only.
7. **Footer upgrade** — real-restaurant boilerplate: address, phone, email, hours summary, social handles (IG/TikTok as text), private dining inquiry link, gift cards link, careers link, allergen notice.
8. **Menu de-photo'd** — see per-site treatments below. The hero photo stays; the menu stops being a photo gallery.

## Per-site treatments (keeps each direction distinct)

### Site 1 — Artisan (`/site1`)
- Nav: warm "Order online" button in clay color, "Reserve" as quiet underlined serif link, status pill in olive.
- Menu: drop the per-dish hero photos. Render as a single editorial menu page — italic serif dish names, small-caps ingredient lines, prices right-aligned, one supporting photo at the top of the section instead of four. Add a "Wine & spirits" mini-list below (3 lines).
- Chef section: large portrait left, name + bio + handwritten-style quote right. Serif headings.
- Events: short journal-style list with date in the margin, title in italic serif, one line of description.
- Press: small caps row, hairline rules between names.
- Newsletter: single input with a serif label "The kitchen letter — sent when the menu changes."

### Site 2 — Boutique (`/site2`)
- Nav: "Order online" as a small ink-on-white button with hairline border; "Reserve" in plum.
- Menu: tighter magazine spread — same restrained two-column list, but remove the side photo and add a small "Tonight's tasting · 4 courses · $85" feature at the top with a "Book the tasting" link. Add a "Wine pairings available" footnote.
- Chef section: portrait-orientation photo right, ink display-serif name, three short paragraphs left, hairline rule under each, a pull-quote in plum.
- Events: magazine-style date-led list, all hairline rules, no decoration.
- Press: italic serif, comma-separated single line, justified.
- Newsletter: minimal — label above input, plum send arrow.

### Site 3 — Edgy (`/site3`)
- Nav: "ORDER ONLINE →" pill in acid lime with black text, mono "[reserve]" link beside it. Status pill in mono: `[OPEN UNTIL 22:00]`.
- Menu: kill the hover-flash photo rows. Keep the oversized numbered list but make it pure type — bigger condensed, no images on dishes. Add a "TONIGHT" strip above: one big dish-of-the-day in display type with a lime "ADD TO ORDER →" pill.
- Chef section: huge condensed name across the page, mono credentials list, single duotone portrait off-axis, a rotated lime tag like `// 12 yrs / 3 kitchens / 0 stars wanted`.
- Events: oversized numbered list ("EVT/01 — WINE NIGHT — 11.APR") with lime accents on dates.
- Press: marquee strip variant — second marquee with the press credits scrolling.
- Newsletter: full-width black band, mono label "// JOIN THE LIST", lime submit button.

## Data changes (`src/content/olea.ts`)

Extend the shared content file so all three sites pull from one place:

- `chef`: `{ name, role, bio (2 short paragraphs), credentials (array of strings), quote, portrait (Unsplash url) }`
- `events`: 3 items, each `{ date, title, description, href }`
- `press`: array of credit strings
- `tonight`: `{ name, description, price }` for the daily-special touch
- `social`: `{ instagram, tiktok }` as text handles
- `links`: `{ orderOnline, reserve, privateDining, giftCards, careers }` (all `#` for now)

Food-truck swap note in README updated: `tonight` becomes "Today's truck special", `events` becomes the schedule, `links.reserve` becomes the location/schedule link. Everything else (chef, press, newsletter) stays meaningful for a truck too.

## What stays the same

- The three visual personalities (Artisan / Boutique / Edgy).
- Route structure, plain React + React Router, no backend, no card-grid layouts, no emoji, no gradient blobs.
- Mobile-first, full-bleed hero per site.
