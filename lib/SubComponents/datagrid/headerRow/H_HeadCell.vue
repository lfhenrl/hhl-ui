<template>
  <div class="H_HeaderCell" ref="headCellRef" :data-index="index" data-type="headcell" :class="col.className">
    <div class="H_HeadCell-text" data-subtype="title">{{ col.props.title }}</div>
    <H_menu data-subtype="menu" :index="index" />
    <div class="H_HeadCell-resize" @mousedown="resize" data-subtype="resize"></div>
  </div>
</template>

<script setup lang="ts">
import H_menu from "../sub/H_menu.vue";
import { ColResize } from "./ColResize";
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
  ColResize(col, e);
  // Columns.adjustColumns?.adjust();
}

onMounted(() => {
  col.dom = headCellRef.value;
  if (col.props.width && col.dom) {
    col.dom.style.maxWidth = col.props.width;
    col.dom.style.minWidth = col.props.width;
  }
});
</script>

<style>
.H_HeaderCell {
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 0;
  margin: 0;
  min-height: 33px;
  flex: 1 1 min-content;
  /* 
  overflow: hidden; */
  border-right: solid 1px var(--col-bg-3);
  border-bottom: solid 1px var(--col-bg-3);
}

.H_HeadCell-text {
  padding-left: 6px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.H_HeadCell-resize {
  cursor: col-resize;
  width: 6px;
  min-width: 6px;
  /* margin-right: -4px; */
  overflow: visible;
  height: 100%;
  /* background-color: aqua; */
  z-index: 2;
}
</style>
