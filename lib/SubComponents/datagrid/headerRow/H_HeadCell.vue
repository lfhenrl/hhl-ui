<template>
  <div
    class="H_HeaderCell min-h[33px] flex flex-col border-b border-r border-bg3"
    ref="headCellRef"
    :data-index="index"
    data-type="headcell"
    :class="col.className"
  >
    <div
      class="H_HeaderCell-inner min-h[33px] flex w-full flex-1 items-center font-bold"
    >
      <div
        class="H_HeadCell-text w-full overflow-hidden text-ellipsis whitespace-nowrap p-1.5"
        data-subtype="title"
      >
        {{ col.props.title }}
      </div>
      <H_menu data-subtype="menu" :index="index" />
      <div
        class="H_HeadCell-resize z-10 h-full w-1.5 min-w-[6px] cursor-w-resize overflow-visible"
        @mousedown="resize"
        data-subtype="resize"
      ></div>
    </div>
    <div
      class="H_HeadCell-space h-0 w-min overflow-hidden text-ellipsis whitespace-nowrap px-2.5 opacity-0"
    >
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
