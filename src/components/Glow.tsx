"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/*
 * The Figma glow is three 2324x1397 ellipses with a 225px Gaussian blur,
 * stacked a few hundred px apart so their soft edges band into a gradient.
 * A blur that size is expensive to render and impossible to animate, so each
 * ellipse is redrawn as a radial gradient whose stops follow the blurred
 * edge's falloff (erf curve, sigma 225 on ry 698). Same picture, composited.
 *
 * Each blob roams on its own loop (see glow-a/b/c in globals.css). Pure CSS
 * transforms, no reaction to cursor or scroll. Off screen the loops pause
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
const MOTION = [
  { name: "glow-a", dur: 14 },
  { name: "glow-b", dur: 18 },
  { name: "glow-c", dur: 23 },
];
const EASE = "cubic-bezier(0.45, 0, 0.55, 1)"; // sine in-out: no edges to the motion

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
        return (
          <div
            key={i}
            className="absolute left-1/2"
            style={{
              width: W,
              height: H,
              marginLeft: -W / 2,
              background: falloff(e.color),
              animation: `${m.name} ${m.dur}s ${EASE} ${-((seed * 7.3 + i * 5.1) % m.dur)}s infinite`,
              ...(anchor === "top" ? { top: e.y, marginTop: -H / 2 } : { bottom: -e.y, marginBottom: -H / 2 }),
            }}
          />
        );
      })}
    </div>
  );
}
