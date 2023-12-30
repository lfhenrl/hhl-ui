<template>
  <div class="H_headerRow" ref="H_headerRowRef">
    <template v-for="(col, index) in Columns.columns">
      <H_HeadCell v-if="col.visibel.value" :index="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { iColumns } from "../provide/Columns";
import H_HeadCell from "./H_HeadCell.vue";

const H_headerRowRef = ref();

const Columns = inject("Columns") as iColumns;
</script>
<style>
@layer hhl-components {
  .H_headerRow {
    display: flex;
    flex: 1 1 0%;
    background-color: var(--col-bg-2);
  }
}
</style>
