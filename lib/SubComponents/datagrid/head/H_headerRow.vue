<template>
  <div class="H_headerRow">
    <template v-for="(col, index) in DG.columns">
      <H_HeadCell v-if="col.visibel.value" :index="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import H_HeadCell from "./H_HeadCell.vue";
import { iDgrid } from "../provide/Dgrid";

const DG = inject("DG") as iDgrid;
</script>
<style>
@layer hhl-components {
  .H_headerRow {
    display: flex;
    flex: 1 1 100%;
    background-color: var(--col-bg-2);
    border-top-left-radius: 4px;
  }
}
</style>
