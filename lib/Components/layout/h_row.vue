<template>
  <div class="h_row"><slot /></div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  align: {
    type: String as PropType<"stretch" | "start" | "end" | "center" | "baseline">,
    default: "stretch",
  },
  justify: {
    type: String as PropType<
      "stretch" | "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly"
    >,
    default: "start",
  },
  gap: {
    type: String,
    default: "20px",
  },
});
</script>

<style>
.h_row {
  display: flex;
  flex-direction: row;
  align-items: v-bind(align);
  justify-content: v-bind(justify);
  gap: v-bind(gap);
}
</style>
