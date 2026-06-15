/*
 * Single source of truth for every design direction in this spec.
 *
 * Both the landing page (Index) and the in-bar SpecSwitcher read from here, so
 * the list, order, and labels never drift. To add a direction, add one entry —
 * it appears on the landing page and in the switcher automatically.
 *
 * Shape is intentionally generic so the shared spec-chrome bundle reuses it
 * across specs: drop in a new specs.ts + the chrome renders itself.
 */

export type SpecEntry = {
  to: string; // route path, basename-relative (e.g. "/site1")
  label: string; // short tag shown in the switcher (e.g. "I", "01")
  name: string; // display name
  note: string; // one-line description
};

export type SpecGroup = {
  kicker: string;
  title: string;
  blurb: string;
  featured?: boolean;
  items: SpecEntry[];
};

export const specGroups: SpecGroup[] = [
  {
    kicker: "Visual concepts",
    title: "Design directions",
    blurb:
      "Five completely distinct homepage directions for the same small, chef-led restaurant. Each is one scrolling homepage — a look and feel to react to.",
    featured: true,
    items: [
      { to: "/site1", label: "I", name: "Artisan", note: "Warm, seasonal, hand-set." },
      { to: "/site2", label: "II", name: "Boutique", note: "Quiet luxury, magazine grid." },
      { to: "/site3", label: "III", name: "Edgy", note: "Loud, brutalist, condensed." },
      { to: "/site4", label: "IV", name: "Minimalist", note: "Restrained, monochrome, gallery-label." },
      { to: "/site5", label: "V", name: "Street", note: "Food-truck energy, taped-up, kraft paper." },
    ],
  },
];

// Flat, ordered list of every direction — used by the switcher for prev/next.
export const allSpecs: SpecEntry[] = specGroups.flatMap((g) => g.items);
