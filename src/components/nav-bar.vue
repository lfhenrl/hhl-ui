<template>
  <nav class="nav-bar">
    <H_iconMenu size="1.8rem" btn @click.stop="$emit('update:modelValue', !modelValue)" v-if="small" />
    <router-link to="/" class="nav-bar-home">
      <img src="/icon.svg" height="30" width="32" alt="Logo" href="#" />
      <div>HHL-UI</div>
    </router-link>

    <div class="nav-bar-spacer" />
    <div v-if="!small" class="nav-bar-items">
      <router-link
        v-for="route in mainRoutes"
        :key="route.id"
        class="nav-bar-items-item"
        :to="route.path"
        :class="{ activ: activeRoute === route.id }"
        >{{ route.name }}</router-link
      >
      <H_popover class="popUp-external">
        <template v-slot:referance>
          <div style="display: flex; align-items: center">
            <span class="text-pri"> External</span>
            <H_iconExpand_down size="1.4rem" btn />
          </div>
        </template>
        <div class="popUp-external-body">
          <a href="https://v3.vuejs.org/guide/introduction.html" target="blank">Vue 3 Docs</a>
          <a href="https://vitejs.dev/" target="blank">Vite</a>
          <a href="https://materialdesignicons.com/" target="blank">Icons</a>
        </div>
      </H_popover>
    </div>
    <H_themeSelector style="margin-left: 17px" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import H_popover from "../../lib/Components/H_popover.vue";
import H_themeSelector from "../../lib/Components/H_themeSelector.vue";

export default defineComponent({
  components: { H_popover },
  name: "nav-bar",
  props: {
    activeRoute: { type: String, default: "" },
    mainRoutes: { type: Array as PropType<any[]>, default: [] },
    modelValue: { type: Boolean, default: false },
    medium: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
  },
  setup() {
    return { H_themeSelector };
  },
});
</script>
<style>
.nav-bar {
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--color-bg3);
  padding-left: 8px;
  padding-right: 12px;
}
.nav-bar-spacer {
  flex: 1 1 0%;
}
.nav-bar-home {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: bold;
}
.nav-bar-items {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-bar-items-item {
  cursor: pointer;
  border-bottom-style: solid;
  border-bottom-width: 0;
  border-bottom-color: var(--color-ok);
}
.nav-bar-items-item.activ {
  border-bottom-width: 4px;
}

.popUp-external .H_pop-referance {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.popUp-external .popUp-external-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  background-color: var(--color-bg0);
}
</style>
