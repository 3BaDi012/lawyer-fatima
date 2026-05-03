# CONTENT map (visible strings → source files)

This file lists where each category of user-visible text lives. Template components (`src/components/`, `src/layouts/`, `src/pages/`) should not introduce new marketing copy—add or edit JSON/Markdown under `src/content/` instead.

## Global layout

| Visible element | Source |
|-----------------|--------|
| Skip link | `src/content/data/ui.json` → `ar.skipToContent` / `en.skipToContent` |
| Nav labels (Home, About, Services, Contact) | `ui.json` → `navHome`, `navAbout`, `navServices`, `navContact` |
| Nav `aria-label` | `ui.json` → `navAriaLabel` |
| Privacy link in footer | `ui.json` → `navPrivacy` |
| Language toggle label | `ui.json` → `langSwitch` |
| Primary CTA (“تواصل معنا” / “Contact”) | `ui.json` → `ctaContact` |
| Footer office full name | `site.json` → `officeNameAr` / `officeNameEn` |
| Footer license label + placeholder | `ui.json` → `footerLicenseLabel`, `licensePending`; value: `site.json` → `licenseOrCr` |
| Footer contact heading | `ui.json` → `footerContact` |
| Footer phone display | `site.json` → `phoneDisplay` |
| Footer address | `site.json` → `addressAr` / `addressEn` |
| Copyright line | `ui.json` → `footerRights` + `site.json` → `shortNameAr` / `shortNameEn` |

## SEO (`<title>`, `<meta name="description">`)

| Route | Source keys |
|-------|-------------|
| `/ar/`, `/en/` | `seo.json` → `ar.homeTitle` / `en.homeTitle`, `homeDescription` |
| `/ar/about/`, `/en/about/` | `aboutTitle`, `aboutDescription` |
| `/ar/services/`, `/en/services/` | `servicesTitle`, `servicesDescription` |
| `/ar/contact/`, `/en/contact/` | `contactTitle`, `contactDescription` |
| `/ar/privacy/`, `/en/privacy/` | `privacyTitle`, `privacyDescription` |

## Home (`/` per language)

| Block | Source |
|-------|--------|
| Hero city line | `site.json` → `cityAr` / `cityEn` |
| Hero H1 (office name) | `site.json` → `officeNameAr` / `officeNameEn` |
| Hero value proposition | `site.json` → `valuePropAr` / `valuePropEn` |
| Hero supporting lines | `site.json` → `homeEthosLineAr` / `homeEthosLineEn`; city again from `cityAr` / `cityEn` |
| Practice areas heading | `ui.json` → `homePracticeHeading` |
| Practice cards (title, summary, “Details”) | `practice-areas.json` + `ui.json` → `homePracticeDetails` |
| About teaser heading/body/CTA | `ui.json` + `site.json` (`homeAboutTeaserBody*`) + `homeAboutTeaserCta` |
| Bottom CTA block | `ui.json` → `homeCtaHeading`, `homeCtaBody`, `homeCtaButton` |

## About

| Block | Source |
|-------|--------|
| Page H1 | `ui.json` → `aboutHeading` |
| Main body (2–3 paragraphs) | `src/content/pages/about.ar.md`, `about.en.md` |
| Lead lawyer section title | `ui.json` → `aboutLawyerHeading` |
| Photo note under image | `ui.json` → `aboutPhotoNote` |
| Lawyer name/title/expertise | `team.json` (first entry) |
| License label + value | `ui.json` → `aboutLicenseLabel`; value `team.json` → `licenseNumber` or `licensePending` |
| Bio paragraphs | `team.json` → `bioParagraphsAr` / `bioParagraphsEn`; if empty, `ui.json` → `aboutLawyerPlaceholder` |
| Expertise list heading | `ui.json` → `aboutExpertiseHeading` |
| Bottom CTA | `ui.json` → `aboutCtaHeading`, `aboutCtaButton` |

## Services

| Block | Source |
|-------|--------|
| Page H1 + intro | `ui.json` → `servicesHeading`, `servicesIntro` |
| Each section title + paragraphs | `practice-areas.json` |
| “What we handle” / “Who it’s for” headings | `ui.json` → `servicesWhatWeHandle`, `servicesWhoFor` |

## Contact

| Block | Source |
|-------|--------|
| Page H1 + intro | `ui.json` → `contactHeading`, `contactIntro` |
| Call / WhatsApp / Email labels | `ui.json` → `callCta`, `whatsappCta`, `emailCta`, `emailUnavailable` |
| Phone display | `site.json` → `phoneDisplay` |
| WhatsApp brand row subtitle | `ui.json` → `whatsappBrand` |
| Map section title + “Open in Google Maps” | `ui.json` → `contactMapHeading`, `openInMaps` |
| Address under map | `site.json` → `addressAr` / `addressEn` |
| Office hours lines + note | `site.json` → `officeHoursLinesAr` / `officeHoursLinesEn`, `officeHoursNoteAr` / `officeHoursNoteEn` |
| Privacy link (inline) | `ui.json` → `navPrivacy` |

## Privacy

| Block | Source |
|-------|--------|
| Full page copy | `src/content/pages/privacy.ar.md`, `privacy.en.md` |

## JSON-LD (`LegalService`)

| Field | Source |
|-------|--------|
| Name, telephone, URL, address | `site.json` + current `lang` (on home + contact only) |
| Opening hours | Structured as Sun–Thu 09:00–17:00 in `BaseHead.astro` (align with `site.json` hours when you change them) |

## Open Graph image

| Asset | How it is produced |
|-------|--------------------|
| `public/og.png` | `scripts/generate-og.mjs` (English name + city; update script if you need Arabic text in the raster—SVG Arabic rendering via `sharp` can be unreliable). |

## Sitemap & robots

| File | Source |
|------|--------|
| `dist/sitemap.xml` | `scripts/generate-sitemap.mjs` (uses `PUBLIC_SITE_URL` or placeholder) |
| `public/robots.txt` | Static file (update Sitemap URL when you go live) |
