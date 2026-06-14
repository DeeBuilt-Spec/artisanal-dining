import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { olea, getStatus } from "@/content/olea";

const cream = "#f6efe4";
const clay = "#b9542d";
const olive = "#3f4a26";
const ink = "#1f1b16";

function StatusPill({ light = false }: { light?: boolean }) {
  const [s, setS] = useState(() => getStatus());
  useEffect(() => {
    const i = setInterval(() => setS(getStatus()), 60_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]"
      style={{ color: light ? cream : olive }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: s.open ? "#7aa05c" : clay }}
      />
      {s.label}
    </span>
  );
}

function Nav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const color = overlay ? cream : ink;
  return (
    <nav
      className={`${overlay ? "absolute" : "sticky"} top-0 left-0 right-0 z-30`}
      style={{
        backgroundColor: overlay ? "transparent" : cream,
        borderBottom: overlay ? "none" : "1px solid rgba(31,27,22,0.12)",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" className="text-[13px] tracking-[0.25em] uppercase" style={{ color }}>
          {olea.name}
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-[13px]" style={{ color }}>
          <li><a href="#menu" className="hover:underline underline-offset-4">Menu</a></li>
          <li><a href="#chef" className="hover:underline underline-offset-4">Chef</a></li>
          <li><a href="#events" className="hover:underline underline-offset-4">Events</a></li>
          <li><a href="#visit" className="hover:underline underline-offset-4">Visit</a></li>
          <li>
            <a href={olea.links.reserve} className="italic underline underline-offset-4" style={{ fontFamily: "Fraunces, serif" }}>
              Reserve
            </a>
          </li>
          <li>
            <a
              href={olea.links.orderOnline}
              className="px-4 py-2 text-[12px] uppercase tracking-[0.2em]"
              style={{ backgroundColor: clay, color: cream }}
            >
              Order online
            </a>
          </li>
        </ul>
        <button
          className="md:hidden text-[13px] uppercase tracking-[0.2em]"
          style={{ color }}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4" style={{ backgroundColor: cream, color: ink }}>
          {["Menu", "Chef", "Events", "Visit"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block text-lg" style={{ fontFamily: "Fraunces, serif" }} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href={olea.links.reserve} className="block text-lg italic" style={{ fontFamily: "Fraunces, serif", color: clay }}>Reserve</a>
          <a href={olea.links.orderOnline} className="block w-full text-center px-4 py-3 text-[12px] uppercase tracking-[0.2em]" style={{ backgroundColor: clay, color: cream }}>
            Order online
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!imgRef.current) return;
        const y = window.scrollY;
        imgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.1)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative h-[100svh] min-h-[600px] w-full overflow-hidden" style={{ backgroundColor: ink }}>
      <Nav overlay />
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img src={olea.hero.image} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(31,27,22,0.35) 0%, rgba(31,27,22,0.1) 30%, rgba(31,27,22,0.75) 100%)" }} />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-12 md:pb-16">
        <div className="mb-6"><StatusPill light /></div>
        <div className="grid md:grid-cols-12 gap-6 items-end">
          <h1
            className="md:col-span-7 leading-[0.85] tracking-tight"
            style={{
              fontFamily: "Fraunces, serif",
              fontWeight: 400,
              color: cream,
              fontSize: "clamp(64px, 16vw, 200px)",
            }}
          >
            {olea.name}
          </h1>
          <div className="md:col-span-4 md:col-start-9 max-w-sm">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: cream }}>
              {olea.positioning}
            </p>
            <div className="mt-6 flex gap-5 items-center">
              <a href={olea.links.reserve} className="italic underline underline-offset-8 decoration-1 text-lg" style={{ fontFamily: "Fraunces, serif", color: cream }}>
                Reserve →
              </a>
              <a href={olea.links.orderOnline} className="px-4 py-2 text-[12px] uppercase tracking-[0.2em]" style={{ backgroundColor: clay, color: cream }}>
                Order online
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Menu() {
  return (
    <section id="menu" className="py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: cream, color: ink }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 md:mb-16 grid md:grid-cols-12 gap-6">
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em]" style={{ color: clay }}>From the kitchen</p>
          <h2 className="md:col-span-9 text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl" style={{ fontFamily: "Fraunces, serif" }}>
            What is ripe this week, cooked simply.
          </h2>
        </div>

        <div className="aspect-[16/7] overflow-hidden mb-16 md:mb-20">
          <img src={olea.hero.menuLead} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: olive }}>Plates</p>
            <ul>
              {olea.dishes.map((d) => (
                <li key={d.n} className="grid grid-cols-12 gap-3 py-6 border-t" style={{ borderColor: "rgba(31,27,22,0.18)" }}>
                  <div className="col-span-9">
                    <h3 className="text-2xl md:text-3xl italic mb-1" style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}>{d.name}</h3>
                    <p className="text-sm uppercase tracking-[0.15em]" style={{ color: olive }}>{d.desc}</p>
                  </div>
                  <span className="col-span-3 text-right text-lg" style={{ fontFamily: "Fraunces, serif", color: clay }}>${d.price}</span>
                </li>
              ))}
              <li className="border-t" style={{ borderColor: "rgba(31,27,22,0.18)" }} />
            </ul>
          </div>
          <aside className="md:col-span-4 md:col-start-9">
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: olive }}>Wine & spirits</p>
            <ul className="space-y-5">
              {olea.wines.map((w) => (
                <li key={w.name}>
                  <p className="italic" style={{ fontFamily: "Fraunces, serif" }}>{w.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "#7a6e60" }}>{w.region} · {w.price}</p>
                </li>
              ))}
            </ul>
            <a href={olea.links.orderOnline} className="mt-10 inline-block italic underline underline-offset-8 decoration-1" style={{ fontFamily: "Fraunces, serif", color: clay }}>
              Order online for pickup →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Chef() {
  return (
    <section id="chef" className="py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: "#efe5d4", color: ink }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={olea.chef.portrait} alt={olea.chef.name} className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.3em]" style={{ color: olive }}>Portrait — Olea, late service</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: clay }}>Meet the chef</p>
          <h2 className="text-4xl md:text-5xl leading-[1.05] mb-6" style={{ fontFamily: "Fraunces, serif" }}>
            {olea.chef.name}
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: olive }}>{olea.chef.role}</p>
          {olea.chef.bio.map((p) => (
            <p key={p} className="text-base md:text-lg leading-relaxed mb-4" style={{ color: "#4a3f33" }}>{p}</p>
          ))}
          <blockquote className="mt-8 text-2xl md:text-3xl italic leading-snug" style={{ fontFamily: "Fraunces, serif", color: clay }}>
            "{olea.chef.quote}"
          </blockquote>
          <ul className="mt-8 space-y-1 text-xs uppercase tracking-[0.25em]" style={{ color: olive }}>
            {olea.chef.credentials.map((c) => <li key={c}>— {c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: cream, color: ink }}>
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: clay }}>Upcoming</p>
        <h2 className="text-4xl md:text-5xl leading-tight mb-12 md:mb-16 max-w-2xl" style={{ fontFamily: "Fraunces, serif" }}>
          A short calendar of evenings.
        </h2>
        <ul>
          {olea.events.map((e) => (
            <li key={e.title} className="grid grid-cols-12 gap-4 py-8 border-t" style={{ borderColor: "rgba(31,27,22,0.18)" }}>
              <p className="col-span-12 md:col-span-3 text-sm uppercase tracking-[0.25em]" style={{ color: olive }}>{e.date}</p>
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-2xl md:text-3xl italic mb-1" style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}>{e.title}</h3>
                <p className="text-sm" style={{ color: "#5a4f43" }}>{e.description}</p>
              </div>
              <a href={e.href} className="col-span-12 md:col-span-2 md:text-right italic text-base underline underline-offset-4" style={{ fontFamily: "Fraunces, serif", color: clay }}>
                Reserve →
              </a>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: "rgba(31,27,22,0.18)" }} />
        </ul>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-24 md:py-36 px-6 md:px-12" style={{ backgroundColor: olive, color: cream }}>
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] mb-8 opacity-70">The story</p>
        <p className="text-2xl md:text-3xl leading-relaxed" style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}>
          <span className="float-left text-7xl md:text-8xl leading-[0.8] mr-3 mt-1" style={{ color: clay, fontFamily: "Fraunces, serif" }}>
            {olea.story[0].charAt(0)}
          </span>
          {olea.story[0].slice(1)}
        </p>
        <p className="mt-8 text-lg leading-relaxed opacity-90">{olea.story[1]}</p>
      </div>
    </section>
  );
}

