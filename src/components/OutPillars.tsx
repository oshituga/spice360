/*
 * Home's three pillars, set plainly: the word in the site's own type at a
 * confident size, its line beside it, rows on hairlines. No lettering
 * tricks; the words carry it. Each row lights up as it scrolls in (CSS
 * scroll-driven animation, opacity and transform only; static where
 * unsupported).
 */
const PILLARS = [
  { word: "Outthink", body: "We interrogate every brief before we answer it." },
  { word: "Outcreate", body: "We pursue the kind of work no other agency is brave enough to make." },
  { word: "Outpace", body: "We move faster, adapt sharper, and stay ahead of the market." },
];

export function OutPillars() {
  return (
    <ol className="mx-auto w-full max-w-content">
      {PILLARS.map((p) => (
        <li
          key={p.word}
          className="pillar-row grid gap-4 border-t border-white/20 py-8 md:grid-cols-[1fr_minmax(260px,380px)] md:items-baseline md:gap-16 md:py-12"
        >
          <h3 className="text-[clamp(44px,4.4vw+16px,96px)] leading-[0.9] font-semibold tracking-[-0.06em]">{p.word}</h3>
          <p className="max-w-[380px] text-body text-white/90">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}
