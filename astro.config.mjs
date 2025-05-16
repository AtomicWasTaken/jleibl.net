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
    sitemap({
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date("2025-05-16"),
      customPages: [
        "https://jleibl.net/#about",
        "https://jleibl.net/#work",
        "https://jleibl.net/#hobby",
        "https://jleibl.net/#contact",
      ],
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
        },
      },
      serialize: (item) => {
        if (item.url === "https://jleibl.net/") {
          return {
            ...item,
            img: [
              {
                url: "https://jleibl.net/profile-image-futu-style.jpg",
                caption: "Jan-Marlon Leibl - Fullstack Developer",
              },
            ],
          };
        }
        return item;
      },
      xslURL: "/sitemap.xsl",
    }),
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
