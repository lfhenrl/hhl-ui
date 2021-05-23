
import Home from "./pages/sandbox/form_components.vue"

export default [
  { path: "/", component: Home, name: "Home" },
  { path: "/page2", component: () => import("./pages/page2.md") },
  { path: "/page3", component: () => import("./pages/sandbox/datagrid.vue") },
  {
    path: "/introduction",
    component: () => import("./pages/introduction/index.vue"),
    children: [
      { path: "/autoImport", component: () => import("./pages/introduction/autoImport.md"), name: "Auto import components" }
    ]
  },
  {
    path: "/sandbox",
    component: () => import("./pages/sandbox/index.md"),
    children: [
      { path: "", component: () => import("./pages/sandbox/index.md"), name: "Home" },
      { path: "page1", component: () => import("./pages/sandbox/chart_ gantt.vue"), name: "Page 1" },
      { path: "page3", name: "Page 3" }
    ]
  }
];
