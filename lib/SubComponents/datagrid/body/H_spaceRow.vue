<template>
  <div class="H_spaceRow">
    <div
      v-for="col in DG.getVisibelColumns()"
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
<style>
.H_spaceRow {
  display: flex;
  max-width: min-content;
  max-height: 0;
  opacity: 0;
  div {
    display: inline-block;
    max-height: 0;
    overflow: hidden;
    border-right: 1px solid var(--color-bg3);
  }
}
</style>

<script setup lang="ts">
import { inject } from "vue";
import { type iDgrid } from "../provide/Dgrid";

const DG = inject("DG") as iDgrid;
</script>
