import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://REPLACE_WITH_YOUR_PAGES_DOMAIN.pages.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false })],
});
