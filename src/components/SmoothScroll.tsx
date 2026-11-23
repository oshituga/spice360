"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ReactLenis, useLenis } from "lenis/react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/*
 * Inertial wheel scroll. lerp 0.1 is Lenis's own sweet spot: smooth enough
 * to glide, tight enough that the page never feels like it lags the wheel.
 * In-page anchor links (#blog, #laif) glide too, offset 100px so headings
 * clear the nav. Off for reduced motion; touch keeps native scrolling.
 */
export function SmoothScroll() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );

  if (reduced) return null;
  return (
    <ReactLenis root autoRaf={false} options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -100 } }}>
      <Driver />
    </ReactLenis>
  );
}

/*
 * Lenis's own loop asks for a frame on every vsync forever. Any frame the
 * main thread runs re-samples every running CSS animation there (the glows),
 * so an idle page kept the main thread busy. This loop only runs while a
 * glide is in flight. Every glide starts from input: the wheel, or a click
 * (anchor links, back to top), so those wake it.
 */
function Driver() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    let id = 0;
    let last = 0;
    let clock = 0;
    const tick = (t: number) => {
      // Lenis's clock only advances while running, so a glide never starts with a jump
      clock += Math.min(Math.max(t - last, 0), 50);
      last = t;
      lenis.raf(clock);
      id = lenis.isScrolling === "smooth" ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (id) return;
      last = performance.now();
      id = requestAnimationFrame(tick);
    };
    const off = lenis.on("virtual-scroll", wake);
    document.addEventListener("click", wake, true);
    return () => {
      cancelAnimationFrame(id);
      off();
      document.removeEventListener("click", wake, true);
    };
  }, [lenis]);
  return null;
}
