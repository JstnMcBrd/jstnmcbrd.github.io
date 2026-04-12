import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://jstnmcbrd.github.io",
  integrations: [
    icon({
      include: {
        "simple-icons": ["github", "linkedin", "x", "gamejolt"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
