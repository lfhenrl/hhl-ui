<template>
  <div class="flex">
    <nav class="absolute flex flex-col flex-1 h-full overflow-auto  min-w-[160px] max-w-[160px] border-r border-r-bg4 -translate-x-40 duration-500 bg-bg1 z-10" :class="{ 'translate-x-0': showMenu }">
      <div class="flex flex-col bg-bg1 p-2">
        <router-link
          v-for="route in mainRoutes"
          :key="route.id"
          :to="route.path"
          :class="{ 'text-ok': activeRoute === route.id }"
          >{{ route.name }}</router-link
        >
      </div>
      <div class="flex flex-col bg-bg1 p-2">
        <router-link active-class="text-ok" v-for="link in routeLinks" :key="link.name" :to="link.path">{{
          link.name
        }}</router-link>
      </div>
    </nav>
    <nav class="flex flex-col flex-1 h-full overflow-auto min-w-[160px] max-w-[160px] p-2 text-base border-r border-r-bg4 bg-bg1" v-if="!small">
      <router-link active-class="text-ok" v-for="link in routeLinks" :key="link.name" :to="link.path">{{
        link.name
      }}</router-link>
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

export type iMenuLeft = InstanceType<typeof MenuLeft>;
export default MenuLeft;
</script>

