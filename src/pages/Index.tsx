import { Link } from "react-router-dom";

const directions = [
  { to: "/site1", n: "I", title: "Artisan", note: "Warm, seasonal, hand-set." },
  { to: "/site2", n: "II", title: "Boutique", note: "Quiet luxury, magazine grid." },
  { to: "/site3", n: "III", title: "Edgy", note: "Loud, brutalist, condensed." },
  { to: "/site4", n: "IV", title: "Minimalist", note: "Restrained, monochrome, gallery-label." },
];

export default function Index() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <header className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Spec repository</p>
          <h1
            className="mt-4 text-4xl md:text-6xl leading-[1.05] tracking-tight"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}
          >
            Olea — Design Directions
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">
            Three completely distinct homepage directions for the same small, chef-led restaurant.
          </p>
        </header>

        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {directions.map((d) => (
            <li key={d.to}>
              <Link
                to={d.to}
                className="group flex items-baseline gap-6 py-8 md:py-10 transition-colors hover:bg-neutral-100"
              >
                <span className="w-10 shrink-0 text-sm text-neutral-400 tabular-nums">{d.n}</span>
                <span className="flex-1">
                  <span
                    className="block text-3xl md:text-5xl tracking-tight"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Direction {d.n} — {d.title}
                  </span>
                  <span className="mt-1 block text-sm text-neutral-500">{d.note}</span>
                </span>
                <span className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-16 text-xs text-neutral-400">Placeholder name. Find-and-replace "Olea" to rename.</footer>
      </div>
    </main>
  );
}
