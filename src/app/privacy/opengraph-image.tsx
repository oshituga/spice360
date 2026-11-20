import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";

export const alt = "Spice360 privacy policy.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Legal & Info", eyebrowColor: PALETTES.privacy.eyebrow, title: "Privacy policy.", glow: PALETTES.privacy.og });
}
