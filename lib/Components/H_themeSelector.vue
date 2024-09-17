<template>
  <div class="H_themeSelector" @click="click" title="Change Theme: Light ot Dark">
    <H_icon icon="night" btn="standard" v-if="dark" size="30px" style="color: aqua" />
    <H_icon icon="day" btn="standard" v-else="dark" size="30px" style="color: rgb(255, 119, 0)" />
  </div>
</template>

<script setup lang="ts">
import H_icon from "./H_icon.vue";
import { themeSelector } from "../utils/themeSelector";
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
.H_themeSelector {
  display: flex;
  align-items: center;
}
</style>
