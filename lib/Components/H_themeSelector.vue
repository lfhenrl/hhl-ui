<template>
  <div
    class="H_themeSelector"
    @click="click"
    title="Change Theme: Light ot Dark"
  >
    <H_icon
      icon="night"
      btn="standard"
      v-if="dark"
      size="30px"
      style="color: aqua"
    />
    <H_icon
      icon="day"
      btn="standard"
      v-else="dark"
      size="30px"
      style="color: rgb(255, 119, 0)"
    />
  </div>
</template>

<script setup lang="ts">
import H_icon from "./H_icon.vue";
import { themeSelector } from "../utils/themeSelector";

const dark = themeSelector().darkTheme;

function click() {
  dark.value = !dark.value;
}
</script>
<style>
@layer hhl-components {
  .H_themeSelector {
    display: flex;
    align-items: center;
  }
}
</style>
