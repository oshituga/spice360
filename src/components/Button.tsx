"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "accent" | "light" | "dark" | "ghost";

const tones: Record<Tone, string> = {
  // Figma buttons: 8px radius, 12/22 semibold, -0.72 tracking, px 16 py 8/12
  accent: "bg-[var(--accent)] text-white",
  light: "bg-paper text-[var(--accent)]",
  dark: "bg-ink text-white",
  ghost: "bg-white/10 text-white backdrop-blur-md",
};

/*
 * Every CTA on the site. The label rolls: the resting copy slides up and an
 * identical copy rises from below, so the button answers the cursor without
 * changing size. Touch gets the press scale only.
 */
export function Button({
  href,
  children,
  tone = "accent",
  size = "md",
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md";
  className?: string;
  external?: boolean;
}) {
  const pad = size === "sm" ? "px-4 py-2" : "px-5 py-3";
  const cls = `group/btn relative inline-flex items-center justify-center overflow-hidden rounded-[8px] text-ui font-semibold whitespace-nowrap select-none transition-[filter,scale] duration-200 ease-out active:scale-[0.97] ${pad} ${tones[tone]} ${className}`;

  const label = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-soft)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-soft)] group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );

  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  const newTab = /^https?:/.test(href);

  return (
    <span className="inline-block">
      {isExternal ? (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer" : undefined}
          className={cls}
        >
          {label}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {label}
        </Link>
      )}
    </span>
  );
}
