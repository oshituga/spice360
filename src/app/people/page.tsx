import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { GlowCard, GlowGrid, Badge } from "@/components/GlowCard";
import { SectionHead } from "@/components/SectionHead";
import { StackCards, type Bio } from "@/components/StackCards";
import { TeamGrid } from "@/components/TeamGrid";
import { Footer } from "@/components/Footer";
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
    icon: "heat",
    title: "Heat",
    body: "Every brief is an opportunity to make something that creates a real reaction. Not warm, not pleasant, but genuinely felt. If a campaign does not move someone, it has not done its job. The agency is uncomfortable with lukewarm.",
  },
  {
    icon: "root",
    title: "Root",
    body: "We understand Nigerian consumers from the inside, because we live here. We eat what they eat, hear what they hear, feel what the market feels. That rootedness is the source of every creatively specific thing this agency has ever made.",
  },
  {
    icon: "precision",
    title: "Precision",
    body: "Paid social, search, and programmatic campaigns. Weekly reporting. Continuous optimisation. No set-and-forget.",
  },
  {
    icon: "full-circle",
    title: "Full Circle",
    body: "The 360 in the name is a promise. We think across every stage of the consumer journey, every channel where the brand lives, every moment where communication can build or erode trust. Single-channel thinking is somebody else’s business model.",
  },
  {
    icon: "intelligence",
    title: "Intelligence",
    body: "The best creative work is also the best-researched work. We study our clients’ consumers with a level of attention that less curious agencies direct elsewhere. Then we make something human from what we find.",
  },
];

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
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[111px]">
        <SectionHead light title="The people behind the heat" width={356} />
        <p className="mt-6 text-center text-eyebrow font-semibold text-mute">Each one named after a spice, each name earned.</p>
        <div className="mt-16">
          <StackCards bios={BIOS} />
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead
          eyebrow="The minds behind the magic"
          title="Our team"
          body="Each person carries a real name and a spice name. The naming convention is not a gimmick, it is how the agency’s identity extends into the people who carry it. Each name describes who the person is, not who they want to be."
          bodyWidth={590}
        />
        <div className="mt-16 md:mt-[90px]">
          <TeamGrid people={TEAM} />
        </div>
      </section>

      {/* Values */}
      <section className="bg-black px-[var(--gutter)] pt-[60px] pb-[130px] md:pt-[100px]">
        <SectionHead
          eyebrow="Culture and values"
          title="Five values, all of them working everyday"
          width={464}
          body="What the agency believes"
        />
        <GlowGrid className="mx-auto mt-16 grid max-w-[1240px] gap-4 md:mt-[89px] md:grid-cols-6">
          {VALUES.map((v, i) => (
            <GlowCard
              seed={i}
              key={v.title}
              className={`min-h-[420px] md:h-[503px] ${i < 3 ? "md:col-span-2" : "md:col-span-3"}`}
              glow={[
                { color: GR, y: 713 },
                { color: RD, y: 546 },
                { color: AM, y: 774 },
              ]}
            >
              <div className="flex h-full flex-col justify-between gap-10 p-6">
                <div className="flex flex-col items-start gap-4">
                  <Badge>
                    <span
                      aria-hidden
                      className="m-1 block size-9 bg-white"
                      style={{
                        maskImage: `url(/icons/${v.icon}.svg)`,
                        WebkitMaskImage: `url(/icons/${v.icon}.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  </Badge>
                  <h3 className="text-[24px] leading-[32px] font-semibold tracking-[-0.05em]">{v.title}</h3>
                </div>
                <p className="max-w-[560px] text-body">{v.body}</p>
              </div>
            </GlowCard>
          ))}
        </GlowGrid>
      </section>

      {/* Culture system */}
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead
          eyebrow="The Spice culture system"
          title="Nobody here goes by their job title alone"
          width={441}
          bodyWidth={538}
          body={
            <div className="mt-9 flex flex-col items-center gap-6">
              <p>
                Each name is chosen to describe who the person is. The names are used in informal communications, on event badges, and in any
                context where warmth and personality belong. They are never used in contracts.
              </p>
              <p className="max-w-[425px]">
                Leadership at Spice 360 is called the Flavour Board. Not the management team. Not the C-suite. The Flavour Board. New team
                members propose their own spice names, which the Flavour Board confirms. The name should describe who you are, not who you are
                trying to become.
              </p>
            </div>
          }
        />
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
