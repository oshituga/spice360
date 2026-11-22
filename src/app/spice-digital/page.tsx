import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Glow } from "@/components/Glow";
import { SectionHead } from "@/components/SectionHead";
import { MediaCard } from "@/components/MediaCard";
import { Footer } from "@/components/Footer";
import { FadeIn, SplitReveal } from "@/components/motion";
import { CONTACT_HREF } from "@/lib/content";
import { CASES } from "@/lib/cases";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spice Digital",
  description:
    "Spice Digital is Spice 360’s dedicated arm for African tech startups: brand identity, growth marketing and digital infrastructure, built for seed to Series A.",
  openGraph: { title: "Spice Digital | Spice360", description: "Spice Digital is Spice 360’s dedicated arm for African tech startups: brand identity, growth marketing and digital infrastructure, built for seed to Series A." },
  twitter: { title: "Spice Digital | Spice360", description: "Spice Digital is Spice 360’s dedicated arm for African tech startups: brand identity, growth marketing and digital infrastructure, built for seed to Series A." },
};

/* Spice Digital palette (Figma ca9a6 / 3a0b4) */
const N = "#212A68";
const S = "#7BDCFB";
const M = "#D7FDE3";

const SERVICES = [
  ["Brand and Identity", "Logomark, colour system, typography, brand voice guide, and complete guidelines. Built to perform in front of investors, users, and the press at the same time."],
  ["Website Design and Development", "Website strategy, UX design, and development from brief to launch. Mobile-first, performance-optimised, and designed to convert the people who actually land on it."],
  ["Performance Marketing", "Paid social, search, and programmatic campaigns. Weekly reporting. Continuous optimisation. No set-and-forget."],
  ["Content Strategy", "Social media strategy, content calendar, copywriting, graphic design, and short-form video. Built for Nigerian audiences, not adapted from a global template."],
  ["AI-Powered Marketing", "Audience segmentation, content personalisation, sentiment analysis, and automated reporting. Offered as a premium service to clients whose growth stage can leverage it properly."],
  ["Digital Maintenance", "Ongoing management across all digital touchpoints: website updates, social scheduling, ad optimisation, and monthly brand audit reports."],
];

const DOORS = [
  { name: "Spice 360", color: "#2b5833" },
  { name: "Spice Digital", color: "#212a68" },
];

/* The two lists from the old bento, paired line for line */
const COMPARE: [string, string, string][] = [
  ["Who it serves", "Large corporates and established brands", "Tech startups and digital-first brands"],
  ["Depth", "FMCG and consumer goods", "Brand, growth marketing, and digital infra"],
  ["How it works", "Multi-channel integrated campaigns", "Digital-first, performance-driven"],
  ["Pace", "Long engagement cycles", "Sprint-based, startup commercial model"],
];

