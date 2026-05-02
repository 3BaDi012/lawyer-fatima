import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sitePath = path.join(root, 'src', 'content', 'data', 'site.json');
const publicDir = path.join(root, 'public');

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
const line1 = site.officeNameEn;
const line2 = site.cityEn;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1a2332"/>
  <rect x="64" y="64" width="1072" height="502" fill="none" stroke="#b08d57" stroke-width="2" opacity="0.55"/>
  <text x="600" y="260" text-anchor="middle" fill="#faf8f5" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="600">${escapeXml(
    line1,
  )}</text>
  <text x="600" y="340" text-anchor="middle" fill="#b08d57" font-family="Georgia, Times New Roman, serif" font-size="34">${escapeXml(
    line2,
  )}</text>
  <text x="600" y="520" text-anchor="middle" fill="#faf8f5" opacity="0.65" font-family="Georgia, Times New Roman, serif" font-size="18">Advocacy &amp; Legal Consultations</text>
</svg>`;

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .split('\u0027')
    .join('&apos;');
}

fs.mkdirSync(publicDir, { recursive: true });

await sharp(Buffer.from(svg)).resize(1200, 630).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'og.png'));

console.log('Generated public/og.png');
