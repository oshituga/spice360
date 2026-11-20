import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BlogGrid } from "@/components/BlogGrid";
import { StandardFooter } from "@/components/Footer";
import { PALETTES } from "@/lib/glows";

export const metadata: Metadata = {
  title: "Behind the kitchen",
  description: "Case studies and agency stories from Spice 360: how the work got made, and what we learned making it.",
  openGraph: { title: "Behind the kitchen | Spice360", description: "Case studies and agency stories from Spice 360." },
};

/* Blog index: the Home section's hero line and the same cards, given room. */
export default function Kitchen() {
  return (
    <main data-theme="kitchen">
      <PageHero
        title="Behind the kitchen"
        titleWidth={700}
        body="We’ve gotten the job done countless times. Here’s how we did some, and the insights we have to share."
        bodyWidth={460}
        glow={PALETTES.kitchen.hero}
      />
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <BlogGrid />
      </section>
      <StandardFooter palette="kitchen" />
    </main>
  );
}
