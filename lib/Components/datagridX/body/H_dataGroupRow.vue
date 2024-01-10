<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <div class="H_dataGroupRow-expandBtn" @click="expand">
      <H_icon v-if="row.__expanded" icon="expand_down" btn="standard" />
      <H_icon v-else icon="expand_right" btn="standard" />
    </div>
    <span>{{ row.__title }}</span>
    <span class="pl-2 text-xs opacity-70">
      ({{ row.__count }}/{{ row.__count_total }})</span
    >
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { iDgrid } from "../provide/Dgrid";
import H_icon from "../../../Components/H_icon.vue";

const P = defineProps({
  row: { type: Object, default: {} },
  index: { type: Number, default: -1 },
});

const DG = inject("DG") as iDgrid;

function expand() {
  DG.dataHandler?.expanding(P.row, P.index);
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
    height: 100%;
    border-bottom: 1px solid var(--col-bg-3);
    padding: 0 2px;
  }
  .H_dataGroupRow-expandBtn {
    display: flex;
    align-items: center;
  }
}
</style>
