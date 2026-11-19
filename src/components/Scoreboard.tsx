"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "./motion";

/*
 * Figma: 3x2 stats, 625px wide, 1px dividers 166px tall between columns.
 * Numbers count up from zero when the board scrolls in (the 4th/19yr keep
 * their suffix still while the digits run) and the dividers draw downwards.
 */
const STATS = [
  { n: 4, suffix: "th", label: "Most creative\nagency in Nigeria, 2024" },
  { n: 5, suffix: "", label: "Gold medals,\nmaiden entry" },
  { n: 7, suffix: "", label: "Silver medals" },
  { n: 4, suffix: "", label: "Bronze medals" },
  { n: 90, suffix: "", label: "Total\npoints scored" },
  { n: 19, suffix: "yr", label: "Competition we walked\ninto on day one" },
];

export function Scoreboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid w-full max-w-[625px] grid-cols-2 gap-y-4 md:grid-cols-3">
      {STATS.map((s, i) => (
        <div key={i} className="relative flex">
          {/* divider before every column except the first in its row */}
          <motion.span
            aria-hidden
            className={`absolute top-0 left-0 h-full w-px origin-top bg-white/25 ${i % 3 === 0 ? "md:hidden" : ""} ${i % 2 === 0 ? "max-md:hidden" : ""}`}
            initial={reduce ? false : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.08 }}
          />
          <motion.div
            className="flex h-[166px] flex-1 flex-col items-center justify-between py-5 text-center"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
          >
            <p className="text-[28px] leading-[38px] font-semibold tracking-[-0.05em] tabular-nums">
              <Count to={s.n} run={inView} delay={0.15 + i * 0.08} />
              {s.suffix}
            </p>
            <p className="text-body whitespace-pre-line">{s.label}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Count({ to, run, delay }: { to: number; run: boolean; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Hidden (opacity 0) until in view, so zeroing here never flashes
    if (reduce || !run) {
      el.textContent = String(reduce ? to : 0);
      return;
    }
    const c = animate(0, to, {
      duration: to > 20 ? 2 : 1.4,
      ease: [0.16, 1, 0.3, 1],
      delay,
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [run, to, delay, reduce]);
  return <span ref={ref}>{to}</span>;
}
