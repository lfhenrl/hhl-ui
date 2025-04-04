<template>
  <div class="flex items-center flex-wrap gap-2 text-txt3 border border-bg6 p-2 rounded-b">
    <H_iconColumns size="1.6rem" btn title="Edit Columns" @click="editColumns" />
    <H_iconExpand_horizontal size="1.6rem" btn title="Auto adjust all columns" @click="autoAdjustColumns" />
    <H_iconExcel size="1.6rem" btn title="Download to excel" @click="excel" />
    <H_iconZoom_out_map size="1.6rem" btn title="fullScreen" @click="fullScreen" />
    <div style="flex: 1" />
    <div class="flex">
      <b>{{ DG.dataHandler?.rowsCount }}</b
      >&nbsp; Loaded of&nbsp; <b>{{ DG.dataHandler?.rowsCountTotal }}</b
      >&nbsp; Rows.
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<script setup lang="ts">
import H_iconColumns from "../../Components/icons/H_iconArrow_upward.vue";
import H_iconExpand_horizontal from "../../Components/icons/H_iconExpand_horizontal.vue";
import H_iconExcel from "../../Components/icons/H_iconExcel.vue";
import H_iconZoom_out_map from "../../Components/icons/H_iconZoom_out_map.vue";
import { inject, ref } from "vue";
import { type iDgrid } from "./provide/Dgrid";
import csv from "../../utils/exportToExcel";
import H_menuColumns from "./sub/columns/H_menuColumns.vue";
import { type iColumn } from "./provide/Column";

const DG = inject("DG") as iDgrid;
const menuColumnsRef = ref();

function editColumns() {
  menuColumnsRef.value.columnsOpen();
}

function autoAdjustColumns() {
  DG.ColumnWidthAdjustment.adjustAll();
}

async function excel() {
  csv.load(
    await DG.dataHandler?.getExcel(),
    DG.getVisibelColumns().map((x: iColumn) => x.props),
    "list"
  );
}

function fullScreen() {
  if (!document.fullscreenElement) {
    DG.datagridRef?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
</script>
