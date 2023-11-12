<template>
  <div
    class="H_dataGroupRow flex w-full flex-1 items-center border-b border-bg3 px-0.5"
    :style="{ paddingLeft: 17 * row.level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.level"
  >
    <H_icon
      :icon="row.expanded ? 'expand_down' : 'expand_right'"
      btn
      @click="expand"
    />
    {{ row.title }} ({{ row.count }}/{{ row.count_total }}) ----
    {{ row.id }}---- {{ row.level }} --- {{ row.rowsLoaded }}
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { iColumns } from "../provide/Columns";
import H_icon from "../../../Components/H_icon.vue";
const P = defineProps({
  row: { type: Object, default: {} },
});

const Columns = inject("Columns") as iColumns;

function expand() {
  Columns.expandRow(P.row);
}
onMounted(() => {});
</script>
