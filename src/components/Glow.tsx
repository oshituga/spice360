"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/*
 * The Figma glow is three 2324x1397 ellipses with a 225px Gaussian blur,
 * stacked a few hundred px apart so their soft edges band into a gradient.
 * A blur that size is expensive to render and impossible to animate, so each
 * ellipse is redrawn as a radial gradient whose stops follow the blurred
 * edge's falloff (erf curve, sigma 225 on ry 698). Same picture, composited.
 *
 * Each blob orbits on its own period and breathes on another (see orbit-a/b/c
 * and breathe in globals.css). Pure CSS, no reaction to cursor or scroll. Off screen the loops pause
 * (data-paused) so a page with a dozen glows only spends frames on the ones
 * you can see. `seed` offsets the phase so neighbouring glows drift apart.
 *
 * `y` is the ellipse centre in Figma px from the anchor edge: from the top
 * for anchor="top" (negative = above the section), from the bottom for
 * anchor="bottom" (positive = below the section).
 */

export type GlowEllipse = { color: string; y: number };

const W = 3224;
const H = 2297;
/* Drawn at 1/K size and scaled up by K (see breathe in globals.css) */
const K = 4;
// Orbit periods (constant speed) and breathing periods (eased, alternating)
const MOTION = [
  { orbit: "orbit-a", dur: 19, breathe: 7 },
  { orbit: "orbit-b", dur: 24, breathe: 9 },
  { orbit: "orbit-c", dur: 31, breathe: 11 },
];
/* How far the light travels. "lively" is for the footer, where the glow is
   the whole show: twice the reach, a deeper breath, a quicker tempo. */
const FEEL = {
  calm: { rx: 160, ry: 110, bs: 1.08, tempo: 1 },
  lively: { rx: 340, ry: 230, bs: 1.18, tempo: 0.7 },
};

function falloff(hex: string) {
  const stops: [number, number][] = [
    [0, 1],
    [30, 0.97],
    [41, 0.84],
    [50, 0.7],
    [61, 0.5],
    [70, 0.32],
    [80, 0.16],
    [90, 0.05],
    [100, 0],
  ];
  return `radial-gradient(closest-side, ${stops
    .map(([at, a]) => `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")} ${at}%`)
    .join(", ")})`;
}

export function Glow({
  ellipses,
  anchor = "bottom",
  clip = true,
  seed = 0,
  feel = "calm",
  className = "",
  style,
}: {
  ellipses: GlowEllipse[];
  anchor?: "top" | "bottom";
  /** @deprecated glows no longer react to scroll */
  rise?: number;
  /** Clip to own box. Off when the parent already clips. */
  clip?: boolean;
  /** Phase offset so adjacent glows drift out of step */
  seed?: number;
  /** calm (default) or lively (footer) */
  feel?: keyof typeof FEEL;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.removeAttribute("data-paused");
        else el.setAttribute("data-paused", "");
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`glow pointer-events-none absolute inset-0 ${clip ? "overflow-clip" : ""} ${className}`}
      style={style}
    >
      {ellipses.map((e, i) => {
        const m = MOTION[i % MOTION.length];
        const f = FEEL[feel];
        const dur = m.dur * f.tempo;
        const br = m.breathe * f.tempo;
        const w = W / K;
        const h = H / K;
        return (
          <div
            key={i}
            className="absolute left-1/2 will-change-transform"
            style={{
              width: w,
              height: h,
              marginLeft: -w / 2,
              scale: K,
              background: falloff(e.color),
              ["--k" as string]: K,
              ["--rx" as string]: `${f.rx}px`,
              ["--ry" as string]: `${f.ry}px`,
              ["--bs" as string]: f.bs,
              animation: `${m.orbit} ${dur}s linear ${-((seed * 7.3 + i * 5.1) % dur)}s infinite, breathe ${br}s cubic-bezier(0.45, 0, 0.55, 1) ${-((seed * 3.1 + i * 2.7) % br)}s infinite alternate`,
              ...(anchor === "top" ? { top: e.y, marginTop: -h / 2 } : { bottom: -e.y, marginBottom: -h / 2 }),
            }}
          />
        );
      })}
    </div>
  );
}
