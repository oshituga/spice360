"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/*
 * Figma: full-bleed photo, 40% black overlay, the motto centred, "Our Motto"
 * underneath. Here the motto is read by scrolling: each word starts at 20%
 * and lights up in turn as the section crosses the viewport, while the photo
 * slowly pulls back (1.2x -> 1x). The sentence lands fully lit at centre.
 */
export function Motto({ quote, label, src }: { quote: string; label: string; src: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const words = quote.split(" ");

  return (
    <section
      ref={ref}
      aria-label={`${label}: ${quote}`}
      className="relative isolate flex min-h-[600px] items-center justify-center overflow-clip px-[var(--gutter)] py-[160px] md:min-h-[829px]"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ scale: reduce ? 1 : scale }}>
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />

      <div className="flex flex-col items-center gap-[120px] text-center md:gap-[246px]">
        <p
          aria-hidden
          className="max-w-[min(700px,100%)] font-semibold text-[clamp(32px,2vw+22px,48px)] leading-[0.875] tracking-[-0.05em]"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[0.2 + (i / words.length) * 0.3, 0.2 + ((i + 1) / words.length) * 0.3]} reduce={!!reduce}>
              {w}
            </Word>
          ))}
        </p>
        <p aria-hidden className="text-body">
          {label}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  // Opacity only: a per-word blur filter re-rasterises every frame of the scroll
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span className="inline-block" style={reduce ? undefined : { opacity }}>
      {children}&nbsp;
    </motion.span>
  );
}
