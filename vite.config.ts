import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/*
 * This is our bundler configuration. Right now it doesn't look like much, but we
 * can customize it later if we want to add, say, PostCSS plugins, Sass, or other
 * things like that.
 * 
 * - [qwikVite](https://qwik.builder.io/docs/advanced/vite/#qwikvite)
 * - [qwikCity](https://qwik.builder.io/docs/advanced/vite/#qwikcity)
 * - [tsconfigPaths](https://www.npmjs.com/package/vite-tsconfig-paths)
 */

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    define: {
      'process.env.PUBLIC_SUPABASE_URL': JSON.stringify(import.meta.env.PUBLIC_SUPABASE_URL),
    }
  };
});
