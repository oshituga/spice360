import type { PaletteName } from "./glows";

/*
 * Spice Digital case studies behind the three cards on /spice-digital.
 *
 * These are ILLUSTRATIVE: the stories were written to show how Spice Digital
 * approaches a brief of each kind. They are not records of real engagements
 * with the brands named, and every page says so above the fold. The only
 * figures used are the ones the cards already carried on the live site;
 * no new numbers are introduced. Replace with the agency's real case notes
 * (and drop the notice) once they are confirmed.
 */
export type Case = {
  slug: string;
  palette: PaletteName;
  stage: string;
  kind: string;
  brand: string;
  result: string;
  image: string;
  headline: string;
  dek: string;
  sections: { heading: string; body: string[] }[];
  steps: { title: string; body: string }[];
};

export const CASES: Case[] = [
  {
    slug: "kelloggs",
    palette: "kelloggs",
    stage: "Series A",
    kind: "Brand Sprint",
    brand: "Kellogg’s",
    result: "50x increase in product purchase and brand recognition",
    image: "/spice-digital/kellogs.jpg",
    headline: "Breakfast doesn’t wait for the traffic to clear.",
    dek: "A brand sprint that moves cereal from the weekend table to the weekday rush.",
    sections: [
      {
        heading: "The brief",
        body: [
          "Cereal in many Lagos homes is a treat: something for the children, for Saturdays, for when there is time. The brief in a sprint like this is to make it the obvious choice on the days when there is no time at all.",
        ],
      },
      {
        heading: "The insight",
        body: [
          "A Lagos weekday starts before dawn. Parents are on the school run, commuters are in traffic, and breakfast is whatever can be eaten in five minutes without a stove. Speed is not a feature here; it is the whole decision.",
          "So the work does not sell taste or nutrition first. It sells the minutes back.",
        ],
      },
      {
        heading: "What we made",
        body: [
          "A tight brand sprint: a single line, “Breakfast doesn’t wait”, carried across pack-front messaging, short-form video cut for phones in traffic, and shelf displays placed where the morning shop happens.",
          "Every asset answers the same question a busy parent asks at 6am. Every asset gives the same answer.",
        ],
      },
    ],
    steps: [
      { title: "Week one: listen", body: "Morning-routine interviews with parents and commuters, and a walk of the shelves they actually shop." },
      { title: "Week two: make", body: "One line, one visual system, and the first cut of every asset, tested with the people we listened to." },
      { title: "Then: launch and learn", body: "Phone-first video and in-store displays go live together, with weekly reporting on what moves." },
    ],
  },
  {
    slug: "heinz",
    palette: "heinz",
    stage: "Series B",
    kind: "Market Expansion",
    brand: "Heinz",
    result: "30% growth in market share through new product launches",
    image: "/spice-digital/heinz.jpg",
    headline: "Nobody replaces their mother’s stew. They finish it.",
    dek: "A launch plan that earns a place next to the pot instead of fighting it.",
    sections: [
      {
        heading: "The brief",
        body: [
          "Launching new sauces into Nigerian kitchens means walking into the most opinionated room in the house. Pepper is blended at home. Stew recipes are inherited. A bottle that claims to do the cooking is a bottle that gets left on the shelf.",
        ],
      },
      {
        heading: "The insight",
        body: [
          "Nigerian cooks do not want a shortcut for the meal they are proud of. They want something for the moments around it: the suya at night, the small chops at a party, the plate of jollof that needs one more thing on the side.",
        ],
      },
      {
        heading: "What we made",
        body: [
          "“The finishing touch”: a launch built around the table, not the pot. Creator recipes that pair each new sauce with a dish everyone already loves, sampling where people eat out, and market activations that let shoppers taste before they choose.",
          "The range is introduced as a companion to Nigerian food, never a replacement for it.",
        ],
      },
    ],
    steps: [
      { title: "Map the moments", body: "Find the meals and occasions where a finishing sauce already belongs." },
      { title: "Pair, don’t replace", body: "One hero dish per product, made by creators the audience already cooks along with." },
      { title: "Taste first", body: "Sampling at eateries and markets before the media spend, so the product does the convincing." },
    ],
  },
  {
    slug: "nestle",
    palette: "nestle",
    stage: "Series C",
    kind: "Consumer Engagement",
    brand: "Nestlé",
    result: "40% rise in customer loyalty via targeted campaigns",
    image: "/spice-digital/nestle.jpg",
    headline: "Loyalty is a routine. Show up inside it.",
    dek: "Targeted campaigns that meet families at the moments their year already turns on.",
    sections: [
      {
        heading: "The brief",
        body: [
          "A household name does not need to be known. It needs to be chosen again, every shop, by families with more options and tighter budgets than ever. The brief is engagement that feels personal at the scale of a country.",
        ],
      },
      {
        heading: "The insight",
        body: [
          "A Nigerian family’s year has a rhythm: back to school, Ramadan, Easter, the long run to December. Each moment changes what goes in the basket and who is doing the buying.",
          "Loyalty is not won with one big campaign. It is kept by turning up, in the right way, at each of those moments.",
        ],
      },
      {
        heading: "What we made",
        body: [
          "A calendar of targeted campaigns, segmented by region and life stage, each built around one family moment. WhatsApp-first recipe and routine content, reminders timed to the shop, and rewards that feel like recognition rather than a discount.",
        ],
      },
    ],
    steps: [
      { title: "Segment by moment", body: "Plan the year around the occasions families already keep, region by region." },
      { title: "Talk where they talk", body: "Content and reminders on WhatsApp and short-form social, not only on billboards." },
      { title: "Reward the routine", body: "Small, well-timed recognition for the families who keep choosing the brand." },
    ],
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
