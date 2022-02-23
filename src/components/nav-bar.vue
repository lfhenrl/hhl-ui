<template>
  <nav class="nav-bar col-bg-1 flex items-center pr-5 border-b-bg3 border border-solid">
    <H_icon btn icon="menu" color="black" @click.stop="$emit('update:modelValue', !modelValue)" v-if="small" />
    <router-link to="/" class="flex items-center">
      <img src="/icon.svg" height="30" width="30" alt="Logo" class="ml-2" href="#" />
      <div class="nav-bar-title ml-2">HHL-UI</div>
    </router-link>

    <div class="flex-1"></div>
    <div v-if="!small" class="flex items-center gap-8">
      <router-link
        v-for="route in mainRoutes"
        :key="route.id"
        class="cursor-pointer border-b-ok"
        :to="route.path"
        :class="{ 'border-b-4': activeRoute === route.id }"
        >{{ route.name }}</router-link
      >
      <H_pop>
        <template v-slot:referance>
          <div class="flex items-center cursor-pointer">External <H_icon icon="expand_down" /></div>
        </template>
        <div class="flex flex-col col-bg-0 p-3 shadow-2 gap-1">
          <a href="https://v3.vuejs.org/guide/introduction.html" target="blank">Vue 3 Docs</a>
          <a href="https://vitejs.dev/" target="blank">Vite</a>
          <a href="https://materialdesignicons.com/" target="blank">Icons</a>
        </div>
      </H_pop>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import H_pop from "../../lib/Components/popup/H_pop.vue";

const NavBar = defineComponent({
  components: { H_pop },
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
