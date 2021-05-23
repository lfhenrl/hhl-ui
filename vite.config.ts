import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import voie from "vite-plugin-voie";
import mdAnchor from "markdown-it-anchor";
import prism from "markdown-it-prism";
import Markdown from "vite-plugin-md";
import { containerPlugin } from "./src/mdHelp/plugins/containers";
import ViteComponents from "vite-plugin-components";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig({
  base: "hhl-ui",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/] // <--
    }),
    Markdown({
      markdownItSetup(md) {
        // for example
        md.use(mdAnchor);
        md.use(containerPlugin);
        md.use(prism);
      }
    }),
    ,
    voie({
      extensions: ["vue", "md"]
    }),
    ViteComponents({
      dirs: ["src/components", "src/mdHelp/components"],
      extensions: ["vue", "md"],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (path) => path.endsWith(".md")
    })
  ],
  server: {
    open: true
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
    rollupOptions: {
      plugins: [visualizer({ filename: "./analyse/index.html" })]
    }
  }
});
