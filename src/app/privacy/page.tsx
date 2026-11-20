import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { StandardFooter } from "@/components/Footer";
import { PALETTES } from "@/lib/glows";
import { EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Spice 360 website handles your information.",
  openGraph: { title: "Privacy Policy | Spice360", description: "How the Spice 360 website handles your information." },
};

/*
 * Plain-language policy describing what this site actually does: no
 * analytics, no tracking cookies, no form backend (the brief form opens
 * your own mail app). Agency's counsel should confirm before the domain
 * moves here; flagged in the hand-off.
 */
export default function Privacy() {
  return (
    <main data-theme="privacy">
      <PageHero
        title="Privacy Policy"
        titleWidth={800}
        body="What this website collects, why, and what you can ask us to do with it. Last updated 20 November 2026."
        bodyWidth={520}
        glow={PALETTES.privacy.hero}
      />
      <section className="bg-black px-[var(--gutter)] py-[100px] md:py-[120px]">
        <Prose>
          <p>
            This policy covers the Spice 360 website. Spice 360 is a creative agency based at 1 Akanbi Onitiri Street, Surulere, Lagos, and
            the controller of any personal information described here.
          </p>
          <h2>What we collect</h2>
          <p>
            <strong>Browsing this site:</strong> nothing that identifies you. The site sets no tracking or advertising cookies and runs no
            analytics. Our hosting provider keeps standard server logs (such as IP address, browser type and the page requested) for a short
            period to keep the site secure and running.
          </p>
          <p>
            <strong>Getting in touch:</strong> the brief form on our contact page does not send anything to us by itself. It prepares an
            email in your own mail app, and nothing reaches us unless you choose to send it. When you email us, we receive what you include:
            usually your name, email address, company and project details.
          </p>
          <p>
            <strong>Applying to work with us:</strong> if you send an application, we receive your note, portfolio links and any files you
            attach.
          </p>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry, prepare a proposal, or consider your application.</li>
            <li>To keep a record of our conversations with clients and candidates.</li>
          </ul>
          <p>We do not sell your information, and we do not add you to a mailing list without asking.</p>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiries and correspondence for as long as needed to respond and to run any work that follows, and applications for as
            long as a role is open or you ask us to keep them on file.
          </p>
          <h2>Your rights</h2>
          <p>
            Under the Nigeria Data Protection Act 2023 you can ask to see the information we hold about you, have it corrected or deleted, or
            object to how we use it. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will respond within 30 days.
          </p>
          <h2>Changes</h2>
          <p>If this policy changes, we will update it on this page and change the date at the top.</p>
        </Prose>
      </section>
      <StandardFooter palette="privacy" />
    </main>
  );
}
