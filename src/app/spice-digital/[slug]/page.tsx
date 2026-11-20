import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/motion";
import { CASES, caseBySlug } from "@/lib/cases";
import { PALETTES } from "@/lib/glows";
import { CONTACT_HREF } from "@/lib/content";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/spice-digital/[slug]">): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  const title = `${c.brand}: ${c.kind} (illustrative case study)`;
  return {
    title,
    description: `${c.dek} An illustrative Spice Digital case study.`,
    openGraph: { title: `${title} | Spice Digital`, description: c.dek },
  };
}

/*
 * Case study page. Each one lives in its own palette (lib/glows): the
 * card's photo as a clean full-bleed cover (colour lives in the accent
 * and the footer), a
 * plain "illustrative" notice before anything else, the story at a 640px
 * measure, three steps on glass-free tiles, then the next case.
 */
export default async function CasePage({ params }: PageProps<"/spice-digital/[slug]">) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const next = CASES[(CASES.indexOf(c) + 1) % CASES.length];
  const p = PALETTES[c.palette];

  return (
    <main data-theme={c.palette}>
      <section className="grain relative isolate flex h-svh min-h-[640px] items-end overflow-clip bg-black px-[var(--gutter)] pb-20">
        <div className="fade absolute inset-0 -z-10">
          <Image src={c.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/45 to-black/90" />
        </div>
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          <p className="fade-up flex flex-wrap items-center gap-2 text-eyebrow font-semibold text-[var(--eyebrow)]" style={{ ["--d" as string]: "150ms" }}>
            {c.brand}
            <span aria-hidden className="size-1 rounded-full bg-current" />
            {c.kind}
            <span className="ml-2 rounded-full border border-white/30 px-2.5 py-0.5 text-[12px] leading-[18px] text-white/85">
              Illustrative case study
            </span>
          </p>
          <h1
            className="fade-up max-w-[820px] font-semibold text-[clamp(36px,3vw+18px,56px)] leading-[0.95] tracking-[-0.05em]"
            style={{ ["--d" as string]: "250ms" }}
          >
            {c.headline}
          </h1>
          <p className="fade-up max-w-[560px] text-body text-white/85" style={{ ["--d" as string]: "400ms" }}>
            {c.dek}
          </p>
        </div>
      </section>

      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <FadeIn
          className="measure mb-16 max-w-[640px] rounded-[12px] border border-white/15 p-5 text-[15px] leading-[20px] tracking-[-0.03em] text-white/70"
        >
          <strong className="font-semibold text-white">About this page.</strong> This is an illustrative case study: it shows how Spice Digital
          would approach a {c.kind.toLowerCase()} brief of this kind. It is not a record of a real engagement, and {c.brand} has not reviewed or
          endorsed it. {c.brand} is a trademark of its owner.
        </FadeIn>

        <Prose>
          {c.sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-6">
              <h2>{s.heading}</h2>
              {s.body.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          ))}
          <h2>The shape of the result</h2>
          <p>
            The goal for a programme like this: <strong>{c.result.charAt(0).toLowerCase() + c.result.slice(1)}</strong>.
          </p>
        </Prose>

        <ol className="mx-auto mt-20 grid max-w-content gap-2 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <FadeIn
              as="li"
              key={s.title}
              delay={i * 0.08}
              className="flex min-h-[240px] flex-col justify-between gap-10 rounded-[4px] bg-white/[0.04] p-6 ring-1 ring-white/10"
            >
              <span className="text-eyebrow font-semibold text-[var(--eyebrow)]">0{i + 1}</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-[24px] leading-[28px] font-semibold tracking-[-0.05em]">{s.title}</h3>
                <p className="text-body text-white/75">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </ol>

        <Link
          href={`/spice-digital/${next.slug}`}
          className="group measure mt-24 flex max-w-[640px] flex-col gap-3 border-t border-white/15 pt-10"
        >
          <span className="text-eyebrow font-semibold text-white/55">Next case</span>
          <span className="flex items-baseline gap-3 text-[28px] leading-[30px] font-semibold tracking-[-0.05em] transition-colors duration-300 group-hover:text-[var(--eyebrow)]">
            {next.brand}: {next.headline}
            <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>

      <Footer
        eyebrow="Brief us"
        title="Tell us what you’re building"
        titleWidth={322}
        body="We’ll tell you what it will take to build the brand around it"
        glow={p.footer}
        metaColor={p.ink}
        actions={
          <>
            <Button href={`${CONTACT_HREF}?topic=digital`} tone="light" className="bg-white/90 px-6">
              Brief Spice Digital
            </Button>
            <Button href="/spice-digital" className="px-6">
              Back to Spice Digital
            </Button>
          </>
        }
      />
    </main>
  );
}
