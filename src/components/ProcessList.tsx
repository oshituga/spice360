"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./motion";

/*
 * Figma "From first brief to final result": five rows, number / stage /
 * description, hairlines between. Rows rise in one by one and each hairline
 * draws left to right.
 */
const STEPS = [
  ["Brief", "We push back before we start. A brief that cannot survive interrogation cannot survive the market."],
  ["Insight", "We find the specific Nigerian consumer truth the brief has been working around. That truth is the campaign."],
  ["Creative", "Ideas rooted in culture, designed to earn attention, built to change behavior. Not decoration."],
  ["Execution", "Strategy and production under one roof, across every format, at the same standard."],
  ["Results", "We measure against what we agreed to measure. We report what we found, including what did not work."],
];

export function ProcessList() {
  const reduce = useReducedMotion();
  return (
    <ol className="mx-auto w-full max-w-[1020px]">
      {STEPS.map(([title, body], i) => (
        <motion.li
          key={title}
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
        >
          <div className="grid grid-cols-[56px_1fr] gap-x-4 gap-y-3 px-0 py-[18px] md:grid-cols-[1fr_1fr_356px] md:items-start md:py-6">
            <span className="text-[32px] leading-[28px] font-semibold tracking-[-0.05em] tabular-nums">0{i + 1}</span>
            <h3 className="text-[32px] leading-[32px] font-semibold tracking-[-0.05em] md:text-center">{title}</h3>
            <p className="col-span-2 text-body md:col-span-1">{body}</p>
          </div>
          {i < STEPS.length - 1 && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/30"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.08 }}
            />
          )}
        </motion.li>
      ))}
    </ol>
  );
}
