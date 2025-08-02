<template>
  <div class="H_spaceRow h_flex h_w-min">
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

<script setup lang="ts">
import { inject } from "vue";
import { type iDgrid } from "../provide/Dgrid";

const DG = inject("DG") as iDgrid;
</script>
