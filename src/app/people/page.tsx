import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/SectionHead";
import { StackCards, type Bio } from "@/components/StackCards";
import { TeamGrid } from "@/components/TeamGrid";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { APPLY_HREF, TEAM } from "@/lib/content";

export const metadata: Metadata = {
  title: "People",
  description:
    "The people who run Spice 360, make the work and serve the clients. Each one named after a spice, each name earned.",
  openGraph: { title: "People | Spice360", description: "The people who run Spice 360, make the work and serve the clients. Each one named after a spice, each name earned." },
  twitter: { title: "People | Spice360", description: "The people who run Spice 360, make the work and serve the clients. Each one named after a spice, each name earned." },
};

/* People glow palette (Figma dd0cd), draw order green, pepper, amber */
const GR = "#2B5833";
const RD = "#BC3431";
const AM = "#EEA953";

const BIOS: Bio[] = [
  {
    color: "#eea953",
    photo: "/staff/corporate/Biodun-Adefila-Salt.jpg",
    role: "Managing Director",
    spice: "Salt",
    name: "Biodun Adefila",
    line: "Without salt, no dish is complete, no matter what else goes in.",
    paragraphs: [
      "Biodun Adefila spent over two decades in Nigerian advertising, finishing her time at SO&U Limited as Chief Operating Officer. At SO&U, she ran campaigns for Guinness Nigeria, GTBank, Unilever, P&G, and Access Bank, a portfolio that spans every major FMCG and financial services category in the market.",
      "She served on the AAAN board. Marketing Edge named her Outstanding Advertising Personality of the Year in 2020. Brand Communicator put her in the Top 50 Most Influential Women in Marketing Communications in 2023. She holds an MBA from the University of Liverpool and an Advanced Management Programme certification from Lagos Business School.",
      "At Spice 360, she leads business strategy, client partnerships, and the agency’s expansion across Sub-Saharan Africa. She does not hedge. That is not an observation. It is a working principle.",
    ],
  },
  {
    color: "#bc3431",
    photo: "/staff/corporate/Rotimi-AdeOnojobi-Alligator-pepper.jpg",
    role: "Creative Director",
    spice: "Alligator pepper",
    name: "Rotimi Ade-Onojobi",
    line: "Controls the temperature of every room: precise heat, never a degree too much.",
    paragraphs: [
      "Rotimi Ade-Onojobi spent a decade building creative work across Monument Distillers, Livespot Group (the company behind Livespot X Festival featuring Cardi B), the Ark Group, and BOGO Beverages, where he directed the Nigerian market launch of Bottega Italian Sparkling Wine and BOGO Charger Energy Drink.",
      "His campaign credits run through Heineken, Nestlé, Airtel, ABInBev, Skyy Vodka, and Access Bank. The 2022 Indomie ‘Mother’s Love’ campaign, globally recognised on Ads of the World, was produced under his creative direction.",
      "At Spice 360, he sets the creative direction for every client, every format, every platform. The five golds at LAIF 2024 are the first public output of what that direction produces. There are more.",
    ],
  },
];

const VALUES = [
  {
    bg: "#bc3431",
    ink: "text-white",
    title: "Heat",
    body: "Every brief is an opportunity to make something that creates a real reaction. Not warm, not pleasant, but genuinely felt. If a campaign does not move someone, it has not done its job. The agency is uncomfortable with lukewarm.",
  },
  {
    bg: "#2b5833",
    ink: "text-white",
    title: "Root",
    body: "We understand Nigerian consumers from the inside, because we live here. We eat what they eat, hear what they hear, feel what the market feels. That rootedness is the source of every creatively specific thing this agency has ever made.",
  },
  {
    bg: "#eea953",
    ink: "text-ink",
    title: "Precision",
    body: "Paid social, search, and programmatic campaigns. Weekly reporting. Continuous optimisation. No set-and-forget.",
  },
  {
    bg: "#f5f9f4",
    ink: "text-ink",
    light: true,
    title: "Full Circle",
    body: "The 360 in the name is a promise. We think across every stage of the consumer journey, every channel where the brand lives, every moment where communication can build or erode trust. Single-channel thinking is somebody else’s business model.",
  },
  {
    bg: "#1a1a1a",
    ink: "text-white",
    title: "Intelligence",
    body: "The best creative work is also the best-researched work. We study our clients’ consumers with a level of attention that less curious agencies direct elsewhere. Then we make something human from what we find.",
  },
];

/* Everyone with a spice name, in the order the team grid shows them */
const ROSTER = TEAM.filter((t) => t.spice);

