<template>
  <div class="flex max-h-[1px] opacity-0">
    <div
      v-for="col in DG.getVisibelColumns()"
      class="inline-block max-h-[1px] overflow-hidden border-r border-bg3"
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
