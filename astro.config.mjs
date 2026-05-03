import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { resolveSiteUrl } from './scripts/site-url.mjs';

const site = resolveSiteUrl();

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false })],
});
