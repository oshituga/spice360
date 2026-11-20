/*
 * Copy and people come from the live site (spice360.com.ng) where it is newer
 * than the Figma file: the leadership spice names (Salt, Alligator pepper),
 * the sixth capability (AI-Assisted Insights), and the whole team roster.
 * Layout and type come from Figma.
 */

/* Same inbox the live site uses. Every "Get in touch" goes to the brief
   page, which composes a mail to it (mailto opens the phone's mail app). */
export const EMAIL = "tech.spice360@gmail.com";
export const CONTACT_HREF = "/contact";

export const APPLY_HREF =
  "mailto:tech.spice360@gmail.com?subject=Application%20for%20Spice360&body=Hello%20Spice360%2C%20I%27d%20like%20to%20apply.%20Here%27s%20a%20bit%20about%20me%20and%20a%20link%20to%20my%20portfolio%3A%20";

export type Theme ="home" | "about" | "people" | "digital";

export const NAV = [
  { href: "/", label: "Home", theme: "home", swatch: "#69ce7d" },
  { href: "/about", label: "About & Work", theme: "about", swatch: "#eea953" },
  { href: "/people", label: "People", theme: "people", swatch: "#bc3431" },
  { href: "/spice-digital", label: "Spice Digital", theme: "digital", swatch: "#7bdcfb" },
] as const satisfies readonly { href: string; label: string; theme: Theme; swatch: string }[];

export function themeFor(pathname: string): Theme {
  return NAV.find((n) => n.href !== "/" && pathname.startsWith(n.href))?.theme ?? "home";
}

export type Person = {
  name: string;
  spice?: string;
  role: string;
  /** Formal portrait, shown at rest */
  photo: string;
  /** Spice T-shirt portrait, revealed on hover. Falls back to photo. */
  alt?: string;
  line?: string;
};

const s = (file: string) => `/staff/${file}`;

