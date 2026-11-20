import type { ReactNode } from "react";
import { FadeIn } from "./motion";

/* Long-form text on black: 640px measure, Figma body type, generous rhythm.
   Used by Privacy, Careers and the Kitchen stories. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <FadeIn className="prose-long mx-auto flex max-w-[640px] flex-col gap-6 text-body text-white/85 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-[28px] [&_h2]:leading-[30px] [&_h2]:font-semibold [&_h2]:tracking-[-0.05em] [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
      {children}
    </FadeIn>
  );
}
