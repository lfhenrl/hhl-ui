<template>
  <div class="H_headerRow h_flex" ref="dom">
    <template v-for="(col, index) in DG.columns">
      <H_HeadCell v-if="col.visibel.value" :index="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import H_HeadCell from "./H_HeadCell.vue";
import { type iDgrid } from "../provide/Dgrid";

const dom = ref();

const DG = inject("DG") as iDgrid;

onMounted(() => {
  DG.headDom = dom.value;
});
</script>
