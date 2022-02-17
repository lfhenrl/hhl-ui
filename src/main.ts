import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "voie-pages";
// import routes from "./routes"
import "./style/main.css";
import "./style/index.css";
import "./mdHelp/style/index.css";
import "hhl-ui-next/style.css";

const history = createWebHashHistory();
const router = createRouter({ history, routes });

const app = createApp(App).use(router);

import { validator } from "./components/utils/validator";
import * as dateFormat from "./components/utils/dateFormat";
window["fakeImport"] = { validator, dateFormat };

const H_icon = defineAsyncComponent(() => import("hhl-ui-next/Components/H_icon.vue"));
const H_btn = defineAsyncComponent(() => import("hhl-ui-next/Components/H_btn.vue"));
const hhlPop = defineAsyncComponent(() => import("./components/popUp/pop/hhl-pop.vue"));
const hhlRadio = defineAsyncComponent(() => import("./components/forms/hhl-radio.vue"));
const hhlSwitch = defineAsyncComponent(() => import("./components/forms/hhl-switch.vue"));
const H_checkbox = defineAsyncComponent(() => import("hhl-ui-next/Components/H_checkbox.vue"));
const H_input = defineAsyncComponent(() => import("hhl-ui-next/Components/H_input.vue"));
const hhlTextarea = defineAsyncComponent(() => import("./components/forms/hhl-textarea.vue"));
const H_select = defineAsyncComponent(() => import("hhl-ui-next/Components/H_select.vue"));
const hhlLayout = defineAsyncComponent(() => import("./components/layout/hhl-layout.vue"));
const iconList = defineAsyncComponent(() => import("./mdHelp/components/icon-list.vue"));
const hhlDtPicker = defineAsyncComponent(() => import("./components/date/hhl-dt-picker.vue"));
const hhlModal = defineAsyncComponent(() => import("./components/popUp/hhl-modal.vue"));
const hhlDialog = defineAsyncComponent(() => import("./components/popUp/hhl-dialog.vue"));

const hhlDialogService = defineAsyncComponent(() => import("./components/dialogService/hhl-dialog-service.vue"));

const H_tabs = defineAsyncComponent(() => import("hhl-ui-next/Components/navigation/H_tabs.vue"));
const H_tab = defineAsyncComponent(() => import("hhl-ui-next/Components/navigation/H_tab.vue"));

app.component("H_icon", H_icon);
app.component("H_btn", H_btn);
app.component("hhl-pop", hhlPop);
app.component("hhl-radio", hhlRadio);
app.component("hhl-switch", hhlSwitch);
app.component("H_checkbox", H_checkbox);
app.component("H_input", H_input);
app.component("hhl-textarea", hhlTextarea);
app.component("H_select", H_select);
app.component("hhl-layout", hhlLayout);
app.component("icon-list", iconList);
app.component("hhl-dt-picker", hhlDtPicker);
app.component("hhl-modal", hhlModal);
app.component("hhl-dialog", hhlDialog);
app.component("hhl-dialog-service", hhlDialogService);
app.component("H_tab", H_tab);
app.component("H_tabs", H_tabs);

router.isReady().then(() => app.mount("#app"));
