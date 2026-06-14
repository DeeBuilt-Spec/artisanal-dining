import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { olea } from "@/content/olea";

const cream = "#f6efe4";
const clay = "#b9542d";
const olive = "#3f4a26";
const ink = "#1f1b16";

function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-6 text-[13px]" style={{ color: cream }}>
      <Link to="/" className="tracking-[0.25em] uppercase">{olea.name}</Link>
      <ul className="flex gap-6 md:gap-8">
        <li><a href="#menu" className="hover:underline underline-offset-4">Menu</a></li>
        <li><a href="#story" className="hover:underline underline-offset-4">Story</a></li>
        <li><a href="#visit" className="hover:underline underline-offset-4">Visit</a></li>
      </ul>
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
      <Nav />
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img src={olea.hero.image} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(31,27,22,0.35) 0%, rgba(31,27,22,0.1) 30%, rgba(31,27,22,0.7) 100%)" }} />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-12 md:pb-16">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: cream }}>
          {olea.established} · Seasonal kitchen
        </p>
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
          <p className="md:col-span-4 md:col-start-9 max-w-sm text-base md:text-lg leading-relaxed" style={{ color: cream, fontFamily: "Inter, sans-serif" }}>
            {olea.positioning}
          </p>
        </div>
      </div>
    </header>
  );
}

function Menu() {
  return (
    <section id="menu" className="py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: cream, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-24 grid md:grid-cols-12 gap-6">
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em]" style={{ color: clay }}>From the kitchen</p>
          <h2 className="md:col-span-9 text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl" style={{ fontFamily: "Fraunces, serif" }}>
            What is ripe this week, cooked simply.
          </h2>
        </div>

        <div className="space-y-24 md:space-y-40">
          {olea.dishes.map((d, i) => {
            const left = i % 2 === 0;
            return (
              <article key={d.n} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className={`md:col-span-7 ${left ? "md:order-1" : "md:order-2 md:col-start-6"}`}>
                  <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden">
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={`md:col-span-4 ${left ? "md:order-2 md:col-start-9" : "md:order-1 md:col-start-1 md:row-start-1"}`}>
                  <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: olive }}>No. {d.n}</p>
                  <h3 className="text-3xl md:text-4xl mb-4 italic" style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}>
                    {d.name}
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: "#5a4f43" }}>{d.desc}</p>
                  <p className="text-sm tracking-wider" style={{ color: clay }}>$ {d.price}</p>
                </div>
              </article>
            );
          })}
        </div>
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
        <p className="mt-8 text-lg leading-relaxed opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
          {olea.story[1]}
        </p>
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
          <address className="not-italic text-lg leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            {olea.visit.address.map((l) => <span key={l} className="block">{l}</span>)}
            <span className="block mt-3" style={{ color: olive }}>{olea.visit.phone}</span>
          </address>
          <a id="reserve" href={olea.cta.href} className="inline-block text-lg italic underline underline-offset-8 decoration-1" style={{ fontFamily: "Fraunces, serif", color: clay }}>
            {olea.cta.label} →
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: clay }}>Hours</p>
          <table className="w-full text-base" style={{ fontFamily: "Inter, sans-serif" }}>
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

function Footer() {
  return (
    <footer className="py-10 px-6 md:px-12 text-xs uppercase tracking-[0.3em] flex flex-wrap justify-between gap-4" style={{ backgroundColor: ink, color: cream }}>
      <span>© {new Date().getFullYear()} {olea.name}</span>
      <Link to="/" className="opacity-70 hover:opacity-100">← Directions</Link>
    </footer>
  );
}

export default function Site1Artisan() {
  return (
    <div style={{ backgroundColor: cream }}>
      <Hero />
      <Menu />
      <Story />
      <Visit />
      <Footer />
    </div>
  );
}
