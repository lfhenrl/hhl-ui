import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "voie-pages";
// import routes from "./routes"
import "./style/main.css";
import "./style/index.css";
import "./mdHelp/style/index.css";

const history = createWebHashHistory();
const router = createRouter({ history, routes });

const app = createApp(App).use(router);

import { validator } from "./components/utils/validator";
import * as dateFormat from "./components/utils/dateFormat";
window["fakeImport"] = { validator, dateFormat };

const hhlIcon = defineAsyncComponent(() => import("./components/forms/hhl-icon.vue"));
const hhlBtn = defineAsyncComponent(() => import("./components/forms/hhl-btn.vue"));
const hhlPop = defineAsyncComponent(() => import("./components/popUp/hhl-pop.vue"));
const hhlRadio = defineAsyncComponent(() => import("./components/forms/hhl-radio.vue"));
const hhlSwitch = defineAsyncComponent(() => import("./components/forms/hhl-switch.vue"));
const hhlCheckbox = defineAsyncComponent(() => import("./components/forms/hhl-checkbox.vue"));
const hhlInput = defineAsyncComponent(() => import("./components/forms/hhl-input.vue"));

const hhlTextarea = defineAsyncComponent(() => import("./components/forms/hhl-textarea.vue"));
const hhlSelect = defineAsyncComponent(() => import("./components/forms/hhl-select.vue"));
const hhlLayout = defineAsyncComponent(() => import("./components/layout/hhl-layout.vue"));
const iconList = defineAsyncComponent(() => import("./mdHelp/components/icon-list.vue"));
const hhlDtPicker = defineAsyncComponent(() => import("./components/date/hhl-dt-picker.vue"));

app.component("hhl-icon", hhlIcon);
app.component("hhl-btn", hhlBtn);
app.component("hhl-pop", hhlPop);
app.component("hhl-radio", hhlRadio);
app.component("hhl-switch", hhlSwitch);
app.component("hhl-checkbox", hhlCheckbox);
app.component("hhl-input", hhlInput);
app.component("hhl-textarea", hhlTextarea);
app.component("hhl-select", hhlSelect);
app.component("hhl-layout", hhlLayout);
app.component("icon-list", iconList);
app.component("hhl-dt-picker", hhlDtPicker);

router.isReady().then(() => app.mount("#app"));
