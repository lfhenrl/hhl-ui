<template>
  <main class="gridBox gridBox_autoName h-100vh w-100vw overflow-hidden" @click="showMenu = false">
    <nav-bar :main-routes="mainRoutes" :active-route="activeMainPath" v-model="showMenu" :medium="medium" :small="small" />
    <menu-left
      :route-links="activeRouteLinks"
      :main-routes="mainRoutes"
      :active-route="activeMainPath"
      :show-menu="showMenu"
      :small="small"
    />

    <div id="page-container" ref="page" class="overflow-auto h-100pr ml-25">
      <router-view v-slot="{ Component, params }" class="flx-col p-25">
        <component :is="Component" v-bind="params" />
      </router-view>
    </div>
    <menu-right :view="page" v-show="!medium" />
  </main>
  <hhl-dialog-service/>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { makeRouteList, getRouteData } from "./mdHelp/plugins/routeData";

export default {
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
};
</script>
<style>
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
