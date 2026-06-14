import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { olea, getStatus } from "@/content/olea";

const ink = "#111111";
const grey = "#7a7a7a";
const paper = "#f4f1ec";
const rule = "#e3ddd2";

const sans = {
  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
  fontFeatureSettings: "'tnum' 1, 'ss01' 1",
} as const;

const display = {
  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
  fontWeight: 500,
  letterSpacing: "-0.03em",
} as const;

function Status() {
  const [s, setS] = useState(() => getStatus());
  useEffect(() => {
    const i = setInterval(() => setS(getStatus()), 60_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 text-[12px]" style={{ color: ink }}>
      <span
        aria-hidden
        className="inline-block"
        style={{ width: 6, height: 6, backgroundColor: s.open ? ink : grey }}
      />
      {s.label}
    </span>
  );
}

function Nav() {
  return (
    <nav
      className="sticky top-0 z-30"
      style={{ backgroundColor: paper, borderBottom: `1px solid ${rule}` }}
    >
      <div className="mx-auto max-w-[1080px] px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="text-[14px]" style={{ ...sans, color: ink, letterSpacing: "0.02em" }}>
          {olea.name}
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[13px]" style={{ color: ink }}>
          <li><a href="#tonight" className="hover:opacity-60">Tonight</a></li>
          <li><a href="#chef" className="hover:opacity-60">Chef</a></li>
          <li><a href="#visit" className="hover:opacity-60">Visit</a></li>
        </ul>
        <div className="flex items-center gap-5 text-[13px]">
          <a href={olea.links.reserve} className="hidden md:inline hover:opacity-60" style={{ color: ink }}>
            Reserve
          </a>
          <a
            href={olea.links.orderOnline}
            className="inline-flex items-center px-4 py-2 text-[12px]"
            style={{ backgroundColor: ink, color: paper, letterSpacing: "0.04em" }}
          >
            Order online
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function Site4Minimalist() {
  return (
    <main className="min-h-screen" style={{ ...sans, backgroundColor: paper, color: ink }}>
      <Nav />

      {/* Hero — asymmetric: large mark left, single photo right */}
      <section className="mx-auto max-w-[1080px] px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
          <div className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: grey }}>
              {olea.established} · Brooklyn
            </div>
            <h1
              className="mt-6 text-[64px] md:text-[112px] leading-[0.95]"
              style={display}
            >
              {olea.name}.
            </h1>
            <p
              className="mt-8 max-w-[420px] text-[16px] leading-[1.55]"
              style={{ color: ink }}
            >
              {olea.positioning}
            </p>
            <div className="mt-10 flex items-center gap-6">
              <Status />
              <span style={{ color: rule }}>|</span>
              <a
                href={olea.links.reserve}
                className="text-[13px] underline underline-offset-[6px] decoration-1 hover:opacity-60"
              >
                Reserve a table
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <img
              src={olea.hero.image}
              alt="A plate at Olea"
              loading="lazy"
              className="block w-full"
              style={{ aspectRatio: "4 / 5", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <div style={{ height: 1, backgroundColor: rule }} />
      </div>

      {/* Tonight — one featured offering, nothing else */}
      <section id="tonight" className="mx-auto max-w-[1080px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: grey }}>
            Tonight
          </div>
          <div className="md:col-span-9">
            <h2 className="text-[36px] md:text-[52px] leading-[1.05]" style={display}>
              {olea.tonight.name}
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.6]" style={{ color: ink }}>
              {olea.tonight.description}
            </p>
            <div className="mt-8 flex items-baseline gap-6 text-[13px]">
              <span className="tabular-nums" style={{ color: ink }}>
                ${olea.tonight.price} per guest
              </span>
              <a
                href={olea.links.reserve}
                className="underline underline-offset-[6px] decoration-1 hover:opacity-60"
              >
                Book the tasting
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <div style={{ height: 1, backgroundColor: rule }} />
      </div>

      {/* Chef — short, no portrait */}
      <section id="chef" className="mx-auto max-w-[1080px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: grey }}>
            Chef
          </div>
          <div className="md:col-span-9">
            <p className="max-w-[560px] text-[20px] md:text-[24px] leading-[1.4]" style={{ color: ink }}>
              “{olea.chef.quote}”
            </p>
            <p className="mt-8 text-[13px]" style={{ color: grey }}>
              {olea.chef.name}, {olea.chef.role} · {olea.chef.credentials[0]}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <div style={{ height: 1, backgroundColor: rule }} />
      </div>

      {/* Visit — address + hours, anchored */}
      <section id="visit" className="mx-auto max-w-[1080px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: grey }}>
            Visit
          </div>
          <div className="md:col-span-5">
            <p className="text-[15px] leading-[1.7]" style={{ color: ink }}>
              {olea.visit.address[0]}
              <br />
              {olea.visit.address[1]}
            </p>
            <p className="mt-4 text-[13px]" style={{ color: grey }}>
              {olea.visit.phone}
              <br />
              {olea.visit.email}
            </p>
          </div>
          <div className="md:col-span-4">
            {olea.visit.hours.map(([d, h]) => (
              <div
                key={d}
                className="flex justify-between py-2 text-[13px]"
                style={{ borderBottom: `1px solid ${rule}`, color: ink }}
              >
                <span>{d}</span>
                <span className="tabular-nums" style={{ color: grey }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mx-auto max-w-[1080px] px-6 md:px-10 py-12 flex flex-wrap items-baseline justify-between gap-4 text-[12px]"
        style={{ borderTop: `1px solid ${rule}`, color: grey }}
      >
        <div>
          {olea.name} · {olea.established}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href={olea.links.privateDining} className="hover:underline underline-offset-4">Private dining</a>
          <a href={olea.links.giftCards} className="hover:underline underline-offset-4">Gift cards</a>
          <a href={olea.links.careers} className="hover:underline underline-offset-4">Careers</a>
          <a href={`https://instagram.com/${olea.social.instagram.replace("@", "")}`} className="hover:underline underline-offset-4">
            {olea.social.instagram}
          </a>
        </div>
        <div style={{ color: grey }}>{olea.press.slice(0, 3).join(" · ")}</div>
      </footer>
    </main>
  );
}
