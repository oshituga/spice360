import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";

/* The Figma file is set entirely in Google Sans Flex. */
const gsf = Google_Sans_Flex({
  variable: "--font-gsf",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/*
 * Absolute base for share-image URLs: the real domain once it points here,
 * otherwise this Vercel deployment's production URL.
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3360");

/* Until spice360.com.ng points at this build, keep the preview out of search
   so it never competes with the agency's live site for the same content. */
const LIVE = SITE.includes("spice360.com.ng");

const DESCRIPTION =
  "Spice 360 is a Lagos creative agency building integrated 360 campaigns rooted in cultural truth, from strategy to execution. Fourth at LAIF 2024 on debut; the creative partner behind Indomie, Dano, Power Oil and Colgate Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Spice360 | We make brands impossible to ignore",
    template: "%s | Spice360",
  },
  description: DESCRIPTION,
  applicationName: "Spice360",
  openGraph: {
    type: "website",
    siteName: "Spice360",
    locale: "en_NG",
    title: "Spice360 | We make brands impossible to ignore",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice360 | We make brands impossible to ignore",
    description: DESCRIPTION,
  },
  robots: LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={gsf.variable}>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
