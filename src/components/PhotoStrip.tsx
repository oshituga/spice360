"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/*
 * Figma "We are more than just workmates": a row of 334px photos, alternating
 * 292 / 344 tall, bottom-aligned, running off both edges. Here the row
 * slides sideways as the page scrolls (scroll-linked, so it scrubs both
 * ways).
 */
export function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.ul className="flex w-max items-end gap-2 px-[var(--gutter)]" style={{ x: reduce ? 0 : x }}>
        {photos.map((p, i) => {
          const tall = i % 2 === 1;
          return (
            <li
              key={p.src}
              className={`relative w-[240px] shrink-0 overflow-hidden md:w-[334px] ${
                tall ? "h-[250px] md:h-[344px]" : "h-[210px] md:h-[292px]"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 334px, 240px"
                className="object-cover"
              />
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
