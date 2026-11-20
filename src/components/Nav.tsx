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
import { CONTACT_HREF, themeFor } from "@/lib/content";
import { MENU, MOBILE_PAGES, groupFor, isCurrent, type MenuItem } from "@/lib/menu";
import { CASES } from "@/lib/cases";
import { Button } from "./Button";
import { EASE } from "./motion";

/*
 * Figma: a 632px bar centred 40px from the top (mobile: full width, 30px
 * down, 33px in). Logo left, links + accent "Get in touch" right. Desktop
 * widens it to 760px to carry three menu groups that reach every page.
 *
 * Desktop adds two things the static frame cannot show:
 *  - a highlight pill that rests on the current page's group and glides to
 *    whichever group is open (one shared layoutId, so it travels, not fades)
 *  - the bar hides on scroll down, returns on scroll up, and turns to tinted
 *    glass once it leaves the hero. Over a light section (data-nav="light")
 *    it switches to light frosted glass with ink type, so it never smears
 *    a dark blob over white; over glows the dark glass is dense enough that
 *    colour can't bleed through. One IntersectionObserver watches a thin
 *    band where the bar sits; colours cross-fade, nothing re-blurs.
 */

export function Nav() {
  const pathname = usePathname();
  const theme = themeFor(pathname);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const last = useRef(0);
  const light = useLightUnderBar(pathname);

  // A followed link closes the desktop panel
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenGroup(null);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const dy = y - last.current;
    last.current = y;
    setSolid(y > 60);
    if (open || openGroup) return;
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
        className="mx-auto mt-[30px] w-[calc(100%-66px)] max-w-[632px] lg:mt-10 lg:max-w-[760px]"
        animate={{ y: hidden ? -140 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`pointer-events-auto relative flex items-center justify-between rounded-[14px] py-[10px] transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-soft)] ${
            light && !open && !openGroup
              ? "bg-white/80 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              : solid || open || openGroup
                ? "bg-[rgba(10,10,10,0.68)] px-3 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl"
                : "px-0"
          }`}
        >
          <Link href="/" aria-label="Spice360, home" className="relative z-10 block shrink-0 active:scale-[0.97] transition-transform duration-150">
            <Image src="/logo/spice360-color.png" alt="Spice360" width={107} height={29} priority className="h-[29px] w-auto" />
          </Link>

          <DesktopLinks pathname={pathname} openGroup={openGroup} setOpenGroup={setOpenGroup} light={light && !openGroup} />
          <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />
        </div>
      </motion.div>
    </header>
  );
}

/*
 * Desktop: three groups (Agency, Spice Digital, Kitchen) that between them
 * reach every page. Hovering a group opens one panel under the bar with
 * that group's pages as photo tiles; moving to the next group slides the
 * pill across and cross-fades the panel's content in the direction of
 * travel, so it reads as one surface changing, not three menus. The panel
 * waits 160ms before closing so a diagonal move toward it never drops it.
 * Opacity and transform only. Click, Enter and Esc work the same way.
 */
