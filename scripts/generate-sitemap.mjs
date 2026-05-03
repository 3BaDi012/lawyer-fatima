import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteUrl } from './site-url.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE = resolveSiteUrl();
if (!SITE) {
  console.error(
    'generate-sitemap: no site URL found. For Vercel: Project → Settings → Environment Variables → enable "Automatically expose System Environment Variables", or set PUBLIC_SITE_URL. For local builds: add PUBLIC_SITE_URL to .env',
  );
  process.exit(1);
}

const langs = ['ar', 'en'];
const paths = ['', 'about/', 'services/', 'contact/', 'privacy/'];

const urls = [];
for (const lang of langs) {
  for (const page of paths) {
    const suffix = page === '' ? '/' : page;
    urls.push(`${SITE}/${lang}${suffix}`);
  }
}

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .split('\u0027')
    .join('&apos;');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => {
    const priority = loc.endsWith(`/${langs[0]}/`) || loc.endsWith(`/${langs[1]}/`) ? '1.0' : '0.8';
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml.trim() + '\n', 'utf8');
console.log('Wrote dist/sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots, 'utf8');
console.log('Wrote dist/robots.txt');
