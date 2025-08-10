<template>
  <div
    class="H_themeSelector"
    h-display="flex"
    h-align-items="center"
    @click="click"
    title="Change Theme: Light ot Dark"
  >
    <H_icon name="night" size="28px" btn v-if="dark" h-color="aqua" />
    <H_icon name="day" size="28px" btn v-else h-color="#ff7700" />
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
