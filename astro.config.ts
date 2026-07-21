import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://jstnmcbrd.github.io",
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },
});
