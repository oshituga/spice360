import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { PALETTES } from "@/lib/glows";
import { CONTACT_HREF } from "@/lib/content";

/* 404 in the site's own voice: the hero, a kitchen joke, two ways back. */
export default function NotFound() {
  return (
    <main data-theme="lost">
      <PageHero
        title={"This dish\nisn’t on the menu."}
        titleWidth={700}
        body="The page you were looking for has moved or never existed. Everything we cook is a click away."
        bodyWidth={460}
        glow={PALETTES.lost.hero}
        actions={
          <>
            <Button href="/" size="sm" className="text-paper">
              Back to home
            </Button>
            <Button href={CONTACT_HREF} tone="light" size="sm">
              Get in touch
            </Button>
          </>
        }
      />
    </main>
  );
}
