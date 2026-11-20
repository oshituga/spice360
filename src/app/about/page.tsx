import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Glow } from "@/components/Glow";
import { GlowCard, GlowGrid, Badge } from "@/components/GlowCard";
import { SectionHead } from "@/components/SectionHead";
import { BrandWall } from "@/components/BrandWall";
import { ProcessList } from "@/components/ProcessList";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { PlayCard } from "@/components/PlayCard";
import { CONTACT_HREF } from "@/lib/content";

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

export default function About() {
  return (
    <main data-theme="about">
      <PageHero
        title={"About\n& Work"}
        titleWidth={1094}
        body="The agency grew out of the Tolaram Group, one of West Africa’s largest consumer goods conglomerates and the company behind Indomie, Power Oil, Dano Milk, Colgate Nigeria, and twelve other brands that are part of Nigerian daily life. Working that account, year after year, built something most agencies spend careers trying to acquire: a genuine, granular understanding of what moves Nigerian people."
        bodyWidth={584}
        glow={[
          { color: A, y: -353 },
          { color: P, y: -661 },
          { color: R, y: -910 },
        ]}
      />

      {/* Our story */}
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead
          eyebrow="Our Story"
          title="The work the agency built"
          width={319}
          bodyWidth={599}
          body={
            <div className="flex flex-col gap-6">
              <p>
                In 2024, on its maiden entry into LAIF, Nigeria’s most competitive advertising awards in its 19-year history, Spice 360 placed 4th
                overall. Five golds, seven silvers, four bronzes. Ninety points. The three agencies ahead were Insight Publicis, X3M Ideas, and
                Noah’s Ark. Agencies that had been competing since the festival launched. It was not a surprise to anyone who had seen the work.
              </p>
              <p>
                In April 2025, Biodun Adefila joined as Managing Director, bringing two decades of senior leadership from SO&amp;U and a client
                list that includes Guinness Nigeria, GTBank, Unilever, P&amp;G, and Access Bank. Rotimi Ade-Onojobi joined as Creative Director,
                with a decade of creative work across Heineken, Airtel, Nestlé, and the 2022 Indomie campaign that earned global recognition on
                Ads of the World.
              </p>
            </div>
          }
        />
      </section>

      {/* Selected work */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[111px]">
        <SectionHead
          light
          eyebrow="Selected work"
          title="Ideas that earn attention and awards."
          width={463}
          body="From integrated campaigns to LAIF-winning creative. A look at what Spice 360 builds for brands that mean business."
          bodyWidth={463}
        />
        <FadeIn className="mx-auto mt-16 flex max-w-[930px] flex-col gap-5 bg-amber p-6 text-white md:flex-row md:items-end md:p-10">
          <div className="flex flex-1 flex-col gap-5">
            <h3 className="max-w-[309px] text-[24px] leading-[25px] font-semibold tracking-[-0.05em]">
              Nigerian mothers don’t just buy Indomie, they trust it
            </h3>
            <p className="text-body">
              The brief was never to sell noodles. The brief was to tell the truth about the emotional contract between a Nigerian mother and her
              family’s kitchen. Built on that single insight, ‘Mother’s Love’ became a film and digital campaign directed by Jay Bhansali of
              KKDD Films. It earned global recognition on Ads of the World and set the standard for how the Indomie brand speaks to its most
              important audience.
            </p>
          </div>
          <Link href="/kitchen/mothers-love" className="flex flex-1" aria-label="Read the Mother’s Love case study">
            <PlayCard src="/blog/indomie-noodles.jpg" label="Case Study / Indomie / 2022" />
          </Link>
        </FadeIn>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="bg-black px-[var(--gutter)] pt-[100px] pb-[130px] md:pt-[100px]">
        <SectionHead eyebrow="What we offer" title="Six capabilities, One standard" width={367} />
        <GlowGrid className="mx-auto mt-16 grid max-w-[1240px] gap-4 md:mt-[89px] md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-y-[88px]">
          {CAPS.map((c, i) => (
            <GlowCard
              seed={i}
              key={c.title}
              className="min-h-[460px] md:h-[503px]"
              glow={[
                { color: A, y: 556 },
                { color: P, y: 704 },
                { color: R, y: 1163 },
              ]}
            >
              <div className="flex h-full flex-col justify-between gap-10 p-6">
                <div className="flex flex-col items-start gap-4">
                  <Badge>0{i + 1}</Badge>
                  <p className="text-eyebrow font-semibold">{c.kicker}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-[24px] leading-[32px] font-semibold tracking-[-0.05em]">{c.title}</h3>
                  <p className="text-body">{c.body}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </GlowGrid>
      </section>

      {/* LAIF */}
      <section id="laif" className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[140px] pb-[130px] md:min-h-[742px] md:pt-[241px]">
        <Glow anchor="bottom" ellipses={[{ color: A, y: 356 }, { color: P, y: 665 }, { color: R, y: 914 }]} />
        <div className="relative">
          <SectionHead
            eyebrow="Awards & Accolades"
            title="LAIF 2024, the full record"
            width={306}
            bodyWidth={635}
            className="[&>div:last-child]:mt-[65px]"
            body={
              <div className="flex flex-col gap-4">
                <p>
                  Nigeria’s Lagos Advertising and Ideas Festival ran its 19th edition in 2024. More than 50 agencies competed across categories
                  including Print, Film, Digital Craft, and Integrated Campaigns. On debut, Spice 360 accumulated 90 points: five golds, seven
                  silvers, four bronzes. The final ranking placed the agency 4th nationally.
                </p>
                <p>
                  The three agencies ahead were Insight Publicis, X3M Ideas, and Noah’s Ark, agencies with decades of institutional history behind
                  them. Industry press named Spice 360 a standout among new entrants. The agency called it confirmation.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Brands */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead light eyebrow="Who we work for" title="12 brands, one home base" width={400} />
        <div className="mt-16 flex justify-center md:mt-20">
          <BrandWall />
        </div>
        <FadeIn className="mx-auto mt-16 max-w-[760px] text-center text-body text-mute md:mt-20">
          Spice 360 is Tolaram Group’s dedicated creative partner. Active mandates span Indomie, Dano Milk, Power Oil, Kellogg’s Nigeria, Colgate
          Nigeria, 2sure, Hero, Minimie, Lush Hair, and Hypo, across food, personal care, and lifestyle categories. The relationship is not a
          roster entry. It is the account that built the agency’s creative instincts.
        </FadeIn>
      </section>

      {/* Process */}
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead
          eyebrow="How we work"
          title="From first brief to final result"
          width={317}
          body="Five stages, every client engagement runs through all of them"
        />
        <div className="mt-16 md:mt-[153px]">
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

