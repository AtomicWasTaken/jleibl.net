import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jleibl.net",
  integrations: [
    react(),
    sitemap(),
    icon({
      include: {
        ph: ["*"],
        logos: ["*"],
        mdi: ["*"],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
      cors: {
        origin: "*",
        methods: ["GET"],
        allowedHeaders: ["X-Requested-With"],
      },
    },

    preview: {
      host: "0.0.0.0",
      allowedHosts: ["jleibl.net"],
      port: 4321,
      cors: {
        origin: "*",
        methods: ["GET"],
        allowedHeaders: ["X-Requested-With"],
      },
    },
  },
});
