"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "./motion";

/*
 * The proof moment, so the figures are the loudest thing in the section:
 * set huge, tabular, counting up from zero once as the board scrolls in.
 * Each stat hangs from a hairline that draws across (scaleX), and every
 * label starts on the same line under its figure, so the grid reads as
 * one clean table. Suffixes (th, yr) sit small and high beside the digits,
 * and the medal counts carry a small gold, silver or bronze disc.
 */
const STATS: { n: number; suffix: string; label: string; medal?: string }[] = [
  { n: 4, suffix: "th", label: "Most creative\nagency in Nigeria, 2024" },
  { n: 5, suffix: "", label: "Gold medals,\nmaiden entry", medal: "radial-gradient(circle at 35% 30%, #fff3b0, #d9a520 55%, #8a6410)" },
  { n: 7, suffix: "", label: "Silver medals", medal: "radial-gradient(circle at 35% 30%, #ffffff, #b9bec6 55%, #6b717b)" },
  { n: 4, suffix: "", label: "Bronze medals", medal: "radial-gradient(circle at 35% 30%, #ffd2a8, #b8733a 55%, #6e3d16)" },
  { n: 90, suffix: "", label: "Total\npoints scored" },
  { n: 19, suffix: "yr", label: "Competition we walked\ninto on day one" },
];

export function Scoreboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid w-full grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
      {STATS.map((s, i) => (
        <div key={i} className="relative pt-6">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-white/30"
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 + i * 0.08 }}
          />
          <motion.div
            className="flex flex-col gap-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
          >
            <p className="flex items-start text-[clamp(64px,6.4vw+12px,136px)] leading-[0.82] font-semibold tracking-[-0.065em] tabular-nums">
              <Count to={s.n} run={inView} delay={0.15 + i * 0.08} />
              {s.suffix && <span className="mt-[0.08em] ml-[0.04em] text-[0.36em] leading-none tracking-[-0.04em] text-white/70">{s.suffix}</span>}
            </p>
            <p className="flex max-w-[260px] items-center gap-2 text-[16px] leading-[19px] tracking-[-0.04em] text-white/80 [text-wrap:balance]">
              {s.medal && <span aria-hidden className="size-3.5 shrink-0 rounded-full shadow-[inset_0_-1px_2px_rgba(0,0,0,0.35)]" style={{ background: s.medal }} />}
              <span>{s.label.replace("\n", " ")}</span>
            </p>
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
