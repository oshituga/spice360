"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type PanInfo,
} from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTACT_HREF, NAV, themeFor } from "@/lib/content";
import { Button } from "./Button";
import { EASE } from "./motion";

/*
 * Figma: a 632px bar centred 40px from the top (mobile: full width, 30px
 * down, 33px in). Logo left, links + accent "Get in touch" right.
 *
 * Desktop adds two things the static frame cannot show:
 *  - a highlight pill that rests on the current page and glides to whichever
 *    link the cursor is over (one shared layoutId, so it travels, not fades)
 *  - the bar hides on scroll down, returns on scroll up, and turns to tinted
 *    glass once it leaves the hero so it stays legible over white sections.
 */

export function Nav() {
  const pathname = usePathname();
  const theme = themeFor(pathname);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const dy = y - last.current;
    last.current = y;
    setSolid(y > 60);
    if (open) return;
    if (y < 120) setHidden(false);
    else if (dy > 6) setHidden(true);
    else if (dy < -6) setHidden(false);
  });

  return (
    <header
      data-theme={theme}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(env(safe-area-inset-top),0px)]"
    >
      {/* Scrim lives outside the moving bar: a transformed parent would trap position:fixed */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={() => setOpen(false)}
            className="pointer-events-auto fixed inset-0 bg-black/45 backdrop-blur-[3px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="mx-auto mt-[30px] w-[calc(100%-66px)] max-w-[632px] lg:mt-10"
        animate={{ y: hidden ? -140 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`pointer-events-auto relative flex items-center justify-between rounded-[14px] py-[10px] transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-soft)] ${
            solid || open
              ? "bg-black/45 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150"
              : "px-0"
          }`}
        >
          <Link href="/" aria-label="Spice360, home" className="relative z-10 block shrink-0 active:scale-[0.97] transition-transform duration-150">
            <Image src="/logo/spice360-color.png" alt="Spice360" width={107} height={29} priority className="h-[29px] w-auto" />
          </Link>

          <DesktopLinks pathname={pathname} />
          <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />
        </div>
      </motion.div>
    </header>
  );
}

function DesktopLinks({ pathname }: { pathname: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const active = NAV.find((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)))?.href;
  const target = hover ?? active;

  return (
    <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
      <LayoutGroup id="desk-nav">
        <ul className="flex items-center gap-2" onPointerLeave={() => setHover(null)}>
          {NAV.map((n) => (
            <li key={n.href} className="relative">
              <Link
                href={n.href}
                aria-current={active === n.href ? "page" : undefined}
                onPointerEnter={() => setHover(n.href)}
                className="relative block px-3 text-ui font-medium text-white/80 transition-colors duration-200 hover:text-white aria-[current=page]:text-white"
              >
                {target === n.href && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-x-0 -inset-y-0.5 -z-0 rounded-full bg-white/12"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </LayoutGroup>
      <Button href={CONTACT_HREF} size="sm" className="font-medium">
        Get in touch
      </Button>
    </nav>
  );
}

/*
 * Mobile menu. Figma: "Menu" becomes "Close" and a frosted card hangs below
 * the bar with the four pages and "Get in touch". What makes it feel native:
 *
 *  - The card grows out of the button it was opened from (origin top-right,
 *    clip + scale on a spring), and shrinks back into it.
 *  - Menu/Close roll vertically in place; the button never jumps width.
 *  - Links arrive one by one with a little blur, so the eye walks down them.
 *  - Each link carries its page's colour (green, amber, pepper, sky): the
 *    site's four rooms, previewed before you enter them. The current page's
 *    dot glows and has a label.
 *  - The card is draggable: flick it up and it is dismissed, tracking the
 *    finger 1:1 with rubber-banding the other way. Tap outside or Esc also
 *    close. Page scroll is frozen while it is open (Lenis stop + overflow).
 *  - Focus moves into the card on open and back to the button on close.
 */
function MobileMenu({
  open,
  setOpen,
  pathname,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  pathname: string;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const button = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const was = useRef(open);

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Close whenever the route changes (a link was followed)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(() => first.current?.focus({ preventScroll: true }));
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      if (was.current) button.current?.focus({ preventScroll: true });
    }
    was.current = open;
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  function toggle() {
    navigator.vibrate?.(6);
    setOpen(!open);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y < -60 || info.velocity.y < -400) close();
  }

  const active = NAV.find((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)))?.href;

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="relative z-10 flex h-[38px] w-[72px] items-center justify-center overflow-hidden rounded-[8px] bg-[var(--accent)] text-[14px] font-medium tracking-[-0.04em] text-white transition-transform duration-150 ease-out active:scale-[0.94]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="relative block h-[22px] overflow-hidden">
          <motion.span
            className="block"
            animate={{ y: open ? -22 : 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="block h-[22px] leading-[22px]">Menu</span>
            <span className="block h-[22px] leading-[22px]">Close</span>
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="card"
              id={id}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              drag={reduce ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.9, bottom: 0.08 }}
              dragSnapToOrigin
              onDragEnd={onDragEnd}
              className="pointer-events-auto absolute inset-x-0 top-[calc(100%+16px)] origin-top-right touch-none overflow-hidden rounded-[24px] bg-[rgba(18,18,18,0.62)] shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl backdrop-saturate-150 overscroll-contain"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, clipPath: "inset(0% 0% 92% 70% round 24px)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.5,
                      clipPath: "inset(0% 0% 92% 70% round 24px)",
                      transition: { duration: 0.42, ease: [0.4, 0, 0.6, 1] },
                    }
              }
              transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
            >
              {/* Theme light pooling at the top of the glass */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[140%] -translate-x-1/2 rounded-[50%] opacity-50 blur-3xl"
                style={{ background: "var(--accent)" }}
              />
              <nav aria-label="Mobile" className="relative px-5 pt-7 pb-5">
                <ul className="flex flex-col">
                  {NAV.map((n, i) => {
                    const current = active === n.href;
                    return (
                      <motion.li
                        key={n.href}
                        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.18, delay: (NAV.length - i) * 0.025 } }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.05 }}
                      >
                        <Link
                          ref={i === 0 ? first : undefined}
                          href={n.href}
                          onClick={close}
                          aria-current={current ? "page" : undefined}
                          className="group flex h-[54px] items-center justify-between rounded-[12px] px-3 text-[17px] font-medium tracking-[-0.04em] text-white transition-[background-color,scale] duration-150 ease-out active:scale-[0.98] active:bg-white/10"
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="size-2 rounded-full transition-shadow"
                              style={{
                                background: n.swatch,
                                boxShadow: current ? `0 0 0 4px ${n.swatch}33, 0 0 14px ${n.swatch}` : "none",
                              }}
                            />
                            {n.label}
                          </span>
                          <span className="text-[12px] font-medium tracking-[-0.02em] text-white/45 tabular-nums">
                            {current ? "You’re here" : `0${i + 1}`}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <motion.div
                  className="mt-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
                >
                  <a
                    href={CONTACT_HREF}
                    className="flex h-[48px] items-center justify-center rounded-[12px] bg-[var(--accent)] text-[15px] font-medium tracking-[-0.04em] text-white transition-[scale,filter] duration-150 ease-out active:scale-[0.98] active:brightness-110"
                  >
                    Get in touch
                  </a>
                  <p className="mt-4 text-center text-[12px] text-white/45">1 Akanbi Onitiri Street, Surulere, Lagos</p>
                </motion.div>
                {/* Grabber: the card can be flicked up to close */}
                <div aria-hidden className="mx-auto mt-4 h-1 w-9 rounded-full bg-white/25" />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
