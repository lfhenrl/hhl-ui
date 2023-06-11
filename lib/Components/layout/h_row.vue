<template>
  <div class="h_row"><slot /></div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

const P = defineProps({
  align: {
    type: String as PropType<"stretch" | "start" | "end" | "center" | "baseline">,
    default: "stretch"
  },
  justify: {
    type: String as PropType<"stretch" | "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">,
    default: "start"
  },
  gap: {
    type: String,
    default: "20px"
  },
  padding: {
    type: String,
    default: "20px"
  },
  noWrap: { type: Boolean, default: false }
});

const wrap = computed(() => {
  return P.noWrap === true ? "nowrap" : "wrap";
});
</script>

<style>
.h_row {
  display: flex;
  flex-direction: row;
  align-items: v-bind(align);
  justify-content: v-bind(justify);
  padding: v-bind(padding);
  gap: v-bind(gap);
  flex-wrap: v-bind(wrap);
}
</style>
