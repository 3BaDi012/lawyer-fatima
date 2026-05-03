import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv();

/**
 * Canonical site origin (no trailing slash) for Astro `site`, redirects, and sitemap.
 * Vercel sets VERCEL_URL (hostname only) on every build; use PUBLIC_SITE_URL for a custom domain.
 */
export function resolveSiteUrl() {
  const trim = (value) => String(value).replace(/\/+$/, '');
  if (process.env.PUBLIC_SITE_URL) return trim(process.env.PUBLIC_SITE_URL);
  if (process.env.CF_PAGES_URL) return trim(process.env.CF_PAGES_URL);
  if (process.env.VERCEL_URL) {
    const host = trim(process.env.VERCEL_URL).replace(/^https?:\/\//, '');
    return `https://${host}`;
  }
  return '';
}
