import { useEffect, useMemo, useState } from "react";
import { olea, getStatus } from "@/content/olea";

/**
 * Site 5 — Food-truck / street-kitchen energy.
 * Hand-stamped, taped-up, kraft-paper aesthetic. Not refined, not bougie.
 * Self-contained: inline styles + a few utility classes so it can't pick up
 * the shared shadcn theme.
 */

const PAPER = "#ede3cf";
const PAPER_DARK = "#d8cbab";
const INK = "#1b1815";
const INK_SOFT = "#3a342d";
const STAMP = "#b6342a";
const MUSTARD = "#e0a52a";

// Subtle paper noise via inline SVG so we don't need an asset.
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
       <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0'/></filter>
       <rect width='100%' height='100%' filter='url(#n)' opacity='0.45'/>
     </svg>`,
  );

const display = { fontFamily: "'Archivo Black', system-ui, sans-serif", letterSpacing: "-0.01em" };
const stencil = { fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.02em" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const typewriter = { fontFamily: "'Special Elite', 'Courier New', monospace" };
const marker = { fontFamily: "'Permanent Marker', cursive" };
const hand = { fontFamily: "'Caveat', cursive" };

// --- Today's route (food-truck reframe of olea.events) -------------------
const today = [
  { time: "11:30 – 2:00", spot: "Prospect Park — 9th St entrance", status: "now" },
  { time: "3:00 – 5:30",  spot: "Industry City — Courtyard 5/6", status: "next" },
  { time: "6:30 – 9:30",  spot: "Domino Park — north lawn",       status: "later" },
];

const week = [
  { day: "MON", note: "Off — prep day. Catch us Tuesday." },
  { day: "TUE", note: "Greenpoint → Williamsburg, lunch + dinner" },
  { day: "WED", note: "Brooklyn Bridge Park, lunch only" },
  { day: "THU", note: "Industry City → Domino Park" },
  { day: "FRI", note: "Smorgasburg residency, 12 – 8" },
  { day: "SAT", note: "Private event AM · Domino PM" },
  { day: "SUN", note: "Prospect Park all day, rain or shine" },
];

// --- Components -----------------------------------------------------------

function Tape({ rotate = -3, className = "" }: { rotate?: number; className?: string }) {
  return (
    <span
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: 86,
        height: 22,
        background: "rgba(230, 215, 140, 0.78)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
        transform: `rotate(${rotate}deg)`,
        mixBlendMode: "multiply",
      }}
    />
  );
}

function Stamp({ children, rotate = -6, color = STAMP }: { children: React.ReactNode; rotate?: number; color?: string }) {
  return (
    <span
      className="inline-block px-3 py-1 border-2"
      style={{
        ...display,
        color,
        borderColor: color,
        transform: `rotate(${rotate}deg)`,
        letterSpacing: "0.06em",
        fontSize: 14,
        textTransform: "uppercase",
        background: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function Sticker({
  children,
  rotate = -2,
  bg = INK,
  color = PAPER,
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  bg?: string;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-3 py-1.5 ${className}`}
      style={{
        ...stencil,
        background: bg,
        color,
        transform: `rotate(${rotate}deg)`,
        fontSize: 18,
        lineHeight: 1,
        boxShadow: "2px 2px 0 rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </span>
  );
}

function Polaroid({
  src,
  caption,
  rotate = -2,
  className = "",
}: {
  src: string;
  caption: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        background: "#f6efe1",
        padding: "10px 10px 36px",
        boxShadow: "0 8px 18px -10px rgba(0,0,0,0.45)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <Tape rotate={rotate * -3} className="-top-2 left-1/2 -translate-x-1/2" />
      <img src={src} alt={caption} className="block w-[220px] h-[220px] object-cover" style={{ filter: "saturate(0.85) contrast(1.05)" }} />
      <div className="absolute bottom-2 left-0 right-0 text-center" style={{ ...hand, color: INK, fontSize: 18 }}>
        {caption}
      </div>
    </div>
  );
}

function Dashed({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        height: 1,
        backgroundImage: `repeating-linear-gradient(90deg, ${INK_SOFT} 0 6px, transparent 6px 12px)`,
      }}
    />
  );
}

