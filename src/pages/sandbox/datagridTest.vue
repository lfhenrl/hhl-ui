<template>
  <div class="datagridTest">
    <H_datagridGantt ref="dgrid" @loaded="gridLoaded" class="gantt_datagrid">
      <H_column field="type" title="Type" type="string" :width="100" :visibel="false" />
      <H_column field="text" title="Title" type="action" />
      <H_column field="id" title="Id" type="action" :width="40" />
    </H_datagridGantt>
    {{ gridDataX }}
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { iDatagrid } from "../../../lib/Components/datagrid/provide";
import gData from "../../testData/ganttData";

let dg: iDatagrid;
let gridData: any;
const gridDataX = ref([]);

function gridLoaded(grid: any) {
  dg = grid.dg;
  gridData = grid.gridData;

  watch(gridData, () => {
    gridDataX.value = gridData.value;
  });

  gridData.value = gData;
}
</script>

<style>
.datagridTest {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  height: 80vh;
}
</style>
