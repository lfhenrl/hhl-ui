<template>
  <div class="headCell" :style="{ minWidth: col.Width.value, maxWidth: col.Width.value }">
    <div class="headCell-text">{{ col.Title }}</div>
    <div class="headCell-resizer" @mousedown="resize" />
  </div>
</template>

<script setup lang="ts">
import { ColResize } from "./ColResize";
const P = defineProps({
  col: { type: Object, default: {} },
});
const E = defineEmits([]);

function resize(e: MouseEvent) {
  ColResize(P.col, e);
}
</script>

<style>
@layer hhl-components {
  .headCell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-height: var(--gantt-head-height);
    min-height: var(--gantt-head-height);
    border-right: 1px solid var(--col-bg-4);
  }

  .headCell-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 3px;
  }

  .headCell-resizer {
    max-height: var(--gantt-head-height);
    min-height: var(--gantt-head-height);
    width: 4px;
    cursor: col-resize;
  }
}
</style>
