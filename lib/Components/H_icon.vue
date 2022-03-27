<template>
  <svg viewBox="0 0 24 24" class="H_icon" :style="style" >
    <path v-for="(val, index) in getPath()" :key="index" :d="val" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import icons from "../utils/icons.json";
const props = defineProps({
  icon: {
    type: String,
    default: "close"
  },
  size: String
});

const getPath = () => (icons as any)[props.icon] as Array<any>;
const getIconList = () => icons;

const style: object = computed(() => {
  return {
    "--H_icon-size": props.size || null
  };
});

defineExpose({ getIconList });
</script>

<style>
:root {
  --H_icon-size: 24px;
}

.H_icon {
  fill: currentColor;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  width: var(--H_icon-size);
  height: var(--H_icon-size);
}
.H_icon[btn] {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.H_icon[btn]:hover {
  transform: scale(1.25);
}
.H_icon[btn]:active {
  transform: scale(1.4);
}
</style>
