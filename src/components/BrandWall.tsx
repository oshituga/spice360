"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
  const track = useRef<HTMLDivElement>(null);
  const ease = useRef<(to: number) => void>(() => {});

  /* The belt is one composited animation (no frame-by-frame JS), paused
     while off screen. Hover eases its rate down, like a hand on the belt. */
  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = el.scrollWidth / 2;
    const ends = ["translate3d(0, 0, 0)", `translate3d(${-w}px, 0, 0)`];
    const a = el.animate({ transform: dir < 0 ? ends : [...ends].reverse() }, {
      duration: (w / speed) * 1000,
      iterations: Infinity,
      easing: "linear",
      // Both directions start where the static row sits
      iterationStart: dir < 0 ? 0 : 1 - 1e-9,
    });
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? a.play() : a.pause()), { rootMargin: "100px 0px" });
    io.observe(el);

    let id = 0;
    let rate = 1;
    let target = 1;
    let last = 0;
    const step = (t: number) => {
      rate += (target - rate) * (1 - Math.exp(-(t - last) / 160));
      last = t;
      if (Math.abs(target - rate) < 0.005) rate = target;
      a.playbackRate = rate;
      id = rate === target ? 0 : requestAnimationFrame(step);
    };
    ease.current = (to) => {
      target = to;
      if (!id) {
        last = performance.now();
        id = requestAnimationFrame(step);
      }
    };
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      a.cancel();
    };
  }, [dir, speed]);

  const tiles = [...order, ...order, ...order, ...order];

  return (
    <div onPointerEnter={() => ease.current(0.15)} onPointerLeave={() => ease.current(1)} className="overflow-hidden">
      <div ref={track} className="flex w-max gap-2 will-change-transform">
        {tiles.map((t, i) => (
          <div key={i} className="relative h-[46px] w-[129px] shrink-0 overflow-hidden">
            <Image src={BRAND_TILES[t]} alt="" fill sizes="129px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
