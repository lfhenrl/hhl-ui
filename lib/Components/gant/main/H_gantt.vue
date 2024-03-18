<template>
  <div class="H_gantt">
    <data-grid :data="data" :scrollTop="scrollTop" class="henrik" ref="dgdom" />
    <div class="H_gantt-spitPane" v-splitpane />
    <div class="H_gantt-gantt">
      <H_virtual-list
        @scroll="onScroll"
        ref="scrollDom"
        data-key="id"
        :data-sources="scaleList"
        :overscan="4"
        :estimateSize="245"
        direction="horizontal"
        class="H_gantt-gantt-scale"
      >
        <template v-slot="data">
          <week-scale :startDate="data.item" :key="data.item.id" />
        </template>
        <template #absoluteItems>
          <div class="gantt-lines">
            <div class="gantt-line" v-for="item in data" :key="item.Id" />
            <div class="gantt-space" />
          </div>
        </template>
      </H_virtual-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, provide, ref, watch } from "vue";
import { iTask } from "../data/taskModel";
import dataGrid from "./data-grid.vue";
import weekScale from "../scales/week-scale.vue";
import { iScaleItem, makeTimelist } from "../scales/getScaleList";
import { DateAddDays, DateGetToday } from "../../../utils/dateFunctions";
import { vSplitpane } from "../../../Directives/v-splitpane";
import H_virtualList from "../../H_virtualList.vue";
import { Gantt } from "../provide/gantt";

const P = defineProps({
  data: { type: Array as PropType<iTask[]> },
});

const dgdom: any = ref(null);
const scrollDom = ref();

const scrollTop = ref(0);

let startDate = DateGetToday();
let endDate = DateAddDays(startDate, 333);
const scaleList = ref<iScaleItem[]>(makeTimelist(startDate, endDate, "week"));

const GT = new Gantt();
provide("GT", GT);

watch(
  () => P.data,
  () => {
    setTimeout(() => {
      GT.newData();
    }, 500);
  },
  { immediate: true }
);

function onScroll(e: any) {
  scrollTop.value = e.target?.scrollTop;
}

onMounted(() => {
  GT.vScrollDom = scrollDom.value;
  GT.dGridDom = dgdom.value;
});
</script>

<style>
.H_gantt {
  display: flex;
  overflow: hidden;
  border-top: 1px solid var(--col-bg-3);
  border-right: 1px solid var(--col-bg-3);
  --gantt-scroll-height: v-bind(GT.scrollHight.value);
}

.H_gantt-gantt {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  overflow: hidden;
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
  z-index: 6;
}

.gantt-lines {
  position: absolute;
  top: 38px;
  bottom: 30px;
  left: 0;
  right: 0;
  z-index: 20;
  pointer-events: none;
}

.gantt-line {
  display: flex;
  max-height: 30px;
  min-height: 30px;
  min-width: 100%;
  border-bottom: solid 1px var(--col-bg-3);
}

.gantt-space {
  min-height: 5px;
}

.H_gantt-spitPane {
  width: 4px;
  background-color: var(--col-bg-3);
  cursor: ew-resize;
}
</style>
