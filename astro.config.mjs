import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon({
      include: {
        ph: ['*'],
        logos: ['*'],
        mdi: ['*']
      }
    })
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['jleibl.net'],
      port: 4321
    },

    preview: {
      allowedHosts: ['jleibl.net'],
      port: 4321
    }
  }
});