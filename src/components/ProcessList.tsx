import "./ProcessList.css";

/*
 * "From first brief to final result": five stages on a quiet vertical rail.
 * Each stage lights up as it scrolls through the middle of the screen (CSS
 * scroll-driven, see ProcessList.css), so reading down the list feels like
 * stepping through the engagement. No numbers: the stage names carry it.
 */
const STEPS = [
  ["Brief", "We push back before we start. A brief that cannot survive interrogation cannot survive the market."],
  ["Insight", "We find the specific Nigerian consumer truth the brief has been working around. That truth is the campaign."],
  ["Creative", "Ideas rooted in culture, designed to earn attention, built to change behavior. Not decoration."],
  ["Execution", "Strategy and production under one roof, across every format, at the same standard."],
  ["Results", "We measure against what we agreed to measure. We report what we found, including what did not work."],
];

export function ProcessList() {
  return (
    <ol className="relative mx-auto w-full max-w-[1440px]">
      {/* the rail */}
      <span aria-hidden className="absolute top-3 bottom-3 left-[5px] w-px bg-white/20" />
      {STEPS.map(([title, body], i) => (
        <li key={title} className={`relative grid grid-cols-[11px_1fr] gap-x-6 md:gap-x-10 ${i < STEPS.length - 1 ? "pb-12 md:pb-20" : ""}`}>
          <span aria-hidden className="relative mt-[0.7em] flex size-[11px] items-center justify-center md:mt-[18px]">
            <span className="absolute inset-0 rounded-full border border-white/40 bg-black" />
            <span className={`process-dot absolute inset-0 rounded-full bg-[var(--accent)]`} />
          </span>
          <div className={`process-step grid gap-3 md:grid-cols-[1fr_minmax(280px,440px)] md:items-baseline md:gap-16`}>
            <h3 className="text-[clamp(34px,2.6vw+18px,64px)] leading-[0.95] font-semibold tracking-[-0.06em]">{title}</h3>
            <p className="max-w-[440px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
