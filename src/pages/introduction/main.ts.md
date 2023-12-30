## main.ts

This is how I define my main.ts
<br>


```js

import { createApp } from "vue";
import "hhl-ui/styles/tailwind.css"; /* Use this if you are using Tailwind */
import "hhl-ui/styles/standard.css"; /* If not using Tailwimd Use this*/
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { themeSelector } from "hhl-ui/utils/themeSelector";

themeSelector().loadTheme;

const router = createRouter({
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");

```
