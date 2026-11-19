"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/*
 * Figma note on the leadership cards: "On scroll card 2 should have a
 * stacking animation." Each card pins near the top of the viewport; the
 * next one slides up over it while the pinned card sinks back (scale 0.92,
 * darkens) like a deck being dealt.
 */
export type Bio = {
  color: string;
  photo: string;
  role: string;
  spice: string;
  name: string;
  line: string;
  paragraphs: string[];
};

export function StackCards({ bios }: { bios: Bio[] }) {
  return (
    <div className="mx-auto flex max-w-[730px] flex-col gap-6">
      {bios.map((b, i) => (
        <StackCard key={b.name} bio={b} index={i} last={i === bios.length - 1} />
      ))}
    </div>
  );
}

function StackCard({ bio, index, last }: { bio: Bio; index: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Progress from "this card pinned" to "next card fully over it"
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 120px", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.55]);

  return (
    <div ref={ref} className="md:sticky" style={{ top: 120 + index * 24 }}>
      <motion.article
        className="relative origin-top overflow-hidden p-6 text-white md:p-10"
        style={{ background: bio.color, scale: reduce ? 1 : scale }}
        initial={reduce ? false : { y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative size-[200px] overflow-hidden md:size-[250px]">
          <Image src={bio.photo} alt={bio.name} fill sizes="250px" className="object-cover object-top" />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <p className="flex items-center gap-2 text-eyebrow font-semibold">
            {bio.role}
            <span aria-hidden className="size-1 rounded-full bg-white" />
            {bio.spice}
          </p>
          <h3 className="text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{bio.name}</h3>
          <p className="text-body italic opacity-90">{bio.line}</p>
          {bio.paragraphs.map((t, i) => (
            <Para key={i}>{t}</Para>
          ))}
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: reduce ? 0 : dim }} />
      </motion.article>
    </div>
  );
}

function Para({ children }: { children: ReactNode }) {
  return <p className="text-body">{children}</p>;
}
