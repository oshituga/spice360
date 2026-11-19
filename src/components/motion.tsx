"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/* One curve for every reveal on the site: quint out, a soft start and a long
   unhurried settle, so nothing snaps. Same family as the hero's CSS fades. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IO = [0.76, 0, 0.24, 1] as const;

/*
 * Section headings fade up as a whole when they scroll in, the same way the
 * hero headline arrives, so every heading on the site enters alike. Lines
 * written with \n stay on their own lines and follow each other a beat apart.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  className = "",
  style,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** @deprecated lines now fade as units */
  stagger?: number;
  /** Animate on mount instead of on scroll into view */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = immediate || inView;
  const lines = text.split("\n");

  return (
    <Tag ref={ref} aria-label={text.replace(/\n/g, " ")} className={className} style={style}>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          aria-hidden
          className="block"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: delay + li * 0.08 }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Fade + rise on scroll into view. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 20,
  as = "div",
  immediate = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "section" | "span";
  immediate?: boolean;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay } },
  };
  return (
    <M
      className={className}
      style={style}
      variants={reduce ? undefined : variants}
      initial={reduce ? false : "hidden"}
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {children}
    </M>
  );
}

/** Stagger container: children using `item` variants enter one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};
