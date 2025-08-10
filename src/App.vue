<template>
  <div class="main-container" @click="showMenu = false">
    <nav-bar
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

    <div id="page-container" ref="page">
      <router-view class="page-container_routerView"> </router-view>
    </div>
    <menu-right :view="page" v-show="!medium" />
  </div>
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
    };
  },
});
</script>
<style>
.main-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 44px 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-bg0);
  color: var(--color-txt1);
}

.main-container .nav-bar {
  grid-column: span 3 / span 3;
}

#page-container {
  height: calc(100% - 5px);
  overflow: auto;
  margin-top: 4px;
  scroll-behavior: smooth;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 60px;
}

.page-container_routerView {
  display: flex;
  flex-direction: column;
  padding: 4px;
}

@supports not ((anchor-name: --myanchor) or (x: attr(x type(length)))) {
  #app {
    display: none;
  }

  #browserNotSupported {
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    width: fit-content;
    font-size: 22px;
  }
}
</style>
