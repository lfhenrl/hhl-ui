<template>
  <div class="data-grid" ref="dataGrid">
    <div class="data-grid-head">
      <div class="data-grid-head-cell cell1">Name.</div>
      <div class="data-grid-head-cell cell2">Start.</div>
      <div class="data-grid-head-cell cell3">Duration.</div>
    </div>
    <div class="data-grid-rows" v-for="item in data">
      <div class="data-grid-row-cell cell1">{{ item.Name }}</div>
      <div class="data-grid-row-cell cell2">{{ formatDate(item.StartTime) }}</div>
      <div class="data-grid-row-cell cell3">{{ getDays(item) }}</div>
    </div>
    <div class="gantt-space" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { iTask } from "../data/taskModel";
import { D_01_dec_2021_HHMM } from "../../../utils/dateFormat";
import { DateDiffHours } from "../../../utils/dateFunctions";

const dataGrid = ref<HTMLElement>();

const P = defineProps({
  data: { type: Array as PropType<iTask[]> },
  scrollTop: { type: Number, default: 0 },
});

watch(
  () => P.scrollTop,
  () => {
    if (!dataGrid.value) return;
    dataGrid.value.scrollTop = P.scrollTop;
  }
);

function formatDate(d: Date) {
  return D_01_dec_2021_HHMM(d);
}

function getDays(item: iTask) {
  return DateDiffHours(item.StartTime, item.EndTime);
}
</script>

<style>
.data-grid {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--col-bg-3);
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: hidden;
  font-size: 12px;
  line-height: 1;
}
.data-grid-head {
  width: 300px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  max-height: 38px;
  min-height: 38px;
  background-color: var(--col-bg-1);
  border-bottom: 1px solid var(--col-bg-3);
}
.data-grid-head-cell {
  display: flex;
  align-items: center;
  border-right: 1px solid var(--col-bg-3);
  height: 100%;
}
.data-grid-rows {
  width: 300px;
  display: flex;
  max-height: 30px;
  min-height: 30px;
  border-bottom: 1px solid var(--col-bg-3);
}

.data-grid-row-cell {
  display: flex;
  align-items: center;
  border-right: 1px solid var(--col-bg-3);
}
.cell1 {
  padding: 3px;
  min-width: 50px;
}
.cell2 {
  padding: 3px;
  min-width: 70px;
  max-width: 70px;
}
.cell3 {
  padding: 3px;
  min-width: 50px;
}
</style>
