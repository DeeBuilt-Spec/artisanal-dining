import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { olea, getStatus } from "@/content/olea";

const black = "#0a0a0a";
const off = "#ededed";
const lime = "#d4ff00";

const display = { fontFamily: "'Archivo Black', sans-serif" } as const;
const condensed = { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" } as const;
const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;
const body = { fontFamily: "Inter, sans-serif" } as const;

function StatusPill() {
  const [s, setS] = useState(() => getStatus());
  useEffect(() => {
    const i = setInterval(() => setS(getStatus()), 60_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 px-2 py-1 text-[10px] uppercase" style={{ ...mono, backgroundColor: s.open ? lime : "#222", color: s.open ? black : off }}>
      <span aria-hidden className="inline-block h-1.5 w-1.5" style={{ backgroundColor: s.open ? black : lime }} />
      [{s.short}]
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-30 border-b" style={{ backgroundColor: black, borderColor: "#222" }}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm" style={{ ...mono, color: lime }}>// {olea.name.toLowerCase()}</Link>
          <span className="hidden md:inline"><StatusPill /></span>
        </div>
        <ul className="hidden md:flex items-center gap-5 text-[11px] uppercase" style={mono}>
          <li><a href="#menu" style={{ color: off }}>[menu]</a></li>
          <li><a href="#chef" style={{ color: off }}>[chef]</a></li>
          <li><a href="#events" style={{ color: off }}>[events]</a></li>
          <li><a href="#visit" style={{ color: off }}>[visit]</a></li>
          <li><a href={olea.links.reserve} style={{ color: off }}>[reserve]</a></li>
          <li>
            <a href={olea.links.orderOnline} className="inline-block px-3 py-1.5" style={{ backgroundColor: lime, color: black }}>
              ORDER ONLINE →
            </a>
          </li>
        </ul>
        <button className="md:hidden text-[11px] uppercase" style={{ ...mono, color: lime }} onClick={() => setOpen(!open)}>
          {open ? "[x]" : "[≡]"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-5 space-y-3" style={{ ...mono, color: off }}>
          {["Menu", "Chef", "Events", "Visit", "Reserve"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block text-base uppercase" onClick={() => setOpen(false)}>[{l}]</a>
          ))}
          <a href={olea.links.orderOnline} className="block text-center px-3 py-2.5 text-sm" style={{ backgroundColor: lime, color: black }}>
            ORDER ONLINE →
          </a>
          <div className="pt-2"><StatusPill /></div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden" style={{ backgroundColor: black, color: off }}>
      <div className="px-4 md:px-8 pt-10 md:pt-16 pb-8">
        <div className="flex items-center justify-between text-[11px] uppercase mb-8" style={mono}>
          <span style={{ color: lime }}>EST. 2025 / SEASONAL KITCHEN</span>
          <span className="hidden md:inline">N 40.6782° / W 73.9442°</span>
        </div>

        <div className="relative">
          <h1
            className="leading-[0.78] tracking-tight uppercase"
            style={{ ...display, fontSize: "clamp(96px, 28vw, 380px)", color: off }}
          >
            {olea.name}
          </h1>
          <span
            className="absolute -bottom-2 md:bottom-4 right-0 md:right-12 inline-block px-3 py-1 rotate-[-4deg] text-sm md:text-base"
            style={{ backgroundColor: lime, color: black, ...mono }}
          >
            no reservations &gt; walk in
          </span>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5 aspect-[4/5] md:aspect-[3/4] overflow-hidden order-2 md:order-1">
            <img src={olea.hero.image} alt="" className="h-full w-full object-cover grayscale contrast-125" />
          </div>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
            <p className="text-xl md:text-3xl leading-[1.2] uppercase" style={condensed}>
              {olea.positioning}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={olea.links.orderOnline} className="inline-block px-4 py-2.5 text-sm uppercase" style={{ ...mono, backgroundColor: lime, color: black }}>
                Order online →
              </a>
              <a href={olea.links.reserve} className="inline-block px-4 py-2.5 text-sm uppercase border" style={{ ...mono, borderColor: off, color: off }}>
                [book a table]
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-y py-3 overflow-hidden whitespace-nowrap" style={{ backgroundColor: lime, borderColor: black, color: black }}>
        <div className="inline-block animate-[marquee_28s_linear_infinite]" style={mono}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-sm uppercase tracking-widest">
              ★ open kitchen ★ no script ★ no second location ★ wood fire ★ short menu ★ loud music ★
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @keyframes marqueeSlow { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </header>
  );
}

function Tonight() {
  return (
    <section className="px-4 md:px-8 py-10 md:py-14 border-b-2" style={{ backgroundColor: black, color: off, borderColor: off }}>
      <div className="grid md:grid-cols-12 gap-6 items-center">
        <p className="md:col-span-2 text-[11px] uppercase" style={{ ...mono, color: lime }}>[ TONIGHT ]</p>
        <h2 className="md:col-span-7 uppercase leading-[0.9]" style={{ ...condensed, fontSize: "clamp(36px, 7vw, 100px)" }}>
          {olea.tonight.name}
        </h2>
        <div className="md:col-span-3 md:text-right">
          <p className="text-xs uppercase mb-3 opacity-70" style={mono}>${olea.tonight.price} / person</p>
          <a href={olea.links.orderOnline} className="inline-block px-4 py-2 text-sm uppercase" style={{ ...mono, backgroundColor: lime, color: black }}>
            Add to order →
          </a>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-sm opacity-80" style={body}>{olea.tonight.description}</p>
    </section>
  );
}

function Menu() {
  return (
    <section id="menu" className="py-16 md:py-28" style={{ backgroundColor: black, color: off }}>
      <div className="px-4 md:px-8 mb-12 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
        <h2 className="uppercase leading-[0.85]" style={{ ...display, fontSize: "clamp(48px, 11vw, 160px)" }}>
          The<br />Menu.
        </h2>
        <p className="text-xs uppercase max-w-xs" style={mono}>
          [04] dishes / changes weekly / chef picks only
        </p>
      </div>

      <ol className="border-t-2" style={{ borderColor: off }}>
        {olea.dishes.map((d) => (
          <li key={d.n} className="group border-b-2 transition-colors" style={{ borderColor: off }}>
            <a href="#reserve" className="block px-4 md:px-8 py-6 md:py-10 grid grid-cols-12 gap-3 md:gap-6 items-baseline hover:bg-[var(--lime)]" style={{ ["--lime" as any]: lime }}>
              <span className="col-span-2 md:col-span-1 text-2xl md:text-5xl group-hover:text-black" style={{ ...mono, color: lime }}>
                {d.n}
              </span>
              <span className="col-span-10 md:col-span-8 uppercase leading-[0.9] group-hover:text-black" style={{ ...condensed, fontSize: "clamp(40px, 8vw, 110px)" }}>
                {d.name}
              </span>
              <span className="col-span-12 md:col-span-2 text-sm leading-snug group-hover:text-black opacity-70 group-hover:opacity-100 hidden md:block" style={body}>
                {d.desc}
              </span>
              <span className="col-span-12 md:col-span-1 md:text-right text-base group-hover:text-black" style={mono}>${d.price}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Chef() {
  return (
    <section id="chef" className="relative overflow-hidden py-16 md:py-28 px-4 md:px-8" style={{ backgroundColor: off, color: black }}>
      <p className="text-xs uppercase mb-6" style={mono}>// meet the chef</p>
      <h2 className="uppercase leading-[0.82]" style={{ ...condensed, fontSize: "clamp(72px, 18vw, 260px)" }}>
        {olea.chef.name}
      </h2>
      <div className="mt-10 md:mt-12 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={olea.chef.portrait} alt={olea.chef.name} className="h-full w-full object-cover grayscale contrast-125" />
          </div>
          <span className="inline-block mt-4 px-2 py-1 rotate-[-3deg] text-[11px]" style={{ ...mono, backgroundColor: black, color: lime }}>
            // 12 yrs / 3 kitchens / 0 stars wanted
          </span>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-xs uppercase mb-6" style={mono}>[ {olea.chef.role.toUpperCase()} ]</p>
          {olea.chef.bio.map((p) => (
            <p key={p} className="text-base md:text-lg leading-relaxed mb-5" style={body}>{p}</p>
          ))}
          <ul className="mt-8 text-xs uppercase space-y-2 border-t-2 pt-6" style={{ ...mono, borderColor: black }}>
            {olea.chef.credentials.map((c, i) => (
              <li key={c}>
                <span style={{ color: black }}>{String(i + 1).padStart(2, "0")} /</span> {c}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-2xl md:text-3xl uppercase leading-tight" style={condensed}>
            "{olea.chef.quote}"
          </p>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="py-16 md:py-28" style={{ backgroundColor: black, color: off }}>
      <div className="px-4 md:px-8 mb-10 md:mb-14 flex items-end justify-between gap-6 flex-wrap">
        <h2 className="uppercase leading-[0.85]" style={{ ...display, fontSize: "clamp(48px, 11vw, 160px)" }}>
          Events.
        </h2>
        <p className="text-xs uppercase" style={{ ...mono, color: lime }}>// book ahead</p>
      </div>
      <ol className="border-t-2" style={{ borderColor: off }}>
        {olea.events.map((e, i) => (
          <li key={e.title} className="group border-b-2" style={{ borderColor: off }}>
            <a href={e.href} className="block px-4 md:px-8 py-6 md:py-8 grid grid-cols-12 gap-3 md:gap-6 items-baseline hover:bg-[var(--lime)]" style={{ ["--lime" as any]: lime }}>
              <span className="col-span-3 md:col-span-2 text-sm md:text-base group-hover:text-black" style={{ ...mono, color: lime }}>
                EVT/{String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-9 md:col-span-6 uppercase leading-[0.95] group-hover:text-black" style={{ ...condensed, fontSize: "clamp(28px, 5vw, 64px)" }}>
                {e.title}
              </span>
              <span className="col-span-8 md:col-span-3 text-sm group-hover:text-black opacity-80 group-hover:opacity-100" style={mono}>
                {e.date}
              </span>
              <span className="col-span-4 md:col-span-1 md:text-right text-xs uppercase group-hover:text-black" style={mono}>
                [book]
              </span>
              <span className="col-span-12 text-sm opacity-70 group-hover:text-black group-hover:opacity-100 hidden md:block" style={body}>
                {e.description}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: off, color: black }}>
      <span className="absolute top-8 right-4 md:right-12 inline-block px-3 py-1 rotate-[6deg] text-sm" style={{ backgroundColor: black, color: lime, ...mono }}>
        // since day one
      </span>
      <div className="grid md:grid-cols-12 gap-8 md:gap-12">
        <h2 className="md:col-span-5 uppercase leading-[0.85]" style={{ ...display, fontSize: "clamp(48px, 9vw, 130px)" }}>
          Six<br />Seats.<br />One<br />Counter.
        </h2>
        <div className="md:col-span-6 md:col-start-7 space-y-6 text-base md:text-lg leading-relaxed" style={body}>
          <p>{olea.story[0]}</p>
          <p>{olea.story[1]}</p>
          <p className="text-xs uppercase pt-4 border-t border-black/20" style={mono}>— the chef</p>
        </div>
      </div>
    </section>
  );
}

function Press() {
  return (
    <div className="border-y-2 py-3 overflow-hidden whitespace-nowrap" style={{ backgroundColor: black, borderColor: off, color: off }}>
      <div className="inline-block animate-[marqueeSlow_40s_linear_infinite]" style={mono}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mx-6 text-sm uppercase tracking-widest">
            {olea.press.map((p) => <span key={p} className="mx-6"><span style={{ color: lime }}>★</span> {p}</span>)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-20 md:py-32 px-4 md:px-8" style={{ backgroundColor: black, color: off }}>
      <p className="text-xs uppercase mb-8" style={{ ...mono, color: lime }}>// find us</p>
      <h2 className="uppercase leading-[0.85] mb-12 md:mb-16" style={{ ...display, fontSize: "clamp(56px, 14vw, 200px)" }}>
        {olea.visit.address[0]}
      </h2>
      <div className="grid md:grid-cols-12 gap-8 border-t-2 pt-8 md:pt-12" style={{ borderColor: off }}>
        <div className="md:col-span-4">
          <p className="text-xs uppercase mb-3 opacity-60" style={mono}>[location]</p>
          <address className="not-italic text-xl uppercase leading-tight" style={condensed}>
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="mt-4 text-sm" style={mono}>{olea.visit.phone}</p>
        </div>
        <div className="md:col-span-5">
          <p className="text-xs uppercase mb-3 opacity-60" style={mono}>[hours]</p>
          <table className="w-full" style={mono}>
            <tbody>
              {olea.visit.hours.map(([d, h]) => (
                <tr key={d} className="border-b border-white/10">
                  <td className="py-3 text-sm uppercase">{d}</td>
                  <td className="py-3 text-sm text-right" style={{ color: lime }}>{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase mb-3 opacity-60" style={mono}>[contact]</p>
          <p className="text-sm" style={mono}>{olea.visit.email}</p>
          <p className="text-sm mt-3" style={mono}>{olea.social.instagram}</p>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-4 md:px-8 py-14 md:py-20" style={{ backgroundColor: black, color: off, borderTop: `2px solid ${off}` }}>
      <div className="grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6">
          <p className="text-xs uppercase mb-3" style={{ ...mono, color: lime }}>// join the list</p>
          <h3 className="uppercase leading-[0.9]" style={{ ...condensed, fontSize: "clamp(36px, 6vw, 80px)" }}>
            Get the menu when it changes.
          </h3>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="md:col-span-6 flex gap-0 border-2" style={{ borderColor: off }}>
          <input type="email" required placeholder="your@email" className="flex-1 px-4 py-3 bg-transparent outline-none text-sm" style={{ ...mono, color: off }} />
          <button type="submit" className="px-4 md:px-6 py-3 text-sm uppercase" style={{ ...mono, backgroundColor: lime, color: black }}>
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <a id="reserve" href={olea.cta.href} className="block w-full py-12 md:py-20 px-4 md:px-8 text-center hover:bg-black hover:text-[var(--lime)] transition-colors group" style={{ backgroundColor: lime, color: black, ["--lime" as any]: lime }}>
      <span className="uppercase leading-[0.85] block" style={{ ...display, fontSize: "clamp(56px, 14vw, 200px)" }}>
        {olea.cta.label.toUpperCase()} →
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="px-4 md:px-8 py-12" style={{ backgroundColor: black, color: off, ...mono }}>
      <div className="grid md:grid-cols-4 gap-8 text-xs uppercase">
        <div>
          <p style={{ color: lime }}>// {olea.name.toLowerCase()}</p>
          <p className="mt-3 opacity-70">
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <p className="opacity-70 mt-2">{olea.visit.phone}</p>
          <p className="opacity-70">{olea.visit.email}</p>
        </div>
        <div>
          <p className="opacity-60 mb-3">[hours]</p>
          <ul className="space-y-1 opacity-90">
            {olea.visit.hours.map(([d, h]) => (
              <li key={d} className="flex justify-between gap-4"><span>{d}</span><span style={{ color: lime }}>{h}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="opacity-60 mb-3">[more]</p>
          <ul className="space-y-2 opacity-90">
            <li><a href={olea.links.privateDining}>[private dining]</a></li>
            <li><a href={olea.links.giftCards}>[gift cards]</a></li>
            <li><a href={olea.links.careers}>[careers]</a></li>
            <li><a href="#allergens">[allergen notice]</a></li>
          </ul>
        </div>
        <div>
          <p className="opacity-60 mb-3">[follow]</p>
          <ul className="space-y-2 opacity-90">
            <li>IG · {olea.social.instagram}</li>
            <li>TT · {olea.social.tiktok}</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 text-[11px] uppercase opacity-60">
        <span>© {new Date().getFullYear()} / {olea.name} / all rights reserved</span>
        <Link to="/" style={{ color: lime }}>[← directions]</Link>
      </div>
    </footer>
  );
}

export default function Site3Edgy() {
  return (
    <div style={{ backgroundColor: black }}>
      <Nav />
      <Hero />
      <Tonight />
      <Menu />
      <Chef />
      <Events />
      <Story />
      <Press />
      <Visit />
      <Newsletter />
      <CTA />
      <Footer />
    </div>
  );
}
