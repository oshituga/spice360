import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { Button } from "@/components/Button";
import { StandardFooter } from "@/components/Footer";
import { APPLY_HREF } from "@/lib/content";
import { PALETTES } from "@/lib/glows";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Spice 360 hires people who are curious, specific, and allergic to lukewarm work. Send your portfolio and a short note about what you believe.",
  openGraph: { title: "Careers | Spice360", description: "Spice 360 hires people who are curious, specific, and allergic to lukewarm work." },
};

/* Careers, in its own Lagoon teal over the team photo. All copy is the agency's own, from the
   People page and its hiring call; there is no open-roles feed, so the page
   invites applications year-round rather than listing invented roles. */
export default function Careers() {
  return (
    <main data-theme="careers">
      <PageHero
        image="/group/team-full-applause.jpg"
        glow={PALETTES.careers.hero}
        title={"There is probably a spice name\nwith your character written into it."}
        titleWidth={900}
        body="Spice 360 hires people who are curious, specific, and allergic to lukewarm work. If that describes you, and if you have work that proves it, we want to hear from you."
        bodyWidth={560}
        actions={
          <Button href={APPLY_HREF} size="sm">
            Send your portfolio
          </Button>
        }
      />
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <Prose>
          <h2>How it works here</h2>
          <p>
            Every brief is an opportunity to make something that creates a real reaction. Not warm, not pleasant, but genuinely felt. We
            understand Nigerian consumers from the inside, because we live here, and we study our clients’ consumers with a level of
            attention that less curious agencies direct elsewhere.
          </p>
          <p>
            Nobody here goes by their job title alone. Each person carries a spice name chosen to describe who they are, not who they want
            to be. New team members propose their own, and the Flavour Board, which is what we call our leadership, confirms it.
          </p>
          <h2>How to apply</h2>
          <p>
            We read applications year-round. Send your portfolio and a short note about what you believe to{" "}
            <a href={APPLY_HREF}>our inbox</a>. Tell us the work you are proudest of and why it worked.
          </p>
        </Prose>
      </section>
      <StandardFooter palette="careers" />
    </main>
  );
}
