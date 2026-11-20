import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { StandardFooter } from "@/components/Footer";
import { STORIES, storyBySlug } from "@/lib/kitchen";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kitchen/[slug]">): Promise<Metadata> {
  const story = storyBySlug((await params).slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.dek,
    openGraph: { title: `${story.title} | Spice360`, description: story.dek, images: [story.image] },
  };
}

/*
 * Story page: the card's photo as a full-bleed cover under a scrim with the
 * headline on it (as the Figma cards set it), then the text at a 640px
 * measure, then the next story.
 */
export default async function StoryPage({ params }: PageProps<"/kitchen/[slug]">) {
  const story = storyBySlug((await params).slug);
  if (!story) notFound();
  const next = STORIES[(STORIES.indexOf(story) + 1) % STORIES.length];

  return (
    <main data-theme="home">
      <section className="relative isolate flex h-svh min-h-[640px] items-end overflow-clip bg-black px-[var(--gutter)] pb-20">
        <div className="fade absolute inset-0 -z-10">
          <Image src={story.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />
        </div>
        <div className="mx-auto flex w-full max-w-[1150px] flex-col gap-5">
          <p className="fade-up text-eyebrow font-semibold text-leaf-bright" style={{ ["--d" as string]: "150ms" }}>
            {story.kind} · {story.date}
          </p>
          <h1
            className="fade-up max-w-[820px] font-semibold text-[clamp(36px,3vw+18px,56px)] leading-[0.95] tracking-[-0.05em]"
            style={{ ["--d" as string]: "250ms" }}
          >
            {story.title}
          </h1>
          <p className="fade-up max-w-[560px] text-body text-white/85" style={{ ["--d" as string]: "400ms" }}>
            {story.dek}
          </p>
        </div>
      </section>

      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <Prose>
          {story.sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-6">
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </Prose>

        {next.slug !== story.slug && (
          <Link
            href={`/kitchen/${next.slug}`}
            className="group mx-auto mt-24 flex max-w-[640px] flex-col gap-3 border-t border-white/15 pt-10"
          >
            <span className="text-eyebrow font-semibold text-white/55">Next from the kitchen</span>
            <span className="text-[28px] leading-[30px] font-semibold tracking-[-0.05em] transition-colors duration-300 group-hover:text-leaf-bright">
              {next.title}
            </span>
          </Link>
        )}
      </section>
      <StandardFooter />
    </main>
  );
}
