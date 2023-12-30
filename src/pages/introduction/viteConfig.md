## Vite config

```js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
    Components({
      dts: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      dirs: [
        "src/components",
        "./node_modules/hhl-ui/Components",
        "./node_modules/hhl-ui/Directives",
      ],
    }),
    AutoImport({
      imports: ["vue", VueRouterAutoImports],
      dirs: ["./node_modules/hhl-ui/utils"],
    }),
  ],
});


```


