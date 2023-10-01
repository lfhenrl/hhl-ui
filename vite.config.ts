import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import mdAnchor from "markdown-it-anchor";
import Markdown from "vite-plugin-vue-markdown";
import { containerPlugin } from "./src/components/containers";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig({
  // base: "/hhl-ui/",
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true
      }
    }),
    Markdown({
      markdownItSetup(md) {
        // for example
        md.use(mdAnchor);
        md.use(containerPlugin);
        md.use(require("markdown-it-prism"));
      }
    }),
    Pages({
      extensions: ["vue", "md"]
    })
  ],
  server: {
    open: true
  },
  build: {
    target: "esnext",
    outDir: "docs",
    cssCodeSplit: false,
    rollupOptions: {
      plugins: [visualizer({ filename: "./analyse/index.html" })]
    }
  }
});
