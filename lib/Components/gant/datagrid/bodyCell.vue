<template>
  <body-cell-date v-if="col.Type === 'Date'" :col="col" :row="row" />
  <body-cell-duration v-else-if="col.Type === 'Duration'" :col="col" :row="row" />
  <body-cell-drag v-else-if="col.Type === 'Drag'" :col="col" :row="row" />
  <div v-else class="bodyCell" :style="{ minWidth: col.Width.value, maxWidth: col.Width.value }">
    <div class="bodyCell-text">{{ row[col.Field] }}</div>
  </div>
</template>

<script setup lang="ts">
import bodyCellDate from "./bodyCellDate.vue";
import bodyCellDuration from "./bodyCellDuration.vue";
import bodyCellDrag from "./bodyCellDrag.vue";

defineProps({
  row: { type: Object, default: {} },
  col: { type: Object, default: {} },
});
const E = defineEmits([]);
</script>

<style>
@layer hhl-components {
  .bodyCell {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-right: 1px solid var(--col-bg-4);
    min-height: var(--gantt-row-height);
    max-height: var(--gantt-row-height);
    padding: 3px;
  }
  .bodyCell-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: block-axis;
  }
}
</style>
