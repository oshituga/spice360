"use client";

import Image from "next/image";
import { memo, useCallback, useState, useSyncExternalStore } from "react";
import type { Person } from "@/lib/content";

/*
 * Team grid. Keeps the live site's idea (suit portrait at rest, the spice
 * T-shirt portrait on hover, plus who they are) and makes it smooth:
 *
 *  - Spotlight: hovering a face fades everyone else back (opacity, so the
 *    compositor does it; a brightness filter re-paints 34 photos per move).
 *  - The T-shirt photo cross-fades in over the suit photo; the tile lifts on
 *    a soft overshoot with a pepper-red ring, its photo leans in, the
 *    neighbours either side stay half lit, and the spice name rises onto
 *    the face (all CSS, see "Team grid" in globals.css).
 *  - Figma's detail panel in the last row names the person. Hover state lives
 *    in a tiny store the panel subscribes to, so moving between faces
 *    re-renders the panel only, never the 35 tiles.
 *  - Keyboard focus does what hover does. On touch (no hover), a tap flips
 *    the tile and shows the details on it, like the live site.
 *  - Tiles fade up once as the grid scrolls in (CSS, no per-tile JS).
 */

/* Hovered person, outside React state so tiles never re-render on hover */
let current: number | null = null;
const listeners = new Set<() => void>();
const store = {
  set(i: number | null) {
    if (current === i) return;
    current = i;
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => current,
};

export function TeamGrid({ people }: { people: Person[] }) {
  const [flipped, setFlipped] = useState<number | null>(null);
  const cols = 10;
  const rest = people.length % cols;
  const panelSpan = rest === 0 ? cols : cols - rest;
  const toggle = useCallback((i: number) => setFlipped((f) => (f === i ? null : i)), []);

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <ul
        className="team-grid grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10 lg:gap-3"
        onPointerLeave={() => store.set(null)}
      >
        {people.map((p, i) => (
          <Tile key={p.name} p={p} i={i} on={flipped === i} onToggle={toggle} />
        ))}
        <li className="hidden items-end pl-12 lg:flex" style={{ gridColumn: `span ${panelSpan}` }} aria-live="polite">
          <Panel people={people} />
        </li>
      </ul>
    </div>
  );
}

const Tile = memo(function Tile({
  p,
  i,
  on,
  onToggle,
}: {
  p: Person;
  i: number;
  on: boolean;
  onToggle: (i: number) => void;
}) {
  return (
    <li className="team-cell team-in relative" style={{ ["--d" as string]: `${(Math.floor(i / 10) + (i % 10)) * 30}ms` }}>
      <button
        type="button"
        aria-label={`${p.name}, ${p.role}${p.spice ? `. Spice name: ${p.spice}` : ""}`}
        aria-pressed={on}
        onPointerEnter={(e) => e.pointerType === "mouse" && store.set(i)}
        onFocus={() => store.set(i)}
        onBlur={() => store.set(null)}
        onClick={() => onToggle(i)}
        data-on={on || undefined}
        className="team-tile group/tile relative block aspect-[3/4] w-full overflow-hidden bg-neutral-800 outline-none lg:aspect-square"
      >
        <Image
          src={p.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 120px, (min-width: 640px) 20vw, 33vw"
          className="team-img object-cover object-top"
        />
        {p.alt && (
          <Image
            src={p.alt}
            alt=""
            fill
            sizes="(min-width: 1024px) 120px, (min-width: 640px) 20vw, 33vw"
            className="team-img team-alt object-cover object-top"
          />
        )}
        {/* Desktop: the spice name rises onto the face after the lift */}
        {p.spice && (
          <span
            aria-hidden
            className="team-tag absolute inset-x-0 bottom-0 z-[1] hidden bg-gradient-to-b from-transparent to-black/75 px-2.5 pt-6 pb-2 text-left text-[11px] leading-[12px] font-semibold tracking-[-0.03em] text-white lg:block"
          >
            {p.spice}
          </span>
        )}
        {/* Touch: details on the tile itself once tapped */}
        <span
          aria-hidden
          className="team-meta absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent from-40% to-black/80 p-3 text-left lg:hidden"
        >
          {p.spice && <span className="text-[10px] font-semibold text-leaf-bright">{p.spice}</span>}
          <span className="text-[13px] leading-[1.1] font-semibold tracking-[-0.03em]">{p.name}</span>
          <span className="mt-0.5 text-[10px] text-white/70">{p.role}</span>
        </span>
      </button>
    </li>
  );
});

function Panel({ people }: { people: Person[] }) {
  const i = useSyncExternalStore(store.subscribe, store.get, () => null);
  const [last, setLast] = useState<number | null>(null);
  if (i !== null && i !== last) setLast(i);
  const p = i !== null ? people[i] : last !== null ? people[last] : null;

  if (!p) {
    return (
      <p className="flex items-center gap-3 pb-1 text-eyebrow font-semibold text-white/50">
        <span aria-hidden className="size-2 animate-pulse rounded-full bg-pepper" />
        Hover a face to meet the spice behind it.
      </p>
    );
  }

  return (
    // key restarts a short CSS fade-up per person; no JS animation on hover
    <div key={p.name} className="panel-in grid w-full grid-cols-[1fr_1fr] items-end gap-10 pb-1">
      <div>
        <p className="text-eyebrow font-semibold text-pepper">{p.spice ?? "Awaiting the Flavour Board"}</p>
        <p className="mt-3 text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{p.name}</p>
        <p className="mt-2 text-eyebrow font-semibold text-white/80">{p.role}</p>
      </div>
      {p.line && <p className="text-body">{p.line}</p>}
    </div>
  );
}
