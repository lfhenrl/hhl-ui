<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <div class="H_dataGroupRow-expandBtn" @click.stop="expand">
      <H_icon v-if="row.__expanded" icon="expand_down" btn="standard" />
      <H_icon v-else icon="expand_right" btn="standard" />
    </div>
    <div>{{ row.__title }}</div>
    <span> ({{ row.__count }}/{{ row.__count_total }})</span>
    <span> ({{ row.__rowsLoaded }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { iDgrid } from "../provide/Dgrid";
import H_icon from "../../../Components/H_icon.vue";

const P = defineProps({
  row: { type: Object, default: {} },
});

const DG = inject("DG") as iDgrid;

async function expand() {
  await DG.dataHandler?.expanding(P.row);
}
onMounted(() => {});
</script>
<style>
@layer hhl-components {
  .H_dataGroupRow {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 30px;
    padding: 0 2px;
  }
  .H_dataGroupRow-expandBtn {
    display: flex;
    align-items: center;
  }
  .H_dataGroupRow span {
    opacity: 70%;
    font-size: 12px;
  }
}
</style>
