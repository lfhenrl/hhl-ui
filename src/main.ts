// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";
// import "./style/main.css";
// import "./style/index.css";
import "virtual:windi.css";
import "./components/mdStyle/index.css";
import "../lib/style.css";

const history = createWebHashHistory();
const router = createRouter({ history, routes });

const app = createApp(App).use(router);

import { validator } from "../lib/utils/validator";
import * as dateFormat from "../lib/utils/dateFormat";
import { getData } from "./testData/data";
window["fakeImport"] = { validator, dateFormat, getData };

const H_icon = defineAsyncComponent(() => import("../lib/Components/H_icon.vue"));
const H_btn = defineAsyncComponent(() => import("../lib/Components/H_btn.vue"));
const H_pop = defineAsyncComponent(() => import("../lib/Components/popup/H_pop.vue"));
const H_radio = defineAsyncComponent(() => import("../lib/Components/H_radio.vue"));
const H_switch = defineAsyncComponent(() => import("../lib/Components/H_switch.vue"));
const H_checkbox = defineAsyncComponent(() => import("../lib/Components/H_checkbox.vue"));
const H_input = defineAsyncComponent(() => import("../lib/Components/H_input.vue"));
const H_textarea = defineAsyncComponent(() => import("../lib/Components/H_textarea.vue"));
const H_select = defineAsyncComponent(() => import("../lib/Components/H_select.vue"));
const H_layout = defineAsyncComponent(() => import("../lib/Components/layout/H_layout.vue"));
const iconList = defineAsyncComponent(() => import("./components/icon-list.vue"));
const H_datePicker = defineAsyncComponent(() => import("../lib/Components/date/H_datePicker.vue"));
const H_modal = defineAsyncComponent(() => import("../lib/Components/popup/H_modal.vue"));
const H_dialog = defineAsyncComponent(() => import("../lib/Components/popup/H_dialog.vue"));
const H_spacer = defineAsyncComponent(() => import("../lib/Components/H_spacer.vue"));
const H_dialogService = defineAsyncComponent(() => import("../lib/Components/dialogService/H_dialogService.vue"));
const H_tabs = defineAsyncComponent(() => import("../lib/Components/navigation/H_tabs.vue"));
const H_tab = defineAsyncComponent(() => import("../lib/Components/navigation/H_tab.vue"));
const H_chartPie = defineAsyncComponent(() => import("../lib/Components/charts/H_chartPie.vue"));
const H_virtualList = defineAsyncComponent(() => import("../lib/Components/virtualList/H_virtualList.vue"));
const H_dragDrop = defineAsyncComponent(() => import("../lib/Components/draggable/H_dragDrop.vue"));

app.component("H_icon", H_icon);
app.component("H_btn", H_btn);
app.component("H_pop", H_pop);
app.component("H_radio", H_radio);
app.component("H_switch", H_switch);
app.component("H_checkbox", H_checkbox);
app.component("H_input", H_input);
app.component("H_textarea", H_textarea);
app.component("H_select", H_select);
app.component("H_layout", H_layout);
app.component("icon-list", iconList);
app.component("H_datePicker", H_datePicker);
app.component("H_modal", H_modal);
app.component("H_dialog", H_dialog);
app.component("H_dialogService", H_dialogService);
app.component("H_tab", H_tab);
app.component("H_tabs", H_tabs);
app.component("H_spacer", H_spacer);
app.component("H_chartPie", H_chartPie);
app.component("H_virtualList", H_virtualList);
app.component("H_dragDrop", H_dragDrop);

router.isReady().then(() => app.mount("#app"));
