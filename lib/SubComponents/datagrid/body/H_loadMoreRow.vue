<template>
  <div :data-row="JSON.stringify(row)" class="flex items-center pl-10">Loding...</div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { type iDgrid } from "../provide/Dgrid";

const P = defineProps({
  row: { type: Object, default: {} },
});

const DG = inject("DG") as iDgrid;

onMounted(() => {
  DG.dataHandler?.moreRows(P.row);
});
</script>