// --- Page -----------------------------------------------------------------

export default function Site5Grunge() {
  const [status, setStatus] = useState(getStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Tiny "tip jar" interaction — just a counter, no backend.
  const [tips, setTips] = useState(127);
  const tipsLine = useMemo(() => `${tips} folks said thanks this week`, [tips]);

  return (
    <main
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        minHeight: "100vh",
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: "repeat",
      }}
    >
      {/* TOP BAR — looks like a printed receipt header */}
      <div
        style={{
          background: INK,
          color: PAPER,
          ...mono,
          fontSize: 12,
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-2 flex items-center justify-between gap-4">
          <span className="uppercase tracking-widest">★ Street kitchen · est. 2025 · Brooklyn</span>
          <span className="hidden sm:inline uppercase tracking-widest">
            {status.open ? "● ON THE ROAD" : "○ OFF THE ROAD"} · {status.short}
          </span>
          <a href="#holler" className="uppercase tracking-widest underline underline-offset-2">Holler at us</a>
        </div>
      </div>

      {/* NAV */}
      <header className="mx-auto max-w-6xl px-5 pt-6 pb-3 flex items-end justify-between gap-6">
        <a href="#top" className="flex items-baseline gap-3">
          <span style={{ ...display, fontSize: 44, lineHeight: 0.9 }}>OLEA</span>
          <span style={{ ...hand, color: STAMP, fontSize: 28, transform: "rotate(-4deg)", display: "inline-block" }}>
            on wheels
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6" style={{ ...stencil, fontSize: 20 }}>
          <a href="#menu" className="hover:underline underline-offset-4">Menu</a>
          <a href="#route" className="hover:underline underline-offset-4">Where we at</a>
          <a href="#crew" className="hover:underline underline-offset-4">Crew</a>
          <a href="#holler" className="hover:underline underline-offset-4">Book us</a>
          <a
            href="#order"
            className="px-4 py-2"
            style={{ background: INK, color: PAPER, transform: "rotate(-1.5deg)", display: "inline-block" }}
          >
            ORDER AHEAD →
          </a>
        </nav>
      </header>

      <Dashed className="mx-auto max-w-6xl" />

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-16 grid md:grid-cols-12 gap-8 items-end relative">
        <div className="md:col-span-7 relative">
          <div className="flex items-center gap-3 mb-5">
            <Sticker rotate={-3} bg={MUSTARD} color={INK}>NO RESERVATIONS · NO BS</Sticker>
            <Sticker rotate={2} bg={STAMP} color={PAPER}>CASH OR CARD</Sticker>
          </div>
          <h1
            style={{
              ...display,
              fontSize: "clamp(56px, 9vw, 116px)",
              lineHeight: 0.92,
              textTransform: "uppercase",
            }}
          >
            Cooked
            <br />
            on the <span style={{ color: STAMP }}>street.</span>
            <br />
            <span style={{ ...marker, fontSize: "0.55em", color: INK_SOFT, textTransform: "none" }}>
              Eaten standing up.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base md:text-lg" style={{ ...typewriter, color: INK_SOFT, lineHeight: 1.55 }}>
            A short, loud menu out of a beat-up step van. Same chef, same farms, same hands —
            just no tablecloths and no host stand. We're parked somewhere in Brooklyn most days.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#order"
              className="inline-block px-5 py-3"
              style={{
                ...display,
                background: INK,
                color: PAPER,
                fontSize: 18,
                letterSpacing: "0.04em",
                boxShadow: "4px 4px 0 " + STAMP,
              }}
            >
              ORDER AHEAD →
            </a>
            <a
              href="#route"
              className="inline-block px-5 py-3 border-2"
              style={{
                ...display,
                borderColor: INK,
                color: INK,
                fontSize: 18,
                letterSpacing: "0.04em",
              }}
            >
              FIND THE TRUCK
            </a>
            <span style={{ ...hand, color: INK_SOFT, fontSize: 22 }}>← do this, you'll eat sooner</span>
          </div>
        </div>

        <div className="md:col-span-5 relative h-full min-h-[360px]">
          <Polaroid
            src={olea.hero.image}
            caption="line cook, 2:47pm"
            rotate={3}
            className="absolute right-0 top-0 z-10"
          />
          <Polaroid
            src={olea.dishes[1].image}
            caption="tagliatelle, lamb shoulder"
            rotate={-5}
            className="absolute right-24 top-40"
          />
          <div className="absolute -left-2 bottom-2 z-20">
            <Stamp rotate={-8}>SERVED HOT</Stamp>
          </div>
        </div>
      </section>

      {/* MARQUEE — printed-receipt style, no animation, just hard-edged text */}
      <div
        style={{
          background: INK,
          color: PAPER,
          ...stencil,
          fontSize: 22,
          letterSpacing: "0.08em",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-3 overflow-hidden whitespace-nowrap">
          <span>TODAY → PROSPECT PARK 11:30 ★ INDUSTRY CITY 3:00 ★ DOMINO PARK 6:30 ★ CASH OR CARD ★ NO RESERVATIONS ★ </span>
          <span style={{ color: MUSTARD }}>TODAY → PROSPECT PARK 11:30 ★ INDUSTRY CITY 3:00 ★ DOMINO PARK 6:30 ★</span>
        </div>
      </div>

      {/* TODAY'S MENU — chalkboard panel */}
      <section id="menu" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <h2 style={{ ...display, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95, textTransform: "uppercase" }}>
            What's on
            <br />
            the board.
          </h2>
          <p style={{ ...typewriter, color: INK_SOFT, maxWidth: 260 }}>
            Written this morning. When it's gone, it's gone. Sub anything for slaw, no charge.
          </p>
        </div>

        <div
          className="relative p-6 md:p-10"
          style={{
            background: "#1f2a24",
            color: "#f0eadb",
            boxShadow: "0 18px 0 -10px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.45)",
            border: "8px solid #6b4a2a",
          }}
        >
          <div className="absolute -top-3 left-8">
            <Sticker rotate={-4} bg={MUSTARD} color={INK}>TODAY · {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</Sticker>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6 mt-6">
            {olea.dishes.map((d) => (
              <li key={d.n} className="flex items-baseline gap-4">
                <span style={{ ...marker, color: MUSTARD, fontSize: 28, lineHeight: 1 }}>{d.n}</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span style={{ ...stencil, fontSize: 26, letterSpacing: "0.02em" }}>{d.name}</span>
                    <span style={{ ...mono, fontSize: 18 }}>${d.price}</span>
                  </div>
                  <p style={{ ...typewriter, color: "#cfc6ad", marginTop: 2, fontSize: 14, lineHeight: 1.5 }}>
                    {d.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-dashed border-[#6b4a2a]/70 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div style={{ ...hand, color: MUSTARD, fontSize: 22, lineHeight: 1 }}>chef's deal</div>
              <div style={{ ...stencil, fontSize: 28 }}>{olea.tonight.name.toUpperCase()}</div>
              <div style={{ ...typewriter, color: "#cfc6ad", fontSize: 13, maxWidth: 480 }}>{olea.tonight.description}</div>
            </div>
            <div style={{ ...display, fontSize: 44, color: MUSTARD }}>${olea.tonight.price}</div>
          </div>
        </div>
      </section>

      {/* ROUTE — where we at today */}
      <section id="route" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Stamp rotate={-4}>LIVE · UPDATED 9:42 AM</Stamp>
            <h2 className="mt-4" style={{ ...display, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95, textTransform: "uppercase" }}>
              Where we
              <br />
              <span style={{ color: STAMP }}>at?</span>
            </h2>
            <p className="mt-4 max-w-sm" style={{ ...typewriter, color: INK_SOFT, lineHeight: 1.55 }}>
              We post the route every morning by 10. If it's raining sideways, we don't roll.
              Text <span style={{ ...mono, background: INK, color: PAPER, padding: "1px 6px" }}>OLEA</span> to
              <span style={{ ...mono }}> 347-555-0142</span> for same-day updates.
            </p>
          </div>

          <ol className="md:col-span-7 space-y-3">
            {today.map((t, i) => (
              <li
                key={i}
                className="flex items-stretch gap-4 p-4 relative"
                style={{
                  background: i === 0 ? INK : "transparent",
                  color: i === 0 ? PAPER : INK,
                  border: `2px solid ${INK}`,
                  transform: `rotate(${i % 2 === 0 ? -0.3 : 0.4}deg)`,
                }}
              >
                <div style={{ ...display, fontSize: 28, minWidth: 110 }}>{t.time}</div>
                <div className="flex-1">
                  <div style={{ ...stencil, fontSize: 22, letterSpacing: "0.02em" }}>{t.spot}</div>
                  <div style={{ ...typewriter, fontSize: 13, opacity: 0.85 }}>
                    {t.status === "now" ? "open right now — come thru" : t.status === "next" ? "rolling there next" : "evening service"}
                  </div>
                </div>
                {i === 0 && (
                  <span
                    className="absolute -top-3 -right-3"
                    style={{
                      ...stencil,
                      background: MUSTARD,
                      color: INK,
                      padding: "2px 8px",
                      fontSize: 14,
                      transform: "rotate(8deg)",
                    }}
                  >
                    NOW
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* week strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-7 border-2 border-[color:var(--ink)]" style={{ ["--ink" as never]: INK }}>
          {week.map((w, i) => (
            <div
              key={w.day}
              className="p-3"
              style={{
                borderRight: i < week.length - 1 ? `1px dashed ${INK_SOFT}` : "none",
                borderBottom: `1px dashed ${INK_SOFT}`,
                background: i === new Date().getDay() - 1 ? MUSTARD : "transparent",
              }}
            >
              <div style={{ ...display, fontSize: 16 }}>{w.day}</div>
              <div style={{ ...typewriter, fontSize: 12, color: INK_SOFT, lineHeight: 1.4 }}>{w.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CREW — chef, but loose */}
      <section id="crew" className="mx-auto max-w-6xl px-5 py-16 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 relative">
          <Polaroid src={olea.chef.portrait} caption={`${olea.chef.name.toLowerCase()}, behind the pass`} rotate={-3} />
          <div className="absolute top-4 -right-2">
            <Stamp rotate={10} color={INK}>SINCE DAY 1</Stamp>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 style={{ ...display, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, textTransform: "uppercase" }}>
            Two cooks,
            <br />
            one window.
          </h2>
          <p className="mt-5" style={{ ...typewriter, fontSize: 16, lineHeight: 1.6, color: INK_SOFT, maxWidth: 560 }}>
            {olea.chef.bio[0]}
          </p>
          <p className="mt-3" style={{ ...typewriter, fontSize: 16, lineHeight: 1.6, color: INK_SOFT, maxWidth: 560 }}>
            {olea.chef.bio[1]}
          </p>
          <blockquote
            className="mt-6 pl-4"
            style={{
              ...hand,
              fontSize: 28,
              color: INK,
              borderLeft: `4px solid ${STAMP}`,
              lineHeight: 1.2,
              maxWidth: 480,
            }}
          >
            "{olea.chef.quote}"
            <footer style={{ ...mono, fontSize: 12, color: INK_SOFT, marginTop: 8 }}>— {olea.chef.name}</footer>
          </blockquote>

          <ul className="mt-6 flex flex-wrap gap-2">
            {olea.chef.credentials.map((c, i) => (
              <li key={c}>
                <Sticker rotate={i % 2 === 0 ? -1.5 : 1.5} bg={PAPER_DARK} color={INK}>
                  {c}
                </Sticker>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRESS — handwritten scrawl, not a logo wall */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <Dashed />
        <div className="py-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span style={{ ...display, fontSize: 16, textTransform: "uppercase" }}>People said nice things →</span>
          {olea.press.map((p) => (
            <span key={p} style={{ ...hand, fontSize: 24, color: INK_SOFT }}>
              {p},
            </span>
          ))}
          <span style={{ ...hand, fontSize: 24, color: INK }}>and our mom.</span>
        </div>
        <Dashed />
      </section>

      {/* TIP JAR + holler */}
      <section id="holler" className="mx-auto max-w-6xl px-5 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <h2 style={{ ...display, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, textTransform: "uppercase" }}>
            Holler
            <br />
            at us.
          </h2>
          <p className="mt-4 max-w-md" style={{ ...typewriter, color: INK_SOFT, lineHeight: 1.55 }}>
            Want us at your block party, wedding, warehouse opening, weird birthday?
            Drop a line — we read everything and write back, usually after service.
          </p>

          <form
            className="mt-6 grid sm:grid-cols-2 gap-3 max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              setTips((n) => n + 1);
            }}
          >
            <input
              required
              placeholder="your name"
              className="px-3 py-3 bg-transparent border-b-2 outline-none"
              style={{ ...typewriter, borderColor: INK, fontSize: 16 }}
            />
            <input
              required
              type="email"
              placeholder="email"
              className="px-3 py-3 bg-transparent border-b-2 outline-none"
              style={{ ...typewriter, borderColor: INK, fontSize: 16 }}
            />
            <textarea
              required
              placeholder="what're we cooking? when? how many mouths?"
              rows={3}
              className="sm:col-span-2 px-3 py-3 bg-transparent border-2 outline-none resize-none"
              style={{ ...typewriter, borderColor: INK, fontSize: 15 }}
            />
            <button
              type="submit"
              className="sm:col-span-2 justify-self-start px-5 py-3"
              style={{
                ...display,
                background: INK,
                color: PAPER,
                fontSize: 18,
                letterSpacing: "0.04em",
                boxShadow: "4px 4px 0 " + MUSTARD,
              }}
            >
              SEND IT →
            </button>
          </form>
        </div>

        <aside
          className="md:col-span-5 p-6 relative"
          style={{
            background: PAPER_DARK,
            border: `2px solid ${INK}`,
            transform: "rotate(0.4deg)",
          }}
        >
          <div className="absolute -top-3 left-6">
            <Sticker rotate={-3} bg={INK} color={PAPER}>VISIT THE COMMISSARY</Sticker>
          </div>
          <div className="mt-3 space-y-2" style={{ ...mono, fontSize: 14 }}>
            <div>{olea.visit.address[0]}</div>
            <div>{olea.visit.address[1]}</div>
            <div className="pt-2">{olea.visit.phone}</div>
            <div>{olea.visit.email}</div>
          </div>
          <div className="mt-5 pt-4 border-t border-dashed" style={{ borderColor: INK_SOFT }}>
            <div style={{ ...stencil, fontSize: 18 }}>WINDOW HOURS</div>
            <ul className="mt-1" style={{ ...mono, fontSize: 13 }}>
              {olea.visit.hours.map(([d, h]) => (
                <li key={d} className="flex justify-between">
                  <span>{d}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setTips((n) => n + 1)}
            className="mt-5 w-full text-left px-4 py-3 flex items-center justify-between"
            style={{
              ...display,
              background: MUSTARD,
              color: INK,
              fontSize: 16,
              border: `2px solid ${INK}`,
            }}
          >
            <span>TIP THE COOKS · +$1</span>
            <span style={{ ...mono, fontSize: 12 }}>{tipsLine}</span>
          </button>
        </aside>
      </section>

      {/* FOOTER — receipt cut */}
      <footer style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-6xl px-5 py-10 grid md:grid-cols-3 gap-6 items-start">
          <div>
            <div style={{ ...display, fontSize: 28 }}>OLEA / ON WHEELS</div>
            <div style={{ ...mono, fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              {olea.established} · Brooklyn · plate #87-AZ-119
            </div>
          </div>
          <div style={{ ...mono, fontSize: 13 }}>
            <div className="opacity-60 mb-1">FOLLOW THE TRUCK</div>
            <div>IG {olea.social.instagram}</div>
            <div>TikTok {olea.social.tiktok}</div>
          </div>
          <div style={{ ...mono, fontSize: 13 }}>
            <div className="opacity-60 mb-1">FINE PRINT</div>
            <div>Private events · Gift cards · Careers</div>
            <div className="opacity-60 mt-2">No animals were harmed in the making of this website. The carrots, however —</div>
          </div>
        </div>
        <div
          style={{
            height: 14,
            backgroundImage: `radial-gradient(circle at 7px 0, ${PAPER} 6px, transparent 7px)`,
            backgroundSize: "14px 14px",
            backgroundRepeat: "repeat-x",
          }}
        />
      </footer>
    </main>
  );
}
