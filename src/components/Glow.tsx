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
 * anchor="bottom" (positive = below the section). A section can set --pour
 * to move the light further in (negative: further out) at a breakpoint.
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

/* The page section before (-1) or after (+1) this one: only top-level
   sections and the footer count, so the nav above the hero and the end of
   the page are "nothing", not black. */
function neighbour(el: Element, step: -1 | 1) {
  const all = [...document.querySelectorAll("main section, main footer")].filter((n) => !n.parentElement?.closest("section, footer"));
  const i = all.indexOf(el);
  return i < 0 ? null : (all[i + step] ?? null);
}

/* Is this section black? Its own black background, or no background at all
   (the page is black) unless a photo covers it, like the Motto. */
function isBlack(el: Element) {
  const bg = getComputedStyle(el).backgroundColor;
  if (bg === "rgb(0, 0, 0)") return true;
  if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return false;
  const box = el.getBoundingClientRect();
  return ![...el.querySelectorAll("img, video")].some((m) => {
    const r = m.getBoundingClientRect();
    return r.width >= box.width * 0.9 && r.height >= box.height * 0.6;
  });
}

/* Black to clear on an ease-in-out curve (no perceptible start or end).
   With a tint, the fade passes through that colour on its way to black:
   the overlay is the tint where it is light and only turns black right at
   the edge, so a pale light (lime) deepens into its own dark (green)
   instead of dimming to olive. */
function eased(dir: string, tint?: string) {
  const stops: [number, number][] = [
    [0, 1], [8.1, 0.987], [15.5, 0.951], [22.5, 0.896], [29, 0.825], [35.3, 0.741], [41.2, 0.648], [47.1, 0.55],
    [52.9, 0.45], [58.8, 0.352], [64.7, 0.259], [71, 0.175], [77.5, 0.104], [84.5, 0.049], [91.9, 0.013], [100, 0],
  ];
  const rgb = tint ? [1, 3, 5].map((i) => parseInt(tint.slice(i, i + 2), 16)) : [0, 0, 0];
  return `linear-gradient(${dir}, ${stops
    .map(([at, a]) => {
      const k = 1 - a * a; // share of the tint: none at the edge, all of it where the fade is light
      return `rgb(${rgb.map((v) => Math.round(v * k)).join(" ")} / ${a}) ${at}%`;
    })
    .join(", ")})`;
}

/* Push a colour away from its own grey, then take back any luminance that
   gained: the light gets richer, never paler, so the white type over it
   reads as well as it did. */
const VIVID = 1.4;
function vivid(hex: string) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const grey = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const rich = rgb.map((v) => Math.min(255, Math.max(0, grey + (v - grey) * VIVID)));
  const back = Math.min(1, luminance(rgb) / (luminance(rich) || 1)) ** (1 / GAMMA);
  return `#${rich.map((v) => Math.round(v * back).toString(16).padStart(2, "0")).join("")}`;
}

const GAMMA = 2.2;
function luminance([r, g, b]: number[]) {
  return 0.2126 * r ** GAMMA + 0.7152 * g ** GAMMA + 0.0722 * b ** GAMMA;
}

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
  tint,
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
  /** Fade through this colour (the palette's deep) instead of straight to black */
  tint?: string;
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

    // Fade an edge only when the section on that side is black
    const host = el.closest("section, footer");
    for (const edge of ["top", "bottom"] as const) {
      const fade = el.querySelector<HTMLElement>(`:scope > [data-edge="${edge}"]`);
      if (!fade || !host) continue;
      const next = neighbour(host, edge === "top" ? -1 : 1);
      fade.style.display = next && isBlack(next) ? "" : "none";
    }
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
              background: falloff(vivid(e.color)),
              ["--k" as string]: K,
              ["--rx" as string]: `${f.rx}px`,
              ["--ry" as string]: `${f.ry}px`,
              ["--bs" as string]: f.bs,
              animation: `${m.orbit} ${dur}s linear ${-((seed * 7.3 + i * 5.1) % dur)}s infinite, breathe ${br}s cubic-bezier(0.45, 0, 0.55, 1) ${-((seed * 3.1 + i * 2.7) % br)}s infinite alternate`,
              // --pour (set by the section, per breakpoint) moves the light further in
              ...(anchor === "top"
                ? { top: `calc(${e.y}px + var(--pour, 0px))`, marginTop: -h / 2 }
                : { bottom: `calc(${-e.y}px + var(--pour, 0px))`, marginBottom: -h / 2 }),
            }}
          />
        );
      })}
      {/* The light must never end in a line where it meets a black section,
          so each edge can fade to black on an eased curve (the classic
          "easing gradient" stops: no visible start or kink). Static alpha
          over the moving layers, so it costs nothing per frame. Whether an
          edge fades is decided by its neighbour (see the effect above): only
          when the section on that side is black. Next to a photo, a white
          section or the end of the page, the light runs to the edge. */}
      {(["top", "bottom"] as const).map((edge) => {
        const far = (edge === "top") === (anchor === "bottom");
        return (
          <div
            key={edge}
            data-edge={edge}
            className="absolute inset-x-0"
            style={{
              // Off until the effect has looked at the neighbours, so nothing flickers
              display: "none",
              [edge]: 0,
              height: far ? (feel === "lively" ? "46%" : "34%") : "30%",
              // The tint only belongs where the light is bright (the edge it rises
              // from); on the dark far edge a tinted fade paints a haze instead
              backgroundImage: eased(edge === "top" ? "to bottom" : "to top", far ? undefined : tint),
            }}
          />
        );
      })}
    </div>
  );
}
