"use client";

import Image from "next/image";

/*
 * Figma's case-study still: photo under a 40% scrim, play glyph centred,
 * credit line bottom-left. A slow ring breathes behind the play glyph so the
 * still reads as film.
 */
export function PlayCard({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="group relative isolate flex min-h-[340px] flex-1 items-end overflow-hidden text-white md:min-h-[432px]"
    >
      <Image
        src={src}
        alt="Indomie noodles, still from the Mother’s Love campaign"
        fill
        sizes="(min-width: 768px) 440px, 100vw"
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/40" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -mt-[22px] -ml-[22px]">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.4s]" />
        <span className="relative flex size-[43px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma asset, fixed 43px */}
          <img src="/icons/play.svg" width={43} height={43} alt="" />
        </span>
      </div>
      <p className="relative px-10 pb-5 text-eyebrow font-semibold">{label}</p>
    </div>
  );
}
