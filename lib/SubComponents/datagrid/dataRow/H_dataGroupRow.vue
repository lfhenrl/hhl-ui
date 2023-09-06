<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.level"
  >
    <H_icon :icon="row.expanded ? 'expand_down' : 'expand_right'" btn @click="expand" />
    {{ row.title }} ({{ row.count }}/{{ row.count_total }}) ---- {{ row.id }}---- {{ row.level }} --- {{ row.rowsLoaded }}
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
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
  Columns.expandRow(P.row);
  if (isExpanded()) {
    // const index = Columns.expandList.indexOf(P.row.id);
    // Columns.expandList.splice(index, 1);
  } else {
    // Columns.expandList.push(P.row.id);
  }
  // Columns.updateExpandList();
}
onMounted(() => {});
</script>

<style>
.H_dataGroupRow {
  display: flex;
  align-items: center;
  padding: 2px 0;
  flex: 1;
  border-bottom: solid 1px var(--col-bg-3);
}
</style>
