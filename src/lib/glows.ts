import type { GlowEllipse } from "@/components/Glow";

/*
 * Glow palettes for the pages that aren't in Figma. Each one is its own
 * colour world, kept clear of the four Figma palettes (Home green/lime/amber,
 * About amber/pink, People pepper/amber/green, Digital navy/sky/mint):
 *
 *   contact  Dusk      indigo, electric violet, peach
 *   careers  Lagoon    deep teal, turquoise, butter
 *   privacy  Moonlight graphite, steel blue, silver
 *   kitchen  Cocoa     cocoa, caramel, cream
 *   story    Berry     aubergine, magenta, blush
 *   lost     Abyss     ink, ultramarine, ice lilac (404)
 *   kelloggs Morning   dawn indigo, rose, milk gold
 *   heinz    Mustard   burnt umber, mustard, pale cream
 *   nestle   Orchid    plum, orchid, lilac white
 *
 * Each palette is [deep, mid, light]. Hero and footer reuse the Spice
 * Digital ellipse spacing (Figma): the light sits furthest out so the edge
 * glows pale and the colour deepens toward the content. The matching
 * --accent / --eyebrow live under the same data-theme names in globals.css.
 */

export type PaletteName = "contact" | "careers" | "privacy" | "kitchen" | "story" | "lost" | "kelloggs" | "heinz" | "nestle";

const COLORS: Record<PaletteName, [string, string, string]> = {
  contact: ["#2B1470", "#7C4DFF", "#FFC8B4"],
  careers: ["#06424A", "#1FC2B0", "#FFF0B8"],
  privacy: ["#1F2330", "#8E9AB3", "#E8ECF4"],
  kitchen: ["#3B1E12", "#C27A48", "#F6DEC0"],
  story: ["#4A0D3C", "#DE3A8E", "#FFD3E6"],
  lost: ["#0D0F45", "#3C46E0", "#D6D9FF"],
  kelloggs: ["#2A1A4A", "#F2789F", "#FFE6A8"],
  heinz: ["#2B1E05", "#C9A227", "#FFF6D6"],
  nestle: ["#2A0F3A", "#B565D9", "#F4E6FF"],
};

/* Footer address tint: a dark of the palette, readable on its pale light */
const INK: Record<PaletteName, string> = {
  contact: "#3A1A99",
  careers: "#05555E",
  privacy: "#2C3550",
  kitchen: "#5A2E14",
  story: "#7A1258",
  lost: "#1B22A8",
  kelloggs: "#3E2470",
  heinz: "#5A4006",
  nestle: "#4C1A70",
};

/* OG eyebrow, same as the page's --eyebrow */
const EYEBROW: Record<PaletteName, string> = {
  contact: "#B9A0FF",
  careers: "#6FE6D6",
  privacy: "#B8C2DA",
  kitchen: "#E6A879",
  story: "#F48CC0",
  lost: "#9FA6FF",
  kelloggs: "#F7A6C1",
  heinz: "#E8C95A",
  nestle: "#D7A6F2",
};

export type Palette = {
  hero: GlowEllipse[];
  footer: GlowEllipse[];
  ink: string;
  /** OG card band (Satori drops radial gradients) */
  og: string;
  eyebrow: string;
};

function mix(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
}

function build(name: PaletteName): Palette {
  const [deep, mid, light] = COLORS[name];
  return {
    hero: [
      { color: deep, y: -323 },
      { color: mid, y: -631 },
      { color: light, y: -780 },
    ],
    footer: [
      { color: deep, y: 28 },
      { color: mid, y: 337 },
      { color: light, y: 486 },
    ],
    ink: INK[name],
    og: `linear-gradient(180deg, ${mix(mid, light, 0.45)} 0%, ${mid} 22%, ${mix(deep, mid, 0.35)} 44%, ${mix(deep, "#000000", 0.55)} 66%, #000 86%)`,
    eyebrow: EYEBROW[name],
  };
}

export const PALETTES = Object.fromEntries(
  (Object.keys(COLORS) as PaletteName[]).map((n) => [n, build(n)]),
) as Record<PaletteName, Palette>;
