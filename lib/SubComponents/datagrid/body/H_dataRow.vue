<template>
  <H_dataGroupRow v-if="row.__type === 'group'" :row="row" />
  <H_loadMoreRow v-else-if="row.__type === 'loadmore'" :row="row" />
  <div
    v-else
    v-for="(col, index) in DG.getVisibelColumns()"
    class="H_dataRow__cell"
    :class="[col.props.cell_class, slotClass(col)]"
    :style="[
      {
        minWidth: col.width.value ?? '',
        maxWidth: col.width.value ?? '',
      },
      cellStyle(col),
    ]"
    :data-col-index="index"
    :autoHeight="col.props.autoHeight ? '' : undefined"
    data-type="rowcell"
  >
    <rend :col="col" :row="row" />
  </div>
</template>
<style>
@layer components {
  .H_dataRow {
    display: flex;
    min-height: var(--dgrid-row-height);
    max-height: var(--dgrid-row-height);
    height: var(--dgrid-row-height);
    background-color: var(--color-bg0);
  }
  .H_dataRow:nth-child(odd) {
    background-color: var(--color-bg3);
  }

  .H_dataRow:nth-child(even) {
    background-color: var(--color-bg2);
  }
  .H_dataRow:hover {
    background-color: var(--color-bg2);
  }
  .H_dataRow[data-selected] {
    background-color: color-mix(in oklab, var(--color-pri) 20%, transparent);
  }
  .H_dataRow.sticky-0 {
    position: sticky;
    top: 0;
    opacity: 1;
  }
  .H_dataRow.sticky-1 {
    position: sticky;
    top: var(--dgrid-row-height);
    opacity: 1;
  }
  .H_dataRow.sticky-2 {
    position: sticky;
    top: calc(var(--dgrid-row-height) * 2);
    opacity: 1;
  }
}

.H_dataRow__cell {
  padding-block: 0.25em;
  padding-inline: 0.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-box-trim: trim-both;
  border-right: 1px solid var(--color-txt9);
  border-bottom: 1px solid var(--color-txt9);
  &[autoheight] {
    white-space: break-spaces;
  }
}
</style>
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
