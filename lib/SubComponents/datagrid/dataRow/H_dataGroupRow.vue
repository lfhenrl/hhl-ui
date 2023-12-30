<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <H_icon
      :icon="row.__expanded ? 'expand_down' : 'expand_right'"
      btn="standard"
      @click="expand"
    />
    <span>{{ row.__title }}</span>
    <span class="pl-2 text-xs opacity-70">
      ({{ row.__count }}/{{ row.__count_total }})</span
    >
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
<style>
@layer hhl-components {
  .H_dataGroupRow {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    width: 100%;
    height: 28px;
    border-bottom: 1px solid var(--col-bg-3);
    padding: 0 2px;
  }
}
</style>
