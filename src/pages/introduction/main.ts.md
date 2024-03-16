## main.ts

This is how I define my main.ts
<br>


```js

import "./assets/main.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");

```
