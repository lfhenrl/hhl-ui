<template>
  <div
    class="H_dataGroupRow"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <div class="H_dataGroupRow__icons" @click.stop="expand">
      <H_icon name="expand_down" size="1.4rem" btn v-if="row.__expanded" />
      <H_icon name="expand_right" size="1.4rem" btn v-else />
    </div>
    <div>{{ row.__title }}</div>
    <span class="H_dataGroupRow__counts"> ({{ row.__count }}/{{ row.__count_total }})</span>
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../Components/H_icon.vue";
import { getCurrentInstance, inject, onMounted } from "vue";
import { type iDgrid } from "../provide/Dgrid";

const instace = getCurrentInstance();

const P = defineProps({
  row: { type: Object, default: {} },
});

const DG = inject("DG") as iDgrid;

async function expand() {
  await DG.dataHandler?.expanding(P.row);
}

function addSticky() {
  const n: any = instace?.parent?.parent?.vnode;

  if (P.row.__level === 0) {
    n.el.classList.add("sticky-0");
  }
  if (P.row.__level === 1) {
    n.el.classList.add("sticky-1");
  }
  if (P.row.__level === 2) {
    n.el.classList.add("sticky-2");
  }
}

onMounted(() => {
  if (DG.StickyGroups) {
    addSticky();
  }
});
</script>
