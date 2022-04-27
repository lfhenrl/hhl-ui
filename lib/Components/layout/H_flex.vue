<template>
  <div class="H_flex" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import "./self_just_align.css";

const props = defineProps({
  flx_align: {
    type: String as PropType<"stretch" | "start" | "end" | "center">,
    default: "center"
  },
  flx_justify: {
    type: String as PropType<"start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">,
    default: "start"
  },
  flx_direction: {
    type: String as PropType<"column" | "row" | "column-reverse" | "row-reverse">,
    default: "row"
  },
  flx_wrap: {
    type: String as PropType<"wrap" | "nowrap">,
    default: "wrap"
  },
  flx_flex: {
    type: String,
    default: "1"
  },
  flx_gap: {
    type: String,
    default: "10px"
  },
  flx_padding: {
    type: String,
    default: "0"
  }
});

const style = computed(() => {
  return {
    alignItems: props.flx_align,
    justifyContent: props.flx_justify,
    flexDirection: props.flx_direction,
    flexWrap: props.flx_wrap,
    flex: props.flx_flex,
    gap: props.flx_gap,
    padding: props.flx_padding
  };
});
</script>

<style>
.H_flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
