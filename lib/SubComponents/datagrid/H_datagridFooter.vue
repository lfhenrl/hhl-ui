<template>
  <div class="flex items-center flex-wrap gap-2 text-txt3 border border-bg6 p-2 rounded-b">
    <div class="ico-columns iconBtn" title="Edit Columns" @click="editColumns" />
    <div class="ico-expand_horizontal iconBtn" title="Auto adjust all columns" @click="autoAdjustColumns" />
    <div class="ico-excel iconBtn" title="Download to excel" @click="excel" />
    <div class="ico-zoom_out_map iconBtn" title="fullScreen" @click="fullScreen" />
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
