import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1a2332',
          gold: '#b08d57',
          cream: '#faf8f5',
          ink: '#2c3544',
          muted: '#5c6573',
        },
      },
      fontFamily: {
        ar: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        en: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-ar': ['2.25rem', { lineHeight: '1.2' }],
        'display-ar-lg': ['3rem', { lineHeight: '1.15' }],
        'display-en': ['2.5rem', { lineHeight: '1.15' }],
        'display-en-lg': ['3.5rem', { lineHeight: '1.1' }],
      },
      maxWidth: {
        measure: '72ch',
      },
    },
  },
  plugins: [typography],
};
