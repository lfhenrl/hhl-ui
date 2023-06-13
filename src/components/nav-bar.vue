<template>
  <nav class="nav-bar">
    <H_icon btn icon="menu" @click.stop="$emit('update:modelValue', !modelValue)" v-if="small" />
    <router-link to="/" class="goHome">
      <img src="/icon.svg" height="30" width="32" alt="Logo" href="#" />
      <div class="nav-bar-title">HHL-UI</div>
    </router-link>

    <H_spacer />
    <div v-if="!small" class="mainMenu">
      <router-link
        v-for="route in mainRoutes"
        :key="route.id"
        class="mainMenu_item"
        :to="route.path"
        :class="{ mainMenu_itemActive: activeRoute === route.id }"
        >{{ route.name }}</router-link
      >
      <H_pop>
        <template v-slot:referance>
          <div class="menuExternals">External <H_icon icon="expand_down" /></div>
        </template>
        <div class="menuExternals_list">
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

<style>
.nav-bar {
  display: flex;
  align-items: center;
  padding: 0 10px 0 5px;
  overflow: hidden;
  background-color: var(--col-bg-3);
}

.goHome {
  display: flex;
  align-items: center;
}

.goHome img {
  margin: 0 10px;
}
.nav-bar-title {
  font-weight: bold;
  font-size: 18px;
  margin-left: 2px;
}

.mainMenu {
  display: flex;
  align-items: center;
  gap: 18px;
}

.mainMenu_item {
  cursor: pointer;
  border-bottom-style: solid;
  border-bottom-color: var(--col-ok);
  border-bottom-width: 0;
}

.mainMenu_itemActive {
  border-bottom-width: 4px;
}

.menuExternals {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menuExternals_list {
  display: flex;
  flex-direction: column;
  background-color: var(--col-bg-0);
  gap: 9px;
  padding: 14px;
  box-shadow: var(--shadow-2);
}
</style>
