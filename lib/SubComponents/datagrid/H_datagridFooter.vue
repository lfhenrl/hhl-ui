<template>
  <div class="H_datagridFooter">
    <H_icon btn="standard" icon="columns" title="Edit Columns" @click="editColumns" />
    <H_icon btn="standard" icon="expand_horizontal" title="Auto adjust all columns" @click="autoAdjustColumns" />
    <H_icon btn="standard" icon="excel" title="Download to excel" @click="excel" />
    <H_icon btn="standard" icon="zoom_out_map" title="fullScreen" @click="fullScreen" />
    <div style="flex: 1" />
    <div class="H_datagrid__rowcount">
      <b>{{ DG.dataHandler?.rowsCount }}</b
      >&nbsp; Loaded of&nbsp; <b>{{ DG.dataHandler?.rowsCountTotal }}</b
      >&nbsp; Rows.
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { iDgrid } from "./provide/Dgrid";
import csv from "../../utils/exportToExcel";
import H_icon from "../../Components/H_icon.vue";
import H_menuColumns from "./sub/columns/H_menuColumns.vue";
import { iColumn } from "./provide/Column";

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

<style>
@layer hhl-components {
  .H_datagridFooter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    color: var(--col-txt-3);
    font-size: 14px;
    padding-right: 10px;
    padding-left: 6px;
    padding-top: 6px;
    padding-bottom: 6px;
    border: 1px solid var(--col-bg-6);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .H_datagrid__rowcount {
    display: flex;
  }
}
</style>
