import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { allSpecs, specGroups, type SpecEntry } from "@/lib/specs";

/*
 * Floating review-only navigation for DeeBuilt specs (react-router-dom v7).
 *
 * A slim pill pinned bottom-center on every spec page: ‹ prev · current-direction
 * dropdown · next ›. Kept at the BOTTOM (not in the header) because it's
 * thumb-friendly on mobile. The dropdown opens UPWARD. Returns null when no spec
 * segment matches (the landing page, a 404), so it self-hides off the spec pages.
 *
 * Ported from medical-provider's TanStack SpecSwitcher to react-router:
 *   useRouterState({ select: s => s.location.pathname })  ->  useLocation().pathname
 *   navigate({ to })                                      ->  navigate(to)
 *   <Link to> (full path)                                 ->  <Link to> (basename-relative)
 *
 * react-router is mounted with basename={import.meta.env.BASE_URL}, so
 * useLocation().pathname and <Link to> are already base-relative.
 */

export function SpecSwitcher() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detection matches on the route SEGMENT (e.g. "/site1"), longest-match-wins
  // so any future child pages resolve to their parent direction.
  const here = `/${pathname.replace(/^\/+|\/+$/g, "")}/`; // normalize to /a/b/ form
  let currentIndex = -1;
  let bestLen = -1;
  allSpecs.forEach((s, i) => {
    const seg = `${s.to}/`;
    if (here.includes(seg) && s.to.length > bestLen) {
      bestLen = s.to.length;
      currentIndex = i;
    }
  });

  const noSpec = currentIndex === -1;

  // Close on outside click / touch / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the dropdown whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (noSpec) return null;

  const current: SpecEntry | null = currentIndex >= 0 ? allSpecs[currentIndex] : null;
  const prev = currentIndex > 0 ? allSpecs[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < allSpecs.length - 1
      ? allSpecs[currentIndex + 1]
      : null;

  return (
    <div className="spec-chrome-switcher" ref={ref}>
      {/* Dropdown panel — opens UPWARD above the bar. */}
      {open && (
        <div className="spec-chrome-panel" role="menu">
          {specGroups.map((g) => (
            <div key={g.title}>
              <div className="spec-chrome-group-title">{g.title}</div>
              {g.items.map((s) => {
                const active = current?.to === s.to;
                return (
                  <Link
                    key={s.to}
                    to={s.to}
                    role="menuitem"
                    className="spec-chrome-item"
                    data-active={active}
                    onClick={() => setOpen(false)}
                  >
                    <span className="spec-chrome-item-label">{s.label}</span>
                    <span className="spec-chrome-item-name">
                      {s.name}
                      {active && <span className="spec-chrome-item-current"> · current</span>}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
          <div className="spec-chrome-panel-footer">
            <Link to="/" className="spec-chrome-panel-link" onClick={() => setOpen(false)}>
              ← All directions
            </Link>
          </div>
        </div>
      )}

      {/* The floating bar. */}
      <div className="spec-chrome-switcher-bar">
        {prev ? (
          <button
            type="button"
            className="spec-chrome-arrow"
            onClick={() => navigate(prev.to)}
            aria-label={`Previous: ${prev.name}`}
            title={prev.name}
          >
            ‹
          </button>
        ) : (
          <button type="button" className="spec-chrome-arrow" aria-disabled="true" disabled aria-hidden>
            ‹
          </button>
        )}

        <button
          type="button"
          className="spec-chrome-current"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span className="spec-chrome-current-label">{current ? current.label : "Spec"}</span>
          <span className="spec-chrome-current-name">
            {current ? current.name : "Browse directions"}
          </span>
          <span className="spec-chrome-caret" data-open={open}>
            ▲
          </span>
        </button>

        {next ? (
          <button
            type="button"
            className="spec-chrome-arrow"
            onClick={() => navigate(next.to)}
            aria-label={`Next: ${next.name}`}
            title={next.name}
          >
            ›
          </button>
        ) : (
          <button type="button" className="spec-chrome-arrow" aria-disabled="true" disabled aria-hidden>
            ›
          </button>
        )}
      </div>
    </div>
  );
}
