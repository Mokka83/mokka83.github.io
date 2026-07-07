import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

const site = process.env.PUBLIC_SITE_URL || "https://michaelmoeller.io";

export default defineConfig({
  site,
  output: "static",
  adapter: netlify(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto"
  }
});
