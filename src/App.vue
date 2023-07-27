<template>
  <H_grid
    v-if="!loadTheme"
    class="MainGridBox"
    @click="showMenu = false"
    grid_area="c1 c1 c1 ,c2 c3 c4"
    grid_col="auto 1fr auto"
    grid_row="44px 1fr"
    grid_gap="0"
  >
    <nav-bar :main-routes="mainRoutes" :active-route="activeMainPath" v-model="showMenu" :medium="medium" :small="small" />
    <menu-left
      :route-links="activeRouteLinks"
      :main-routes="mainRoutes"
      :active-route="activeMainPath"
      :show-menu="showMenu"
      :small="small"
    />

    <div id="page-container" ref="page">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <menu-right :view="page" v-show="!medium" />
  </H_grid>
  <H_dialog-service />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { makeRouteList, getRouteData } from "./components/routeData";
import { themeSelector } from "../lib/utils/themeSelector";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    let routeLinks: any = {};
    const activeMainPath = ref("");
    const activeRouteLinks = ref();
    const showMenu = ref(false);
    const medium = ref(false);
    const small = ref(false);
    const page = ref({});
    const mainRoutes = ref();
    const loadTheme = themeSelector().loadTheme;

    function routeChanged() {
      const val = router.currentRoute.value.name as string;
      const val1 = val.split("-")[0];
      if (val1 !== activeMainPath.value) {
        activeMainPath.value = val1;
        activeRouteLinks.value = routeLinks[val1].children;
      }
    }

    function onResize() {
      showMenu.value = false;
      const width = document.body.offsetWidth;
      if (width < 1200) {
        medium.value = true;
      } else {
        medium.value = false;
      }
      if (width < 800) {
        small.value = true;
      } else {
        small.value = false;
      }
    }
    watch(
      () => router.currentRoute.value.name,
      async () => {
        routeChanged();
      }
    );

    onMounted(() => {
      window.addEventListener("resize", onResize);
      makeRouteList(router);
      const routeData = getRouteData();
      routeLinks = routeData.routeLinks;
      mainRoutes.value = routeData.mainRoutes;
      routeChanged();
      onResize();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      page,
      activeRouteLinks,
      activeMainPath,
      mainRoutes,
      showMenu,
      medium,
      small,
      loadTheme
    };
  }
});
</script>
<style>
html {
  line-height: 1.15;
  height: 100vh;
  width: 100vw;
  scroll-behavior: smooth;
  background-color: var(--col-bg-0);
}

body {
  line-height: inherit;
  font-family: "Roboto", sans-serif;
  fill: var(--col-txt);
  background-color: var(--col-bg-0);
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: inherit;
}

pre {
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
}

#page-container {
  overflow: auto;
  scroll-behavior: smooth;
  padding-bottom: 200px;
  height: 100%;
  padding: 0 15px;
}

.MainGridBox {
  overflow: hidden;
  background-color: var(--col-bg-0);
  width: 100vw;
  height: 100vh;
}

.page-container__routerView {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
