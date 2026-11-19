"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE } from "./motion";

/*
 * Photo card with copy over a 40% black scrim (Figma overlay). Used for blog
 * posts, case studies and leadership.
 *
 * - Fades up as it scrolls in while the photo settles from 1.08x; opacity
 *   and transform only, so it stays on the compositor (a clip-path wipe
 *   repaints the whole photo every frame and stutters mid-scroll)
 * - Photo drifts gently against the scroll inside its frame (parallax, 5%)
 * - Hover: the photo eases in a touch (3%), nothing else moves
 */
export function MediaCard({
  src,
  alt,
  children,
  className = "",
  cursor,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  overlay = 0.4,
  position = "center",
  hoverSrc,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  cursor?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: number;
  position?: string;
  /** Second photo revealed on hover with a wipe (leadership: suit -> spice tee) */
  hoverSrc?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const py = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={`group relative isolate overflow-hidden bg-neutral-900 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        className="absolute -inset-y-[5%] inset-x-0"
        style={{ y: reduce ? 0 : py }}
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
          {hoverSrc && (
            <Image
              src={hoverSrc}
              alt=""
              fill
              sizes={sizes}
              className="object-cover [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[900ms] ease-[var(--ease-soft)] group-hover:[clip-path:inset(0_0_0_0)]"
              style={{ objectPosition: position }}
            />
          )}
        </div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-black opacity-[var(--o)]"
        style={{ ["--o" as string]: overlay }}
      />
      <div className="relative flex h-full flex-col justify-end">
        {children}
      </div>
    </motion.div>
  );
}
