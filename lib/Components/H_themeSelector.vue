<template>
  <div class="H_themeSelector flex items-center" @click="click" title="Change Theme: Light ot Dark">
    <div class="ico-night iconBtn text-xl" icon="night" v-if="dark" style="color: aqua" />
    <div class="ico-day iconBtn text-xl" v-else="dark" size="30px" style="color: rgb(255, 119, 0)" />
  </div>
</template>

<script setup lang="ts">
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
