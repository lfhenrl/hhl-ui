<template>
  <div class="H_HeaderCell" ref="headCellRef" :data-index="index" data-type="headcell">
    <div class="H_HeadCell-text" data-subtype="title">{{ col.props.title }}</div>
    <H_menu data-subtype="menu" :index="index" />
    <div class="H_HeadCell-resize" @mousedown="resize" data-subtype="resize"></div>
  </div>
</template>

<script setup lang="ts">
import H_menu from "../sub/H_menu.vue";
import { RowResize } from "./RowResize";
import { iColumns } from "../provide/Columns";
import { inject, onMounted, ref } from "vue";
import { icolumnData } from "../provide/datagridTypes";

const P = defineProps({
  index: { type: Number, default: 0 }
});
// const E = defineEmits([]);
const headCellRef = ref();
const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];

function resize(e: MouseEvent) {
  // Columns.startResize();
  RowResize(col, e);
}

onMounted(() => {
  col.dom = headCellRef.value;
  // if (col.dom && col.dom.parentElement) {
  //   col.dom.parentElement.style.width = col.width;
  // }
});
</script>

<style>
.H_HeaderCell {
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 0;
  margin: 0;
  flex: 1;
  height: 100%;
  overflow: hidden;
  border-right: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
}

.H_HeadCell-text {
  padding: 6px 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
}

.H_HeadCell-resize {
  cursor: col-resize;
  width: 6px;
  min-width: 6px;
  margin-right: -1px;
  overflow: visible;
  height: 100%;
  /* background-color: aqua; */
}
</style>
