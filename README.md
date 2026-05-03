# Lawyer Fatima Al-Sheri — bilingual legal office site

Static marketing site (Arabic default + English) built with **Astro 4**, **Tailwind CSS**, and **Cloudflare Pages**–friendly output (`output: 'static'`).

## Prerequisites

- Node.js 20+ (LTS recommended)

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Open `http://localhost:4325/ar/` (the Arabic home). English: `http://localhost:4325/en/`.

> Note: `public/_redirects` sends `/` → `/ar/` on Cloudflare Pages. In local dev, use `/ar/` or `/en/` directly.

## Build

```bash
npm run build
```

This runs:

1. `scripts/generate-og.mjs` — writes `public/og.png` (1200×630) from brand colors + English office name/city (rasterized via `sharp` for reliable Open Graph previews).
2. `astro build` — outputs to `dist/`.
3. `scripts/generate-sitemap.mjs` — writes `dist/sitemap.xml`.

## Preview production output

```bash
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` if you use optional variables:

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` (optional) | Base URL for `dist/sitemap.xml` (defaults to the same placeholder as `site` in `astro.config.mjs`). |

## Deploy to Cloudflare Pages

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Cloudflare Dashboard → **Pages** → **Create project** → connect the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Optionally set **`PUBLIC_SITE_URL`** in Pages if your sitemap should use a specific production URL during build.
5. Update **`site`** in `astro.config.mjs` to your real Pages URL (and align `PUBLIC_SITE_URL`, `public/robots.txt`, and Cloudflare DNS). This drives canonical URLs, Open Graph, and JSON-LD.

## Content editing (file paths)

| What to change | File |
|----------------|------|
| Office name, phone, WhatsApp, address, hours, maps queries, value proposition, home teaser | `src/content/data/site.json` |
| Practice area copy (cards + service sections) | `src/content/data/practice-areas.json` |
| Lawyer names, license numbers, bios, expertise | `src/content/data/team.json` |
| UI labels (nav, buttons, footer labels) | `src/content/data/ui.json` |
| Page `<title>` and meta descriptions | `src/content/data/seo.json` |
| Long-form about copy | `src/content/pages/about.ar.md`, `src/content/pages/about.en.md` |
| Privacy notice | `src/content/pages/privacy.ar.md`, `src/content/pages/privacy.en.md` |
| Brand logo used in header/about | `src/assets/logo.jpg` (replace file; keep similar dimensions if possible) |

> JSON files live under `src/content/data/` so Astro’s content scanner does not warn about loose files in `src/content/`. All strings remain editable JSON/Markdown—nothing is hardcoded in components except structural markup.

## Tech notes

- **RTL:** `dir`/`lang` on `<html>`; Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s`, etc.).
- **Language toggle:** Preserves the current route (`/ar/about/` ↔ `/en/about/`) via `localeHref()` in `src/utils/locale-path.ts`.
- **Team page:** Omitted (single lead lawyer); profile is on `/about/`.
- **Icons:** `lucide-astro` (package shows a deprecation notice suggesting `@lucide/astro`; the client spec asked for `lucide-astro`, so it remains unless you choose to migrate).

## Performance

The build is tuned for a small JS footprint (no client islands). After you set a real `site` URL, run Lighthouse on `/ar/` in mobile mode to confirm performance targets on your connection and hosting.
