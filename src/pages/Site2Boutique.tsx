import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { olea, getStatus } from "@/content/olea";

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

function StatusPill() {
  const [s, setS] = useState(() => getStatus());
  useEffect(() => {
    const i = setInterval(() => setS(getStatus()), 60_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.open ? plum : "#999" }} />
      {s.short}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-30 border-b" style={{ borderColor: "rgba(12,12,12,0.12)", backgroundColor: paper }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-4 text-[12px]" style={{ fontFamily: "Inter Tight, sans-serif" }}>
        <div className="flex items-center gap-6">
          <Link to="/" className="tracking-[0.3em] uppercase" style={{ color: ink }}>{olea.name}</Link>
          <span className="hidden md:inline-block"><StatusPill /></span>
        </div>
        <ul className="hidden md:flex items-center gap-7 uppercase tracking-[0.2em]">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#chef">Chef</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#visit">Visit</a></li>
          <li><a href={olea.links.reserve} style={{ color: plum }}>Reserve</a></li>
          <li>
            <a href={olea.links.orderOnline} className="inline-block px-3 py-2 border" style={{ borderColor: ink, color: ink }}>
              Order online
            </a>
          </li>
        </ul>
        <button className="md:hidden uppercase tracking-[0.2em]" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4 border-t" style={{ borderColor: "rgba(12,12,12,0.12)", fontFamily: "Inter Tight, sans-serif" }}>
          {["Menu", "Chef", "Events", "Visit"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block text-xl uppercase tracking-[0.15em]" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href={olea.links.reserve} className="block text-xl" style={{ color: plum }}>Reserve</a>
          <a href={olea.links.orderOnline} className="block w-full text-center px-3 py-3 border uppercase tracking-[0.2em]" style={{ borderColor: ink }}>Order online</a>
          <div className="pt-2"><StatusPill /></div>
        </div>
      )}
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
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 400, fontSize: "clamp(56px, 13vw, 180px)", color: ink }}
          >
            {olea.name}
          </h1>
          <div className="mt-8 h-px w-full" style={{ backgroundColor: ink }} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
            {olea.positioning}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href={olea.links.orderOnline} className="inline-block px-5 py-3 text-[11px] uppercase tracking-[0.3em] border" style={{ borderColor: ink, color: ink, fontFamily: "Inter Tight, sans-serif" }}>
              Order online
            </a>
            <a href={olea.links.reserve} className="text-[11px] uppercase tracking-[0.3em] pb-1 border-b" style={{ borderColor: plum, color: plum, fontFamily: "Inter Tight, sans-serif" }}>
              Reserve a table
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={olea.hero.portrait} alt="" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: "#666", fontFamily: "Inter Tight, sans-serif" }}>Plate № 01 — Chef's counter</p>
        </div>
      </div>
    </header>
  );
}

function Tonight() {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-6 items-center">
        <p className="md:col-span-2 text-[11px] uppercase tracking-[0.4em]" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>{olea.tonight.label}</p>
        <h2 className="md:col-span-7 text-2xl md:text-4xl leading-tight" style={{ fontFamily: "Playfair Display, serif", color: ink, fontWeight: 400 }}>
          {olea.tonight.name} <span className="opacity-50">— ${olea.tonight.price}</span>
        </h2>
        <a href={olea.links.reserve} className="md:col-span-3 md:text-right text-[11px] uppercase tracking-[0.3em] pb-1 border-b inline-block w-fit md:ml-auto" style={{ borderColor: plum, color: plum, fontFamily: "Inter Tight, sans-serif" }}>
          Book the tasting →
        </a>
      </div>
    </section>
  );
}

