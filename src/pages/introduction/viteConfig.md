# Vite config

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import voie from "vite-plugin-voie";
import ViteComponents from "vite-plugin-components";

export default defineConfig({
  plugins: [
    vue(),
    voie({
      importMode(path) {
        // Load index synchronously, all other pages are async.
        return path.includes("/src/pages/index.vue") ? "sync" : "async";
      }
    }),
    ViteComponents({
      dirs: ["src/components"]
    })
  ],
  server: {
    open: true
  },
  build: {
    target: "esnext",
    cssCodeSplit: false
  }
});

```


