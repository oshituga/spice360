"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Glow, type GlowEllipse } from "./Glow";
import { EASE, stagger } from "./motion";

/*
 * The dark card Figma uses for pillars, capabilities, values and services:
 * black at the top, the page colour pooling up from the bottom edge, its
 * blobs drifting slowly. Cards rise into place one after another on scroll;
 * no hover tricks.
 */
export function GlowGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : stagger(0.1)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function GlowCard({
  glow,
  className = "",
  seed = 0,
  children,
}: {
  glow: GlowEllipse[];
  className?: string;
  seed?: number;
  children: ReactNode;
}) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
      }}
      className={`relative isolate overflow-hidden bg-black ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.6, delay: 0.25 } } }}
      >
        <Glow ellipses={glow} clip={false} seed={seed} />
      </motion.div>
      <div className="relative h-full">{children}</div>
    </motion.article>
  );
}

/* Square badge in the page colour: holds "01" or an icon. */
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-[var(--accent)] px-[10px] py-2 text-[25px] leading-[29px] font-semibold tracking-[-0.03em] text-white ${className}`}
    >
      {children}
    </span>
  );
}
