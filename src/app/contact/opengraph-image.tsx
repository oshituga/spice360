import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";

export const alt = "Spice360. Start a conversation.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Get in touch", eyebrowColor: PALETTES.contact.eyebrow, title: "Start a conversation.", glow: PALETTES.contact.og });
}
