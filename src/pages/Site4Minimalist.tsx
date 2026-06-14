import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { olea, getStatus } from "@/content/olea";

const ink = "#111111";
const grey = "#888888";
const rule = "#e6e6e6";

const base = {
  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
  fontFeatureSettings: "'tnum' 1, 'ss01' 1",
} as const;

function Status() {
  const [s, setS] = useState(() => getStatus());
  useEffect(() => {
    const i = setInterval(() => setS(getStatus()), 60_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 text-[13px]" style={{ color: ink }}>
      <span
        aria-hidden
        className="inline-block"
        style={{ width: 6, height: 6, backgroundColor: s.open ? ink : grey }}
      />
      {s.label}
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-2 md:gap-8 py-10">
      <div
        className="text-[11px] uppercase tracking-[0.18em]"
        style={{ color: grey }}
      >
        {label}
      </div>
      <div className="text-[14px] leading-[1.7]" style={{ color: ink }}>
        {children}
      </div>
    </div>
  );
}

function Hairline() {
  return <div style={{ height: 1, backgroundColor: rule }} />;
}

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex items-baseline gap-4 py-1.5">
      <span className="flex-1">{name}</span>
      <span className="tabular-nums" style={{ color: ink }}>
        {price}
      </span>
    </div>
  );
}

export default function Site4Minimalist() {
  return (
    <main className="min-h-screen" style={{ ...base, backgroundColor: "#ffffff", color: ink }}>
      <div className="mx-auto w-full max-w-[640px] px-6 md:px-0 py-12 md:py-20">
        {/* Nav */}
        <header className="flex flex-wrap items-baseline justify-between gap-3">
          <Link to="/" className="text-[14px]" style={{ color: ink }}>
            {olea.name}
          </Link>
          <Status />
        </header>

        <div className="mt-10"><Hairline /></div>

        {/* Lead */}
        <section className="py-12">
          <p className="text-[18px] leading-[1.55]" style={{ color: ink }}>
            {olea.positioning}
          </p>
          <p className="mt-8 text-[14px]" style={{ color: ink }}>
            <a href={olea.links.orderOnline} className="underline underline-offset-4 decoration-1 hover:opacity-60">
              Order online
            </a>
            <span className="px-2" style={{ color: grey }}>·</span>
            <a href={olea.links.reserve} className="underline underline-offset-4 decoration-1 hover:opacity-60">
              Reserve a table
            </a>
          </p>
        </section>

        <Hairline />

        {/* Single photo */}
        <div className="py-10">
          <img
            src={olea.hero.image}
            alt=""
            width={280}
            height={280}
            loading="lazy"
            className="block"
            style={{ width: 280, height: 280, objectFit: "cover" }}
          />
        </div>

        <Hairline />

        {/* Menu */}
        <Row label="Menu">
          {olea.dishes.map((d) => (
            <PriceRow key={d.n} name={d.name} price={d.price} />
          ))}
          <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${rule}` }}>
            <PriceRow name={olea.tonight.name} price={olea.tonight.price} />
            <p className="mt-1 text-[13px]" style={{ color: grey }}>
              {olea.tonight.description}
            </p>
          </div>
        </Row>

        <Hairline />

        {/* Wine */}
        <Row label="Wine">
          {olea.wines.map((w) => (
            <PriceRow key={w.name} name={w.name} price={w.price} />
          ))}
        </Row>

        <Hairline />

        {/* Chef */}
        <Row label="Chef">
          <p className="text-[14px]">
            {olea.chef.name}, {olea.chef.role}
          </p>
          {olea.chef.bio.map((p, i) => (
            <p key={i} className="mt-3">
              {p}
            </p>
          ))}
          <p className="mt-3 text-[13px]" style={{ color: grey }}>
            {olea.chef.credentials.join(" · ")}
          </p>
        </Row>

        <Hairline />

        {/* Events */}
        <Row label="Events">
          {olea.events.map((e) => (
            <div key={e.title} className="grid grid-cols-[110px_1fr] gap-4 py-2">
              <span className="tabular-nums" style={{ color: grey }}>{e.date}</span>
              <span>
                {e.title}
                <span className="block text-[13px]" style={{ color: grey }}>
                  {e.description}
                </span>
              </span>
            </div>
          ))}
        </Row>

        <Hairline />

        {/* Press */}
        <Row label="Press">
          <p style={{ color: grey }}>{olea.press.join(", ")}</p>
        </Row>

        <Hairline />

        {/* Visit */}
        <Row label="Visit">
          <p>{olea.visit.address.join(", ")}</p>
          <p className="mt-2">
            {olea.visit.hours
              .map(([d, h]) => `${d} ${h}`)
              .join(" · ")}
          </p>
          <p className="mt-2" style={{ color: grey }}>
            {olea.visit.phone} · {olea.visit.email}
          </p>
        </Row>

        <Hairline />

        {/* Newsletter */}
        <Row label="Newsletter">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-baseline gap-4"
          >
            <input
              type="email"
              placeholder="your@email"
              className="flex-1 bg-transparent text-[14px] py-2 outline-none"
              style={{ borderBottom: `1px solid ${ink}`, color: ink }}
            />
            <button
              type="submit"
              className="text-[14px] underline underline-offset-4 decoration-1 hover:opacity-60"
              style={{ color: ink }}
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[13px]" style={{ color: grey }}>
            Sent when the menu changes.
          </p>
        </Row>

        <Hairline />

        {/* Footer */}
        <footer className="py-10 text-[13px]" style={{ color: grey }}>
          <p style={{ color: ink }}>
            {olea.name} · {olea.established}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            <a href={olea.links.privateDining} className="hover:underline underline-offset-4">Private dining</a>
            <span>·</span>
            <a href={olea.links.giftCards} className="hover:underline underline-offset-4">Gift cards</a>
            <span>·</span>
            <a href={olea.links.careers} className="hover:underline underline-offset-4">Careers</a>
            <span>·</span>
            <a href={`https://instagram.com/${olea.social.instagram.replace("@", "")}`} className="hover:underline underline-offset-4">
              Instagram {olea.social.instagram}
            </a>
          </p>
          <p className="mt-3">Please notify us of any allergies.</p>
        </footer>
      </div>
    </main>
  );
}
