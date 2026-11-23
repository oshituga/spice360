"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./motion";

/*
 * Figma "What we do" / "Two doors": flat colour tiles, 300px tall, 40px
 * padding, title top, copy bottom, no gaps between them.
 *
 * They fade up on scroll, one after another. No hover tricks.
 */
export function BentoRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col md:flex-row ${className}`}>{children}</div>;
}

export function BentoTile({
  color,
  title,
  children,
  delay = 0,
  className = "",
  ink = "text-white",
}: {
  color: string;
  title: string;
  children: ReactNode;
  delay?: number;
  className?: string;
  ink?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`relative isolate flex min-h-[260px] flex-1 basis-0 flex-col justify-between overflow-hidden p-8 md:h-[300px] md:p-10 ${ink} ${className}`}
      style={{ background: color }}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <h3 className="text-name font-semibold">
        {title}
      </h3>
      <div className="mt-16 text-body md:mt-0">{children}</div>
    </motion.article>
  );
}
