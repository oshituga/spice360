import { ogCard, OG_SIZE } from "@/og/card";

export const alt = "Spice360, People. The people behind the heat.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "People", eyebrowColor: "#F2C4C2", title: "The people behind the heat.", photo: "/group/group-full.jpg" });
}
