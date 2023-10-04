<template>
  <nav class="flex items-center overflow-hidden bg-bg3 pr-8 pl-2">
    <H_icon btn icon="menu" @click.stop="$emit('update:modelValue', !modelValue)" v-if="small" />
    <router-link to="/" class="flex items-center">
      <img src="/icon.svg" height="30" width="32" alt="Logo" href="#" />
      <div class="font-bold text-lg ml-1 flex">HHL-UI</div>
    </router-link>

    <H_spacer />
    <div v-if="!small" class="flex items-center gap-8">
      <router-link
        v-for="route in mainRoutes"
        :key="route.id"
        class="cursor-pointer border-b-0 border-b-ok"
        :to="route.path"
        :class="{ 'border-b-4': activeRoute === route.id }"
        >{{ route.name }}</router-link
      >
      <H_pop>
        <template v-slot:referance>
          <div class="flex items-center cursor-pointer">External <H_icon icon="expand_down" /></div>
        </template>
        <div class="flex flex-col bg-bg0 gap-4 p-3 shadow">
          <a href="https://v3.vuejs.org/guide/introduction.html" target="blank">Vue 3 Docs</a>
          <a href="https://vitejs.dev/" target="blank">Vite</a>
          <a href="https://materialdesignicons.com/" target="blank">Icons</a>
        </div>
      </H_pop>
    </div>
    <H_switch v-model="dark" label="Dark" style="max-width: 65px; margin-left: 17px; margin-right: 10px" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import H_pop from "../../lib/Components/popup/H_pop.vue";
import { themeSelector } from "../../lib/utils/themeSelector";

export default defineComponent({
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
    const dark = themeSelector().darkTheme;

    return { dark };
  }
});
</script>
