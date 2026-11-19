import { ogCard, OG_SIZE, OG_GLOWS } from "@/og/card";

export const alt = "Spice360, About & Work. Ideas that earn attention and awards.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "About & Work", eyebrowColor: "#EEA953", title: "Ideas that earn attention and awards.", glow: OG_GLOWS.about });
}
