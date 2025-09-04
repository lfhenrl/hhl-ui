<template>
  <div h-display="flex" h-margin-top="0.25rem" h-shadow="md">
    <nav
      class="menu-left-flyOut"
      h-display="flex"
      h-flex-direction="column"
      h-flex="1 1 0%"
      h-height="100%"
      h-min-width="160px"
      h-max-width="160px"
      h-overflow="auto"
      h-bgcolor="var(--bgcol-1)"
      h-padding="8px"
      h-font-size="14px"
      :class="{ open: showMenu }"
    >
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
    <nav
      v-if="!small"
      h-display="flex"
      h-flex-direction="column"
      h-flex="1 1 0%"
      h-height="100%"
      h-min-width="160px"
      h-max-width="160px"
      h-overflow="auto"
      h-bgcolor="var(--bgcol-1)"
      h-padding="8px"
      h-font-size="14px"
    >
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
  color: var(--col-ok);
  font-weight: bold;
}
</style>
