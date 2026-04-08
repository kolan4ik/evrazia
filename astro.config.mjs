// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Общие настройки
const sharedConfig = {
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 100000000,
    },
  },
};

// Основной конфиг для Vercel (static)
export default defineConfig({
  ...sharedConfig,
  output: "static",
});
