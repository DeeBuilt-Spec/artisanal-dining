# Olea — Design Directions

A static spec repo with three completely distinct homepage design directions for the same small, chef-led restaurant. Plain React + React Router + Tailwind. No backend.

## Routes
- `/` — chooser
- `/site1` — Artisan
- `/site2` — Boutique
- `/site3` — Edgy

## Renaming
Find-and-replace `Olea` repo-wide. Most copy lives in `src/content/olea.ts`.

## Food-truck swap
Edit `src/content/olea.ts`:
- Change `positioning` to street-kitchen wording (e.g. "A street kitchen serving a short, seasonal menu from a wood-fired truck.").
- Change `cta.label` to `Find the truck` and `cta.href` to `#schedule`.
Structure stays identical across all three sites.

## GitHub Pages
`public/404.html` redirects deep routes to `/` so `/site1`–`/site3` resolve on refresh.
