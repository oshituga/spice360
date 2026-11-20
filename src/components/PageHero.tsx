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
}: {
  title: string;
  titleWidth: number;
  body: ReactNode;
  bodyWidth: number;
  actions?: ReactNode;
  glow?: GlowEllipse[];
  /** Full-bleed photo under a scrim instead of a glow (photo heroes never get a glow) */
  image?: string;
}) {
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
