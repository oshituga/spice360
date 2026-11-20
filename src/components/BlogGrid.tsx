import Link from "next/link";
import { BLOG } from "@/lib/content";
import { MediaCard } from "./MediaCard";

/* "Behind the kitchen" cards: one wide, two half. Cards with a story link to
   it; a card without one yet sits as a still. */
export function BlogGrid() {
  return (
    <div className="mx-auto grid max-w-[1150px] gap-2 md:grid-cols-2">
      {BLOG.map((b, i) => {
        const card = (
          <MediaCard
            src={b.image}
            alt=""
            className={`h-[460px] md:h-[597px]`}
            sizes={i === 0 ? "(min-width: 768px) 1150px, 100vw" : "(min-width: 768px) 575px, 100vw"}
          >
            <article className="flex flex-col gap-4 p-6 pr-5 md:p-10">
              <p className="text-eyebrow font-semibold">{b.date}</p>
              <h3 className="max-w-[420px] text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{b.title}</h3>
              <p className="text-eyebrow font-semibold">{b.href ? b.kind : `${b.kind} · Coming soon`}</p>
            </article>
          </MediaCard>
        );
        const span = i === 0 ? "md:col-span-2" : "";
        return b.href ? (
          <Link key={i} href={b.href} className={`block ${span}`} aria-label={b.title}>
            {card}
          </Link>
        ) : (
          <div key={i} className={span}>
            {card}
          </div>
        );
      })}
    </div>
  );
}
