<template>
  <div class="H_chartGantt" ref="_gantt" :style="style">
    <div class="H_chartGantt_grid">
      <GanttDatagrid ref="dGrid" class="H_chartGantt_dGrid" :scroll-top="scrollTop" />
    </div>
    <div class="H_chartGantt-splitLine" v-splitpane="null" />
    <div class="H_chartGantt_box">
      <H_virtualList
        ref="vList"
        data-key="id"
        :data-sources="timeList"
        direction="horizontal"
        class="H_chartGantt__content"
        item-class="ganttTimeItem"
        :keeps="13"
      >
        <template v-slot="data">
          <GanttMonthItem v-if="scale === 'Month'" :time-data="data.item" :key="data.item.id" />
          <GanttWeekItem v-if="scale === 'Week'" :time-data="data.item" :key="data.item.id" />
          <GanttDayItem v-if="scale === 'Day'" :time-data="data.item" :key="data.item.id" />
        </template>
        <template v-slot:absoluteItems>
          <div
            class="H_chartGantt__chartContainer"
            @scroll="gantt.scrollContainer"
            @mousedown="gantt.mouseDown"
            @mousemove="gantt.mouseMove"
            @dblclick="gantt.mouseDblClick"
          >
            <svg class="H_chartGantt_svg">
              <defs>
                <marker
                  id="endarrow"
                  markerWidth="9"
                  markerHeight="16"
                  refX="0"
                  refY="6"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon points="0 0, 8 6, 0 12" fill="gray" />
                </marker>
              </defs>
              <line ref="lineTool" x1="0" y1="0" x2="0" y2="0" class="H_chartGantt_lineTool" />
              <g id="H_ChartGantt_svg_viewport"></g>
            </svg>
            <div class="H_chartGantt__chartContent" />
          </div>
        </template>
      </H_virtualList>
    </div>
    <div class="H_chartGantt_scroll">
      <div class="H_chartGantt_scroll_top" />
      <div class="H_chartGantt_scroll_bar" @scroll="gantt.scrollBar">
        <div class="H_chartGantt_scroll_dummi" />
      </div>
      <div class="H_chartGantt_scroll_bottom" />
    </div>
  </div>
  <GanttEdit />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, PropType, provide, ref, watch } from "vue";
import { chartGantt } from "../../SubComponents/charts/gantt/common";
import { iGanttTimeItem } from "../../SubComponents/charts/gantt/scale/makeTimelist";
// @ts-ignore:next-line
import { vSplitpane } from "../../../Directives/v-splitpane";
import GanttDatagrid from "../../SubComponents/charts/gantt/datagrid/GanttDatagrid.vue";
import GanttEdit from "../../SubComponents/charts/gantt/edit/ganttEdit.vue";
import { iGanttData } from "../../SubComponents/charts/gantt/common/ganttData";

const props = defineProps({
  barHeight: { type: Number, default: 30 },
  timeHeight: { type: Number, default: 22 },
  scale: { default: "Week", type: String as PropType<"Day" | "Week" | "Month"> }
});

const emit = defineEmits(["loaded"]);

const _gantt = ref<HTMLElement>();
const dGrid = ref();
const lineTool = ref();
const timeList = ref<iGanttTimeItem[]>([]);
const chartHeight = ref(0);
const scrollTop = ref(0);
const gantt = new chartGantt();

provide("gantt", gantt);

watch(
  () => props.scale,
  () => {
    gantt.changeScale(props.scale);
  },
  { immediate: true }
);

const style: any = computed(() => {
  return {
    "--gantt-time-height": props.timeHeight + "px",
    "--gantt-time-totalheight": props.timeHeight * 2 + "px",
    "--gantt-bar-height": props.barHeight + "px",
    "--gantt-chart-height": chartHeight.value + "px"
  };
});

gantt.Event.on("scrollTop", (val) => (scrollTop.value = val));
gantt.Event.on("setChartHeight", (val: number) => (chartHeight.value = val));
gantt.Event.on("setTimeList", (val) => (timeList.value = val));
gantt.Event.on("updateDgrid", () => dGrid.value.update());

onMounted(() => {
  gantt.init(_gantt.value!, lineTool.value);
  gantt.barHeight = props.barHeight;
  gantt.timeHeight = props.timeHeight;

  emit("loaded", {
    dom: _gantt.value,
    data: gantt.ganttData as iGanttData
  });
});

onBeforeUnmount(() => {
  gantt.unload();
});
</script>

<style>
.H_chartGantt-splitLine {
  cursor: ew-resize;
  background-color: var(--col-bg-3);
  width: 5px;
}

.H_chartGantt {
  position: relative;
  display: flex;
  overflow: hidden;
  font-size: 11px;
  border: 1px solid var(--col-bg-5);
  border-radius: 4px;
  height: 100%;
  flex: 1;
}
.H_chartGantt_grid {
  min-width: 290px;
  width: 290px;
  display: grid;
  grid-template-rows: 1fr;
  z-index: 1;
  height: 100%;
}
.H_chartGantt_box {
  z-index: 0;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  height: 100%;
}
.H_chartGantt_scroll {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 11px;
  max-width: 11px;
  background-color: var(--col-bg-2);
  /* border: 1px solid var(--col-bg-5); */
}

.H_chartGantt_scroll_top {
  min-height: 44px;
  /* border-left: 1px solid var(--col-bg-5); */
  /* border-bottom: 1px solid var(--col-bg-5); */
}

.H_chartGantt_scroll_bar {
  overflow-y: scroll;
}

.H_chartGantt_scroll_dummi {
  height: 100%;
}

.H_chartGantt_scroll_bottom {
  min-height: 11px;
}

.H_chartGantt_svg {
  position: absolute;
  left: 0;
  top: 0;
  user-select: none;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: visible;
}

