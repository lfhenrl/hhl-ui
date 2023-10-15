<template>
  <svg
    viewBox="0 0 24 24"
    class="h_icon h-[var(--icon-size)] w-[var(--icon-size)] fill-current transition-transform duration-300 [&[btn]]:cursor-pointer hover:[&[btn]]:scale-125 active:[&[btn]]:scale-150"
    :style="style"
    v-html="getPath()"
  ></svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import icons from "../utils/h_icons.json";
const P = defineProps({
  icon: {
    type: String,
    default: "close",
  },
  size: { type: String, default: "24px" },
});

const getPath = () => (icons as any)[P.icon] as Array<any>;
const getIconList = () => icons;

const style = computed(() => {
  return {
    "--icon-size": P.size,
  };
});

defineExpose({ getIconList });
</script>
