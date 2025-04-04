<template>
  <div class="H_themeSelector flex items-center" @click="click" title="Change Theme: Light ot Dark">
    <H_iconNight size="28px" btn v-if="dark" style="color: aqua" />
    <H_iconDay size="28px" btn v-else style="color: rgb(255, 119, 0)" />
  </div>
</template>

<script setup lang="ts">
import { themeSelector } from "../utils/themeSelector";
import H_iconDay from "./icons/H_iconDay.vue";
import H_iconNight from "./icons/H_iconNight.vue";
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
