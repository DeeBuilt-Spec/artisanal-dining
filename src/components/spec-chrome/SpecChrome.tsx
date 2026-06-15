import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SpecSwitcher } from "./SpecSwitcher";
import { specChromeConfig } from "./config";
import "./spec-chrome.css";

/*
 * SpecChrome — the shared DeeBuilt spec shell.
 *
 * Wraps a spec's <Routes> and adds three pieces:
 *   • a minimal sticky top header showing ONLY the brand logo (links back to the
 *     apex landing). Opaque-ish translucent background. No wordmark text, no
 *     credit — the logo is the brand mark.
 *   • the floating bottom-center SpecSwitcher (prev · dropdown · next) — kept at
 *     the bottom because it's thumb-friendly on mobile. Self-hides off spec pages.
 *   • a footer with the maker credit ("designed by Ruthnie") + a deebuilt.co link.
 *
 * The header is hidden on the landing page ("/") — the chooser carries its own
 * brand there. The footer shows everywhere.
 *
 * Drop-in: copy the spec-chrome/ folder into src/components/, create config.ts
 * from config.template.ts, and wrap <Routes> with <SpecChrome>. Reads the spec
 * list from "@/lib/specs" — each spec provides its own.
 */

export function SpecChrome({ children }: { children: ReactNode }) {
  const pathname = useLocation().pathname;
  const onLanding = pathname === "/";

  const logoUrl = `${import.meta.env.BASE_URL}${specChromeConfig.logoSrc}`;

  return (
    <div className="spec-chrome-root">
      {!onLanding && (
        <header className="spec-chrome-header">
          <a
            className="spec-chrome-brand"
            href={specChromeConfig.landingUrl}
            aria-label={`${specChromeConfig.brandName} — all directions`}
          >
            <img className="spec-chrome-brand-logo" src={logoUrl} alt="" />
            <span className="spec-chrome-brand-name">{specChromeConfig.brandName}</span>
          </a>
        </header>
      )}

      <main className="spec-chrome-main">{children}</main>

      <footer className="spec-chrome-footer">
        <div className="spec-chrome-footer-inner">
          <span className="spec-chrome-footer-credit">{specChromeConfig.credit}</span>
          <span className="spec-chrome-footer-sep">·</span>
          <a
            className="spec-chrome-footer-link"
            href={specChromeConfig.businessUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            deebuilt.co →
          </a>
        </div>
      </footer>

      {/* Floating bottom switcher — self-hides on the landing page / 404. */}
      <SpecSwitcher />
    </div>
  );
}
