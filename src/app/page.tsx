import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Glow } from "@/components/Glow";
import { GlowCard, GlowGrid, Badge } from "@/components/GlowCard";
import { SectionHead } from "@/components/SectionHead";
import { Motto } from "@/components/Motto";
import { Scoreboard } from "@/components/Scoreboard";
import { BentoRow, BentoTile } from "@/components/Bento";
import { MediaCard } from "@/components/MediaCard";
import { BrandWall } from "@/components/BrandWall";
import { PhotoStrip } from "@/components/PhotoStrip";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { BLOG, BRANDS_LINE, CONTACT_HREF, TEAM } from "@/lib/content";

/* Home glow palette (Figma ellipses 2571:290-292) */
const G = "#2B5833";
const L = "#E3FC6A";
const O = "#EEA953";

const PILLARS = [
  { n: "01", title: "Outthink", body: "We interrogate every brief before we answer it." },
  { n: "02", title: "Outcreate", body: "We pursue the kind of work no other agency is brave enough to make." },
  { n: "03", title: "Outpace", body: "We move faster, adapt sharper, and stay ahead of the market." },
];

const STRIP = [
  "team-mixed-huddle-devices-2",
  "team-mixed-casual",
  "team-mixed-huddle-devices-3",
  "team-mixed-pose",
  "team-female-discourse",
  "team-full-applause",
  "team-hifive",
  "team-mixed-strategy",
  "team-mixed-discourse",
  "group-full",
].map((f) => ({ src: `/group/${f}.jpg`, alt: "The Spice 360 team at work" }));

