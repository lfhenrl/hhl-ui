import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdAnchor from "markdown-it-anchor";
import mdprism from "markdown-it-prism";
import Markdown from "unplugin-vue-markdown/vite";
import VueRouter from "unplugin-vue-router/vite";
import { containerPlugin } from "./src/components/containers";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  // base: "/hhl-ui/",
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  plugins: [
    VueRouter({
      extensions: [".vue", ".md"],
      routesFolder: "src/pages",
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    tailwindcss(),
    Markdown({
      markdownItSetup(md) {
        // for example
        md.use(mdAnchor);
        md.use(containerPlugin);
        md.use(mdprism);
      },
    }),
    visualizer({ filename: "./analyse/index.html" }) as any,
  ],
  server: {
    open: true,
  },
  build: {
    target: "esnext",
    outDir: "docs",
    cssCodeSplit: false,
  },
});
