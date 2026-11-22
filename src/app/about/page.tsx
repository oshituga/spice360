import type { Metadata } from "next";
import Link from "next/link";
import "./about.css";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/SectionHead";
import { ProcessList } from "@/components/ProcessList";
import { Footer } from "@/components/Footer";
import { FadeIn, SplitReveal } from "@/components/motion";
import { PlayCard } from "@/components/PlayCard";
import { BRANDS_LINE, CONTACT_HREF } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & Work",
  description:
    "Spice 360 grew out of the Tolaram Group. Fourth on debut at LAIF 2024 with five golds. Film, strategy, digital, integrated campaigns, activation and AI-assisted insight.",
  openGraph: { title: "About & Work | Spice360", description: "Spice 360 grew out of the Tolaram Group. Fourth on debut at LAIF 2024 with five golds. Film, strategy, digital, integrated campaigns, activation and AI-assisted insight." },
  twitter: { title: "About & Work | Spice360", description: "Spice 360 grew out of the Tolaram Group. Fourth on debut at LAIF 2024 with five golds. Film, strategy, digital, integrated campaigns, activation and AI-assisted insight." },
};

/* About glow palette (Figma 5f550 / 1dedc) */
const A = "#EEA953";
const P = "#EC6372";
const R = "#F7D0D5";

const CAPS = [
  {
    kicker: "Stories people actually care about",
    title: "Film and TV Production",
    body: "In a market where attention is the scarcest resource, the campaigns that build brands over time are the ones that earn it. We produce TV commercials, digital films, and video campaigns from brief to final cut. The 2022 Indomie ‘Mother’s Love’ campaign, directed by Jay Bhansali of KKDD Films, earned global recognition on Ads of the World. That is the standard we work against.",
  },
  {
    kicker: "The conviction before the campaign",
    title: "Brand Strategy",
    body: "Naming, visual identity, brand voice, and positioning for brands that want to own a corner of the market. Before a line of copy is written, we work out what the brand actually believes and whether that belief will move the people it’s made for. The insight driving any campaign worth making is almost always found in this stage.",
  },
  {
    kicker: "Built for the speed of this culture",
    title: "Digital Content",
    body: "Always-on content strategies and social media campaigns for brands navigating Africa’s most active online market. We write and design for Nigerian audiences, not for global templates adapted downward. The difference shows up in the engagement numbers.",
  },
  {
    kicker: "Every channel, one idea",
    title: "Integrated Campaigns",
    body: "Strategy and production across TV, radio, OOH, digital, experiential, and print, as a single coherent campaign. Not parallel workstreams loosely branded under one name. One insight, expressed with equal force at every point where the consumer encounters the brand.",
  },
  {
    kicker: "Put the brand in the room",
    title: "Experiential & Activation",
    body: "Live activations, consumer promotions, and on-ground experiences that bring the brand into direct contact with its audience. From the Indomie Fan Club running in schools across Nigeria to large-scale promotions like Eat and Win, we build activations that move products and generate earned media.",
  },
  {
    kicker: "Sharper insights, faster",
    title: "AI-Assisted Insights",
    body: "We use AI tools to surface consumer insights, test creative hypotheses, and identify content patterns before committing production budgets. No established Nigerian agency has built this as a named, premium service line. We have. It is a practical advantage in how we work, not a technology pitch.",
  },
];

/* Told in order, using only what the site already says */
const STORY = [
  {
    when: "Where we come from",
    title: "Grown inside the Tolaram Group",
    body: "Spice 360 grew out of the Tolaram Group, the company behind Indomie, Power Oil, Dano Milk, Colgate Nigeria and twelve other brands that are part of Nigerian daily life. It is still the agency’s home base: Tolaram’s dedicated creative partner.",
  },
  {
    when: "Building the instincts",
    title: "The account that built our instincts",
    body: "Working that account year after year, across food, personal care and lifestyle, built something most agencies spend careers trying to acquire: a genuine, granular understanding of what moves Nigerian people. In 2022 it produced Indomie’s ‘Mother’s Love’, recognised globally on Ads of the World.",
  },
  {
    when: "2024",
    title: "Fourth on debut at LAIF",
    body: "On its maiden entry into LAIF, Nigeria’s most competitive advertising awards, Spice 360 placed 4th overall, behind only agencies that had been competing since the festival launched. It was not a surprise to anyone who had seen the work.",
  },
  {
    when: "2025",
    title: "New leadership",
    body: "In April 2025, Biodun Adefila joined as Managing Director, bringing two decades of senior leadership from SO&U and a client list that includes Guinness Nigeria, GTBank, Unilever, P&G and Access Bank. Rotimi Ade-Onojobi joined as Creative Director, with a decade of creative work across Heineken, Airtel, Nestlé and the 2022 Indomie campaign.",
  },
];

