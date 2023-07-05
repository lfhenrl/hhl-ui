<template>
  <div class="H_headerRow">
    <template v-for="(col, index) in Columns.columns">
      <H_HeadCell v-if="col.visibel.value" :class="[col.className]" :index="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
// import { iColumns } from "../provide/Columns.ts";
import { iColumns } from "../provide/Columns";
import H_HeadCell from "./H_HeadCell.vue";

const Columns = inject("Columns") as iColumns;
</script>

<style>
.H_headerRow {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--col-bg-2);
}

.H_headerRow::-webkit-scrollbar {
  opacity: 0;
}
</style>
