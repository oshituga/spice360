"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { type GlowEllipse } from "./Glow";
import { EASE, stagger } from "./motion";

/*
 * The dark card Figma uses for pillars, capabilities, values and services:
 * black at the top, the page colour pooling up from the bottom edge.
 * The pool is a single soft layer per card that slowly rises, falls and
 * drifts (card-light in globals.css), each card out of step with the next.
 * Cards rise into place one after another on scroll; no hover tricks.
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
        <CardLight glow={glow} seed={seed} />
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

/*
 * The card's three Figma ellipses sit 550-1300px below a 500px card, so all
 * that shows is their top edges: a band of colour rising from the bottom.
 * Drawn here as one radial pool per colour stacked in a single element,
 * strongest colour last, which reads the same at a fraction of the cost.
 */
function CardLight({ glow, seed }: { glow: GlowEllipse[]; seed: number }) {
  const [a, b, c] = glow.map((g) => g.color);
  const pools = [
    `radial-gradient(70% 55% at 50% 100%, ${c}cc 0%, ${c}00 100%)`,
    `radial-gradient(90% 70% at 50% 100%, ${b}cc 0%, ${b}00 100%)`,
    `radial-gradient(120% 95% at 50% 100%, ${a} 0%, ${a}00 100%)`,
  ];
  return (
    <div
      className="card-light absolute -inset-x-[15%] -bottom-[10%] top-0 origin-bottom"
      style={{
        backgroundImage: pools.join(", "),
        animation: `card-light ${13 + (seed % 3) * 2}s cubic-bezier(0.45, 0, 0.55, 1) ${-seed * 3.3}s infinite`,
      }}
    />
  );
}