/* Smaller pieces of real work, each already named on the site */
const MORE_WORK = [
  {
    kind: "Experiential",
    title: "Indomie Fan Club",
    body: "Running in schools across Nigeria, putting the brand in direct contact with the audience that grows up with it.",
    bg: "#EC6372",
    ink: "text-white",
  },
  {
    kind: "Consumer promotion",
    title: "Eat and Win",
    body: "A large-scale promotion built to move product and generate earned media, on the ground rather than on screen.",
    bg: "#F7D0D5",
    ink: "text-ink",
  },
  {
    kind: "Tolaram Group",
    title: "One home base, many brands",
    body: BRANDS_LINE,
    bg: "#1a1a1a",
    ink: "text-white",
  },
];

export default function About() {
  return (
    <main data-theme="about">
      <PageHero
        title="About & Work"
        titleWidth={1094}
        body="The agency grew out of the Tolaram Group, one of West Africa’s largest consumer goods conglomerates and the company behind Indomie, Power Oil, Dano Milk, Colgate Nigeria, and twelve other brands that are part of Nigerian daily life. Working that account, year after year, built something most agencies spend careers trying to acquire: a genuine, granular understanding of what moves Nigerian people."
        bodyWidth={584}
        glow={[
          { color: A, y: -353 },
          { color: P, y: -661 },
          { color: R, y: -910 },
        ]}
      />

      {/* Our story: the head holds still on the left while the chapters scroll past it */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto grid max-w-content gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <SectionHead align="left" eyebrow="Our Story" title={"From one account\nto the awards table"} width={480} />
          </div>
          <ol>
            {STORY.map((c) => (
              <li key={c.title} className={`about-lift flex flex-col gap-4 border-t border-white/20 pt-7 pb-14 md:pt-9 md:pb-20`}>
                <p className="text-eyebrow font-semibold text-[var(--eyebrow)]">{c.when}</p>
                <h3 className="text-[clamp(30px,1.6vw+22px,44px)] leading-[0.95] font-semibold tracking-[-0.06em]">{c.title}</h3>
                <p className="max-w-[560px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Selected work: only the work that exists */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead light align="left" eyebrow="Selected work" title="Ideas that earn attention and awards" width={560} />
            <FadeIn className="max-w-[380px] text-[18px] leading-[22px] tracking-[-0.04em] text-mute">
              Film, activation and promotion for brands that are part of Nigerian daily life.
            </FadeIn>
          </div>

          <div className="flex flex-col gap-2">
            <FadeIn className="grid gap-2 lg:grid-cols-[minmax(0,1.8fr)_minmax(360px,1fr)]">
              <Link href="/kitchen/mothers-love" className="flex" aria-label="Read the Mother’s Love case study">
                <PlayCard src="/blog/indomie-noodles.jpg" label="Case Study / Indomie / 2022" />
              </Link>
              <div className="flex flex-col justify-between gap-10 bg-amber p-7 text-white md:p-9">
                <div className="flex flex-col gap-5">
                  <p className="text-eyebrow font-semibold text-white/85">Film &amp; digital</p>
                  <h3 className="text-[clamp(28px,1.2vw+22px,38px)] leading-[0.95] font-semibold tracking-[-0.06em]">
                    Nigerian mothers don’t just buy Indomie, they trust it
                  </h3>
                  <p className="text-[17px] leading-[21px] tracking-[-0.04em] text-white/90">
                    The brief was never to sell noodles. It was to tell the truth about the emotional contract between a Nigerian mother and her
                    family’s kitchen. ‘Mother’s Love’ became a film and digital campaign directed by Jay Bhansali of KKDD Films, and earned global
                    recognition on Ads of the World.
                  </p>
                </div>
                <div>
                  <Button href="/kitchen/mothers-love" tone="dark">
                    Read the case study
                  </Button>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-2 md:grid-cols-3">
              {MORE_WORK.map((w, i) => (
                <FadeIn key={w.title} delay={i * 0.1} className={`flex min-h-[300px] flex-col justify-between gap-10 p-7 md:min-h-[360px] md:p-9 ${w.ink}`} style={{ background: w.bg }}>
                  <p className="text-eyebrow font-semibold opacity-80">{w.kind}</p>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[30px] leading-[30px] font-semibold tracking-[-0.055em]">{w.title}</h3>
                    <p className="text-[17px] leading-[21px] tracking-[-0.04em] opacity-90">{w.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities: plain rows on hairlines, the name and its line */}
      <section id="capabilities" className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead align="left" eyebrow="What we offer" title={"Six capabilities,\none standard"} width={560} />
            <FadeIn>
              <Button href={CONTACT_HREF}>Brief us</Button>
            </FadeIn>
          </div>
          <ol>
            {CAPS.map((c) => (
              <li
                key={c.title}
                className={`about-lift grid gap-5 border-t border-white/20 py-9 md:grid-cols-[minmax(0,1fr)_minmax(300px,520px)] md:gap-16 md:py-12`}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-[clamp(34px,2.4vw+20px,64px)] leading-[0.95] font-semibold tracking-[-0.06em]">{c.title}</h3>
                  <p className="text-eyebrow font-semibold text-[var(--eyebrow)]">{c.kicker}</p>
                </div>
                <p className="max-w-[520px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LAIF: the proof moment, said once and loudly */}
      <section id="laif" className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-12 md:gap-16">
          <SectionHead align="left" eyebrow="Awards & Accolades" title="LAIF 2024, the full record" width={560} />
          <div className="flex flex-col gap-6 border-t border-white/25 pt-10 md:pt-14">
            <SplitReveal as="p" text={"4th in Nigeria.\nOn debut."} className="text-mega font-semibold" />
            <FadeIn delay={0.1} className="max-w-[760px] text-[clamp(22px,1.2vw+16px,34px)] leading-[1.05] font-semibold tracking-[-0.05em] text-white/85">
              Five golds, seven silvers, four bronzes. Ninety points, against more than 50 agencies.
            </FadeIn>
          </div>
          <div className="grid gap-6 text-[18px] leading-[22px] tracking-[-0.04em] text-white/80 md:grid-cols-2 md:gap-16">
            <FadeIn>
              Nigeria’s Lagos Advertising and Ideas Festival ran its 19th edition in 2024, across categories including Print, Film, Digital
              Craft, and Integrated Campaigns. On its maiden entry, Spice 360 accumulated 90 points and the final ranking placed the agency 4th
              nationally.
            </FadeIn>
            <FadeIn delay={0.1}>
              The three agencies ahead were Insight Publicis, X3M Ideas, and Noah’s Ark, agencies with decades of institutional history behind
              them. Industry press named Spice 360 a standout among new entrants. The agency called it confirmation.
            </FadeIn>
          </div>
          <FadeIn>
            <Button href="/kitchen/laif-2024">Read the full story</Button>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead align="left" eyebrow="How we work" title={"From first brief\nto final result"} width={560} />
            <FadeIn className="max-w-[380px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">
              Five stages. Every client engagement runs through all of them.
            </FadeIn>
          </div>
          <ProcessList />
        </div>
      </section>

      <Footer
        title="Start a conversation"
        titleWidth={288}
        body="Tell us what your brand is trying to do and leave the rest to us"
        bodyWidth={274}
        glow={[
          { color: A, y: 58 },
          { color: P, y: 367 },
          { color: R, y: 616 },
        ]}
        actions={
          <Button href={CONTACT_HREF} size="sm" className="px-9">
            Brief us
          </Button>
        }
      />
    </main>
  );
}
