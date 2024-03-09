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
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, onMounted } from "vue";
import { iDgrid } from "../provide/Dgrid";
import H_icon from "../../../Components/H_icon.vue";

const instace = getCurrentInstance();
const P = defineProps({
  row: { type: Object, default: {} },
});

const DG = inject("DG") as iDgrid;

async function expand() {
  await DG.dataHandler?.expanding(P.row);
}
onMounted(() => {
  if (true) {
    const t: any = instace?.parent?.parent ?? {};

    if (P.row.__level === 0) {
      t.ctx.$el.classList.add("sticky-0");
    }
    if (P.row.__level === 1) {
      t.ctx.$el.classList.add("sticky-1");
    }
    if (P.row.__level === 2) {
      t.ctx.$el.classList.add("sticky-2");
    }
  }
});
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
    max-height: 30px;
    padding: 0 2px;
  }
  .H_dataGroupRow-expandBtn {
    display: flex;
    align-items: center;
  }
  .H_dataGroupRow span {
    font-size: 12px;
  }
}
</style>
