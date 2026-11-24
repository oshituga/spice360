import { ImageResponse } from "next/og";
import { MARK_SVG } from "@/lib/mark";

/* iOS home-screen icon: the brush "0" from the wordmark, full bleed (iOS rounds the corners). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;
  return new ImageResponse(
    <img src={src} width={180} height={180} alt="" />,
    size,
  );
}
