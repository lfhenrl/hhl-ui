<template>
  <div class="H_datagridFooter">
    <H_icon btn="standard" icon="refresh" title="Reload data" />
    <H_icon
      btn="standard"
      icon="columns"
      title="Edit Columns"
      @click="editColumns"
    />
    <H_icon
      btn="standard"
      icon="expand_horizontal"
      title="Auto adjust all columns"
      @click="autoAdjustColumns"
    />
    <H_icon
      btn="standard"
      icon="excel"
      title="Download to excel"
      @click="excel"
    />
    <H_icon
      btn="standard"
      icon="zoom_out_map"
      title="fullScreen"
      @click="fullScreen"
    />
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
import H_icon from "../H_icon.vue";
import H_menuColumns from "./sub/columns/H_menuColumns.vue";

const DG = inject("DG") as iDgrid;
const menuColumnsRef = ref();

function editColumns() {
  menuColumnsRef.value.columnsOpen();
}

function autoAdjustColumns() {
  DG.ColumnWidthAdjustment.adjustAll();
}

function excel() {
  DG!.scrollToOffset(600);
}

function fullScreen() {}
</script>

<style>
@layer hhl-components {
  .H_datagridFooter {
    display: flex;
    align-items: center;
    height: 40px;
    gap: 8px;
    color: var(--col-txt-3);
    font-size: 14px;
    padding-right: 10px;
    padding-left: 6px;
    border-top: 1px solid var(--col-bg-6);
  }
  .H_datagrid__rowcount {
    display: flex;
    justify-content: end;
    width: 100%;
  }
}
</style>
