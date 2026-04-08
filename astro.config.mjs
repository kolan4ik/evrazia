// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const sharedConfig = {
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 100000000,
    },
  },
};

const siteConfig = defineConfig({
  ...sharedConfig,
  adapter: node({
    mode: "standalone",
  }),
  output: "static",
});

const offlineConfig = defineConfig({
  ...sharedConfig,
  output: "static",
  base: "./",
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "always",
  },
});

export default siteConfig;

// Для локального открытия dist/index.html из файловой системы
// можно временно переключить экспорт на offlineConfig
// или использовать отдельную офлайн-сборку.
void node;
void offlineConfig;