export default function SpiceDigital() {
  return (
    <main data-theme="digital">
      <PageHero
        title={"Same kitchen,\ndifferent kind of heat"}
        titleWidth={430}
        body="Spice Digital is Spice 360’s dedicated arm for African tech startups. Brand identity, growth marketing, and digital infrastructure, built for the pace and reality of a company that cannot afford to slow down."
        bodyWidth={544}
        glow={[
          { color: N, y: -323 },
          { color: S, y: -631 },
          { color: M, y: -780 },
        ]}
        actions={
          <Button href={`${CONTACT_HREF}?topic=digital`} size="sm" className="text-paper">
            Brief Spice Digital
          </Button>
        }
      />

      {/* About: one statement, the founder's problem in plain words */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto grid max-w-content gap-12 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <FadeIn as="p" y={10} className="text-eyebrow font-semibold text-[var(--eyebrow)]">
              About Spice Digital
            </FadeIn>
            <SplitReveal
              text={"Built for founders,\nnot brand managers"}
              className="text-[clamp(44px,4.4vw+16px,96px)] leading-[0.9] font-semibold tracking-[-0.06em]"
            />
          </div>
          <div className="flex max-w-[480px] flex-col gap-6 text-[18px] leading-[22px] tracking-[-0.04em]">
            <FadeIn delay={0.1} className="text-white/80">
              A seed-stage fintech in Lagos and an established FMCG brand have almost nothing in common: different budgets, timelines and
              definitions of a result. Spice Digital brings Spice 360’s creative standards and cultural intelligence about Nigerian and West
              African consumers, on a commercial model and delivery pace that match a startup’s reality, not a corporate agency’s engagement
              cycle.
            </FadeIn>
            <FadeIn delay={0.2} className="border-t border-white/20 pt-6 text-[22px] leading-[26px] font-semibold tracking-[-0.05em]">
              If your current marketing strategy lives in a WhatsApp thread, you are exactly who Spice Digital was built for.
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Case studies: the proof, straight after the pitch */}
      <section className="bg-black px-[var(--gutter)] pb-[110px] md:pb-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 border-t border-white/20 pt-[110px] md:flex-row md:items-end md:justify-between md:pt-[150px]">
            <SectionHead align="left" eyebrow="What we’ve built" title="Case studies and performance data" width={520} />
            <FadeIn className="max-w-[380px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">
              Campaign outcomes, brand launches, acquisition results, and client proof points. The stories below are illustrative.
            </FadeIn>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {CASES.map((c, i) => (
              <Link
                key={c.brand}
                href={`/spice-digital/${c.slug}`}
                aria-label={`${c.brand}, ${c.kind}: read the illustrative case study`}
                className={`block ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <MediaCard
                  src={c.image}
                  alt=""
                  className="h-[460px] md:h-[597px]"
                  sizes={i === 0 ? "(min-width: 768px) 1240px, 100vw" : "(min-width: 768px) 620px, 100vw"}
                >
                  <article className="flex flex-col gap-4 p-6 pr-5 md:p-10">
                    <p className="flex items-center gap-2 text-eyebrow font-semibold">
                      {c.stage}
                      <span aria-hidden className="size-1 rounded-full bg-white" />
                      {c.kind}
                    </p>
                    <h3 className="text-[24px] leading-[25px] font-semibold tracking-[-0.06em] md:text-[32px] md:leading-[32px]">{c.brand}</h3>
                    <p className="max-w-[426px] text-[16px] leading-[18px] tracking-[-0.06em]">{c.result}</p>
                    <p className="mt-2 text-ui font-semibold text-white/80">
                      Read the case <span className="text-white/45">· Illustrative</span>
                    </p>
                  </article>
                </MediaCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services: six plain entries on hairlines */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <SectionHead align="left" eyebrow="What we do" title="Six services, all of them connected" width={520} />
          <ul className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([title, body], i) => (
              <FadeIn as="li" key={title} delay={(i % 3) * 0.08} className="flex flex-col gap-4 border-t border-white/20 pt-6 pb-12 md:pb-16">
                <h3 className="text-[28px] leading-[28px] font-semibold tracking-[-0.055em] md:text-[32px] md:leading-[32px]">{title}</h3>
                <p className="max-w-[400px] text-[17px] leading-[21px] tracking-[-0.04em] text-white/75">{body}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it serves: last of the black run, so it carries the light */}
      <section className="relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[110px] pb-[200px] md:pt-[150px] md:pb-[260px]">
        <Glow anchor="bottom" ellipses={[{ color: N, y: 300 }, { color: S, y: 620 }, { color: M, y: 820 }]} />
        <div className="relative mx-auto grid max-w-content gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <SectionHead align="left" eyebrow="Who Spice Digital serves" title="We know what funded looks like, and what growing looks like" width={560} />
          <div className="flex max-w-[480px] flex-col gap-6 text-[18px] leading-[22px] tracking-[-0.04em] text-white/80 md:pt-11">
            <FadeIn delay={0.1}>
              Seed to Series A technology companies across fintech, edtech, healthtech, logistics, and e-commerce, operating in Nigeria or
              building for Nigerian and West African consumers.
            </FadeIn>
            <FadeIn delay={0.15}>
              Founders or CMOs who understand the value of brand but have not had the time or budget to build it properly. Companies growing fast
              enough that informal marketing is no longer sufficient. Backed by investors who will notice, and value, a credible brand presence.
            </FadeIn>
            <FadeIn delay={0.2} className="border-t border-white/20 pt-6 text-[22px] leading-[26px] font-semibold tracking-[-0.05em] text-white">
              You do not need to be at scale to work with us. You need to be growing.
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Two doors: a straight side-by-side comparison */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead light align="left" eyebrow="Spice 360 vs Spice Digital" title="Two doors into the same building" width={520} />
            <FadeIn className="max-w-[420px] text-[18px] leading-[22px] tracking-[-0.04em] text-mute">
              Spice 360 serves established brands with integrated, multi-channel campaigns. Large FMCG accounts, corporate clients, long engagement cycles.
            </FadeIn>
          </div>
          <FadeIn>
            <table className="w-full table-fixed max-md:block border-collapse text-left text-[16px] leading-[20px] tracking-[-0.04em] md:text-[20px] md:leading-[24px]">
              <caption className="sr-only">Spice 360 compared with Spice Digital</caption>
              <colgroup>
                <col className="hidden md:table-column md:w-[22%]" />
                <col />
                <col />
              </colgroup>
              <thead className="max-md:block">
                <tr className="max-md:grid max-md:grid-cols-2">
                  <td className="hidden md:table-cell" />
                  {DOORS.map((d) => (
                    <th key={d.name} scope="col" className="pr-4 pb-6 align-bottom md:pr-10">
                      <span aria-hidden className="mb-5 block h-2 w-full" style={{ background: d.color }} />
                      <span className="block text-[26px] leading-[26px] font-semibold tracking-[-0.055em] md:text-[40px] md:leading-[38px]">{d.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-md:block">
                {COMPARE.map(([label, a, b]) => (
                  <tr key={label} className="border-t border-ink/15 max-md:grid max-md:grid-cols-2">
                    <th scope="row" className="py-5 pr-4 align-top text-eyebrow font-semibold text-mute max-md:col-span-2 max-md:pb-0 md:py-7">
                      {label}
                    </th>
                    <td className="py-5 pr-4 align-top md:py-7 md:pr-10">{a}</td>
                    <td className="py-5 pr-4 align-top md:py-7 md:pr-10">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>
          <FadeIn className="max-w-[640px] text-[18px] leading-[22px] tracking-[-0.04em] text-mute">
            Both brands share infrastructure, creative values, and the Flavour Board. They do not compete for the same clients. When a Spice Digital
            client grows to the point of needing above-the-line campaign work, the transition to a Spice 360 engagement is natural, not a pitch.
          </FadeIn>
        </div>
      </section>

      <Footer
        eyebrow="Brief us"
        title="Tell us what you’re building"
        titleWidth={322}
        body="We’ll tell you what it will take to build the brand around it"
        glow={[
          { color: N, y: 28 },
          { color: S, y: 337 },
          { color: M, y: 486 },
        ]}
        metaClass="text-navy"
        actions={
          <>
            <Button href={`${CONTACT_HREF}?topic=digital`} tone="light" className="bg-[#e8eeff] px-6 !text-[#0f2a8a]">
              Brief Spice Digital
            </Button>
            <Button href="/" className="px-6">
              Learn about Spice360
            </Button>
          </>
        }
      />
    </main>
  );
}

