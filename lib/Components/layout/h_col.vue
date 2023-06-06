<template>
  <div class="h_col"><slot /></div>
</template>

<script setup lang="ts">
import { PropType} from "vue";

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
    default: "30px",
  },
  padding: {
    type: String,
    default: "20px",
  }
});


</script>

<style>
.h_col {
  display: flex;
  flex-direction: column;
  align-items: v-bind(align);
  justify-content: v-bind(justify);
  padding: v-bind(padding);
  gap: v-bind(gap);
}
</style>
