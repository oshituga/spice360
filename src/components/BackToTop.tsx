"use client";

import { useLenis } from "lenis/react";

/* Footer's way home: a smooth glide to the top (Lenis), instant if reduced motion */
export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (lenis) lenis.scrollTo(0, { duration: reduce ? 0 : 1.6 });
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="group inline-flex items-center gap-2 rounded-full bg-black/25 px-3.5 py-1.5 text-[14px] tracking-[-0.04em] text-white transition-[background-color,scale] duration-200 hover:bg-black/40 active:scale-[0.96]"
    >
      Back to top
      <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-0.5">
        ↑
      </span>
    </button>
  );
}
