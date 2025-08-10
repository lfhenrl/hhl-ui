<template>
  <div class="H_datagridFooter" v-bind="$attrs">
    <H_icon name="columns" btn title="Edit Columns" @click="editColumns" />
    <H_icon name="expand_horizontal" btn title="Auto adjust all columns" @click="autoAdjustColumns" />
    <H_icon name="excel" btn title="Download to excel" @click="excel" />
    <H_icon name="zoom_out_map" btn title="fullScreen" @click="fullScreen" />
    <div style="flex: 1" />
    <div class="H_datagridFooter__info">
      <b>{{ DG.dataHandler?.rowsCount }}</b
      >&nbsp; Loaded of&nbsp; <b>{{ DG.dataHandler?.rowsCountTotal }}</b
      >&nbsp; Rows.
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<style>
@layer components {
  .H_datagridFooter {
    display: flex;
    align-items: center;
    color: var(--color-txt3);
    background-color: var(--color-bg2);
    gap: 0.5em;
    border: 1px solid var(--color-txt8);
    border-radius: 0 0 4px 4px;
    padding: 0.5em;
    flex-wrap: wrap;
    .H_icon {
      font-size: 1.6em;
      color: var(--color-txt3);
    }
  }

  .H_datagridFooter__info {
    display: flex;
    align-items: center;
    color: var(--color-txt2);
  }
  .H_datagridFooter:fullscreen {
    background-color: var(--color-bg0);
  }
}
</style>

<script setup lang="ts">
import H_icon from "../../Components/H_icon.vue";
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