export const TEAM: Person[] = [
  {
    name: "Biodun Adefila",
    spice: "Salt",
    role: "Managing Director",
    photo: s("corporate/Biodun-Adefila-Salt.jpg"),
    alt: s("tshirt/Biodun-Adefila-Salt.jpg"),
    line: "Without salt, no dish is complete, no matter what else goes in.",
  },
  {
    name: "Rotimi Ade-Onojobi",
    spice: "Alligator pepper",
    role: "Creative Director",
    photo: s("corporate/Rotimi-AdeOnojobi-Alligator-pepper.jpg"),
    alt: s("tshirt/Rotimi-AdeOnojobi-Alligator-pepper.jpg"),
    line: "Controls the temperature of every room: precise heat, never a degree too much.",
  },
  p("Godwin Ndubuisi", "Yaji", "Deputy Creative Director", "Godwin-Ndubuisi-Yaji"),
  p("Bimpe Gbadamosi", "Turmeric", "Group Head, Finance & Admin", "Bimpe-Gbadamosi-Turmeric"),
  p("Tawakaltu Ojukotola", "Green Bell pepper", "Group Head, Copy", "Tawakaltu-Ojukotola-Green-Bell-pepper"),
  p("Rotimi Turton", "Cameroon pepper", "Group Head, Activation", "Rotimi-Turton-Cameroon-pepper"),
  p("Elijah Omosanya", "Nutmeg", "Senior Group Head, Art", "Elijah-Omosanya-Nutmeg"),
  p("Tioluwalogo Olakunbi-Black", "Black pepper", "Group Head, Brand & Clients Management", "Tioluwalogo-OlakunbiBlack-Black-pepper"),
  p("Salami Akeem", "Bayleaf", "Group Head", "Salami-Akeem-Bayleaf"),
  p("Bola Giwa", "Cumin", "Group Head", "Bola-Giwa-Cumin"),
  p("Emmanuel Olotu", "Thyme", "Deputy Group Head, Art", "Emmanuel-Olotu-Thyme"),
  p("Oladele Gbolahan", undefined, "Deputy Group Head, Art", "Oladele-Gbolahan-spicename"),
  p("Onome Ihezue", "Tomato", "Human Resource Manager", "Onome-Ihezue-Tomato"),
  p("Oluwamayowa Adebowale", "Chili pepper", "Senior Digital Strategist", "Oluwamayowa-Adebowale-Chili-pepper"),
  {
    name: "Ledeebari Okoye",
    spice: "Scent leaf",
    role: "Senior Copywriter",
    photo: s("corporate/Ledeebari-Okoye-Scent-leaf.png"),
  },
  p("Oluremi Ogunwale", "Crayfish", "Senior Copywriter", "Oluremi-Ogunwale-Crayfish"),
  p("Gloria Anavheokhai", "Cinnamon", "Senior Executive, Traffic", "Gloria-Anavheokhai-Cinnamon"),
  p("Elizabeth Crisp", "Garlic", "Brand Strategy Manager", "Elizabeth-Crisp-Garlic"),
  p("Adaobi Onyenze-Ugochukwu", "Saffron", "Account Manager", "Adaobi-OnyenzeUgochukwu-Saffron"),
  p("Oyinloluwa Aderibigbe-Orisakwe", "Basil", "Account Manager", "Oyinloluwa-AderibigbeOrisakwe-Basil"),
  p("Magdalene Ajayi", "Maggi", "Account Executive", "Magdalene-Ajayi-Maggi"),
  {
    name: "Olayemi Alegbejo",
    spice: "Ginger",
    role: "Art Director",
    photo: s("corporate/Olayemi-Alegbejo-Ginger.png"),
  },
  p("Abdubaasit Raji", "Oregano", "Art Director", "Abdubaasit-Raji-Oregano"),
  p("Daniel Suleman", "Red pepper", "Art Director", "Daniel-Suleman-Red-pepper"),
  p("Johaan Martins", "Curry", "Art Director", "Johaan-Martins-Curry"),
  p("David Nmeka", "Shombo", "Junior Art Director", "David-Nmeka-Shombo"),
  p("Isaac Eze", "White pepper", "Video Producer", "Isaac-Eze-White-pepper"),
  p("Oritseweyinmi Omagbemi", "Star Anise seed", "Digital Community Manager", "Oritseweyinmi-Omagbemi-Star-Anise-seed"),
  p("Opeyemi Muyiwa-Dada", "Ataare", "UI/UX Intern", "Opeyemi-MuyiwaDada-Ataare"),
  p("Jennifer Ezem", undefined, "Digital Intern", "Jennifer-Ezem-spicename"),
  p("Tumininu Umeike", "Onion", "Digital Intern", "Tumininu-Umeike-Onion"),
  p("Abosede Ekwonye", undefined, "Digital Intern", "Abosede-Ekwonye-spicename"),
  { name: "Emmanuel Dike", spice: "Utazi", role: "Office Assistant", photo: s("tshirt/Emmanuel-Dike-Utazi.jpg") },
  { name: "Joshua Okeowo", spice: "Rodo", role: "Office Assistant", photo: s("tshirt/Joshua-Okeowo-Rodo.jpg") },
  { name: "Joseph Mida-Makeri", role: "Driver", photo: s("tshirt/Joseph-MidaMakeri.jpg") },
];

function p(name: string, spice: string | undefined, role: string, file: string): Person {
  return {
    name,
    spice,
    role,
    photo: s(`corporate/${file}.jpg`),
    alt: s(`tshirt/${file}.jpg`),
  };
}

/* "Behind the kitchen" cards. Two have full stories written only from facts
   already published on the live site; the Cannes story has no copy yet, so
   its card shows without a link until the agency supplies it. */
export const BLOG = [
  {
    date: "15th of January 2026",
    title: "How we partnered with Indomie to build one of Nigeria’s most loved brands.",
    kind: "Case Study",
    image: "/blog/indomie-feature.jpg",
    href: "/kitchen/mothers-love",
  },
  {
    date: "15th of January 2026",
    title: "The year we took our young lions to Cannes.",
    kind: "Agency Story",
    image: "/group/team-mixed-hifive-devices.jpg",
    href: null,
  },
  {
    date: "15th of January 2026",
    title: "Fourth on debut: the full record from LAIF 2024.",
    kind: "Agency Story",
    image: "/group/team-full-applause.jpg",
    href: "/kitchen/laif-2024",
  },
] as const;

/* The brand wall uses the live site's pre-rendered logo tiles. */
export const BRAND_TILES = Array.from({ length: 8 }, (_, i) => `/brand-tiles/tile-${i + 1}.png`);

export const BRANDS_LINE =
  "Active mandates include Indomie, Dano Milk, Power Oil, Kellogg’s, Colgate Nigeria, 2sure, Hero, Minimie, Lush Hair, and Hypo, across food, personal care, and lifestyle.";
