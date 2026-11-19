"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { Person } from "@/lib/content";
import { EASE } from "./motion";

/*
 * Team grid. Keeps the live site's idea (suit portrait at rest, the spice
 * T-shirt portrait on hover, plus who they are) and pushes it further:
 *
 *  - Spotlight: hovering anywhere in the grid dims and desaturates everyone
 *    else, so the person under the cursor is the only one in full colour.
 *  - The T-shirt photo opens as a circle from the exact point the cursor
 *    came in at, and closes towards where it left.
 *  - The tile lifts (1.12x) with a pepper-red ring; the pointer carries the
 *    spice name.
 *  - Figma's detail panel fills the last row: spice name, name, role and
 *    their line roll in from below each time the face changes.
 *  - Keyboard focus does exactly what hover does. On touch (no hover), a tap
 *    flips the tile and shows the details on it, like the live site.
 *  - On scroll in, faces arrive in a diagonal wave.
 */
export function TeamGrid({ people }: { people: Person[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const cols = 10;
  const rest = people.length % cols;
  const panelSpan = rest === 0 ? cols : cols - rest;

  function enter(i: number, e: PointerEvent<HTMLButtonElement>) {
    origin(e);
    if (e.pointerType === "mouse") setActive(i);
  }
  function origin(e: PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <ul
        className="team-grid grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10 lg:gap-3"
        onPointerLeave={() => setActive(null)}
      >
        {people.map((p, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const on = flipped === i;
          return (
            <motion.li
              key={p.name}
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (row + col) * 0.035 }}
              className="relative"
            >
              <button
                type="button"
                data-cursor={p.spice ?? p.name.split(" ")[0]}
                aria-label={`${p.name}, ${p.role}${p.spice ? `. Spice name: ${p.spice}` : ""}`}
                aria-pressed={on}
                onPointerEnter={(e) => enter(i, e)}
                onPointerLeave={origin}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setFlipped(on ? null : i)}
                data-on={on || undefined}
                className="team-tile group/tile relative block aspect-[3/4] w-full overflow-hidden bg-neutral-800 outline-none transition-[scale,box-shadow,filter] duration-500 ease-[var(--ease-soft)] lg:aspect-square
                  hover:z-10 hover:scale-[1.12] hover:shadow-[0_0_0_2px_var(--color-pepper),0_18px_40px_rgba(0,0,0,0.6)]
                  focus-visible:z-10 focus-visible:scale-[1.12] focus-visible:shadow-[0_0_0_2px_var(--color-pepper)]
                  data-[on]:shadow-[0_0_0_2px_var(--color-pepper)]"
              >
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 120px, (min-width: 640px) 20vw, 33vw"
                  className="object-cover object-top grayscale-[0.15]"
                />
                {p.alt && (
                  <Image
                    src={p.alt}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 120px, (min-width: 640px) 20vw, 33vw"
                    className="object-cover object-top [clip-path:circle(0%_at_var(--x,50%)_var(--y,50%))] transition-[clip-path] duration-[800ms] ease-[var(--ease-soft)] group-hover/tile:[clip-path:circle(150%_at_var(--x,50%)_var(--y,50%))] group-focus-visible/tile:[clip-path:circle(150%_at_50%_50%)] group-data-[on]/tile:[clip-path:circle(150%_at_var(--x,50%)_var(--y,50%))]"
                  />
                )}
                {/* Touch: details on the tile itself once tapped */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex translate-y-2 flex-col justify-end bg-gradient-to-b from-transparent from-40% to-black/80 p-3 text-left opacity-0 transition-[opacity,translate] duration-500 group-data-[on]/tile:translate-y-0 group-data-[on]/tile:opacity-100 lg:hidden"
                >
                  {p.spice && <span className="text-[10px] font-semibold text-leaf-bright">{p.spice}</span>}
                  <span className="text-[13px] leading-[1.1] font-semibold tracking-[-0.03em]">{p.name}</span>
                  <span className="mt-0.5 text-[10px] text-white/70">{p.role}</span>
                </span>
              </button>
            </motion.li>
          );
        })}

        <li className="hidden items-end pl-12 lg:flex" style={{ gridColumn: `span ${panelSpan}` }} aria-live="polite">
          <Panel person={active === null ? null : people[active]} />
        </li>
      </ul>
    </div>
  );
}

function Panel({ person }: { person: Person | null }) {
  const [last, setLast] = useState<Person | null>(null);
  if (person && person !== last) setLast(person);
  const p = person ?? last;

  if (!p) {
    return (
      <p className="flex items-center gap-3 pb-1 text-eyebrow font-semibold text-white/50">
        <span aria-hidden className="size-2 animate-pulse rounded-full bg-pepper" />
        Hover a face to meet the spice behind it.
      </p>
    );
  }

  const spice = p.spice ?? "Awaiting the Flavour Board";

  return (
    <div className="grid w-full grid-cols-[1fr_1fr] items-end gap-10 pb-1">
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={p.name}
            initial="in"
            animate="show"
            exit={{ y: "-60%", opacity: 0, transition: { duration: 0.3, ease: EASE } }}
          >
            {/* Spice name rolls up letter by letter */}
            <p aria-label={spice} className="flex flex-wrap overflow-hidden text-eyebrow font-semibold text-pepper">
              {Array.from(spice).map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block whitespace-pre"
                  variants={{ in: { y: "110%" }, show: { y: 0, transition: { duration: 0.5, ease: EASE, delay: i * 0.018 } } }}
                >
                  {ch}
                </motion.span>
              ))}
            </p>
            <motion.p
              className="mt-3 text-[24px] leading-[25px] font-semibold tracking-[-0.06em]"
              variants={{ in: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.05 } } }}
            >
              {p.name}
            </motion.p>
            <motion.p
              className="mt-2 text-eyebrow font-semibold text-white/80"
              variants={{ in: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.1 } } }}
            >
              {p.role}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {p?.line && (
            <motion.p
              key={p.name}
              className="text-body"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-60%", opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.04 }}
            >
              {p.line}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
