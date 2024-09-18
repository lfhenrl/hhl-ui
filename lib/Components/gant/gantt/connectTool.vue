<template>
  <line ref="lineTool" x1="0" y1="0" x2="200" y2="200" class="H_chartGantt_lineTool" />
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { iGantt } from "../provide/gantt";

const GT = inject("GT") as iGantt;
const lineTool = ref();

onMounted(() => {
  GT.lineTool = lineTool.value;
});
</script>

<style>
@layer hhl-components {
  .H_chartGantt_lineTool {
    stroke: orange;
    stroke-width: 2;
    fill: none;
    pointer-events: all;
  }

  .H_chartGantt_lineTool:hover {
    stroke: red;
    pointer-events: all;
  }
}
</style>
