/*
 * Per-spec configuration for the DeeBuilt spec-chrome bundle (artisanal-dining).
 *
 * Generated from `_shared/spec-chrome/config.template.ts`. Only the values in
 * `specChromeConfig` are spec-specific — to change shared chrome behavior, edit
 * the canonical bundle in `C:\DeeBuilt Spec\_shared\spec-chrome\` and re-copy.
 */

export type SpecChromeConfig = {
  /** Display name of THIS spec, shown in the header (e.g. "Olea"). */
  specName: string;
  /** Business mark text shown in the header. Default "DeeBuilt". */
  brandName: string;
  /** Maker credit shown under/next to the brand (e.g. "designed by Ruthnie"). */
  credit: string;
  /** Where the brand mark links — the apex landing page listing all directions. */
  landingUrl: string; // "https://spec.deebuilt.co/"
  /** Where the footer credit links — the DeeBuilt business site. */
  businessUrl: string; // "https://deebuilt.co"
  /**
   * Public path to the brand logo, relative to BASE_URL. The component prefixes
   * `import.meta.env.BASE_URL` so it resolves under any GitHub Pages route.
   * Drop the real transparent logo at `public/<this filename>` to swap it in.
   */
  logoSrc: string; // "brand-logo.svg"
};

export const specChromeConfig: SpecChromeConfig = {
  specName: "Olea",
  brandName: "DeeBuilt",
  credit: "designed by Ruthnie",
  landingUrl: "https://spec.deebuilt.co/",
  businessUrl: "https://deebuilt.co",
  logoSrc: "deebuilt-logo.png",
};
