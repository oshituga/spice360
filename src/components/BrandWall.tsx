"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";
import { BRAND_TILES } from "@/lib/content";

/*
 * Figma: four staggered rows of 129x46 brand tiles, 8px apart, fading to
 * white at both ends. Here each row is a live belt running in alternating
 * directions at an even, unhurried pace; hovering a row slows it so a logo
 * can be read.
 */
const ROWS = [
  { order: [0, 1, 2, 3, 4, 5, 6, 7], speed: 22, dir: -1 },
  { order: [4, 5, 6, 7, 0, 1, 2, 3], speed: 28, dir: 1 },
  { order: [2, 3, 4, 5, 6, 7, 0, 1], speed: 19, dir: -1 },
  { order: [6, 7, 0, 1, 2, 3, 4, 5], speed: 25, dir: 1 },
];

export function BrandWall() {
  return (
    <div className="relative w-full max-w-[958px] overflow-hidden" aria-label="Brands we work on: Indomie, Dano Milk, Power Oil, Kellogg’s, Colgate, Hero, Minimie, Lush Hair, Hypo" role="img">
      <div className="flex flex-col gap-2">
        {ROWS.map((r, i) => (
          <Row key={i} {...r} />
        ))}
      </div>
      {/* Figma's white feathering: 32px-blurred white bars over both ends */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[16%] bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[16%] bg-gradient-to-l from-white via-white/80 to-transparent" />
    </div>
  );
}

function Row({
  order,
  speed,
  dir,
}: {
  order: number[];
  speed: number;
  dir: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const width = useRef(0);
  const track = useRef<HTMLDivElement>(null);
  const factor = useSpring(1, { stiffness: 80, damping: 20 });
  const visible = useInView(track, { margin: "100px 0px" });

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    if (!width.current && track.current) width.current = track.current.scrollWidth / 2;
    const w = width.current || 1;
    const px = (speed * factor.get() * delta) / 1000;
    let next = x.get() + dir * px;
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  const tiles = [...order, ...order, ...order, ...order];

  return (
    <div onPointerEnter={() => factor.set(0.15)} onPointerLeave={() => factor.set(1)} className="overflow-hidden">
      <motion.div ref={track} className="flex w-max gap-2 will-change-transform" style={{ x }}>
        {tiles.map((t, i) => (
          <div key={i} className="relative h-[46px] w-[129px] shrink-0 overflow-hidden">
            <Image src={BRAND_TILES[t]} alt="" fill sizes="129px" className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
