import type { GlowEllipse } from "@/components/Glow";

/* Hero and footer glows (Figma ellipse positions). Used by the extra pages,
   which take the home palette so they read as part of the main site. */
export const HOME_HERO: GlowEllipse[] = [
  { color: "#2B5833", y: -313 },
  { color: "#E3FC6A", y: -561 },
  { color: "#EEA953", y: -620 },
];

export const HOME_FOOTER: GlowEllipse[] = [
  { color: "#2B5833", y: 68 },
  { color: "#69CE7D", y: 377 },
  { color: "#E3FC6A", y: 396 },
];
