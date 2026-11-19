import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Glow } from "@/components/Glow";
import { GlowCard, GlowGrid } from "@/components/GlowCard";
import { SectionHead } from "@/components/SectionHead";
import { BentoRow, BentoTile } from "@/components/Bento";
import { MediaCard } from "@/components/MediaCard";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { CONTACT_HREF } from "@/lib/content";

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

const CASES = [
  { stage: "Series A", kind: "Brand Sprint", brand: "Kellogg’s", result: "50x increase in product purchase and brand recognition", image: "/spice-digital/kellogs.jpg" },
  { stage: "Series B", kind: "Market Expansion", brand: "Heinz", result: "30% growth in market share through new product launches", image: "/spice-digital/heinz.jpg" },
  { stage: "Series C", kind: "Consumer Engagement", brand: "Nestlé", result: "40% rise in customer loyalty via targeted campaigns", image: "/spice-digital/nestle.jpg" },
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
          <Button href={CONTACT_HREF} size="sm" className="text-paper">
            Brief Spice Digital
          </Button>
        }
      />

      {/* About Spice Digital */}
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead
          eyebrow="About Spice Digital"
          title="Built for founders, not brand managers"
          width={430}
          bodyWidth={560}
          body={
            <div className="mt-9 flex flex-col gap-6">
              <p>
                The marketing needs of a seed-stage fintech in Lagos and the marketing needs of an established FMCG brand have almost nothing in
                common. Different budgets, different timelines, different definitions of a result. Different pressures entirely.
              </p>
              <p>
                Spice Digital was built for the founder. The same creative standards as Spice 360. The same cultural intelligence about Nigerian
                and West African consumers. A commercial model and delivery pace that match a startup’s reality, not a corporate agency’s
                engagement cycle.
              </p>
              <p>
                We work with founders and CMOs at seed to Series A: companies that have grown fast enough that informal marketing is no longer
                working, but do not yet need the infrastructure of a full integrated agency. If your current marketing strategy lives in a
                WhatsApp thread, you are exactly who Spice Digital was built for.
              </p>
            </div>
          }
        />
      </section>

      {/* Services */}
      <section className="bg-black px-[var(--gutter)] pt-[60px] pb-[120px] md:pt-[100px]">
        <SectionHead eyebrow="What do we do" title="Six services, all of them connected" width={420} />
        <GlowGrid className="mx-auto mt-16 grid max-w-[1360px] gap-4 md:mt-[89px] md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([title, body], si) => (
            <GlowCard
              seed={si}
              key={title}
              className="min-h-[380px] md:h-[503px]"
              glow={[
                { color: N, y: 476 },
                { color: S, y: 870 },
                { color: M, y: 1288 },
              ]}
            >
              <div className="flex h-full flex-col justify-between gap-10 p-6">
                <h3 className="text-[24px] leading-[32px] font-semibold tracking-[-0.05em]">{title}</h3>
                <p className="max-w-[422px] text-body">{body}</p>
              </div>
            </GlowCard>
          ))}
        </GlowGrid>
      </section>

      {/* Who it serves */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] py-[110px] md:min-h-[632px]">
        <Glow anchor="bottom" ellipses={[{ color: N, y: 452 }, { color: S, y: 761 }, { color: M, y: 910 }]} />
        <div className="relative">
          <SectionHead
            eyebrow="Who Spice Digital serves"
            title="We know what funded looks like, and what growing looks like"
            width={476}
            bodyWidth={546}
            body={
              <div className="mt-9 flex flex-col gap-6">
                <p>
                  Spice Digital works with seed to Series A technology companies across fintech, edtech, healthtech, logistics, and e-commerce.
                  Operating in Nigeria or building for Nigerian and West African consumers.
                </p>
                <p className="mt-9">
                  Founders or CMOs who understand the value of brand but have not had the time or budget to build it properly. Companies growing
                  fast enough that informal marketing is no longer sufficient. Backed by investors who will notice, and value, a credible brand
                  presence.
                </p>
                <p>You do not need to be at scale to work with us. You need to be growing.</p>
              </div>
            }
          />
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[111px]">
        <SectionHead
          light
          eyebrow="S360 VS SD"
          title="Two doors into the same building"
          width={463}
          body="Spice 360 serves established brands with integrated, multi-channel campaigns. Large FMCG accounts, corporate clients, long engagement cycles."
          bodyWidth={460}
        />
        <div className="mx-auto mt-16 max-w-[678px]">
          <BentoRow>
            <BentoTile color="#2b5833" title="Spice 360">
              <Bullets
                items={[
                  "Large corporates and established brands",
                  "FMCG and consumer goods depth",
                  "Multi-channel integrated campaigns",
                  "Long engagement cycles",
                ]}
              />
            </BentoTile>
            <BentoTile color="#212a68" title="Spice Digital" delay={0.12}>
              <Bullets
                items={[
                  "Tech startups and digital-first brands",
                  "Brand, growth marketing, and digital infra",
                  "Digital-first, performance-driven",
                  "Sprint-based, startup commercial model",
                ]}
              />
            </BentoTile>
          </BentoRow>
        </div>
        <FadeIn className="mx-auto mt-16 max-w-[508px] text-center text-body text-mute">
          Both brands share infrastructure, creative values, and the Flavour Board. They do not compete for the same clients. When a Spice Digital
          client grows to the point of needing above-the-line campaign work, the transition to a Spice 360 engagement is natural, not a pitch.
        </FadeIn>
      </section>

      {/* Case studies */}
      <section className="bg-black px-[var(--gutter)] pt-[120px] pb-[100px] md:pt-[182px] md:pb-[130px]">
        <SectionHead
          eyebrow="What we’ve built"
          title="Case studies and performance data"
          width={421}
          body="Campaign outcomes, brand launches, acquisition results, and client proof points."
          bodyWidth={392}
        />
        <div className="mx-auto mt-16 grid max-w-[1150px] gap-2 md:mt-[90px] md:grid-cols-2">
          {CASES.map((c, i) => (
            <MediaCard
              key={c.brand}
              src={c.image}
              alt=""
              className={`h-[460px] md:h-[597px] ${i === 0 ? "md:col-span-2" : ""}`}
              sizes={i === 0 ? "(min-width: 768px) 1150px, 100vw" : "(min-width: 768px) 575px, 100vw"}
            >
              <article className="flex flex-col gap-4 p-6 pr-5 md:p-10">
                <p className="flex items-center gap-2 text-eyebrow font-semibold">
                  {c.stage}
                  <span aria-hidden className="size-1 rounded-full bg-white" />
                  {c.kind}
                </p>
                <h3 className="text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{c.brand}</h3>
                <p className="max-w-[426px] text-[16px] leading-[18px] tracking-[-0.06em]">{c.result}</p>
              </article>
            </MediaCard>
          ))}
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
            <Button href={CONTACT_HREF} tone="light" className="bg-[#e8eeff] px-6 !text-[#0f2a8a]">
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

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-[27px]">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
