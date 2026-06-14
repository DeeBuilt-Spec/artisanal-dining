import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { olea } from "@/content/olea";

const paper = "#fafaf7";
const ink = "#0c0c0c";
const plum = "#3b1f3b";

function useFadeRise() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll<HTMLElement>("[data-rise]").forEach((node) => {
      node.style.opacity = "0";
      node.style.transform = "translateY(24px)";
      node.style.transition = "opacity 900ms ease-out, transform 900ms ease-out";
      io.observe(node);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function Nav() {
  return (
    <nav className="border-b" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-5 text-[12px]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
        <Link to="/" className="tracking-[0.3em] uppercase" style={{ color: ink }}>{olea.name}</Link>
        <ul className="flex gap-6 md:gap-10 uppercase tracking-[0.2em]">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#story">Journal</a></li>
          <li><a href="#visit">Visit</a></li>
          <li className="hidden md:block"><a href="#reserve" style={{ color: plum }}>Reserve</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: plum }}>
            Volume I · {olea.established}
          </p>
          <h1
            className="leading-[0.92] tracking-tight"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 400,
              fontSize: "clamp(56px, 13vw, 180px)",
              color: ink,
            }}
          >
            {olea.name}
          </h1>
          <div className="mt-8 h-px w-full" style={{ backgroundColor: ink }} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
            {olea.positioning}
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={olea.hero.portrait} alt="" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: "#666" }}>Plate № 01 — Chef's counter</p>
        </div>
      </div>
    </header>
  );
}

function Menu() {
  const ref = useFadeRise();
  return (
    <section id="menu" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24" data-rise>
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.4em]" style={{ color: plum }}>The Menu</p>
          <h2 className="md:col-span-9 leading-[1] tracking-tight" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 6vw, 80px)", color: ink, fontWeight: 400 }}>
            A short list, written each morning.
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-x-12 gap-y-2" data-rise>
          <div className="md:col-span-7">
            <ul>
              {olea.dishes.map((d, i) => (
                <li key={d.n} className="grid grid-cols-12 gap-4 py-8 border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
                  <span className="col-span-1 text-[11px] tracking-[0.3em] mt-2" style={{ color: "#888" }}>{d.n}</span>
                  <div className="col-span-9">
                    <h3 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif", color: ink, fontWeight: 400 }}>{d.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: "#444" }}>{d.desc}</p>
                  </div>
                  <span className="col-span-2 text-right text-base mt-2" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{d.price}</span>
                </li>
              ))}
              <li className="border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }} />
            </ul>
          </div>
          <aside className="md:col-span-4 md:col-start-9 hidden md:block">
            <div className="sticky top-10">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={olea.hero.detail} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-sm italic max-w-xs leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: plum }}>
                "We cook what is ripe this week. Nothing else."
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const ref = useFadeRise();
  return (
    <section id="story" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-3xl" data-rise>
        <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: plum }}>Journal · No. 1</p>
        <p className="text-lg md:text-xl leading-[1.7] mb-8" style={{ fontFamily: "Inter Tight, sans-serif", color: ink, textAlign: "justify" }}>
          {olea.story[0]}
        </p>
        <blockquote className="my-10 pl-6 border-l-2 italic text-2xl md:text-3xl leading-snug" style={{ borderColor: plum, fontFamily: "Playfair Display, serif", color: plum }}>
          There is no manager, no script, and no second location.
        </blockquote>
        <p className="text-lg md:text-xl leading-[1.7]" style={{ fontFamily: "Inter Tight, sans-serif", color: ink, textAlign: "justify" }}>
          {olea.story[1]}
        </p>
      </div>
    </section>
  );
}

function Visit() {
  const ref = useFadeRise();
  return (
    <section id="visit" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl" data-rise>
        <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: plum }}>Visit</p>
        <h2 className="leading-[0.95] tracking-tight mb-16" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px, 7vw, 96px)", color: ink, fontWeight: 400 }}>
          Reserve a counter seat.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 border-t pt-12" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888" }}>Address</p>
            <address className="not-italic text-lg leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
              {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888" }}>Hours</p>
            <ul className="text-lg space-y-1" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
              {olea.visit.hours.map(([d, h]) => (
                <li key={d} className="flex justify-between gap-4"><span>{d}</span><span style={{ color: "#666" }}>{h}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888" }}>Contact</p>
            <p className="text-lg" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{olea.visit.phone}</p>
            <p className="text-lg mt-1" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{olea.visit.email}</p>
            <a id="reserve" href={olea.cta.href} className="mt-8 inline-block uppercase tracking-[0.3em] text-[12px] pb-1 border-b" style={{ borderColor: plum, color: plum }}>
              {olea.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t flex flex-wrap justify-between gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ borderColor: "rgba(12,12,12,0.18)", color: "#666", fontFamily: "Inter Tight, sans-serif" }}>
      <span>© {new Date().getFullYear()} {olea.name}</span>
      <Link to="/" className="hover:text-black">← Directions</Link>
    </footer>
  );
}

export default function Site2Boutique() {
  return (
    <div style={{ backgroundColor: paper, color: ink, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Menu />
      <Story />
      <Visit />
      <Footer />
    </div>
  );
}