function DesktopLinks({
  pathname,
  openGroup,
  setOpenGroup,
  light,
}: {
  pathname: string;
  openGroup: string | null;
  setOpenGroup: (g: string | null) => void;
  light: boolean;
}) {
  const panelId = useId();
  const current = groupFor(pathname);
  const target = openGroup ?? current;
  const [dir, setDir] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = (id: string | null) => {
    clearTimeout(timer.current);
    const from = MENU.findIndex((g) => g.id === openGroup);
    const to = MENU.findIndex((g) => g.id === id);
    setDir(from < 0 || to < 0 ? 0 : Math.sign(to - from));
    setOpenGroup(id);
  };
  const hideSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => show(null), 160);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const group = MENU.find((g) => g.id === openGroup);

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-6 lg:flex"
      onPointerEnter={() => clearTimeout(timer.current)}
      onPointerLeave={hideSoon}
      onKeyDown={(e) => e.key === "Escape" && show(null)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && show(null)}
    >
      <LayoutGroup id="desk-nav">
        <ul className="flex items-center gap-1">
          {MENU.map((g) => {
            const open = openGroup === g.id;
            return (
              <li key={g.id} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onPointerEnter={(e) => e.pointerType === "mouse" && show(g.id)}
                  onClick={() => show(open ? null : g.id)}
                  className={`relative flex items-center gap-1.5 px-3 text-ui font-medium transition-colors duration-300 ${light ? "text-ink/70 hover:text-ink" : "text-white/80 hover:text-white aria-expanded:text-white"}`}
                >
                  {target === g.id && (
                    <motion.span
                      layoutId="pill"
                      className={`absolute inset-x-0 -inset-y-0.5 rounded-full transition-colors duration-300 ${light ? "bg-black/[0.07]" : "bg-white/12"}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{g.label}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 10 6"
                    className={`relative w-2 transition-transform duration-300 ease-[var(--ease-soft)] ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>

      {/* The panel hangs from the bar; its top padding bridges the gap so the pointer can cross it */}
      <AnimatePresence>
        {group && (
          <motion.div
            key="panel"
            id={panelId}
            className="absolute inset-x-0 top-full pt-3"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <div className="relative overflow-hidden rounded-[18px] bg-[rgba(14,14,14,0.94)] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.09)]">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.ul
                  key={group.id}
                  custom={dir}
                  className="grid auto-cols-fr grid-flow-col gap-1"
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 28 }),
                    center: { opacity: 1, x: 0 },
                    leave: (d: number) => ({ opacity: 0, x: d * -28 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="leave"
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {group.items.map((item, i) => (
                    <PanelTile key={item.href} item={item} index={i} current={isCurrent(item.href, pathname)} />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button href={CONTACT_HREF} size="nav" className="font-medium">
        Get in touch
      </Button>
    </nav>
  );
}

/* One page in the panel: its photo (or its light) on top, name and a line
   below. Hover eases the photo in and tints the name with the page colour. */
function PanelTile({ item, index, current }: { item: MenuItem; index: number; current: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.04 + index * 0.035 }}
    >
      <Link
        href={item.href}
        aria-current={current ? "page" : undefined}
        className="group/tile flex h-full flex-col gap-3 rounded-[12px] p-2 transition-colors duration-200 hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
        style={{ ["--sw" as string]: item.swatch }}
      >
        <span className="relative block h-[96px] overflow-hidden rounded-[8px]" style={{ background: item.tint }}>
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="200px"
              className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover/tile:scale-[1.06]"
            />
          )}
          {current && (
            <span className="absolute top-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-[-0.02em] text-white backdrop-blur-md">
              You’re here
            </span>
          )}
        </span>
        <span className="flex flex-col gap-1 px-0.5 pb-1">
          <span className="line-clamp-2 text-[14px] leading-[16px] font-semibold tracking-[-0.04em] text-white transition-colors duration-200 group-hover/tile:text-[var(--sw)]">
            {item.label}
          </span>
          <span className="line-clamp-2 text-[12px] leading-[14px] tracking-[-0.02em] text-white/55">{item.note}</span>
        </span>
      </Link>
    </motion.li>
  );
}

/*
 * Mobile menu. Figma: "Menu" becomes "Close" and a frosted card hangs below
 * the bar with every page and "Get in touch". What makes it feel native:
 *
 *  - The card grows out of the button it was opened from (origin top-right,
 *    scale + fade on a spring), and shrinks back into it.
 *  - Menu/Close roll vertically in place; the button never jumps width.
 *  - Links arrive one by one, so the eye walks down them.
 *  - Each link carries its page's colour: the site's rooms, previewed
 *    before you enter them. The current page's dot glows and has a label.
 *    The case studies sit below as chips, Privacy by the address, so every
 *    page is one tap away.
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
              className="pointer-events-auto absolute inset-x-0 top-[calc(100%+16px)] origin-top-right touch-none overflow-hidden rounded-[24px] bg-[rgba(16,16,16,0.84)] shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl backdrop-saturate-150 overscroll-contain"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.7,
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
                  {MOBILE_PAGES.map((n, i) => {
                    const current = isCurrent(n.href, pathname) || (n.href !== "/" && pathname.startsWith(`${n.href}/`));
                    return (
                      <motion.li
                        key={n.href}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.16, delay: (MOBILE_PAGES.length - i) * 0.02 } }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.04 }}
                      >
                        <Link
                          ref={i === 0 ? first : undefined}
                          href={n.href}
                          onClick={close}
                          aria-current={current ? "page" : undefined}
                          className="group flex h-[50px] items-center justify-between rounded-[12px] px-3 text-[17px] font-medium tracking-[-0.04em] text-white transition-[background-color,scale] duration-150 ease-out active:scale-[0.98] active:bg-white/10"
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
                  className="mt-4 px-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.32 }}
                >
                  <p className="mb-2 text-[12px] font-medium tracking-[-0.02em] text-white/45">Spice Digital case studies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CASES.map((c) => {
                      const href = `/spice-digital/${c.slug}`;
                      return (
                        <Link
                          key={c.slug}
                          href={href}
                          onClick={close}
                          aria-current={pathname === href ? "page" : undefined}
                          className="rounded-full bg-white/[0.07] px-3.5 py-2 text-[14px] font-medium tracking-[-0.03em] text-white/85 transition-[background-color,scale] duration-150 ease-out active:scale-[0.96] active:bg-white/15 aria-[current=page]:bg-white aria-[current=page]:text-black"
                        >
                          {c.brand}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
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
                  <p className="mt-4 flex justify-center gap-2 text-center text-[12px] text-white/45">
                    <span>1 Akanbi Onitiri Street, Surulere</span>
                    <span aria-hidden>·</span>
                    <Link href="/privacy" onClick={close} className="underline-offset-2 active:underline">
                      Privacy
                    </Link>
                  </p>
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

/* True while a light section sits under the bar. Watches only a thin band
   (from 40px to ~110px down the viewport), re-wired on each route. */
function useLightUnderBar(pathname: string) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const on = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) on.add(e.target);
          else on.delete(e.target);
        }
        setLight(on.size > 0);
      },
      { rootMargin: "-40px 0px -88% 0px" },
    );
    // After the route's sections mount
    const id = requestAnimationFrame(() => document.querySelectorAll('[data-nav="light"]').forEach((el) => io.observe(el)));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      setLight(false);
    };
  }, [pathname]);
  return light;
}
