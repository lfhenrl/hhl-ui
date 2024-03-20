<template>
  <div class="data-grid" ref="dataGrid">
    <div style="display: inline-block">
      <div class="data-grid-head">
        <head-cell v-for="col in Columns" :col="col" :key="col.Id" />
      </div>

      <row-group :level="0" :row="item" v-for="item in rows" :key="item.Id" />

      <div class="gantt-space" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { iTask } from "../data/taskModel";
import { Columns } from "../data/Columns";
import headCell from "./headCell.vue";
import rowGroup from "./rowGroup.vue";

const dataGrid = ref<HTMLElement>();

const P = defineProps({
  data: { type: Array as PropType<iTask[]> },
  scrollTop: { type: Number, default: 0 },
});

const rows: any = ref();

watch(
  () => P.data,
  () => {
    rows.value = P.data;
  },
  { immediate: true }
);

watch(
  () => P.scrollTop,
  () => {
    if (!dataGrid.value) return;
    dataGrid.value.scrollTop = P.scrollTop;
  }
);
</script>

<style>
.data-grid {
  display: inline-block;
  border-left: 1px solid var(--col-bg-3);
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: scroll;
  font-size: 12px;
  line-height: 1;
}
.data-grid-head {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  max-height: 38px;
  min-height: 38px;
  background-color: var(--col-bg-1);
  border-bottom: 1px solid var(--col-bg-3);
}

.drag-head {
  width: 30px;
  text-align: center;
  border-right: 1px solid var(--col-bg-4);
  min-height: var(--gantt-row-height);
  max-height: var(--gantt-row-height);
}

.data-grid-row {
  width: 100%;
  display: flex;
  align-items: center;
  max-height: 30px;
  min-height: 30px;
  border-bottom: 1px solid var(--col-bg-3);
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
