<template>
  <div class="menu-left flex">
    <nav class="menu-left_small col-bg-1 flex flex-col flex-1 border-r border-r-bg4 h-full" :class="{ show: showMenu }">
      <div class="border-r col-bg-2 border-r-bg3 p-2 flex flex-col">
        <router-link
          v-for="route in mainRoutes"
          :key="route.id"
          class="cursor-pointer borderColor-ok"
          :to="route.path"
          :class="{ 'col-txt-ok': activeRoute === route.id }"
          >{{ route.name }}</router-link
        >
      </div>
      <div class="col-bg-1 border-r-bg1 p-2 flex flex-col">
        <router-link
          class="cursor-pointer borderColor-ok"
          active-class="col-txt-ok"
          v-for="link in routeLinks"
          :key="link.name"
          :to="link.path"
          >{{ link.name }}</router-link
        >
      </div>
    </nav>
    <nav class="menu-left_normal col-bg-1 flex flex-col p-2 border-r border-r-bg3 h-100pr" v-if="!small">
      <router-link
        class="cursor-pointer border-ok"
        active-class="col-txt-ok"
        v-for="link in routeLinks"
        :key="link.name"
        :to="link.path"
        >{{ link.name }}</router-link
      >
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const MenuLeft = defineComponent({
  name: "menu-left",
  props: {
    routeLinks: { type: Array as PropType<any[]>, default: [] },
    mainRoutes: { type: Array as PropType<any[]>, default: [] },
    activeRoute: { type: String, default: "" },
    showMenu: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  },
  setup() {
    return {};
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "menu-left": typeof MenuLeft;
  }
}
export type iMenuLeft = InstanceType<typeof MenuLeft>;
export default MenuLeft;
</script>

<style>
.menu-left_normal {
  overflow: auto;
  font-size: 15px;
  min-width: 160px;
  max-width: 160px;
  line-height: 1.4;
}

.menu-left_small {
  position: absolute;
  z-index: 999;
  overflow: auto;
  font-size: 14px;
  min-width: 200px;
  max-width: 200px;
  transform: translateX(-200px);
  transition-duration: 500ms;
}

.menu-left_small.show {
  transform: translateX(0px);
}
</style>
