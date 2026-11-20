import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BriefForm } from "@/components/BriefForm";
import { StandardFooter } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { PALETTES } from "@/lib/glows";
import { EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Brief Spice 360 or Spice Digital. Tell us what your brand is trying to do and leave the rest to us.",
  openGraph: { title: "Get in touch | Spice360", description: "Brief Spice 360 or Spice Digital." },
};

export default async function Contact({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  return (
    <main data-theme="contact">
      <PageHero
        title="Start a conversation"
        titleWidth={700}
        body="Tell us what your brand is trying to do and leave the rest to us."
        bodyWidth={420}
        glow={PALETTES.contact.hero}
      />
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <BriefForm initialTopic={topic === "digital" ? 1 : 0} />
        <FadeIn className="mx-auto mt-20 grid max-w-[720px] gap-8 border-t border-white/15 pt-10 text-body md:grid-cols-2">
          <div>
            <p className="mb-2 text-eyebrow font-semibold text-white/55">Email</p>
            <a href={`mailto:${EMAIL}`} className="underline-offset-4 hover:underline">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="mb-2 text-eyebrow font-semibold text-white/55">Studio</p>
            <address className="not-italic">1 Akanbi Onitiri Street, Surulere, Lagos</address>
          </div>
        </FadeIn>
      </section>
      <StandardFooter palette="contact" />
    </main>
  );
}
