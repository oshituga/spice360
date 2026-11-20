"use client";

import { useState, type FormEvent } from "react";
import { EMAIL } from "@/lib/content";

/*
 * Brief form. There is no backend, so submitting composes the brief as an
 * email in the visitor's own mail app, addressed to the agency inbox: no data
 * passes through the site. Fields are labelled, 16px (no iOS zoom), with
 * the right keyboards on phones.
 */
const TOPICS = ["A Spice 360 campaign", "Spice Digital (startups)", "Something else"];

export function BriefForm({ initialTopic = 0 }: { initialTopic?: number }) {
  const [topic, setTopic] = useState(TOPICS[initialTopic] ?? TOPICS[0]);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Brief: ${topic}${f.get("company") ? ` for ${f.get("company")}` : ""}`;
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      f.get("company") ? `Company: ${f.get("company")}` : null,
      `About: ${topic}`,
      "",
      String(f.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-[10px] border border-white/15 bg-white/5 px-4 py-3 text-[16px] tracking-[-0.03em] text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-white/50 focus:bg-white/8";
  const label = "mb-2 block text-eyebrow font-semibold";

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-[640px] flex-col gap-6">
      <fieldset>
        <legend className={label}>What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className="rounded-full border border-white/15 px-4 py-2 text-[14px] tracking-[-0.03em] transition-colors duration-200 active:scale-[0.97] aria-pressed:border-transparent aria-pressed:bg-[var(--accent)]"
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-6 md:grid-cols-2">
        <label>
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label>
          <span className={label}>Email</span>
          <input name="email" type="email" required autoComplete="email" autoCapitalize="none" className={field} />
        </label>
      </div>
      <label>
        <span className={label}>Company or brand (optional)</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label>
        <span className={label}>What is your brand trying to do?</span>
        <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="The goal, the audience, the timeline. A few lines is plenty." />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-[8px] bg-[var(--accent)] px-6 py-3 text-[14px] font-semibold tracking-[-0.04em] text-white transition-[scale,filter] duration-150 active:scale-[0.97]"
        >
          Send brief
        </button>
        <p className="text-[14px] text-white/55" role="status">
          {sent ? "Your mail app should have opened with the brief ready to send." : `Opens your mail app, addressed to ${EMAIL}.`}
        </p>
      </div>
    </form>
  );
}
