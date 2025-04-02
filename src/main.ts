// vite-env.d.ts

import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

import "./components/mdStyle/index.css";
import "./assets/main.css";
import "../lib/styles/tw/iconsRaw.css";
import { themeSelector } from "../lib/utils/themeSelector";
//import twMergeDirective from "tailwind-merge-vue-directive/src/entry.js";

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
  app.component(
    componentName,
    defineAsyncComponent(() => componentConfig().then((mod) => (mod as { default: any }).default))
  );
});

const HhlLiveEditor = defineAsyncComponent(() => import("./components/liveEditor/hhl-live-editor.vue"));
const iconList = defineAsyncComponent(() => import("./components/icon-list.vue"));
app.component("HhlLiveEditor", HhlLiveEditor);
app.component("icon-list", iconList);

/* const H_btn = defineAsyncComponent(() => import("../lib/Components/H_btn.vue"));
const H_popover = defineAsyncComponent(() => import("../lib/Components/H_popover.vue"));
const H_switch = defineAsyncComponent(() => import("../lib/Components/H_switch.vue"));
const H_input = defineAsyncComponent(() => import("../lib/Components/H_input.vue"));
const H_textarea = defineAsyncComponent(() => import("../lib/Components/H_textarea.vue"));
const H_select = defineAsyncComponent(() => import("../lib/Components/H_select.vue"));
const H_selectbox = defineAsyncComponent(() => import("../lib/Components/H_selectbox.vue"));
const iconList = defineAsyncComponent(() => import("./components/icon-list.vue"));
const H_datePicker = defineAsyncComponent(() => import("../lib/Components/H_datePicker.vue"));
const H_timePicker = defineAsyncComponent(() => import("../lib/Components/H_timePicker.vue"));
const H_datetime = defineAsyncComponent(() => import("../lib/Components/H_datetime.vue"));
const H_dialog = defineAsyncComponent(() => import("../lib/Components/H_dialog.vue"));
const H_dialogService = defineAsyncComponent(() => import("../lib/Components/dialogService/H_dialogService.vue"));
const H_tabs = defineAsyncComponent(() => import("../lib/Components/navigation/H_tabs.vue"));
const H_tab = defineAsyncComponent(() => import("../lib/Components/navigation/H_tab.vue"));
const H_chartPie = defineAsyncComponent(() => import("../lib/Components/charts/H_chartPie.vue"));
const H_virtualList = defineAsyncComponent(() => import("../lib/Components/H_virtualList.vue"));
const H_dragDrop = defineAsyncComponent(() => import("../lib/Components/H_dragDrop.vue"));
const H_range = defineAsyncComponent(() => import("../lib/Components/H_range.vue"));
const H_progressBar = defineAsyncComponent(() => import("../lib/Components/H_progressBar.vue"));
const H_form = defineAsyncComponent(() => import("../lib/Components/H_form.vue"));
const H_datagrid = defineAsyncComponent(() => import("../lib/Components/datagrid/H_datagrid.vue"));
import H_column from "../lib/Components/datagrid/H_column.vue";

const H_themeSelector = defineAsyncComponent(() => import("../lib/Components/H_themeSelector.vue"));

const navBar = defineAsyncComponent(() => import("./components/nav-bar.vue"));
const menuLeft = defineAsyncComponent(() => import("./components/menu-left.vue"));
const menuRight = defineAsyncComponent(() => import("./components/menu-right.vue"));
const HhlLiveEditor = defineAsyncComponent(() => import("./components/liveEditor/hhl-live-editor.vue"));

app.component("H_btn", H_btn);
app.component("H_popover", H_popover);
app.component("H_switch", H_switch);
app.component("H_input", H_input);
app.component("H_textarea", H_textarea);
app.component("H_select", H_select);
app.component("H_selectbox", H_selectbox);
app.component("icon-list", iconList);
app.component("H_datePicker", H_datePicker);
app.component("H_timePicker", H_timePicker);
app.component("H_datetime", H_datetime);
app.component("H_dialog", H_dialog);
app.component("H_dialogService", H_dialogService);
app.component("H_tab", H_tab);
app.component("H_tabs", H_tabs);
app.component("H_chartPie", H_chartPie);
app.component("H_virtualList", H_virtualList);
app.component("H_dragDrop", H_dragDrop);
app.component("H_range", H_range);
app.component("H_progressBar", H_progressBar);
app.component("H_form", H_form);
app.component("H_datagrid", H_datagrid);
app.component("H_column", H_column);
app.component("H_themeSelector", H_themeSelector);
app.component("nav-bar", navBar);
app.component("menu-left", menuLeft);
app.component("menu-right", menuRight);
app.component("HhlLiveEditor", HhlLiveEditor); */

router.isReady().then(() => app.mount("#app"));
