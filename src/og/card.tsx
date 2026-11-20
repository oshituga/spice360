import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
 * Link-preview cards (1200x630), one per page, generated at build.
 * Same art as the heroes: black, the page's glow pouring in from the top
 * (People: the team photo under a scrim), colour logo sitting in the light,
 * and the page's line set in Google Sans Flex at the hero's -5% tracking.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/* Each page's hero light, as it reads at card size: the glow is far wider
   than the card, so across 1200px it is effectively a vertical band. Stops
   sampled from the rendered heroes. (Satori drops the radial version.) */
export const OG_GLOWS = {
  home: "linear-gradient(180deg, #D9B65E 0%, #A3A452 24%, #4E6C35 46%, #16240F 68%, #000 86%)",
  about: "linear-gradient(180deg, #EA8E70 0%, #D88A5C 22%, #8C5130 44%, #2A170C 66%, #000 86%)",
  digital: "linear-gradient(180deg, #8DC0D4 0%, #5679A6 22%, #26336A 44%, #0A0D22 66%, #000 86%)",
} as const;

async function asset(path: string, type: string) {
  const buf = await readFile(join(process.cwd(), path));
  return `data:${type};base64,${buf.toString("base64")}`;
}

export async function ogCard({
  eyebrow,
  eyebrowColor,
  title,
  glow,
  photo,
}: {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  glow?: string;
  photo?: string;
}) {
  const [font, logo, bg] = await Promise.all([
    readFile(join(process.cwd(), "src/og/GoogleSansFlex-SemiBold.ttf")),
    asset("public/logo/spice360-color.png", "image/png"),
    photo ? asset(`public${photo}`, "image/jpeg") : Promise.resolve(null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          padding: "56px 72px 64px",
          position: "relative",
          fontFamily: "GSF",
          color: "#fff",
        }}
      >
        {bg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bg}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", objectPosition: "50% 35%" }}
          />
        )}
        {bg && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)",
            }}
          />
        )}
        {glow && (
          <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, backgroundImage: glow, opacity: bg ? 0.65 : 1 }} />
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" height={44} width={165} style={{ height: 44, width: 165 }} />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.85)" }}>
            spice360.com.ng
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: "-0.05em", color: eyebrowColor }}>{eyebrow}</div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              maxWidth: 940,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "GSF", data: font, weight: 600, style: "normal" }],
    },
  );
}
