<template>
  <div
    v-if="!loadTheme"
    class="grid grid-cols-[auto_1fr_auto] grid-rows-[44px_1fr] w-screen h-screen overflow-hidden bg-bg0"
    @click="showMenu = false"
  >
    <nav-bar
    class="col-span-3"
      :main-routes="mainRoutes"
      :active-route="activeMainPath"
      v-model="showMenu"
      :medium="medium"
      :small="small"
    />
    <menu-left
      :route-links="activeRouteLinks"
      :main-routes="mainRoutes"
      :active-route="activeMainPath"
      :show-menu="showMenu"
      :small="small"
    />

    <div id="page-container" ref="page" class="overflow-auto scroll-smooth h-full pb-32 px-8">
      <router-view class="flex flex-col p-1">
      </router-view>
    </div>
    <menu-right :view="page" v-show="!medium" />
  </div>
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
      const val1 = val.split("/")[1];
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
      },
    );

    onMounted(() => {
      window.addEventListener("resize", onResize);
      makeRouteList(router);
      const routeData = getRouteData();
      routeLinks = routeData.routeLinks;
      mainRoutes.value = routeData.mainRoutes;
      console.log("onMounted",routeLinks)
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
      loadTheme,
    };
  },
});
</script>

