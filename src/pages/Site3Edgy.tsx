import { Link } from "react-router-dom";
import { olea } from "@/content/olea";

const black = "#0a0a0a";
const off = "#ededed";
const lime = "#d4ff00";

const display = { fontFamily: "'Archivo Black', sans-serif" } as const;
const condensed = { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" } as const;
const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;
const body = { fontFamily: "Inter, sans-serif" } as const;

function Nav() {
  return (
    <nav className="sticky top-0 z-30 border-b" style={{ backgroundColor: black, borderColor: "#222" }}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link to="/" className="text-sm" style={{ ...mono, color: lime }}>// {olea.name.toLowerCase()}</Link>
        <ul className="flex gap-4 md:gap-8 text-[11px] uppercase" style={mono}>
          <li><a href="#menu" style={{ color: off }}>[menu]</a></li>
          <li><a href="#story" style={{ color: off }}>[story]</a></li>
          <li><a href="#visit" style={{ color: off }}>[visit]</a></li>
          <li className="hidden md:block"><a href="#reserve" style={{ color: lime }}>[book]</a></li>
        </ul>
      </div>
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
            style={{
              ...display,
              fontSize: "clamp(96px, 28vw, 380px)",
              color: off,
            }}
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
          <p className="md:col-span-6 md:col-start-7 order-1 md:order-2 text-xl md:text-3xl leading-[1.2] uppercase" style={condensed}>
            {olea.positioning}
          </p>
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
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </header>
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
          <li
            key={d.n}
            className="group border-b-2 transition-colors"
            style={{ borderColor: off }}
          >
            <a href="#reserve" className="block px-4 md:px-8 py-6 md:py-10 grid grid-cols-12 gap-3 md:gap-6 items-baseline hover:bg-[var(--lime)]" style={{ ["--lime" as any]: lime }}>
              <span className="col-span-2 md:col-span-1 text-2xl md:text-5xl group-hover:text-black" style={{ ...mono, color: lime }}>
                {d.n}
              </span>
              <span className="col-span-10 md:col-span-7 uppercase leading-[0.9] group-hover:text-black" style={{ ...condensed, fontSize: "clamp(32px, 6vw, 88px)" }}>
                {d.name}
              </span>
              <span className="col-span-12 md:col-span-3 text-sm leading-snug group-hover:text-black opacity-70 group-hover:opacity-100" style={body}>
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
        </div>
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
    <footer className="px-4 md:px-8 py-8 flex flex-wrap justify-between gap-4 text-[11px] uppercase" style={{ backgroundColor: black, color: off, ...mono }}>
      <span>© {new Date().getFullYear()} / {olea.name} / all rights reserved</span>
      <Link to="/" style={{ color: lime }}>[← directions]</Link>
    </footer>
  );
}

export default function Site3Edgy() {
  return (
    <div style={{ backgroundColor: black }}>
      <Nav />
      <Hero />
      <Menu />
      <Story />
      <Visit />
      <CTA />
      <Footer />
    </div>
  );
}