export default function Home() {
  const [md, cd] = TEAM;
  return (
    <main data-theme="home">
      <PageHero
        title={"We make brands\nimpossible to ignore."}
        titleWidth={1094}
        body="We build integrated 360 campaigns rooted in cultural truth. We find what moves consumers and build campaigns that go all the way from strategy to execution."
        bodyWidth={518}
        glow={[
          { color: G, y: -313 },
          { color: L, y: -561 },
          { color: O, y: -620 },
        ]}
        actions={
          <>
            <Button href="/about" size="sm" className="text-paper">
              See what we’ve cooked
            </Button>
            <Button href={CONTACT_HREF} tone="light" size="sm" className="px-[33px]">
              Get in touch
            </Button>
          </>
        }
      />

      {/* How we work */}
      <section className="relative bg-black px-[var(--gutter)] pt-[120px] pb-[100px] md:pt-[188px] md:pb-[120px]">
        <SectionHead eyebrow="Our three pillars" title="How we work" width={319} />
        <GlowGrid className="mx-auto mt-16 grid max-w-[1150px] gap-6 md:mt-[90px] md:grid-cols-3 md:gap-9">
          {PILLARS.map((p, si) => (
            <GlowCard
              seed={si}
              key={p.n}
              className="h-[390px] md:h-[400px]"
              glow={[
                { color: O, y: 801 },
                { color: G, y: 643 },
                { color: L, y: 885 },
              ]}
            >
              <div className="flex h-full flex-col justify-end gap-6 p-6 pr-[62px]">
                <Badge className="self-start">{p.n}</Badge>
                <div className="flex flex-col gap-2">
                  <h3 className="text-card font-semibold">{p.title}</h3>
                  <p className="text-body">{p.body}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </GlowGrid>
      </section>

      <Motto quote="“We exist to make brands impossible to ignore.”" label="Our Motto" src="/group/motto-mixed.jpg" />

      {/* Scoreboard */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[100px] pb-[130px] md:min-h-[751px]">
        <Glow anchor="bottom" ellipses={[{ color: G, y: 377 }, { color: L, y: 626 }, { color: O, y: 685 }]} />
        <div className="relative flex flex-col items-center gap-16 md:gap-[89px]">
          <SectionHead eyebrow="Awards & Accolades" title="The scoreboard" width={367} />
          <Scoreboard />
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[111px]">
        <SectionHead light eyebrow="What we do" title="The recipe for campaigns that work" width={625}>
          <Button href="/about#capabilities" tone="dark" size="sm">
            Everything we offer
          </Button>
        </SectionHead>
        <div className="mx-auto mt-16 max-w-[754px]">
          <BentoRow>
            <BentoTile color="#2b5833" title="Brand Strategy">
              The conviction before the campaign. We work out what a brand actually believes before we make anything.
            </BentoTile>
          </BentoRow>
          <BentoRow>
            <BentoTile color="#eea953" title="Digital Content" delay={0.12}>
              Always-on creative for Africa’s most engaged online market. Built for Nigerian audiences from line one.
            </BentoTile>
            <BentoTile color="#bc3431" title="Integrated Campaigns" delay={0.22}>
              Every channel, one idea behind all of it. The 360 in our name is a commitment, not a category claim.
            </BentoTile>
          </BentoRow>
        </div>
      </section>

      {/* Leadership */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[100px] pb-[130px]">
        <Glow anchor="bottom" ellipses={[{ color: G, y: 404 }, { color: L, y: 653 }, { color: O, y: 712 }]} />
        <div className="relative">
          <SectionHead eyebrow="Leadership" title={"Two hires.\nOne direction"} width={400}>
            <Button href="/people" size="sm">
              See full team
            </Button>
          </SectionHead>
          <div className="mx-auto mt-16 grid max-w-[952px] gap-2 md:mt-20 md:grid-cols-2">
            {[md, cd].map((p, i) => (
              <MediaCard
                key={p.name}
                src={p.photo}
                hoverSrc={p.alt}
                alt={`${p.name}, ${p.role}`}
                className="h-[440px] md:h-[473px]"
                position="center 20%"
              >
                <div className="flex flex-col gap-4 pt-[298px] pr-5 pb-5 pl-6 md:pl-10">
                  <p className="text-eyebrow font-semibold">{p.role}</p>
                  <h3 className="text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{p.name}</h3>
                  <p className="text-body">
                    {i === 0
                      ? "Former COO at SO&U, AAAN board member, campaigns for Guinness Nigeria, GTBank, and Unilever. She leads the agency’s strategy and its expansion across Sub-Saharan Africa."
                      : "Over a decade at Livespot, BOGO Beverages, and the Ark Group. The creative direction behind five gold medals on our first time at the table."}
                  </p>
                </div>
              </MediaCard>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead light eyebrow="Awards & Accolades" title="The brands Nigerians know. We make them." width={508} />
        <div className="mt-16 flex justify-center md:mt-20">
          <BrandWall />
        </div>
        <FadeIn className="mx-auto mt-16 max-w-[650px] text-center text-body text-mute md:mt-20">{BRANDS_LINE}</FadeIn>
      </section>

      {/* Team */}
      <section className="bg-white py-[100px] text-ink md:py-[120px]">
        <div className="px-[var(--gutter)]">
          <SectionHead light eyebrow="Our Team" title="We are more than colleagues" width={508} />
        </div>
        <div className="mt-16 md:mt-20">
          <PhotoStrip photos={STRIP} />
        </div>
        <FadeIn className="mx-auto mt-16 max-w-[650px] px-[var(--gutter)] text-center text-body text-mute md:mt-20">
          We have social bonding time with all staff and do beyond just work
        </FadeIn>
      </section>

      {/* Blog */}
      <section id="blog" className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[120px] pb-[100px] md:pt-[182px] md:pb-[130px]">
        <Glow anchor="top" ellipses={[{ color: G, y: -541 }, { color: L, y: -790 }, { color: O, y: -849 }]} />
        <div className="relative">
          <SectionHead
            eyebrow="Our Blog"
            title="Behind the kitchen"
            width={421}
            body="We’ve gotten the job done countless times, here’s how we did some and insights we have to share"
            bodyWidth={337}
          >
            <Button href="/about" size="sm">
              More from the kitchen
            </Button>
          </SectionHead>
          <div className="mx-auto mt-16 grid max-w-[1150px] gap-2 md:mt-[90px] md:grid-cols-2">
            {BLOG.map((b, i) => (
              <MediaCard
                key={i}
                src={b.image}
                alt=""
                className={`h-[460px] md:h-[597px] ${i === 0 ? "md:col-span-2" : ""}`}
                sizes={i === 0 ? "(min-width: 768px) 1150px, 100vw" : "(min-width: 768px) 575px, 100vw"}
              >
                <article className="flex flex-col gap-4 p-6 pr-5 md:p-10">
                  <p className="text-eyebrow font-semibold">{b.date}</p>
                  <h3 className="max-w-[420px] text-[24px] leading-[25px] font-semibold tracking-[-0.06em]">{b.title}</h3>
                  <p className="text-eyebrow font-semibold">{b.kind}</p>
                </article>
              </MediaCard>
            ))}
          </div>
        </div>
      </section>

      <Footer
        eyebrow="A Spice360 sub-brand"
        title={"Built a product.\nNow build the brand."}
        titleWidth={512}
        body="Spice Digital is our dedicated arm for African tech startups. Same creative standards. Different kind of client."
        glow={[
          { color: G, y: 68 },
          { color: "#69CE7D", y: 377 },
          { color: L, y: 396 },
        ]}
        metaClass="text-leaf"
        actions={
          <Button href="/spice-digital" tone="light" className="bg-white/90 px-6">
            Explore Spice Digital
          </Button>
        }
      />
    </main>
  );
}
