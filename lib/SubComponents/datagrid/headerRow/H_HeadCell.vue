<template>
  <div
    class="H_HeaderCell"
    ref="headCellRef"
    :data-index="index"
    data-type="headcell"
    :class="col.className"
  >
    <div class="H_HeaderCell-inner">
      <div class="H_HeadCell-text" data-subtype="title">
        {{ col.props.title }}
      </div>
      <H_menu data-subtype="menu" :index="index" />
      <div
        class="H_HeadCell-resize"
        @mousedown="resize"
        @mouseup="resizeEnd"
        @mouseout="resizeEnd"
        data-subtype="resize"
      ></div>
    </div>
    <div class="H_HeadCell-space">
      <rend :col="col" :row="Columns.dataHandler?.MaxSizeRow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import H_menu from "../sub/H_menu.vue";
import { ColResize } from "./ColResize";
import { iColumns } from "../provide/Columns";
import { inject, onMounted, ref } from "vue";
import { icolumnData } from "../provide/datagridTypes";

const P = defineProps({
  index: { type: Number, default: 0 },
});
// const E = defineEmits([]);
const headCellRef = ref();
const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];

function resize(e: MouseEvent) {
  ColResize(col, e);
  setTimeout(() => {
    Columns.adjustColumns?.adjust();
  }, 10);
}

function resizeEnd() {
  setTimeout(() => {
    Columns.adjustColumns?.adjust();
  }, 10);
}

function rend(data: any) {
  if (!data.row.value) return;
  const value = data.row.value[data.col.props.field];
  if (data.col.slot) {
    const rowData = {
      row: data.row.value,
      col: data.col,
      value,
    };
    return data.col.slot?.default(rowData);
  } else {
    return format(value, data.col, data.row.value);
  }
}

function format(value: any, col: any, data: any) {
  return col.props.format?.(value, col, data) ?? value?.toString() ?? "";
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
@layer hhl-components {
  .H_HeaderCell {
    display: flex;
    flex-direction: column;
    min-height: 33px;
    border-right: 1px solid var(--col-bg-3);
    border-bottom: 1px solid var(--col-bg-3);
  }

  .H_HeaderCell-inner {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    font-weight: bold;
    min-height: 33px;
    width: 100%;
  }
  .H_HeadCell-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 6px;
  }
  .H_HeadCell-resize {
    z-index: 10;
    height: 100%;
    width: 6px;
    min-width: 6px;
    cursor: w-resize;
    overflow: visible;
  }
  .H_HeadCell-space {
    height: 0px;
    width: min-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
