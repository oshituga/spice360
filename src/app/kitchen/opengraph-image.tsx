import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";

export const alt = "Spice360. Behind the kitchen.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Behind the kitchen", eyebrowColor: PALETTES.kitchen.eyebrow, title: "How the work got made.", glow: PALETTES.kitchen.og });
}
