import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { PALETTES, type PaletteName } from "@/lib/glows";
import type { ReactNode } from "react";
import { CONTACT_HREF, EMAIL } from "@/lib/content";
import { CASES } from "@/lib/cases";
import { STORIES } from "@/lib/kitchen";
import { BackToTop } from "./BackToTop";
import { CopyEmail } from "./CopyEmail";
import { Glow, type GlowEllipse } from "./Glow";
import { FadeIn, SplitReveal } from "./motion";

/*
 * Figma "Hero" frame that closes every page: a CTA set large (72px, the
 * page's last word should be its loudest), the email with a Copy pill as a
 * second door, then the link columns and the address line, all sitting in a glow that wells up from the bottom
 * edge. A full screen tall, like Terra & Tent's: CTA up top, links and
 * address anchored to the bottom, so the page ends on light, not a stub.
 */

/* Every page, grouped like the nav (lib/menu), plus the studio's door */
const COLS: { title: string; links: { label: string; href: string; note?: string }[] }[] = [
  {
    title: "Agency",
    links: [
      { label: "Home", href: "/" },
      { label: "About & Work", href: "/about" },
      { label: "Awards", href: "/about#laif" },
      { label: "People", href: "/people" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Spice Digital",
    links: [
      { label: "Overview", href: "/spice-digital" },
      ...CASES.map((c) => ({ label: c.brand, href: `/spice-digital/${c.slug}`, note: "Sample" })),
    ],
  },
  {
    title: "Kitchen",
    links: [
      { label: "All stories", href: "/kitchen" },
      ...STORIES.map((s) => ({ label: s.short, href: `/kitchen/${s.slug}` })),
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Get in touch", href: CONTACT_HREF },
      { label: "Email us", href: `mailto:${EMAIL}` },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
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
      <Glow ellipses={glow} anchor="bottom" seed={2} feel="lively" />

      <div className="relative flex flex-col items-center gap-6 px-[var(--gutter)] text-center">
        {eyebrow && (
          <FadeIn as="p" y={10} className="text-eyebrow font-semibold">
            {eyebrow}
          </FadeIn>
        )}
        <SplitReveal
          text={title}
          className="font-semibold text-[clamp(40px,3.4vw+18px,72px)] leading-[0.9] tracking-[-0.055em] [text-shadow:0_2px_24px_rgba(0,0,0,0.18)]"
          style={{ maxWidth: `min(${Math.round(titleWidth * 1.5)}px, 100%)` }}
        />
        <div className="flex flex-col items-center gap-6">
          <FadeIn delay={0.1} className="text-[20px] leading-[23px] tracking-[-0.045em] text-white/90" style={{ maxWidth: `min(${Math.round(bodyWidth * 1.15)}px, 100%)` }}>
            {body}
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-2">
            {actions}
          </FadeIn>
          <FadeIn delay={0.28}>
            <CopyEmail />
          </FadeIn>
        </div>
      </div>

      {/* Logo and line on the left, four aligned columns on the right, a
          quiet base row. A soft shadow under the type keeps white legible
          on the palest glows without dimming the light itself. */}
      <div className="relative mx-auto w-full max-w-[1240px] px-[var(--gutter)] [text-shadow:0_1px_14px_rgba(0,0,0,0.28)]">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <FadeIn className="flex flex-col gap-4">
            <Logo className="h-[29px] self-start text-white" />
            <p className="max-w-[240px] text-[16px] leading-[19px] tracking-[-0.05em] text-white/85">
              We make brands impossible to ignore.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:contents">
            {COLS.map((col, i) => (
              <FadeIn key={col.title} delay={0.06 + i * 0.06} className="flex flex-col gap-4">
                <p className="text-[13px] leading-[16px] font-semibold tracking-[-0.02em] text-white/60 uppercase">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href}>
                        {l.label}
                        {l.note && <span className="ml-1.5 text-[12px] text-white/55">{l.note}</span>}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn
          delay={0.2}
          className={`mt-16 flex flex-col gap-4 border-t border-white/20 pt-6 md:mt-[110px] md:flex-row md:items-center md:justify-between ${metaClass}`}
          style={metaColor ? { color: metaColor } : undefined}
        >
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-[15px] leading-[18px] tracking-[-0.05em] [text-shadow:none]">
            <span>© 2026 Spice 360</span>
            <span className="opacity-50">·</span>
            <span>AAAN Member</span>
            <span className="opacity-50">·</span>
            <span>1 Akanbi Onitiri Street, Surulere, Lagos</span>
          </p>
          <BackToTop />
        </FadeIn>
      </div>
    </footer>
  );
}

/* Underline draws in from the left on hover, retracts to the right on leave. */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "group relative inline-block text-[16px] leading-[19px] tracking-[-0.05em] text-white transition-opacity duration-200 hover:opacity-100";
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
        <Button href={CONTACT_HREF} tone="light" className="bg-white px-6">
          Brief us <span aria-hidden>→</span>
        </Button>
      }
    />
  );
}