.H_chartGantt__content {
  overflow: hidden;
  overflow-x: auto;
  height: 100%;
  width: 100%;
}

.H_chartGantt__chartContainer {
  position: absolute;
  overflow: hidden;
  overflow-y: scroll;
  left: 0;
  top: 0;
  flex: 1;
  width: 100%;
  height: 100%;
}

.H_chartGantt__chartContainer::-webkit-scrollbar {
  display: none;
}

.H_chartGantt__chartContent {
  width: 100%;
  height: 100%;
}

.H_chartGantt__content > .H_virtualList-scroller {
  position: relative;
  min-width: 100%;
  /* overflow: hidden; */
}

.gantt__Item {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  font-size: 11px;
  line-height: 11px;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--col-bg-3);
  overflow: visible;
  pointer-events: none;
  user-select: none;
  min-height: var(--gantt-bar-height);
  max-height: var(--gantt-bar-height);
}

.gantt__Item:nth-child(even) {
  background-color: var(--col-bg-1);
}

.gantt__Item_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: calc(var(--gantt-bar-height) / 1.4);
  max-height: calc(var(--gantt-bar-height) / 1.4);
  background-color: rgb(247, 132, 132);
  overflow: visible;
  pointer-events: all;
  user-select: none;
  cursor: pointer;
  border-radius: 18px;
  z-index: 2;
}

.gantt__Item_bar.gantt__Item_milestone {
  background-color: transparent;
  border-radius: 0;
  min-width: calc(var(--gantt-bar-height) / 1.1);
  max-width: calc(var(--gantt-bar-height) / 1.1);
}

.gantt__Item_milestone_diamond {
  min-height: calc(var(--gantt-bar-height) / 1.5);
  max-height: calc(var(--gantt-bar-height) / 1.5);
  min-width: calc(var(--gantt-bar-height) / 1.5);
  max-width: calc(var(--gantt-bar-height) / 1.5);
  pointer-events: none;
  margin-right: calc(var(--gantt-bar-height) / 4);
  background-color: orange;
  transform: rotate(45deg);
}

.gantt__Item_bar_progress {
  position: absolute;
  background-color: black;
  height: 100%;
  right: 0;
  opacity: 0.1;
  pointer-events: none;
  user-select: none;
}

.gantt__Item_milestone_text {
  position: absolute;
  white-space: nowrap;
  pointer-events: none;
  margin-left: 16px;
  left: 100%;
}

.gantt__Item_marker {
  position: absolute;
  width: 2px;
  height: 100%;
  z-index: 99;
}

.gantt__Item_marker_text {
  position: absolute;
  padding: 0 5px;
}

.gantt__Item_group {
  background-color: rgb(111, 111, 235);
  color: white;
  cursor: default;
}

.gantt__Item_group.gantt__Item_bar_textOverflow .gantt__Item_bar_text {
  color: black;
}

.gantt__Item_bar_text {
  position: absolute;
  white-space: nowrap;
  pointer-events: none;
}

.gantt__Item_bar_textOverflow .gantt__Item_bar_text {
  left: 100%;
  margin-left: 16px;
}

.gantt__Item_bar_connectRight {
  position: absolute;
  height: calc(var(--gantt-bar-height) / 2.5);
  width: calc(var(--gantt-bar-height) / 2.5);
  background-color: aqua;
  border-radius: 50%;
  right: calc(0px - var(--gantt-bar-height) / 2.2);
  opacity: 0;
  cursor: pointer;
  pointer-events: all;
}

.gantt__Item_bar_connectRight:hover {
  opacity: 1;
}

.gantt__Item_bar_connectLeft {
  position: absolute;
  height: calc(var(--gantt-bar-height) / 2.5);
  width: calc(var(--gantt-bar-height) / 2.5);
  background-color: aqua;
  border-radius: 50%;
  left: calc(0px - var(--gantt-bar-height) / 2.2);
  opacity: 0;
  user-select: none;
  cursor: pointer;
  visibility: hidden;
  pointer-events: all;
}

.connectToolActive .gantt__Item_bar_connectLeft {
  visibility: visible;
}

.gantt__Item_bar_connectLeft:hover {
  opacity: 1;
}

.gantt__Item_bar_dragLeft {
  position: absolute;
  cursor: col-resize;
  left: 0;
  height: 100%;
  width: calc(var(--gantt-bar-height) / 4);
  border-radius: var(--gantt-bar-height) 0 0 var(--gantt-bar-height);
  opacity: 0;
  background-image: repeating-linear-gradient(45deg, black 25%, white 25%, white 75%, black 75%, black);
  background-position: 0;
  background-size: 1px 1px;
  pointer-events: all;
}

.gantt__Item_bar_dragLeft:hover {
  opacity: 1;
}

.gantt__Item_bar_dragRight {
  position: absolute;
  cursor: col-resize;
  right: 0;
  height: 100%;
  width: calc(var(--gantt-bar-height) / 4);
  background-image: repeating-linear-gradient(45deg, black 25%, white 25%, white 75%, black 75%, black);
  background-position: 0;
  background-size: 1px 1px;
  opacity: 0;
  border-radius: 0 var(--gantt-bar-height) var(--gantt-bar-height) 0;
  pointer-events: all;
}

.gantt__Item_bar_dragRight:hover {
  opacity: 1;
}

.ganttConnector {
  stroke: gray;
  stroke-width: 2;
  fill: none;
}
.ganttConnector:hover {
  stroke: lime;
  stroke-width: 4;
  cursor: pointer;
}
.H_chartGantt_lineTool {
  stroke: orange;
  stroke-width: 2;
  stroke-dasharray: 5.5;
  fill: none;
}
</style>
