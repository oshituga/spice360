import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { PALETTES, type PaletteName } from "@/lib/glows";
import type { ReactNode } from "react";
import { CONTACT_HREF } from "@/lib/content";
import { Glow, type GlowEllipse } from "./Glow";
import { FadeIn, SplitReveal } from "./motion";

/*
 * Figma "Hero" frame that closes every page: a CTA, then three link columns
 * and the address line, all sitting in a glow that wells up from the bottom
 * edge. A full screen tall, like Terra & Tent's: CTA up top, links and
 * address anchored to the bottom, so the page ends on light, not a stub.
 */

const COLS = [
  {
    title: null,
    links: [
      { label: "Home", href: "/" },
      { label: "About & Work", href: "/about" },
      { label: "Awards", href: "/about#laif" },
      { label: "Blog", href: "/kitchen" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "People", href: "/people" },
      { label: "Careers", href: "/careers" },
      { label: "Spice Digital", href: "/spice-digital" },
      { label: "Get in touch", href: CONTACT_HREF },
    ],
  },
  { title: "Legal & Info", links: [{ label: "Privacy Policy", href: "/privacy" }] },
];

export function Footer({
  eyebrow,
  title,
  titleWidth,
  body,
  bodyWidth = 434,
  actions,
  glow,
  metaClass = "text-white",
  metaColor,
}: {
  eyebrow?: string;
  title: string;
  titleWidth: number;
  body: string;
  bodyWidth?: number;
  actions: ReactNode;
  glow: GlowEllipse[];
  /** Figma tints the address line with the page colour on light glows */
  metaClass?: string;
  /** Same, as a colour (the palettes in lib/glows) */
  metaColor?: string;
}) {
  return (
    <footer className="grain relative isolate flex min-h-svh flex-col justify-between gap-24 overflow-clip bg-black pt-[120px] pb-[calc(48px+env(safe-area-inset-bottom))] md:pt-[160px] md:pb-[108px]">
      <Glow ellipses={glow} anchor="bottom" seed={2} />

      <div className="relative flex flex-col items-center gap-6 px-[var(--gutter)] text-center">
        {eyebrow && (
          <FadeIn as="p" y={10} className="text-eyebrow font-semibold">
            {eyebrow}
          </FadeIn>
        )}
        <SplitReveal
          text={title}
          className="font-semibold text-[clamp(34px,2vw+22px,48px)] leading-[0.875] tracking-[-0.05em]"
          style={{ maxWidth: `min(${titleWidth}px, 100%)` }}
        />
        <div className="flex flex-col items-center gap-[15px]">
          <FadeIn delay={0.1} className="text-body" style={{ maxWidth: `min(${bodyWidth}px, 100%)` }}>
            {body}
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-2">
            {actions}
          </FadeIn>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-[var(--gutter)] md:px-[145px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-[175px]">
          {COLS.map((col, i) => (
            <FadeIn key={i} delay={i * 0.08} className={`flex flex-col gap-6 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}>
              {col.title ? (
                <p className="text-eyebrow font-semibold">{col.title}</p>
              ) : (
                <Logo className="h-[29px] self-start text-white" />
              )}
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        <FadeIn
          delay={0.2}
          className={`mt-20 flex flex-wrap gap-x-2 gap-y-1 text-[16px] leading-[18px] tracking-[-0.06em] md:mt-[160px] md:justify-end ${metaClass}`}
          style={metaColor ? { color: metaColor } : undefined}
        >
          <span>© 2026 Spice 360</span>
          <span className="text-mute">·</span>
          <span>AAAN Member</span>
          <span className="text-mute">·</span>
          <span>1 Akanbi Onitiri Street, Surulere, Lagos</span>
        </FadeIn>
      </div>
    </footer>
  );
}

/* Underline draws in from the left on hover, retracts to the right on leave. */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "group relative inline-block text-[16px] leading-[18px] tracking-[-0.06em] text-white/90 transition-colors hover:text-white";
  const line = (
    <span
      aria-hidden
      className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:origin-left group-hover:scale-x-100"
    />
  );
  return href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {children}
      {line}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {line}
    </Link>
  );
}

/* Footer for the supporting pages (Kitchen, Careers, Contact, Privacy):
   the plain "start a conversation" close, in the page's own palette. */
export function StandardFooter({ palette }: { palette: PaletteName }) {
  const p = PALETTES[palette];
  return (
    <Footer
      title="Start a conversation"
      titleWidth={288}
      body="Tell us what your brand is trying to do and leave the rest to us"
      bodyWidth={274}
      glow={p.footer}
      metaColor={p.ink}
      actions={
        <Button href={CONTACT_HREF} tone="light" className="bg-white/90 px-6">
          Brief us
        </Button>
      }
    />
  );
}
