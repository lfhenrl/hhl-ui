<template>
  <div class="H_spaceRow">
    <div
      v-for="col in DG.getVisibelColumns()"
      class="H_spaceRow-Cell"
      :style="[
        {
          minWidth: col.width.value ?? '',
          maxWidth: col.width.value ?? '',
        },
      ]"
    >
      x
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { iDgrid } from "../provide/Dgrid";

const DG = inject("DG") as iDgrid;
</script>
<style>
.H_spaceRow {
  display: flex;
  max-height: 1px;
  opacity: 0;
}
.H_spaceRow-Cell {
  display: inline-block;
  border-right: solid 1px var(--col-bg-3);
  max-height: 1px;
  overflow: hidden;
}
</style>
