<template>
  <div class="menu-left">
    <nav class="menu-left_small col-bg-1" :class="{ show: showMenu }">
      <div class="menu-left_small_list">
        <router-link
          v-for="route in mainRoutes"
          :key="route.id"
          :to="route.path"
          :class="{ 'col-txt-ok': activeRoute === route.id }"
          >{{ route.name }}</router-link
        >
      </div>
      <div class="menu-left_small_list col-bg-1">
        <router-link active-class="col-txt-ok" v-for="link in routeLinks" :key="link.name" :to="link.path">{{
          link.name
        }}</router-link>
      </div>
    </nav>
    <nav class="menu-left_normal col-bg-1" v-if="!small">
      <router-link active-class="col-txt-ok" v-for="link in routeLinks" :key="link.name" :to="link.path">{{
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

<style>
.menu-left {
  display: flex;
}
.menu-left_normal {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  min-width: 160px;
  max-width: 160px;
  line-height: 1.4;
  padding: 5px;
  border-right: solid var(--col-bg-4) 1px;
}

.menu-left_small {
  position: absolute;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  z-index: 999;
  overflow: auto;
  font-size: 14px;
  min-width: 200px;
  max-width: 200px;
  transform: translateX(-200px);
  transition-duration: 500ms;
  border-right: solid var(--col-bg-4) 2px;
}

.menu-left_small_list {
  display: flex;
  flex-direction: column;
  padding: 10px 7px;
}

.menu-left_small.show {
  transform: translateX(0px);
}
</style>
