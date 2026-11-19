# Spice360

Marketing site for Spice 360, the Lagos creative agency. Built from the Spice360 Figma file, with copy and photography from the agency's live site.

- Next.js 16 (App Router), Tailwind CSS 4, Motion, Lenis
- Four pages: Home, About & Work, People, Spice Digital
- Per-page share images (`opengraph-image.tsx`), ring-mark favicon (`icon.svg`)

## Develop

```bash
npm install
npm run dev
```

Runs on http://localhost:3360.

## Deploy

Pushes to `main` deploy to Vercel. Search indexing stays off until `NEXT_PUBLIC_SITE_URL` is set to the spice360.com.ng domain.
