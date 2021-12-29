<template>
  <nav class="nav-bar col-bg-1 flx-row flx-align-center pr-20 border-b borderColor-bg-4">
    <hhl-icon btn icon="menu" color="black" @click.stop="$emit('update:modelValue', !modelValue)" v-if="small" />
    <router-link to="/" class="flx-row flx-align-center">
      <img src="/icon.svg" height="30" width="30" alt="Logo" class="ml-10" href="#" />
      <div class="nav-bar-title ml-8">HHL-UI</div>
    </router-link>

    <div class="flx-1"></div>
    <div v-if="!small" class="flx-row flx-align-center gap-8">
      <router-link
        v-for="route in mainRoutes"
        :key="route.id"
        class="cursor-pointer borderColor-ok"
        :to="route.path"
        :class="{ 'border-b-4': activeRoute === route.id }"
        >{{ route.name }}</router-link
      >
      <hhl-pop>
        <template v-slot:reference>
          <div class="flx-row flx-align-center cursor-pointer">External <hhl-icon icon="expand_down" /></div>
        </template>
        <div class="flx-col col-bg-0 p-12 shadow-2 gap-1">
          <a href="https://v3.vuejs.org/guide/introduction.html" target="blank">Vue 3 Docs</a>
          <a href="https://vitejs.dev/" target="blank">Vite</a>
          <a href="https://materialdesignicons.com/" target="blank">Icons</a>
        </div>
      </hhl-pop>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const NavBar = defineComponent({
  name: "nav-bar",
  props: {
    activeRoute: { type: String, default: "" },
    mainRoutes: { type: Array as PropType<any[]>, default: [] },
    modelValue: { type: Boolean, default: false },
    medium: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  },
  setup() {
    return {};
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "nav-bar": typeof NavBar;
  }
}
export type iNavBar = InstanceType<typeof NavBar>;
export default NavBar;
</script>

<style>
.nav-bar {
  overflow: auto;
}
.nav-bar-title {
  font-weight: bold;
  font-size: 18px;
}
</style>
