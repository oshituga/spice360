/*
 * Kitchen stories. Every claim here is already published on the live site
 * (About & Work, People, Home); nothing is invented. Sections are short so
 * the agency can extend them with their own detail later.
 */
export type Story = {
  slug: string;
  kind: string;
  date: string;
  title: string;
  dek: string;
  image: string;
  sections: { heading: string; body: string[] }[];
};

export const STORIES: Story[] = [
  {
    slug: "mothers-love",
    kind: "Case Study",
    date: "15th of January 2026",
    title: "How we partnered with Indomie to build one of Nigeria’s most loved brands.",
    dek: "Nigerian mothers don’t just buy Indomie, they trust it. ‘Mother’s Love’ was built on that single truth.",
    image: "/blog/indomie-feature.jpg",
    sections: [
      {
        heading: "The account that built our instincts",
        body: [
          "Spice 360 grew out of the Tolaram Group, the company behind Indomie, Power Oil, Dano Milk, Colgate Nigeria and twelve other brands that are part of Nigerian daily life. Working that account, year after year, built something most agencies spend careers trying to acquire: a genuine, granular understanding of what moves Nigerian people.",
        ],
      },
      {
        heading: "The brief",
        body: [
          "The brief was never to sell noodles. The brief was to tell the truth about the emotional contract between a Nigerian mother and her family’s kitchen.",
        ],
      },
      {
        heading: "The work",
        body: [
          "Built on that single insight, ‘Mother’s Love’ became a film and digital campaign directed by Jay Bhansali of KKDD Films, under the creative direction of Rotimi Ade-Onojobi.",
          "Beyond the screen, the brand lives on the ground too: from the Indomie Fan Club running in schools across Nigeria to large-scale promotions like Eat and Win, activations that move products and generate earned media.",
        ],
      },
      {
        heading: "The result",
        body: [
          "The campaign earned global recognition on Ads of the World and set the standard for how the Indomie brand speaks to its most important audience. It is the standard we work against on every film we make.",
        ],
      },
    ],
  },
  {
    slug: "laif-2024",
    kind: "Agency Story",
    date: "15th of January 2026",
    title: "Fourth on debut: the full record from LAIF 2024.",
    dek: "Five golds, seven silvers, four bronzes. Ninety points on our first time at the table.",
    image: "/group/team-full-applause.jpg",
    sections: [
      {
        heading: "The festival",
        body: [
          "Nigeria’s Lagos Advertising and Ideas Festival ran its 19th edition in 2024. More than 50 agencies competed across categories including Print, Film, Digital Craft and Integrated Campaigns.",
        ],
      },
      {
        heading: "The record",
        body: [
          "On its maiden entry, Spice 360 accumulated 90 points: five golds, seven silvers and four bronzes. The final ranking placed the agency 4th nationally, the fourth most creative agency in Nigeria.",
          "The three agencies ahead were Insight Publicis, X3M Ideas and Noah’s Ark, agencies with decades of institutional history behind them, competing since the festival launched.",
        ],
      },
      {
        heading: "What it confirmed",
        body: [
          "Industry press named Spice 360 a standout among new entrants. The agency called it confirmation. It was not a surprise to anyone who had seen the work, and the five golds are the first public output of the creative direction behind it. There are more.",
        ],
      },
    ],
  },
];

export const storyBySlug = (slug: string) => STORIES.find((s) => s.slug === slug);
