import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import mdAnchor from "markdown-it-anchor";
import prism from "markdown-it-prism";
import Markdown from "vite-plugin-md";
import { containerPlugin } from "./src/components/containers";
import WindiCSS from "vite-plugin-windicss";
import ViteComponents from "unplugin-vue-components/vite";
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
    Pages({
      extensions: ["vue", "md"]
    }),
    ViteComponents({
      dirs: ["src/components", "lib/components", "src/mdHelp/components"],
      extensions: ["vue", "md"],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    WindiCSS()
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
