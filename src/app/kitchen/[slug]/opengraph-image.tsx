import { ogCard, OG_SIZE } from "@/og/card";
import { PALETTES } from "@/lib/glows";
import { STORIES, storyBySlug } from "@/lib/kitchen";

export const alt = "A story from the Spice360 kitchen.";
export const size = OG_SIZE;
export const contentType = "image/png";

/* Drawn at build, one per page */
export function generateStaticParams() {
  return STORIES.map((x) => ({ slug: x.slug }));
}

/* The story's cover under the Berry light, headline on top */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const story = storyBySlug((await params).slug);
  return ogCard({
    eyebrow: story ? story.kind : "Behind the kitchen",
    eyebrowColor: PALETTES.story.eyebrow,
    title: story?.title ?? "Behind the kitchen.",
    glow: PALETTES.story.og,
    photo: story?.image,
  });
}
