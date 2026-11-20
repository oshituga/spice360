"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/*
 * Wraps a story's body and draws a 2px line across the top of the viewport
 * that fills as the body is read: 0 when its top reaches the top of the
 * screen, full when its end reaches the bottom. scaleX only (compositor),
 * lightly sprung so wheel steps don't stutter. Decorative: the scrollbar
 * already carries this, so it is hidden from assistive tech.
 */
export function ReadingProgress({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4, restDelta: 0.001 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--eyebrow)]"
        style={{ scaleX }}
      />
      {children}
    </div>
  );
}
