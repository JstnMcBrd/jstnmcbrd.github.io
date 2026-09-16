import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://jstnmcbrd.dev",
  // Inline the single small stylesheet so the page has no render-blocking request.
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },
});
