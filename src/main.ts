// vite-env.d.ts

import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

//import "./components/mdStyle/index.css";
//import "./assets/main.css";
import "../lib/styles/hhlui.css";
import { themeSelector } from "../lib/utils/themeSelector";

themeSelector().loadTheme;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App).use(router);
//app.use(twMergeDirective);

import { validator } from "../lib/utils/validator";
import * as dateFormat from "../lib/utils/dateFormat";
import { getData } from "./testData/data";
import { localData } from "../lib/Components/datagrid";
(window as { [key: string]: any })["fakeImport"] = {
  validator,
  dateFormat,
  getData,
  localData,
};

// Dynamically import all components from the DynamicComponents folder
const requireComponent = import.meta.glob("../lib/Components/**/*.vue");
Object.keys(requireComponent).forEach((fileName: string) => {
  const componentConfig = requireComponent[fileName];
  const componentName = (fileName.split("/").pop() ?? "").replace(/\.\w+$/, "");
  //console.log(componentConfig, "---", componentName);
  if (componentName !== "H_column") {
    app.component(
      componentName,
      defineAsyncComponent(() => componentConfig().then((mod) => (mod as { default: any }).default))
    );
  }
});

const HhlLiveEditor = defineAsyncComponent(() => import("./components/liveEditor/hhl-live-editor.vue"));
const iconList = defineAsyncComponent(() => import("./components/icoList.vue"));
import H_column from "../lib/Components/datagrid/H_column.vue";
app.component("HhlLiveEditor", HhlLiveEditor);
app.component("ico-list", iconList);
app.component("H_column", H_column);

router.isReady().then(() => app.mount("#app"));
