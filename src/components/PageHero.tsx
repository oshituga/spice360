import Image from "next/image";
import type { ReactNode } from "react";
import { Glow, type GlowEllipse } from "./Glow";

/*
 * Figma hero: black, glow pouring down from above, a 48px headline about a
 * third of the way down and the intro + buttons near the bottom.
 *
 * Exactly one screen tall (svh, so the mobile URL bar never crops it; 640px
 * floor for short laptops), like Terra & Tent's. Arrival is plain CSS:
 * the light fades up, then headline, intro and buttons fade in a beat apart.
 * After that the only motion is the glow's own drift.
 */
export function PageHero({
  title,
  titleWidth,
  body,
  bodyWidth,
  actions,
  glow,
  image,
  variant = "centered",
}: {
  title: string;
  titleWidth: number;
  body: ReactNode;
  bodyWidth: number;
  actions?: ReactNode;
  glow?: GlowEllipse[];
  /** Full-bleed photo under a scrim instead of a glow (photo heroes never get a glow) */
  image?: string;
  /** centered: utility pages. statement: flagship pages (Home, About). */
  variant?: "centered" | "statement";
}) {
  if (variant === "statement") return <StatementHero title={title} body={body} bodyWidth={bodyWidth} actions={actions} glow={glow} />;
  return (
    <section className="grain relative isolate flex h-svh min-h-[640px] flex-col items-center overflow-clip bg-black px-[var(--gutter)] pb-20 text-center">
      {image ? (
        <div className="fade absolute inset-0 -z-10" style={{ ["--d" as string]: "0ms" }}>
          <Image src={image} alt="The Spice 360 team" fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
          <div aria-hidden className="absolute inset-0 bg-black/45" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/50" />
        </div>
      ) : (
        <div className="fade-slow absolute inset-0 -z-10">
          <Glow ellipses={glow ?? []} anchor="top" />
        </div>
      )}

      <div className="flex flex-1 items-center pt-[110px] md:pt-[140px]">
        <h1
          className="fade-up font-semibold text-[clamp(36px,2.4vw+20px,48px)] leading-[0.94] tracking-[-0.05em] whitespace-pre-line"
          style={{ maxWidth: `min(${titleWidth}px, 100%)`, ["--d" as string]: "250ms" }}
        >
          {title}
        </h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        <p className="fade-up text-body" style={{ maxWidth: `min(${bodyWidth}px, 100%)`, ["--d" as string]: "450ms" }}>
          {body}
        </p>
        {actions && (
          <div className="fade-up flex flex-wrap justify-center gap-2" style={{ ["--d" as string]: "600ms" }}>
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}

/*
 * Statement hero, for the flagship pages. Left-aligned, the headline set in
 * the mega size across the full width so it reads as a poster, not a page
 * title. Each line rises out of its own mask a beat apart; the intro and
 * buttons share one bottom row (intro left, buttons right on desktop).
 * Still one screen tall, still the page's glow and nothing else moving.
 */
function StatementHero({
  title,
  body,
  bodyWidth,
  actions,
  glow,
}: {
  title: string;
  body: ReactNode;
  bodyWidth: number;
  actions?: ReactNode;
  glow?: GlowEllipse[];
}) {
  const lines = title.split("\n");
  return (
    <section className="grain relative isolate flex h-svh min-h-[680px] flex-col justify-end overflow-clip bg-black px-[var(--gutter)] pt-[140px] pb-[calc(40px+env(safe-area-inset-bottom))] md:pb-14">
      <div className="fade-slow absolute inset-0 -z-10">
        <Glow ellipses={glow ?? []} anchor="top" />
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 md:gap-14">
        <h1 className="text-mega font-semibold [text-wrap:balance]">
          {lines.map((l, i) => (
            <span key={i} className="line-mask" style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
              <span className="line-up block" style={{ ["--d" as string]: `${200 + i * 110}ms` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <div className="flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="fade-up text-[18px] leading-[22px] tracking-[-0.04em] text-white/85" style={{ maxWidth: `min(${bodyWidth}px, 100%)`, ["--d" as string]: "550ms" }}>
            {body}
          </p>
          {actions && (
            <div className="fade-up flex shrink-0 flex-wrap gap-2" style={{ ["--d" as string]: "680ms" }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
