import type { ReactNode } from "react";
import { FadeIn, SplitReveal } from "./motion";

/*
 * Figma's section header: eyebrow (16/18 semibold, theme colour), title
 * (48/42 semibold, -5%), optional body (18/20 medium), centred, 24px apart.
 * `width` is the Figma text-box width so lines break where the design does.
 */
export function SectionHead({
  eyebrow,
  title,
  width,
  body,
  bodyWidth,
  light = false,
  align = "center",
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  width?: number;
  body?: ReactNode;
  bodyWidth?: number;
  light?: boolean;
  /** left breaks the run of centred sections (editorial layouts) */
  align?: "center" | "left";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 ${align === "left" ? "items-start text-left" : "items-center text-center"} ${className}`}>
      {eyebrow && (
        <FadeIn
          as="p"
          y={10}
          className={`text-eyebrow font-semibold ${light ? "text-mute" : "text-[var(--eyebrow)]"}`}
        >
          {eyebrow}
        </FadeIn>
      )}
      <SplitReveal
        text={title}
        className={`font-semibold text-[clamp(34px,2vw+22px,48px)] leading-[0.875] tracking-[-0.05em] ${light ? "text-ink" : "text-white"}`}
        style={{ maxWidth: width ? `min(${width}px, 100%)` : undefined }}
      />
      {body && (
        <FadeIn
          delay={0.15}
          className={`text-body ${light ? "text-mute" : "text-white"}`}
          style={{ maxWidth: bodyWidth ? `min(${bodyWidth}px, 100%)` : undefined }}
        >
          {body}
        </FadeIn>
      )}
      {children && <FadeIn delay={0.25}>{children}</FadeIn>}
    </div>
  );
}
