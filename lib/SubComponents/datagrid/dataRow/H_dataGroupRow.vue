<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.level"
  >
    <H_icon :icon="isExpanded() ? 'expand_down' : 'expand_right'" btn @click="expand" />
    {{ row.title }} ({{ row.count }})
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { iColumns } from "../provide/Columns";
import H_icon from "../../../Components/H_icon.vue";
const P = defineProps({
  row: { type: Object, default: {} }
});

const Columns = inject("Columns") as iColumns;

function isExpanded() {
  return Columns.expandList.includes(P.row.id);
}

function expand() {
  if (isExpanded()) {
    const index = Columns.expandList.indexOf(P.row.id);
    Columns.expandList.splice(index, 1);
  } else {
    Columns.expandList.push(P.row.id);
  }
  Columns.updateExpandList();
}
</script>

<style>
.H_dataGroupRow {
  display: flex;
  align-items: center;
  padding: 2px 0;
  flex: 1;
  border-bottom: solid 1px lightgray;
}
</style>
