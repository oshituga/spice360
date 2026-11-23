import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { MediaCard } from "@/components/MediaCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { FadeIn } from "@/components/motion";
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
    openGraph: { title: `${story.title} | Spice360`, description: story.dek },
  };
}

/*
 * Story page: the card's photo as a full-bleed cover under a scrim with the
 * headline on it (as the Figma cards set it), then the text at a 640px
 * measure under a reading-progress line, a closing rule, then the next
 * story as a full cover.
 */
export default async function StoryPage({ params }: PageProps<"/kitchen/[slug]">) {
  const story = storyBySlug((await params).slug);
  if (!story) notFound();
  const next = STORIES[(STORIES.indexOf(story) + 1) % STORIES.length];

  return (
    <main data-theme="story">
      <section className="relative isolate flex h-svh min-h-[640px] items-end overflow-clip bg-black px-[var(--gutter)] pb-20">
        <div className="fade absolute inset-0 -z-10">
          <Image src={story.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />
        </div>
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          <p className="fade-up text-eyebrow font-semibold text-[var(--eyebrow)]" style={{ ["--d" as string]: "150ms" }}>
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

      <section className="bg-black px-[var(--gutter)] pt-[100px] md:pt-[120px]">
        <ReadingProgress>
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
          {/* End of the piece: a closing rule with its filing line */}
          <div className="measure mt-16 flex max-w-[640px] items-center gap-4 text-eyebrow font-semibold text-white/55">
            <span aria-hidden className="h-px flex-1 bg-white/15" />
            <span>
              {story.kind} · {story.date}
            </span>
          </div>
        </ReadingProgress>
      </section>

      {next.slug !== story.slug && (
        <section aria-labelledby="next-story" className="bg-black px-[var(--gutter)] pt-24 pb-[100px] md:pt-32 md:pb-[120px]">
          <div className="mx-auto flex max-w-content flex-col gap-8">
            <FadeIn className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="next-story" className="text-eyebrow font-semibold text-[var(--eyebrow)]">
                Next from the kitchen
              </h2>
              <Link
                href="/kitchen"
                className="text-[14px] font-semibold tracking-[-0.04em] text-white/70 underline decoration-white/30 underline-offset-[6px] transition-colors duration-300 hover:text-white hover:decoration-white"
              >
                All stories
              </Link>
            </FadeIn>
            <Link href={`/kitchen/${next.slug}`} className="group block">
              <MediaCard src={next.image} alt="" overlay={0.45} className="h-[460px] md:h-[560px]" sizes="(min-width: 1150px) 1150px, 100vw">
                <div className="flex max-w-[720px] flex-col gap-4 p-6 md:p-12">
                  <p className="text-eyebrow font-semibold text-white/75">
                    {next.kind} · {next.date}
                  </p>
                  <p className="text-card font-semibold">{next.title}</p>
                  <p className="max-w-[520px] text-body text-white/85">{next.dek}</p>
                  <span className="mt-2 text-[14px] font-semibold tracking-[-0.04em] underline decoration-white/40 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-white">
                    Read next
                  </span>
                </div>
              </MediaCard>
            </Link>
          </div>
        </section>
      )}
      <StandardFooter palette="story" />
    </main>
  );
}
