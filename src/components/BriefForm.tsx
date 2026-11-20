"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { EMAIL } from "@/lib/content";

/*
 * Guided brief. There is no backend, so submitting composes the brief as an
 * email in the visitor's own mail app, addressed to the agency inbox: no data
 * passes through the site. The steps are real form controls (radios and
 * checkboxes styled as 48px choices), so Tab, arrow keys and Space all work,
 * and every group has a legend. Text inputs are 16px (no iOS zoom) with the
 * right keyboards on phones.
 *
 * The "what you need" choices are the services each side publishes: Home's
 * three for Spice 360, the six on /spice-digital for Spice Digital.
 */
const TOPICS = [
  { id: "spice360", label: "Spice 360", note: "Campaigns, content and brand strategy" },
  { id: "digital", label: "Spice Digital", note: "For tech startups, seed to Series A" },
] as const;

const NEEDS: Record<(typeof TOPICS)[number]["id"], string[]> = {
  spice360: ["Brand Strategy", "Digital Content", "Integrated Campaigns", "Not sure yet"],
  digital: [
    "Brand and Identity",
    "Website Design and Development",
    "Performance Marketing",
    "Content Strategy",
    "AI-Powered Marketing",
    "Digital Maintenance",
    "Not sure yet",
  ],
};

const TIMELINES = ["As soon as possible", "Within a month", "In 1 to 3 months", "Just exploring"];
const BUDGETS = ["Under ₦5m", "₦5m to ₦20m", "₦20m to ₦50m", "Over ₦50m", "Rather discuss it"];

const field =
  "min-h-12 w-full rounded-[10px] border border-white/15 bg-white/5 px-4 py-3 text-[16px] tracking-[-0.03em] text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-white/50 focus:bg-white/8";
const labelCls = "mb-3 block text-eyebrow font-semibold";
const hint = "font-normal text-white/45";

/* One selectable option: a visually hidden native input with a styled face. */
function Choice({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="relative inline-flex">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-12 cursor-pointer items-center rounded-[10px] border border-white/15 px-4 text-[14px] font-semibold tracking-[-0.04em] text-white/80 transition-[background-color,border-color,color,scale] duration-200 select-none peer-checked:border-transparent peer-checked:bg-[var(--accent)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--eyebrow)] hover:border-white/40 active:scale-[0.97]">
        {children}
      </span>
    </label>
  );
}

export function BriefForm({ initialTopic = 0 }: { initialTopic?: number }) {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["id"]>(TOPICS[initialTopic]?.id ?? "spice360");
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  const topicLabel = TOPICS.find((t) => t.id === topic)!.label;

  function pickTopic(id: (typeof TOPICS)[number]["id"]) {
    setTopic(id);
    setNeeds([]); // each side has its own list
  }

  function toggleNeed(n: string) {
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const company = get("company");

    const subject = `Brief for ${topicLabel}${company ? `: ${company}` : ""}`;
    const line = (k: string, v: string) => (v ? `${k}: ${v}` : null);
    const body = [
      `Hello ${topicLabel},`,
      "",
      get("message"),
      "",
      "— The brief —",
      line("For", topicLabel),
      line("What we need", needs.join(", ")),
      line("Timeline", timeline),
      line("Budget", budget),
      line("Company or brand", company),
      "",
      "— From —",
      get("name"),
      get("email"),
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-[720px] flex-col gap-12">
      <fieldset>
        <legend className={labelCls}>Who is the brief for?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <label key={t.id} className="relative block">
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={topic === t.id}
                onChange={() => pickTopic(t.id)}
                className="peer sr-only"
              />
              <span className="flex min-h-12 cursor-pointer flex-col gap-1 rounded-[10px] border border-white/15 px-5 py-4 transition-[background-color,border-color] duration-200 select-none peer-checked:border-transparent peer-checked:bg-[var(--accent)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--eyebrow)] hover:border-white/40">
                <span className="text-[20px] leading-[22px] font-semibold tracking-[-0.05em]">{t.label}</span>
                <span className="text-[14px] leading-[18px] tracking-[-0.03em] text-white/70">{t.note}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>
          What do you need? <span className={hint}>Pick any</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS[topic].map((n) => (
            <Choice key={`${topic}-${n}`} type="checkbox" name="needs" value={n} checked={needs.includes(n)} onChange={() => toggleNeed(n)}>
              {n}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>
          Timeline <span className={hint}>Optional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <Choice key={t} type="radio" name="timeline" value={t} checked={timeline === t} onChange={() => setTimeline(t)}>
              {t}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>
          Rough budget <span className={hint}>Optional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <Choice key={b} type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)}>
              {b}
            </Choice>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={labelCls}>Tell us about it</span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${field} resize-y`}
          placeholder="What is the brand trying to do, and for whom? A few lines is plenty."
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Email</span>
          <input name="email" type="email" required autoComplete="email" autoCapitalize="none" spellCheck={false} className={field} />
        </label>
        <label className="block md:col-span-2">
          <span className={labelCls}>
            Company or brand <span className={hint}>Optional</span>
          </span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
      </div>

      <div className="flex flex-col items-start gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="min-h-12 rounded-[10px] bg-[var(--accent)] px-7 text-[14px] font-semibold tracking-[-0.04em] text-white transition-[scale,filter] duration-150 active:scale-[0.97]"
        >
          Send brief
        </button>
        <p className="text-[14px] leading-[18px] text-white/55" role="status">
          {sent ? "Your mail app should have opened with the brief ready to send." : `Opens your mail app with the brief written up, addressed to ${EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
