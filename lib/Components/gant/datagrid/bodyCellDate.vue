<template>
  <div class="bodyCell" :style="{ minWidth: col.Width.value, maxWidth: col.Width.value }">
    <div class="bodyCell-text">{{ formatDate(row[col.Field]) }}</div>
  </div>
</template>

<script setup lang="ts">
import { D_01_dec_2021_HHMM } from "../../../utils/dateFormat";

defineProps({
  row: { type: Object, default: {} },
  col: { type: Object, default: {} },
});

function formatDate(d: Date) {
  return D_01_dec_2021_HHMM(d);
}
</script>

<style>
.bodyCell {
  overflow: auto;
}
</style>
