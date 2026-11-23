"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/lib/content";

/*
 * The footer's second door: the inbox written out (a mailto link) with a
 * small Copy pill beside it, for people who would rather paste the address
 * into their own mail app. The pill's label rolls to "Copied" and back;
 * transform and opacity only.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-small text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
      <span>or write to</span>
      <a href={`mailto:${EMAIL}`} className="text-white underline decoration-white/40 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-white">
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="relative h-[26px] overflow-hidden rounded-full bg-black/25 px-3 text-[12px] font-semibold tracking-[-0.02em] text-white [text-shadow:none] transition-[background-color,scale] duration-200 hover:bg-black/40 active:scale-[0.95]"
      >
        <span className={`block transition-[translate,opacity] duration-400 ease-[var(--ease-soft)] ${copied ? "-translate-y-full opacity-0" : ""}`}>Copy</span>
        <span
          aria-hidden={!copied}
          className={`absolute inset-0 flex items-center justify-center transition-[translate,opacity] duration-400 ease-[var(--ease-soft)] ${copied ? "" : "translate-y-full opacity-0"}`}
        >
          Copied ✓
        </span>
      </button>
    </p>
  );
}
