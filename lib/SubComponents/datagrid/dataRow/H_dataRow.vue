<template>
  <rendRowTemplate v-if="Columns.haveDataRowTemplate" />
  <template v-else>
    <H_dataGroupRow v-if="row.___type === 'group'" :row="row" />
    <template v-else v-for="(col, index) in Columns.columns">
      <div v-if="col.visibel.value" class="H_dataRow-Cell" :class="col.className" :data-index="index" data-type="rowcell">
        <rend :col="col" :row="row" />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { iColumns } from "../provide/Columns";
import H_dataGroupRow from "./H_dataGroupRow.vue";

const P = defineProps({
  row: { type: Object, default: {} }
});

const Columns = inject("Columns") as iColumns;

function rend(data: any) {
  const value = data.row[data.col.props.field];
  if (data.col.slot) {
    const rowData = {
      row: data.row,
      col: data.col,
      value
    };
    return data.col.slot?.default(rowData);
  } else {
    return format(value, data.col, data.row);
  }
}

function rendRowTemplate() {
  return Columns.dataRowTemplate({
    row: P.row,
    cols: Columns.columns
  });
}

function format(value: any, col: any, data: any) {
  return col.props.format?.(value, col, data) ?? value?.toString() ?? "";
}
</script>

<style>
.H_dataRow {
  display: flex;
  height: min-content;
}

.H_dataRow:nth-child(odd) {
  background: rgba(138, 153, 157, 0.05);
}

.H_dataRow[selected="true"] {
  background-color: aqua;
}

.H_dataRow-Cell {
  border-right: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  /* min-width: 200px; */
}
</style>
