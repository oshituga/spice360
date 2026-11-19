import { ogCard, OG_SIZE, OG_GLOWS } from "@/og/card";

export const alt = "Spice360. We make brands impossible to ignore.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Integrated 360 campaigns, Lagos", eyebrowColor: "#69CE7D", title: "We make brands impossible to ignore.", glow: OG_GLOWS.home });
}
