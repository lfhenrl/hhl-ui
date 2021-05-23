<template>
  <div class="menu-left flx-row">
    <nav class="menu-left_small col-bg-1 flx-col gap-1 border-r borderColor-bg-4 h-100pr" :class="{ show: showMenu }">
      <div class="border-b col-bg-1 borderColor-bg-4 px-8 py-10 flx-col gap-1">
        <router-link
          v-for="route in mainRoutes"
          :key="route.id"
          class="cursor-pointer borderColor-ok"
          :to="route.path"
          :class="{ 'col-txt-ok': activeRoute === route.id }"
          >{{ route.name }}</router-link
        >
      </div>
      <div class="border-b col-bg-1 borderColor-bg-4 px-8 py-10 flx-col gap-1">
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
    <nav class="menu-left_normal col-bg-1 flx-col gap-1 px-8 py-10 py-10 border-r borderColor-bg-4 h-100pr" v-if="!small">
      <router-link
        class="cursor-pointer borderColor-ok"
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
  font-size: 14px;
  min-width: 160px;
  max-width: 160px;
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
