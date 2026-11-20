import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";
import { CASES, caseBySlug } from "@/lib/cases";

export const alt = "An illustrative Spice Digital case study.";
export const size = OG_SIZE;
export const contentType = "image/png";

/* Drawn at build, one per page */
export function generateStaticParams() {
  return CASES.map((x) => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseBySlug((await params).slug);
  const pal = PALETTES[c?.palette ?? "nestle"];
  return ogCard({
    eyebrow: c ? `${c.brand} · Illustrative case study` : "Spice Digital",
    eyebrowColor: pal.eyebrow,
    title: c?.headline ?? "Case studies.",
    glow: pal.og,
    photo: c?.image,
  });
}
