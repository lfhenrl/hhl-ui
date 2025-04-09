<template>
  <div class="H_themeSelector" @click="click" title="Change Theme: Light ot Dark">
    <H_icon name="night" size="28px" btn v-if="dark" style="color: aqua" />
    <H_icon name="day" size="28px" btn v-else style="color: rgb(255, 119, 0)" />
  </div>
</template>

<script setup lang="ts">
import { themeSelector } from "../utils/themeSelector";
import H_icon from "./H_icon.vue";
import { onMounted } from "vue";
const E = defineEmits(["changed"]);
const dark = themeSelector().darkTheme;

function click() {
  dark.value = !dark.value;
  E("changed", dark.value);
}
onMounted(() => {
  E("changed", dark.value);
});
</script>
<style>
@layer components {
  .H_themeSelector {
    display: flex;
    align-items: center;
  }
}
</style>