export default function People() {
  return (
    <main data-theme="people">
      <PageHero
        image="/group/group-full.jpg"
        title="People"
        titleWidth={1094}
        body="Spice 360 is a Nigerian creative agency. The people who run it, make the work, and serve the clients are the agency. This is who they are."
        bodyWidth={584}
      />

      {/* Leadership bios, stacking */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead light align="left" eyebrow="Leadership" title="The people behind the heat" width={460} />
            <FadeIn className="max-w-[380px] text-body text-mute">
              Each one named after a spice, each name earned.
            </FadeIn>
          </div>
          <StackCards bios={BIOS} />
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto max-w-content">
          <SectionHead
            align="left"
            eyebrow="The minds behind the magic"
            title="Our team"
            body="Each person carries a real name and a spice name. The naming convention is not a gimmick, it is how the agency’s identity extends into the people who carry it. Each name describes who the person is, not who they want to be."
            bodyWidth={590}
          />
        </div>
        <div className="mt-16 md:mt-[90px]">
          <TeamGrid people={TEAM} />
        </div>
      </section>

      {/* Values: a spice rack, one colour band per value, the word set large */}
      <section id="values" className="bg-black">
        <div className="px-[var(--gutter)] pt-[60px] pb-16 md:pt-[100px] md:pb-24">
          <div className="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead align="left" eyebrow="Culture and values" title="Five values, all of them working everyday" width={560} />
            <FadeIn className="max-w-[380px] text-body text-white/80">What the agency believes</FadeIn>
          </div>
        </div>
        <ul>
          {VALUES.map((v) => (
            <li
              key={v.title}
              {...(v.light ? { "data-nav": "light" } : {})}
              className={`px-[var(--gutter)] py-12 md:py-20 ${v.ink}`}
              style={{ background: v.bg }}
            >
              <FadeIn className="mx-auto grid max-w-content gap-6 md:grid-cols-[1fr_minmax(300px,460px)] md:items-end md:gap-16">
                <h3 className="text-[clamp(56px,6vw+20px,136px)] leading-[0.86] font-semibold tracking-[-0.065em]">{v.title}</h3>
                <p className="max-w-[460px] text-body opacity-90">{v.body}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      {/* Culture system: the Flavour Board, and the names themselves */}
      <section className="bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-16 md:gap-24">
          <div className="grid gap-10 md:grid-cols-[1fr_minmax(300px,460px)] md:items-end md:gap-16">
            <SectionHead align="left" eyebrow="The Spice culture system" title="Nobody here goes by their job title alone" width={560} />
            <FadeIn className="max-w-[460px] text-body text-white/80">
              Each name is chosen to describe who the person is. The names are used in informal communications, on event badges, and in any
              context where warmth and personality belong. They are never used in contracts.
            </FadeIn>
          </div>

          <div className="border-t border-white/20 pt-10 md:pt-14">
            <FadeIn as="p" className="text-body text-white/80">
              Leadership at Spice 360 is called the Flavour Board.
            </FadeIn>
            <p className="mt-6 text-[clamp(44px,4.4vw+16px,96px)] leading-[0.92] font-semibold tracking-[-0.06em]">
              <FadeIn as="span" className="block text-white/35">
                Not the management team.
              </FadeIn>
              <FadeIn as="span" delay={0.08} className="block text-white/35">
                Not the C-suite.
              </FadeIn>
              <FadeIn as="span" delay={0.16} className="block">
                The Flavour Board.
              </FadeIn>
            </p>
            <FadeIn className="mt-8 max-w-[460px] text-body text-white/80">
              New team members propose their own spice names, which the Flavour Board confirms. The name should describe who you are, not who you
              are trying to become.
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(200px,1fr)_3fr] md:gap-16">
            <FadeIn as="p" className="text-eyebrow font-semibold text-[var(--eyebrow)]">
              The names, as they stand
            </FadeIn>
            <FadeIn>
              <ul className="columns-2 gap-x-4 sm:gap-x-12 lg:columns-3" aria-label="Team members and their spice names">
                {ROSTER.map((t) => (
                  <li
                    key={t.name}
                    className="flex break-inside-avoid flex-col-reverse gap-1 border-t border-white/15 py-3 text-[14px] leading-[17px] tracking-[-0.03em] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:text-[15px] sm:leading-[18px]"
                  >
                    <span className="text-white/55">{t.name}</span>
                    <span className="font-semibold sm:text-right">{t.spice}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer
        title="There is probably a spice name with your character written into it."
        titleWidth={560}
        body="Spice 360 hires people who are curious, specific, and allergic to lukewarm work. If that describes you, and if you have work that proves it, we want to hear from you. Send your portfolio and a short note about what you believe."
        bodyWidth={520}
        glow={[
          { color: RD, y: 58 },
          { color: AM, y: 367 },
          { color: GR, y: 616 },
        ]}
        actions={
          <Button href={APPLY_HREF} size="sm">
            Get in touch
          </Button>
        }
      />
    </main>
  );
}
