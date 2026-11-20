import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";

export const alt = "Spice360 careers. Curious, specific, allergic to lukewarm work.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Careers", eyebrowColor: PALETTES.careers.eyebrow, title: "Curious, specific, allergic to lukewarm work.", glow: PALETTES.careers.og, photo: "/group/team-full-applause.jpg" });
}
