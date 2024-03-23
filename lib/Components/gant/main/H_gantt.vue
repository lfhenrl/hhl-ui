<template>
  <div class="H_gantt" ref="MainDom">
    <data-grid :data="data" :scrollTop="scrollTop" ref="dgdom" />
    <div class="H_gantt-spitPane" v-splitpane />
    <div class="H_gantt-gantt">
      <H_virtual-list
        @scroll="onScroll"
        ref="scrollDom"
        data-key="id"
        :data-sources="scaleList"
        :overscan="6"
        :estimateSize="250"
        direction="horizontal"
        class="H_gantt-gantt-scale"
      >
        <template v-slot="data">
          <week-scale :startDate="data.item" :key="data.item.id" />
        </template>
        <template #absoluteItems>
          <div class="gantt-lines">
            <task :row="item" v-for="item in GT.Data.value" :key="item.Id" />

            <div class="gantt-space" />
          </div>
          <div class="H_gantt_renderHTML"></div>
        </template>
      </H_virtual-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, provide, ref, watch } from "vue";
import { iTask } from "../data/taskModel";
import dataGrid from "../datagrid/data-grid.vue";
import weekScale from "../scales/week-scale.vue";
import { iScaleItem, makeTimelist } from "../scales/getScaleList";
import { DateAddDays, DateGetToday } from "../../../utils/dateFunctions";
import { vSplitpane } from "../../../Directives/v-splitpane";
import H_virtualList from "../../H_virtualList.vue";
import { Gantt } from "../provide/gantt";
import task from "../gantt/task.vue";

const P = defineProps({
  data: { type: Array as PropType<iTask[]>, default: [] },
  headHeight: { type: Number, default: 38 },
  rowHeight: { type: Number, default: 30 },
});

const MainDom = ref();
const dgdom = ref();
const scrollDom = ref();
const scrollTop = ref(0);

let startDate = DateGetToday();
let endDate = DateAddDays(startDate, 8);
const scaleList = ref<iScaleItem[]>([]);

setTimeout(() => {
  const tList: any = makeTimelist(startDate, endDate, "week");
  scaleList.value = tList.timelist;
  GT.StartTime = tList.startTime;
  GT.EndTime = tList.endTime;
  GT.calcTime();
});

const GT = new Gantt();
provide("GT", GT);

watch(
  () => P.data,
  () => {
    setTimeout(() => {
      GT.newData();
    });
  },
  { immediate: true }
);

function onScroll(e: any) {
  scrollTop.value = e.target?.scrollTop;
}

onMounted(() => {
  GT.MainDom = MainDom.value;
  GT.vScrollDom = scrollDom.value;
  GT.dGridDom = dgdom.value;
  GT.headHeight = P.headHeight;
  GT.rowHeight = P.rowHeight;
  GT.init();
});
</script>

<style>
.H_gantt {
  display: flex;
  overflow: hidden;
  border-top: 1px solid var(--col-bg-3);
  border-right: 1px solid var(--col-bg-3);
}

.H_gantt-gantt {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  overflow: hidden;
}

.H_gantt-gantt .H_virtualListItem {
  pointer-events: none;
  user-select: none;
}

.H_gantt-gantt-scale {
  z-index: 2;
  display: flex;
  height: 100%;
}

.H_gantt-gantt-scale .H_virtualList-scroller {
  position: relative;
  display: flex;
  height: 100%;
}

.gantt-lines {
  position: absolute;
  top: var(--gantt-head-height);
  bottom: 30px;
  min-width: var(--gantt-scroll-width);
  pointer-events: none;
}

.gantt-line {
  display: flex;
  max-height: var(--gantt-row-height);
  min-height: var(--gantt-row-height);
  min-width: var(--gantt-scroll-width);
  border-bottom: solid 1px var(--col-bg-3);
}

.gantt-space {
  min-height: 5px;
}

.H_gantt-spitPane {
  min-width: 4px;
  max-width: 4px;
  background-color: var(--col-bg-3);
  cursor: ew-resize;
  z-index: 11;
}
</style>
