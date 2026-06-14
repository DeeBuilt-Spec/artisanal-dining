// Single source of placeholder copy. Find-and-replace "Olea" to rename.
// To convert to a food truck: change `positioning` to street-kitchen wording,
// swap `cta.label` to "Find the truck" and `cta.href` to "#schedule",
// and rename `tonight` / `events` per the README.

export const olea = {
  name: "Olea",
  established: "Est. 2025",
  positioning:
    "A small neighborhood eatery serving a seasonal, ingredient-led menu from an open kitchen.",
  story: [
    "Olea began as a six-seat counter behind a corner grocer. The kitchen is open, the menu is short, and the produce comes from three farms we drive to on Mondays.",
    "We cook what is ripe this week. Bread is pulled from the oven at four. Wine is poured by the chef. There is no manager, no script, and no second location.",
  ],
  dishes: [
    {
      n: "01",
      name: "Wood-roasted carrots",
      desc: "Charred over olive wood, labneh, black sesame, wild fennel pollen.",
      price: "14",
      image:
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1600&q=80",
    },
    {
      n: "02",
      name: "Hand-cut tagliatelle",
      desc: "Slow ragù of lamb shoulder, preserved lemon, aged pecorino.",
      price: "26",
      image:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1600&q=80",
    },
    {
      n: "03",
      name: "Whole grilled bream",
      desc: "Day-boat fish, salsa verde, charred lemon, bitter leaves.",
      price: "34",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80",
    },
    {
      n: "04",
      name: "Olive oil cake",
      desc: "Warm, citrus-soaked, crème fraîche, candied rosemary.",
      price: "11",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  wines: [
    { name: "Etna Bianco · Pietradolce '22", region: "Sicily", price: "16 / 64" },
    { name: "Beaujolais · Lapierre Morgon '21", region: "France", price: "18 / 72" },
    { name: "Txakoli · Ameztoi Rubentis '23", region: "Basque Country", price: "14 / 56" },
  ],
  hero: {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80",
    portrait:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
    menuLead:
      "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&w=1800&q=80",
  },
  chef: {
    name: "Marco Aiello",
    role: "Chef & Owner",
    portrait:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80",
    bio: [
      "Marco grew up between a grocer in Palermo and a vegetable garden in upstate New York. He cooks the way he was taught at home — short menus, loud kitchens, and the best ingredient on the plate.",
      "Olea is his first restaurant. He works the pass every night it is open.",
    ],
    credentials: ["Previously Frenchette, Estela, Roman's", "James Beard semifinalist, 2024", "Food & Wine Best New Chef nominee"],
    quote: "Cook one thing well. Then cook the next thing.",
  },
  tonight: {
    label: "Tonight",
    name: "Four-course chef's tasting",
    description: "Whatever came in this morning, finished at the counter. Wine pairings available.",
    price: "85",
  },
  events: [
    {
      date: "Mon 24 Mar",
      title: "Pasta night",
      description: "Five hand-cut shapes, one long table, family-style. Walk-ins only.",
      href: "#reserve",
    },
    {
      date: "Thu 11 Apr",
      title: "Wine dinner · Domaine Roulot",
      description: "Six courses paired with white Burgundy. Twelve seats, one seating.",
      href: "#reserve",
    },
    {
      date: "From 1 May",
      title: "Spring tasting menu",
      description: "A new short menu, written the morning of, served Wednesday through Sunday.",
      href: "#menu",
    },
  ],
  press: [
    "The New York Times",
    "Eater",
    "Infatuation · 4.0",
    "Michelin Bib Gourmand",
    "Food & Wine",
  ],
  visit: {
    address: ["48 Linden Lane", "Brooklyn, NY 11217"],
    hours: [
      ["Wed – Thu", "6 – 10 pm"],
      ["Fri – Sat", "6 – 11 pm"],
      ["Sun", "5 – 9 pm"],
      ["Mon – Tue", "Closed"],
    ],
    phone: "(347) 555 0142",
    email: "hello@olea.kitchen",
  },
  social: {
    instagram: "@olea.kitchen",
    tiktok: "@olea.kitchen",
  },
  links: {
    orderOnline: "#order",
    reserve: "#reserve",
    privateDining: "#private",
    giftCards: "#gift",
    careers: "#careers",
  },
  cta: {
    label: "Reserve a table",
    href: "#reserve",
  },
};

export type Dish = (typeof olea.dishes)[number];

// Computes a simple open/closed status from olea.visit.hours.
// Day rows can match by full name ("Sunday") or short name ("Sun");
// ranges use an en dash and times use "6 – 10 pm" formatting.
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseClock(s: string): number | null {
  const m = s.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const mins = m[2] ? parseInt(m[2], 10) : 0;
  const ampm = m[3];
  if (ampm === "pm" && h < 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;
  return h * 60 + mins;
}

function rowMatchesDay(rowDay: string, day: string): boolean {
  const parts = rowDay.split(/\s*[–-]\s*/);
  const indexOf = (n: string) => DAYS.findIndex((d) => n.toLowerCase().startsWith(d.toLowerCase()));
  if (parts.length === 1) {
    return indexOf(parts[0]) === indexOf(day);
  }
  const a = indexOf(parts[0]);
  const b = indexOf(parts[1]);
  const t = indexOf(day);
  if (a < 0 || b < 0 || t < 0) return false;
  if (a <= b) return t >= a && t <= b;
  return t >= a || t <= b;
}

export function getStatus(now: Date = new Date()): {
  open: boolean;
  label: string;
  short: string;
} {
  const today = DAYS[now.getDay()];
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const [day, hours] of olea.visit.hours) {
    if (!rowMatchesDay(day, today)) continue;
    if (hours.toLowerCase().includes("closed")) {
      return { open: false, label: `Closed today · opens Wed at 6 pm`, short: "Closed today" };
    }
    const m = hours.match(/^(.*?)\s*[–-]\s*(.*)$/);
    if (!m) continue;
    const open = parseClock(m[1] + (m[1].match(/am|pm/i) ? "" : hours.match(/pm|am/i)?.[0] ?? ""));
    const close = parseClock(m[2]);
    if (open == null || close == null) continue;
    if (nowMins >= open && nowMins < close) {
      const closeH = Math.floor(close / 60);
      const display = closeH > 12 ? `${closeH - 12} pm` : `${closeH} ${closeH < 12 ? "am" : "pm"}`;
      return { open: true, label: `Open now · closes ${display}`, short: `Open until ${display}` };
    }
    if (nowMins < open) {
      const openH = Math.floor(open / 60);
      const display = openH > 12 ? `${openH - 12} pm` : `${openH} am`;
      return { open: false, label: `Opens today at ${display}`, short: `Opens at ${display}` };
    }
  }
  return { open: false, label: "Closed · opens Wednesday at 6 pm", short: "Closed" };
}
