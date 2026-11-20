import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Glow } from "@/components/Glow";
import { SectionHead } from "@/components/SectionHead";
import { Motto } from "@/components/Motto";
import { Scoreboard } from "@/components/Scoreboard";
import { MediaCard } from "@/components/MediaCard";
import { BrandWall } from "@/components/BrandWall";
import { PhotoStrip } from "@/components/PhotoStrip";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { BRANDS_LINE, CONTACT_HREF, TEAM } from "@/lib/content";
import { BlogGrid } from "@/components/BlogGrid";
import { OutPillars } from "@/components/OutPillars";
import Link from "next/link";

/* Home glow palette (Figma ellipses 2571:290-292) */
const G = "#2B5833";
const L = "#E3FC6A";
const O = "#EEA953";

const SERVICES = [
  { title: "Brand Strategy", color: "#2b5833", ink: "text-white", body: "The conviction before the campaign. We work out what a brand actually believes before we make anything." },
  { title: "Digital Content", color: "#eea953", ink: "text-ink", body: "Always-on creative for Africa’s most engaged online market. Built for Nigerian audiences from line one." },
  { title: "Integrated Campaigns", color: "#bc3431", ink: "text-white", body: "Every channel, one idea behind all of it. The 360 in our name is a commitment, not a category claim." },
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

      {/* Proof first: the scoreboard, left-aligned, figures as the headline */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[110px] pb-[140px] md:pt-[150px] md:pb-[180px]">
        <Glow tint={G} anchor="bottom" ellipses={[{ color: G, y: 377 }, { color: L, y: 626 }, { color: O, y: 685 }]} />
        <div className="relative mx-auto flex max-w-content flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead align="left" eyebrow="Awards & Accolades" title={"The scoreboard"} width={520} />
            <FadeIn className="max-w-[380px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/80">
              LAIF 2024, our first time at the table: the most creative agency in Nigeria.
            </FadeIn>
          </div>
          <Scoreboard />
        </div>
      </section>

      {/* How we work: Out + think / create / pace */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] pt-[110px] pb-[120px] md:pt-[150px] md:pb-[170px]">
        <Glow tint={G} anchor="bottom" seed={1} ellipses={[{ color: G, y: 520 }, { color: L, y: 780 }, { color: O, y: 840 }]} />
        <div className="relative mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <SectionHead align="left" eyebrow="Our three pillars" title="How we work" width={420} />
          <OutPillars />
        </div>
      </section>

      <Motto quote="“We exist to make brands impossible to ignore.”" label="Our Motto" src="/group/motto-mixed.jpg" />

      {/* What we do: three tiles that each open the capabilities */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[110px] md:py-[150px]">
        <div className="mx-auto flex max-w-content flex-col gap-14 md:gap-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead light align="left" eyebrow="What we do" title="The recipe for campaigns that work" width={560} />
            <FadeIn>
              <Button href="/about#capabilities" tone="dark">
                Everything we offer
              </Button>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-3">
            {SERVICES.map((sv, i) => (
              <FadeIn key={sv.title} delay={i * 0.1}>
                <Link
                  href="/about#capabilities"
                  className={`service-tile flex h-[340px] flex-col justify-between p-7 md:h-[420px] md:p-9 ${sv.ink}`}
                  style={{ background: sv.color }}
                >
                  <h3 className="text-[30px] leading-[30px] font-semibold tracking-[-0.055em]">{sv.title}</h3>
                  <p className="text-[17px] leading-[21px] tracking-[-0.04em] opacity-90">{sv.body}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership: a teaser, the bios live on People */}
      <section className="grain relative isolate overflow-clip bg-black px-[var(--gutter)] py-[110px] md:py-[150px]">
        <Glow tint={G} anchor="bottom" ellipses={[{ color: G, y: 404 }, { color: L, y: 653 }, { color: O, y: 712 }]} />
        <div className="relative mx-auto grid max-w-content items-end gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHead align="left" eyebrow="Leadership" title={"Two hires.\nOne direction"} width={460} />
            <FadeIn className="max-w-[420px] text-[18px] leading-[22px] tracking-[-0.04em] text-white/85">
              {md.name} leads the agency’s strategy and its expansion across Sub-Saharan Africa. {cd.name} is the creative direction behind five
              gold medals on our first time at the table.
            </FadeIn>
            <FadeIn delay={0.1}>
              <Button href="/people">Meet the whole kitchen</Button>
            </FadeIn>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[md, cd].map((p) => (
              <MediaCard
                key={p.name}
                src={p.photo}
                hoverSrc={p.alt}
                alt={`${p.name}, ${p.role}`}
                className="aspect-[4/5] sm:aspect-[3/4]"
                position="center 20%"
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 50vw, 100vw"
              >
                <div className="flex flex-col gap-1.5 p-4 md:p-6">
                  <p className="text-[13px] leading-[15px] font-semibold tracking-[-0.03em] text-[var(--eyebrow)]">{p.spice}</p>
                  <h3 className="text-[20px] leading-[21px] font-semibold tracking-[-0.055em] md:text-[24px] md:leading-[25px]">{p.name}</h3>
                  <p className="text-[14px] leading-[16px] tracking-[-0.03em] text-white/80">{p.role}</p>
                </div>
              </MediaCard>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section data-nav="light" className="bg-white text-ink px-[var(--gutter)] py-[100px] md:py-[120px]">
        <SectionHead light eyebrow="Awards & Accolades" title="The brands Nigerians know. We make them." width={508} />
        <div className="mt-16 flex justify-center md:mt-20">
          <BrandWall />
        </div>
        <FadeIn className="mx-auto mt-16 max-w-[650px] text-center text-body text-mute md:mt-20">{BRANDS_LINE}</FadeIn>
      </section>

      {/* Team */}
      <section data-nav="light" className="bg-white py-[100px] text-ink md:py-[120px]">
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
        <Glow tint={G} anchor="top" ellipses={[{ color: G, y: -541 }, { color: L, y: -790 }, { color: O, y: -849 }]} />
        <div className="relative">
          <SectionHead
            eyebrow="Our Blog"
            title="Behind the kitchen"
            width={421}
            body="We’ve gotten the job done countless times, here’s how we did some and insights we have to share"
            bodyWidth={337}
          >
            <Button href="/kitchen" size="sm">
              More from the kitchen
            </Button>
          </SectionHead>
          <div className="mt-16 md:mt-[90px]">
            <BlogGrid />
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