function Press() {
  return (
    <section className="py-14 px-6 md:px-12 border-t" style={{ backgroundColor: cream, borderColor: "rgba(31,27,22,0.18)", color: ink }}>
      <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.3em]" style={{ color: olive }}>
        {olea.press.map((p, i) => (
          <span key={p} className="flex items-center gap-10">
            {p}
            {i < olea.press.length - 1 && <span className="hidden md:inline opacity-40">·</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-24 md:py-36 px-6 md:px-12" style={{ backgroundColor: cream, color: ink }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: clay }}>Visit</p>
          <h2 className="text-4xl md:text-5xl leading-tight mb-8" style={{ fontFamily: "Fraunces, serif" }}>
            Find us on Linden Lane.
          </h2>
          <address className="not-italic text-lg leading-relaxed mb-8">
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
            <span className="block mt-3" style={{ color: olive }}>{olea.visit.phone}</span>
          </address>
          <div className="flex flex-wrap gap-4 items-center">
            <a id="reserve" href={olea.cta.href} className="inline-block text-lg italic underline underline-offset-8 decoration-1" style={{ fontFamily: "Fraunces, serif", color: clay }}>
              {olea.cta.label} →
            </a>
            <a href={olea.links.orderOnline} className="px-4 py-2 text-[12px] uppercase tracking-[0.2em]" style={{ backgroundColor: clay, color: cream }}>
              Order online
            </a>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: clay }}>Hours</p>
            <StatusPill />
          </div>
          <table className="w-full text-base">
            <tbody>
              {olea.visit.hours.map(([d, h]) => (
                <tr key={d} className="border-b" style={{ borderColor: "rgba(31,27,22,0.15)" }}>
                  <td className="py-4">{d}</td>
                  <td className="py-4 text-right" style={{ color: olive }}>{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 border-t" style={{ backgroundColor: "#efe5d4", borderColor: "rgba(31,27,22,0.12)", color: ink }}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: clay }}>The kitchen letter</p>
        <h3 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "Fraunces, serif" }}>
          Sent when the menu changes.
        </h3>
        <p className="text-sm mb-8" style={{ color: "#5a4f43" }}>Once or twice a month. Never more.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 bg-transparent border outline-none"
            style={{ borderColor: ink, color: ink }}
          />
          <button type="submit" className="px-5 py-3 text-[12px] uppercase tracking-[0.2em]" style={{ backgroundColor: ink, color: cream }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14 px-6 md:px-12" style={{ backgroundColor: ink, color: cream }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-4 gap-10">
        <div>
          <p className="text-lg mb-2" style={{ fontFamily: "Fraunces, serif" }}>{olea.name}</p>
          <p className="text-sm opacity-70 leading-relaxed">
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <p className="text-sm opacity-70 mt-2">{olea.visit.phone}</p>
          <p className="text-sm opacity-70">{olea.visit.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-3">Hours</p>
          <ul className="text-sm space-y-1 opacity-90">
            {olea.visit.hours.map(([d, h]) => (
              <li key={d} className="flex justify-between gap-4"><span>{d}</span><span className="opacity-70">{h}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-3">More</p>
          <ul className="text-sm space-y-2 opacity-90">
            <li><a href={olea.links.privateDining} className="hover:underline">Private dining</a></li>
            <li><a href={olea.links.giftCards} className="hover:underline">Gift cards</a></li>
            <li><a href={olea.links.careers} className="hover:underline">Careers</a></li>
            <li><a href="#allergens" className="hover:underline">Allergen notice</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-3">Follow</p>
          <ul className="text-sm space-y-2 opacity-90">
            <li>Instagram · {olea.social.instagram}</li>
            <li>TikTok · {olea.social.tiktok}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl mt-12 pt-6 border-t flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.3em] opacity-60" style={{ borderColor: "rgba(246,239,228,0.18)" }}>
        <span>© {new Date().getFullYear()} {olea.name}</span>
        <Link to="/" className="hover:opacity-100">← Directions</Link>
      </div>
    </footer>
  );
}

export default function Site1Artisan() {
  return (
    <div style={{ backgroundColor: cream }}>
      <Hero />
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