function Menu() {
  const ref = useFadeRise();
  return (
    <section id="menu" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24" data-rise>
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.4em]" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>The Menu</p>
          <h2 className="md:col-span-9 leading-[1] tracking-tight" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 6vw, 80px)", color: ink, fontWeight: 400 }}>
            A short list, written each morning.
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-x-12 gap-y-2" data-rise>
          <div className="md:col-span-8 md:col-start-3">
            <ul>
              {olea.dishes.map((d) => (
                <li key={d.n} className="grid grid-cols-12 gap-4 py-8 border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
                  <span className="col-span-1 text-[11px] tracking-[0.3em] mt-2" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>{d.n}</span>
                  <div className="col-span-9">
                    <h3 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif", color: ink, fontWeight: 400 }}>{d.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: "#444" }}>{d.desc}</p>
                  </div>
                  <span className="col-span-2 text-right text-base mt-2" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{d.price}</span>
                </li>
              ))}
              <li className="border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }} />
            </ul>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em]" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>
              Wine pairings available · Allergens on request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chef() {
  const ref = useFadeRise();
  return (
    <section id="chef" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-10 md:gap-16 items-start" data-rise>
        <div className="md:col-span-7 md:order-2">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={olea.chef.portrait} alt={olea.chef.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-5 md:order-1">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>Meet the chef</p>
          <h2 className="leading-[0.95] tracking-tight mb-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px, 6vw, 80px)", color: ink, fontWeight: 400 }}>
            {olea.chef.name}
          </h2>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>{olea.chef.role}</p>
          {olea.chef.bio.map((p, i) => (
            <div key={i} className="pb-5 mb-5 border-b" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
              <p className="text-base leading-[1.7]" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{p}</p>
            </div>
          ))}
          <blockquote className="my-8 pl-6 border-l-2 italic text-2xl leading-snug" style={{ borderColor: plum, fontFamily: "Playfair Display, serif", color: plum }}>
            "{olea.chef.quote}"
          </blockquote>
          <ul className="text-[11px] uppercase tracking-[0.3em] space-y-1" style={{ color: "#666", fontFamily: "Inter Tight, sans-serif" }}>
            {olea.chef.credentials.map((c) => <li key={c}>— {c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Events() {
  const ref = useFadeRise();
  return (
    <section id="events" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl" data-rise>
        <div className="grid md:grid-cols-12 gap-8 mb-12 md:mb-16">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.4em]" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>Calendar</p>
          <h2 className="md:col-span-9 leading-[1] tracking-tight" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 6vw, 80px)", color: ink, fontWeight: 400 }}>
            Upcoming evenings.
          </h2>
        </div>
        <ul>
          {olea.events.map((e) => (
            <li key={e.title} className="grid grid-cols-12 gap-4 py-8 border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
              <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.3em] md:mt-2" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>{e.date}</p>
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-2xl md:text-3xl mb-1" style={{ fontFamily: "Playfair Display, serif", color: ink, fontWeight: 400 }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: "#444" }}>{e.description}</p>
              </div>
              <a href={e.href} className="col-span-12 md:col-span-3 md:text-right text-[11px] uppercase tracking-[0.3em] md:mt-2" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>
                Reserve seat →
              </a>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: "rgba(12,12,12,0.18)" }} />
        </ul>
      </div>
    </section>
  );
}

function Story() {
  const ref = useFadeRise();
  return (
    <section id="story" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-3xl" data-rise>
        <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>Journal · No. 1</p>
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

function Press() {
  return (
    <section className="px-6 md:px-10 py-12 border-t border-b" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
      <p className="mx-auto max-w-5xl italic text-center text-base md:text-lg leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: plum, fontWeight: 400 }}>
        {olea.press.join(" · ")}
      </p>
    </section>
  );
}

function Visit() {
  const ref = useFadeRise();
  return (
    <section id="visit" ref={ref} className="px-6 md:px-10 py-20 md:py-32 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-7xl" data-rise>
        <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>Visit</p>
        <h2 className="leading-[0.95] tracking-tight mb-16" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px, 7vw, 96px)", color: ink, fontWeight: 400 }}>
          Reserve a counter seat.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 border-t pt-12" style={{ borderColor: "rgba(12,12,12,0.18)" }}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>Address</p>
            <address className="not-italic text-lg leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
              {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>Hours</p>
            <ul className="text-lg space-y-1" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>
              {olea.visit.hours.map(([d, h]) => (
                <li key={d} className="flex justify-between gap-4"><span>{d}</span><span style={{ color: "#666" }}>{h}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#888", fontFamily: "Inter Tight, sans-serif" }}>Contact</p>
            <p className="text-lg" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{olea.visit.phone}</p>
            <p className="text-lg mt-1" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }}>{olea.visit.email}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a id="reserve" href={olea.cta.href} className="text-[11px] uppercase tracking-[0.3em] pb-1 border-b" style={{ borderColor: plum, color: plum, fontFamily: "Inter Tight, sans-serif" }}>
                {olea.cta.label}
              </a>
              <a href={olea.links.orderOnline} className="px-3 py-2 text-[11px] uppercase tracking-[0.3em] border" style={{ borderColor: ink, color: ink, fontFamily: "Inter Tight, sans-serif" }}>
                Order online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t" style={{ borderColor: "rgba(12,12,12,0.12)" }}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: plum, fontFamily: "Inter Tight, sans-serif" }}>Mailing list</p>
        <h3 className="text-3xl md:text-5xl mb-3 leading-tight" style={{ fontFamily: "Playfair Display, serif", color: ink, fontWeight: 400 }}>
          The menu, when it changes.
        </h3>
        <p className="text-sm mb-8" style={{ fontFamily: "Inter Tight, sans-serif", color: "#666" }}>Once or twice a month.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border" style={{ borderColor: ink }}>
          <input type="email" required placeholder="your@email.com" className="flex-1 px-4 py-3 bg-transparent outline-none" style={{ fontFamily: "Inter Tight, sans-serif", color: ink }} />
          <button type="submit" className="px-5 py-3 text-[11px] uppercase tracking-[0.3em]" style={{ backgroundColor: ink, color: paper, fontFamily: "Inter Tight, sans-serif" }}>
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-14 border-t" style={{ borderColor: "rgba(12,12,12,0.18)", color: ink, fontFamily: "Inter Tight, sans-serif" }}>
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-10">
        <div>
          <p className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{olea.name}</p>
          <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <p className="text-sm mt-2" style={{ color: "#444" }}>{olea.visit.phone}</p>
          <p className="text-sm" style={{ color: "#444" }}>{olea.visit.email}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: "#888" }}>Hours</p>
          <ul className="text-sm space-y-1">
            {olea.visit.hours.map(([d, h]) => (
              <li key={d} className="flex justify-between gap-4"><span>{d}</span><span style={{ color: "#666" }}>{h}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: "#888" }}>More</p>
          <ul className="text-sm space-y-2">
            <li><a href={olea.links.privateDining} className="hover:underline">Private dining</a></li>
            <li><a href={olea.links.giftCards} className="hover:underline">Gift cards</a></li>
            <li><a href={olea.links.careers} className="hover:underline">Careers</a></li>
            <li><a href="#allergens" className="hover:underline">Allergen notice</a></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: "#888" }}>Follow</p>
          <ul className="text-sm space-y-2">
            <li>Instagram · {olea.social.instagram}</li>
            <li>TikTok · {olea.social.tiktok}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t flex flex-wrap justify-between gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ borderColor: "rgba(12,12,12,0.18)", color: "#888" }}>
        <span>© {new Date().getFullYear()} {olea.name}</span>
        <Link to="/">← Directions</Link>
      </div>
    </footer>
  );
}

export default function Site2Boutique() {
  return (
    <div style={{ backgroundColor: paper, color: ink, minHeight: "100vh" }}>
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
      <Footer />
    </div>
  );
}
