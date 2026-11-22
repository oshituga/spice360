import Image from "next/image";
import type { ReactNode } from "react";
import { Glow, type GlowEllipse } from "./Glow";

/*
 * The one hero every page uses, so the site reads as one system:
 *
 *  - Exactly one screen tall (svh; 680px floor for short laptops).
 *  - Left-aligned poster headline at the bottom of the frame, each line
 *    rising out of its own mask a beat apart (transform only).
 *  - A thin rule, then the intro on the left and the buttons on the right
 *    (stacked on phones).
 *  - Behind it, the page's own glow, or a photo under a plain scrim. Photo
 *    heroes never get a glow.
 *
 * What changes from page to page is the light (or photo) and the headline
 * size, which steps down with the length of the longest line so a long
 * title never turns into a wall: mega for short statements, large for a
 * sentence, medium for a story headline.
 */
export function PageHero({
  title,
  body,
  bodyWidth = 560,
  actions,
  glow,
  image,
  eyebrow,
  imagePosition = "50% 35%",
}: {
  title: string;
  /** @deprecated the headline now spans the frame; kept so call sites compile */
  titleWidth?: number;
  body?: ReactNode;
  bodyWidth?: number;
  actions?: ReactNode;
  glow?: GlowEllipse[];
  /** Full-bleed photo under a scrim instead of a glow */
  image?: string;
  /** Small line above the headline (kind, date, badges) */
  eyebrow?: ReactNode;
  imagePosition?: string;
}) {
  const lines = title.split("\n");
  const longest = Math.max(...lines.map((l) => l.length));
  /* Each line is set where the title breaks it, so the size is fitted to
     the longest line: it fills the frame without wrapping on desktop and
     only wraps on phones, where the floor takes over. Tier caps keep a
     long sentence from becoming a wall. (~0.5em per character at this
     tracking.) */
  const tier = longest <= 24 ? { min: 48, max: 164 } : longest <= 40 ? { min: 40, max: 108 } : { min: 36, max: 76 };
  const fit = `calc((min(100vw, 1240px + 2 * var(--gutter)) - 2 * var(--gutter)) / ${(longest * 0.52).toFixed(2)})`;
  const fontSize = `clamp(${tier.min}px, ${fit}, ${tier.max}px)`;
  const size = longest <= 24 ? "leading-[0.86] tracking-[-0.065em]" : longest <= 40 ? "leading-[0.9] tracking-[-0.06em]" : "leading-[0.94] tracking-[-0.055em]";

  return (
    <section className="relative isolate flex h-svh md:[--pour:90px] min-h-[680px] flex-col justify-end overflow-clip bg-black px-[var(--gutter)] pt-[140px] pb-[calc(40px+env(safe-area-inset-bottom))] md:pb-14">
      {image ? (
        <div className="fade absolute inset-0 -z-10" style={{ ["--d" as string]: "0ms" }}>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
          <div aria-hidden className="absolute inset-0 bg-black/40" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent to-black/80" />
        </div>
      ) : (
        <div className="fade-slow absolute inset-0 -z-10">
          <Glow ellipses={glow ?? []} anchor="top" />
        </div>
      )}

      <div className="mx-auto flex w-full max-w-content flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-5">
          {eyebrow && (
            <div className="fade-up text-eyebrow font-semibold text-[var(--eyebrow)]" style={{ ["--d" as string]: "120ms" }}>
              {eyebrow}
            </div>
          )}
          <h1 className={`font-semibold ${size}`} style={{ fontSize }}>
            {lines.map((l, i) => (
              <span key={i} className="line-mask" style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
                <span className="line-up block" style={{ ["--d" as string]: `${200 + i * 110}ms` }}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
        </div>
        {(body || actions) && (
          <div className="flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between md:gap-16">
            {body && (
              <p
                className="fade-up text-[19px] leading-[25px] tracking-[-0.04em] text-white/85 md:text-[20px] md:leading-[26px]"
                style={{ maxWidth: `min(${Math.min(Math.max(Math.round(bodyWidth * 1.4), 680), 880)}px, 100%)`, ["--d" as string]: "550ms" }}
              >
                {body}
              </p>
            )}
            {actions && (
              <div className="fade-up flex shrink-0 flex-wrap gap-2" style={{ ["--d" as string]: "680ms" }}>
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
