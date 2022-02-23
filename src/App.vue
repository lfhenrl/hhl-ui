<template>
  <main class="gridBox gridBox_autoName h-screen w-screen overflow-hidden" @click="showMenu = false">
    <nav-bar :main-routes="mainRoutes" :active-route="activeMainPath" v-model="showMenu" :medium="medium" :small="small" />
    <menu-left
      :route-links="activeRouteLinks"
      :main-routes="mainRoutes"
      :active-route="activeMainPath"
      :show-menu="showMenu"
      :small="small"
    />

    <div id="page-container" ref="page" class="overflow-auto h-100pr ml-5">
      <router-view v-slot="{ Component, params }" class="flex flex-col p-5">
        <component :is="Component" v-bind="params" />
      </router-view>
    </div>
    <menu-right :view="page" v-show="!medium" />
  </main>
  <H_dialog-service />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { makeRouteList, getRouteData } from "./components/routeData";

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
      small
    };
  }
});
</script>
<style>
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  height: 100vh;
  scroll-behavior: smooth;
}

body {
  font-family: inherit;
  line-height: inherit;
  font-family: "Roboto", sans-serif;
  fill: var(--col-txt);
  background-color: var(--col-body);
  color: var(--col-txt-1);
  overflow: hidden;
  margin: 0;
  padding: 0;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  height: 100vh;
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
  scroll-behavior: smooth;
  padding-bottom: 400px;
}

main.gridBox {
  --grid-area: "c1 c1 c1" "c2 c3 c4";
  --grid-row: 44px 1fr;
  --grid-col: auto 1fr auto;
  gap: 0;
}
</style>
