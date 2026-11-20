import { CASES } from "./cases";
import { STORIES } from "./kitchen";
import { PALETTES } from "./glows";

/*
 * Every page on the site, grouped the way the nav shows them. Desktop opens
 * one group at a time in a panel under the bar; mobile lists the pages and
 * puts the case studies in a row of chips. Notes only restate what each page
 * already says.
 */
export type MenuItem = {
  href: string;
  label: string;
  note: string;
  /** Thumbnail photo; falls back to the page's own light */
  image?: string;
  tint: string;
  /** Page colour: dot on mobile, hover tint on desktop */
  swatch: string;
};

export type MenuGroup = { id: string; label: string; items: MenuItem[] };

const light = (a: string, b: string) => `linear-gradient(165deg, ${b} 0%, ${a} 75%)`;

export const MENU: MenuGroup[] = [
  {
    id: "agency",
    label: "Agency",
    items: [
      { href: "/about", label: "About & Work", note: "Who we are and the work we’ve made", image: "/group/team-mixed-strategy.jpg", tint: light("#5a3a10", "#eea953"), swatch: "#eea953" },
      { href: "/people", label: "People", note: "The spice names behind every brief", image: "/group/group-full.jpg", tint: light("#4a1010", "#bc3431"), swatch: "#e0605d" },
      { href: "/careers", label: "Careers", note: "Curious, specific, allergic to lukewarm work", image: "/group/team-full-applause.jpg", tint: light("#06424A", "#1FC2B0"), swatch: PALETTES.careers.eyebrow },
    ],
  },
  {
    id: "digital",
    label: "Spice Digital",
    items: [
      { href: "/spice-digital", label: "Spice Digital", note: "For African tech startups", tint: light("#212A68", "#7BDCFB"), swatch: "#7bdcfb" },
      ...CASES.map((c) => ({
        href: `/spice-digital/${c.slug}`,
        label: c.brand,
        note: `${c.kind}, illustrative`,
        image: c.image,
        tint: light("#000", PALETTES[c.palette].eyebrow),
        swatch: PALETTES[c.palette].eyebrow,
      })),
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    items: [
      { href: "/kitchen", label: "Behind the kitchen", note: "Every story, in one place", image: "/blog/indomie-noodles.jpg", tint: light("#3B1E12", "#C27A48"), swatch: PALETTES.kitchen.eyebrow },
      ...STORIES.map((s) => ({
        href: `/kitchen/${s.slug}`,
        label: s.title,
        note: s.kind,
        image: s.image,
        tint: light("#4A0D3C", "#DE3A8E"),
        swatch: PALETTES.story.eyebrow,
      })),
    ],
  },
];

/* Mobile rows: the site's rooms in order, case studies as chips below */
export const MOBILE_PAGES: { href: string; label: string; swatch: string }[] = [
  { href: "/", label: "Home", swatch: "#69ce7d" },
  { href: "/about", label: "About & Work", swatch: "#eea953" },
  { href: "/people", label: "People", swatch: "#e0605d" },
  { href: "/careers", label: "Careers", swatch: PALETTES.careers.eyebrow },
  { href: "/spice-digital", label: "Spice Digital", swatch: "#7bdcfb" },
  { href: "/kitchen", label: "Kitchen", swatch: PALETTES.kitchen.eyebrow },
];

export const isCurrent = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname === `${href}/`;

/* Which group the current page belongs to (the bar's resting pill) */
export const groupFor = (pathname: string) =>
  MENU.find((g) => g.items.some((i) => i.href !== "/" && (pathname === i.href || pathname.startsWith(`${i.href}/`))))?.id ?? null;
