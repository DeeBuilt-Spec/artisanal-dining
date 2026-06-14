// Single source of placeholder copy. Find-and-replace "Olea" to rename.
// To convert to a food truck: change `positioning` to street-kitchen wording,
// swap `cta.label` to "Find the truck" and `cta.href` to "#schedule".

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
  hero: {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80",
    portrait:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
  },
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
  cta: {
    label: "Reserve a table",
    href: "#reserve",
  },
};

export type Dish = (typeof olea.dishes)[number];
