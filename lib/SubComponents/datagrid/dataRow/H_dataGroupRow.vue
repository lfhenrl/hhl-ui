<template>
  <div
    class="H_dataGroupRow flex w-full flex-1 items-center border-b border-bg3 px-0.5"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <H_icon
      :icon="row.__expanded ? 'expand_down' : 'expand_right'"
      btn
      @click="expand"
    />
    {{ row.__title }} ({{ row.__count }}/{{ row.__count_total }}) ----
    {{ row.__id }}---- {{ row.__level }} --- {{ row.__rowsLoaded }}
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
