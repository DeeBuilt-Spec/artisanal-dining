import { Link } from "react-router-dom";
import { specGroups } from "@/lib/specs";

const logoUrl = `${import.meta.env.BASE_URL}deebuilt-logo.png`;

export default function Index() {
  // This spec has a single direction group; render its directions as the list.
  const group = specGroups[0];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* Centered brand lockup — the brand's "home" moment. */}
        <a
          href="https://spec.deebuilt.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-14 flex flex-col items-center transition-opacity hover:opacity-70 md:mb-20"
          aria-label="DeeBuilt — all directions"
        >
          <img src={logoUrl} alt="" className="h-20 w-auto md:h-24" />
          <span
            className="mt-3 text-2xl md:text-3xl"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            DeeBuilt
          </span>
        </a>

        <header className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Spec repository</p>
          <h1
            className="mt-4 text-4xl md:text-6xl leading-[1.05] tracking-tight"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}
          >
            Olea — Design Directions
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">{group.blurb}</p>
        </header>

        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {group.items.map((d) => (
            <li key={d.to}>
              <Link
                to={d.to}
                className="group flex items-baseline gap-6 py-8 md:py-10 transition-colors hover:bg-neutral-100"
              >
                <span className="w-10 shrink-0 text-sm text-neutral-400 tabular-nums">{d.label}</span>
                <span className="flex-1">
                  <span
                    className="block text-3xl md:text-5xl tracking-tight"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Direction {d.label} — {d.name}
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
      </div>
    </main>
  );
}
