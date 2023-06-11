<template>
  <svg viewBox="0 0 24 24" class="h_icon" :style="style" v-html="getPath()"></svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import icons from "../utils/h_icons.json";
const P = defineProps({
  icon: {
    type: String,
    default: "close"
  },
  size: String
});

const getPath = () => (icons as any)[P.icon] as Array<any>;
const getIconList = () => icons;

const style = computed(() => {
  return {
    "--h_icon-size": P.size
  };
});

defineExpose({ getIconList });
</script>

<style>
:root {
  --h_icon-size: 24px;
}

.h_icon {
  fill: currentColor;
  width: var(--h_icon-size);
  height: var(--h_icon-size);
}
.h_icon[btn] {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.h_icon[btn]:hover {
  transform: scale(1.25);
}
.h_icon[btn]:active {
  transform: scale(1.4);
}
</style>
