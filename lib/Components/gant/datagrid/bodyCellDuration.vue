<template>
  <div class="bodyCell" :style="{ minWidth: col.Width.value, maxWidth: col.Width.value }">
    <div class="bodyCell-text">
      {{ getDays(row) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateDiffHours } from "../../../utils/dateFunctions";

defineProps({
  row: { type: Object, default: {} },
  col: { type: Object, default: {} },
});

function getDays(item: any) {
  const hh = DateDiffHours(item.StartTime, item.EndTime);
  return hh;
}
</script>

<style>
@layer components {
  .bodyCell {
    overflow: auto;
  }
}
</style>
