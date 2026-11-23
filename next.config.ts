import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run beside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [75, 90],
    // AVIF first: the same photos at roughly two thirds of the WebP bytes
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
