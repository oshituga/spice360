"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

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
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -100 } }} />
  );
}
