<template>
  <div
    class="flex flex-1 items-center gap-2 w-full px-1 min-h-(--dgrid-row-height) max-h-(--dgrid-row-height)"
    :style="{ paddingLeft: 17 * row.__level + 'px' }"
    :col-index="0"
    data-type="rowgroup"
    :row-level="row.__level"
  >
    <div class="flex items-center pl-1" @click.stop="expand">
      <div class="ico-expand_down iconBtn" v-if="row.__expanded" />
      <div class="ico-expand_right iconBtn" v-else />
    </div>
    <div>{{ row.__title }}</div>
    <span class="text-xs text-txt3"> ({{ row.__count }}/{{ row.__count_total }})</span>
  </div>
</template>

<script setup lang="ts">
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
<style>
@layer components {
  .sticky-0 {
    position: sticky;
    top: 0;
    opacity: 1;
  }
  .sticky-1 {
    position: sticky;
    top: var(--dgrid-row-height);
    opacity: 1;
  }
  .sticky-2 {
    position: sticky;
    top: calc(var(--dgrid-row-height) * 2);
    opacity: 1;
  }
}
</style>
