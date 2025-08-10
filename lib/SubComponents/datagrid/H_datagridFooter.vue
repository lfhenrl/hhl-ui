<template>
  <div
    class="H_datagridFooter"
    h-display="flex"
    h-align-items="center"
    h-bgcolor="var(--color-bg2)"
    h-gap="0.5em"
    h-color="var(--color-txt3)"
    h-border="1px solid var(--color-txt8)"
    h-border-radius="0 0 4px 4px"
    h-padding="0.5em"
    h-flex-wrap="wrap"
    v-bind="$attrs"
  >
    <H_icon
      name="columns"
      h-color="var(--color-txt3)"
      h-font-size="1.6rem"
      btn
      title="Edit Columns"
      @click="editColumns"
    />
    <H_icon
      name="expand_horizontal"
      h-color="var(--color-txt3)"
      h-font-size="1.6rem"
      btn
      title="Auto adjust all columns"
      @click="autoAdjustColumns"
    />
    <H_icon
      name="excel"
      h-color="var(--color-txt3)"
      h-font-size="1.6rem"
      btn
      title="Download to excel"
      @click="excel"
    />
    <H_icon
      name="zoom_out_map"
      h-color="var(--color-txt3)"
      h-font-size="1.6rem"
      btn
      title="fullScreen"
      @click="fullScreen"
    />
    <div style="flex: 1" />
    <div class="H_datagridFooter__info" h-display="flex" h-align-items="center" h-color="var(--color-txt2)">
      <b>{{ DG.dataHandler?.rowsCount }}</b
      >&nbsp; Loaded of&nbsp; <b>{{ DG.dataHandler?.rowsCountTotal }}</b
      >&nbsp; Rows.
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<style>
@layer components {
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
