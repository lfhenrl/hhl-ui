<template>
  <H_dataGroupRow v-if="row.__type === 'group'" :row="row" />
  <H_loadMoreRow v-else-if="row.__type === 'loadmore'" :row="row" />
  <div
    v-else
    v-for="(col, index) in DG.getVisibelColumns()"
    class="H_dataRow-Cell"
    :class="[col.props.cell_class, slotClass(col), col.props.autoHeight === true ? 'H_dataRow-CellAutoHeight' : '']"
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
import { iDgrid } from "../provide/Dgrid";
import H_dataGroupRow from "./H_dataGroupRow.vue";
import H_loadMoreRow from "./H_loadMoreRow.vue";
import { iColumn } from "../provide/Column";

const P = defineProps({
  row: { type: Object, default: {} },
  index: { type: Number, default: -1 },
});

const DG = inject("DG") as iDgrid;

function slotClass(col: iColumn) {
  if (col.slot?.default) return "H_dataRow-slotCell";
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

<style>
.H_dataRow {
  display: flex;
  flex: 1;
  height: min-content;
  min-height: var(--dgrid-row-height);
  max-height: var(--dgrid-row-height);
  width: 100%;
  line-height: 1.1;
  background: var(--col-bg-0);
}

.H_dataRow:nth-child(odd) {
  background: var(--col-bg-1);
}

.H_dataRow[selected="true"] {
  background-color: var(--col-bg-4);
}

.H_dataRow:hover {
  background-color: var(--col-bg-2);
}

.H_dataRow[selected="true"]:hover {
  background-color: var(--col-bg-5);
}

.H_vscroll-item[selected="true"]:hover {
  background-color: var(--col-bg-5);
}

.H_dataRow-Cell {
  border-right: solid 1px var(--col-bg-3);
  border-bottom: solid 1px var(--col-bg-3);
  padding: 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* flex: 1; */
}

.H_dataRow-Cell.H_dataRow-CellAutoHeight {
  white-space: break-spaces;
}

.H_dataRow-Cell.H_dataRow-slotCell {
  display: flex;
  padding: 0 8px;
  align-items: center;
}

.sticky-0 {
  position: sticky;
  top: 0;
  opacity: 1;
}
.sticky-1 {
  position: sticky;
  top: var(--dgrid-row-height);
  opacity: 1;
}
.sticky-2 {
  position: sticky;
  top: calc(var(--dgrid-row-height) * 2);
  opacity: 1;
}
</style>
