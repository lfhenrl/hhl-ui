<template>
  <H_dataGroupRow v-if="row.__type === 'group'" :row="row" />
  <H_loadMoreRow v-else-if="row.__type === 'loadmore'" :row="row" />
  <div
    v-else
    v-for="(col, index) in DG.getVisibelColumns()"
    class="overflow-hidden whitespace-nowrap text-ellipsis py-1 px-2 border-r border-txt7 border-b"
    :class="[col.props.cell_class, slotClass(col), col.props.autoHeight === true ? 'whitespace-break-spaces' : '']"
    :style="[
      {
        minWidth: col.width.value ?? '',
        maxWidth: col.width.value ?? '',
      },
      cellStyle(col),
    ]"
    :data-col-index="index"
    data-type="rowcell"
  >
    <rend :col="col" :row="row" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { type iDgrid } from "../provide/Dgrid";
import H_dataGroupRow from "./H_dataGroupRow.vue";
import H_loadMoreRow from "./H_loadMoreRow.vue";
import { type iColumn } from "../provide/Column";

const P = defineProps({
  row: { type: Object, default: {} },
  index: { type: Number, default: -1 },
});

const DG = inject("DG") as iDgrid;

function slotClass(col: iColumn) {
  if (col.slot?.default) return "flex items-center px-2";
}

function rend(data: any) {
  const value = data.row[data.col.props.field];
  if (data.col.slot) {
    const rowData = {
      row: data.row,
      col: data.col,
      value,
    };
    return data.col.slot?.default(rowData);
  } else {
    return format(value, data.col, data.row);
  }
}

function cellStyle(col: iColumn) {
  const value = P.row[col.props.field];
  return col.props.cell_style?.(value, P.row) ?? "";
}

function format(value: any, col: iColumn, row: any) {
  return col.props.format?.(value, row) ?? value?.toString() ?? "";
}
</script>
