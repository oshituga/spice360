import type { MetadataRoute } from "next";

/* Home-screen install: black like the site, the brush "0" from the wordmark as the icon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spice360",
    short_name: "Spice360",
    description: "Integrated 360 campaigns rooted in cultural truth, from Lagos.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
