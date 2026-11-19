import { ogCard, OG_SIZE, OG_GLOWS } from "@/og/card";

export const alt = "Spice Digital. Same kitchen, different kind of heat.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Spice Digital", eyebrowColor: "#7BDCFB", title: "Same kitchen, different kind of heat.", glow: OG_GLOWS.digital });
}
