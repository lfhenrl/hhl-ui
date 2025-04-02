<template>
  <div class="bodyCell-drag">
    <H_iconDrag color="txt6" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  row: { type: Object, default: {} },
  col: { type: Object, default: {} },
});
</script>

<style>
@layer components {
  .bodyCell-drag {
    pointer-events: all;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-right: 1px solid var(--color-bg4);
    min-height: var(--gantt-row-height);
    max-height: var(--gantt-row-height);
    width: 30px;
    padding: 3px;
  }
}
</style>
