# Vite config

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import { visualizer } from "rollup-plugin-visualizer";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      extensions: ["vue", "md"]
    }),
    Components({
      dirs: ["src/components", "./node_modules/hhl-ui/Components"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true
    }),
    WindiCSS(),
    visualizer()
  ],
  build: {
    cssCodeSplit: false
  }
});

```