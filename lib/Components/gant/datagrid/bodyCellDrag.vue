<template>
  <div class="bodyCell-drag">
    <H_icon icon="drag" size="20px" btn="standard" style="color: var(--col-txt-6)" />
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../H_icon.vue";

defineProps({
  row: { type: Object, default: {} },
  col: { type: Object, default: {} },
});
</script>

<style>
.bodyCell-drag {
  pointer-events: all;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-right: 1px solid var(--col-bg-4);
  min-height: var(--gantt-row-height);
  max-height: var(--gantt-row-height);
  width: 30px;
  padding: 3px;
}
</style>
