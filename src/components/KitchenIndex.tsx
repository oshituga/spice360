import Image from "next/image";
import Link from "next/link";
import { MediaCard } from "./MediaCard";
import { FadeIn } from "./motion";
import { STORIES } from "@/lib/kitchen";
import { BLOG } from "@/lib/content";

/*
 * Kitchen index, set like a magazine contents page: the newest story as one
 * big cover, everything else as rows on hairlines (photo, kicker, headline,
 * dek). Stories still being written (Cannes) sit in the list unlinked and
 * marked "Coming soon". Home keeps its own BlogGrid.
 */
type Row = { key: string; kind: string; date: string; title: string; dek?: string; image: string; href: string | null };

export function KitchenIndex() {
  const [feature, ...rest] = STORIES;
  const rows: Row[] = [
    ...rest.map((s) => ({ key: s.slug, kind: s.kind, date: s.date, title: s.title, dek: s.dek, image: s.image, href: `/kitchen/${s.slug}` })),
    ...BLOG.filter((b) => !b.href).map((b) => ({ key: b.title, kind: b.kind, date: b.date, title: b.title, image: b.image, href: null })),
  ];

  return (
    <div className="mx-auto flex w-full max-w-content flex-col">
      <Link href={`/kitchen/${feature.slug}`} className="group block">
        <MediaCard
          src={feature.image}
          alt=""
          overlay={0.45}
          className="h-[560px] md:h-[680px]"
          sizes="(min-width: 1150px) 1150px, 100vw"
        >
          <article className="flex max-w-[760px] flex-col gap-5 p-6 md:p-12">
            <p className="text-eyebrow font-semibold text-[var(--eyebrow)]">
              {feature.kind} · {feature.date}
            </p>
            <h2 className="text-[clamp(32px,2.6vw+18px,52px)] leading-[0.95] font-semibold tracking-[-0.05em]">{feature.title}</h2>
            <p className="max-w-[520px] text-body text-white/85">{feature.dek}</p>
            <span className="mt-2 text-[14px] font-semibold tracking-[-0.04em] text-white underline decoration-white/40 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-white">
              Read the story
            </span>
          </article>
        </MediaCard>
      </Link>

      <FadeIn className="mt-24 md:mt-32">
        <h2 className="text-eyebrow font-semibold text-[var(--eyebrow)]">More from the kitchen</h2>
      </FadeIn>
      <ul className="mt-6 border-b border-white/15">
        {rows.map((r) => {
          const inner = (
            <div className="grid gap-5 py-8 md:grid-cols-[minmax(0,340px)_1fr] md:items-center md:gap-12 md:py-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-neutral-900">
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 340px, 100vw"
                  className={`object-cover transition-transform duration-[1200ms] ease-[var(--ease-soft)] ${r.href ? "group-hover:scale-[1.03]" : "opacity-60"}`}
                />
              </div>
              <div className="flex max-w-[560px] flex-col gap-3">
                <p className="text-eyebrow font-semibold text-white/55">
                  {r.kind} · {r.href ? r.date : <span className="text-[var(--eyebrow)]">Coming soon</span>}
                </p>
                <h3
                  className={`text-[clamp(24px,1.2vw+18px,32px)] leading-[1.02] font-semibold tracking-[-0.05em] transition-colors duration-300 ${r.href ? "group-hover:text-[var(--eyebrow)]" : "text-white/70"}`}
                >
                  {r.title}
                </h3>
                {r.dek && <p className="text-body text-white/70">{r.dek}</p>}
              </div>
            </div>
          );
          return (
            <FadeIn as="li" key={r.key} className="border-t border-white/15">
              {r.href ? (
                <Link href={r.href} className="group block">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </FadeIn>
          );
        })}
      </ul>
    </div>
  );
}
