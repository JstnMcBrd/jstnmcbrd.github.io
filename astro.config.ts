import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://jstnmcbrd.github.io',
  integrations: [
    icon({
      include: {
        'simple-icons': ['github', 'linkedin', 'x', 'gamejolt'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
