<template>
  <div class="menu-left">
    <nav class="menu-left-flyOut" :class="{ open: showMenu }">
      <div class="menu-left-links">
        <router-link
          v-for="route in mainRoutes"
          :key="route.id"
          :to="route.path"
          :class="{ 'menu-left-links-selected': activeRoute === route.id }"
          >{{ route.name }}</router-link
        >
      </div>
      <div class="menu-left-links">
        <router-link
          active-class="menu-left-links-selected"
          v-for="link in routeLinks"
          :key="link.name"
          :to="link.path"
          >{{ link.name }}</router-link
        >
      </div>
    </nav>
    <nav v-if="!small">
      <router-link
        active-class="menu-left-links-selected"
        v-for="link in routeLinks"
        :key="link.name"
        :to="link.path"
        >{{ link.name }}</router-link
      >
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

const MenuLeft = defineComponent({
  name: "menu-left",
  props: {
    routeLinks: { type: Array as PropType<any[]>, default: [] },
    mainRoutes: { type: Array as PropType<any[]>, default: [] },
    activeRoute: { type: String, default: "" },
    showMenu: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
  },
  setup() {
    return {};
  },
});

export type iMenuLeft = InstanceType<typeof MenuLeft>;
export default MenuLeft;
</script>
<style>
.menu-left {
  display: flex;
}
.menu-left nav {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  height: 100%;
  min-width: 160px;
  max-width: 160px;
  overflow: auto;
  border-right: 1px solid var(--color-bg4);
  background-color: var(--color-bg1);
  padding: 8px;
  font-size: 14px;
}
.menu-left-flyOut {
  position: absolute;
  z-index: 10;
  transform: translate(-160px);
  transition-duration: 500ms;
}
.menu-left-flyOut.open {
  transform: translate(0px);
}
.menu-left-links {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.menu-left-links-selected {
  color: var(--color-ok);
  font-weight: bold;
}
</style>
