<template>
  <!-- <div class="ganttTimeItem"> -->
  <div class="ganttTimeItem__head">
    <div class="ganttTimeItem__head_value">
      {{ Header }}
    </div>
  </div>
  <div class="ganttTimeItem__values">
    <div class="ganttTimeItem__values_item" :key="item" v-for="item in dayList">
      <div class="ganttTimeItem__values_value">{{ item }}</div>
    </div>
  </div>
  <!-- <div class="ganttTimeItem__valuesGrid">
    <div class="ganttTimeItem__valuesgrid_item" :data-id="item" v-for="item in dayList"></div>
  </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { iGanttTimeItem } from "./makeTimelist";
import { getDaysInMonth } from "../../../../utils/dateFunctions";

const monthNames = [
  "January",
  "Febuary",
  "Marts",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const props = defineProps({
  timeData: { type: Object as PropType<iGanttTimeItem>, default: [] }
});

const dayList = ref<number[]>([]);
const Header = ref("");

watch(
  () => props.timeData,
  () => {
    MakeDayList();
  }
);

function MakeDayList() {
  Header.value = monthNames[props.timeData.month] + " " + props.timeData.year;
  let days = getDaysInMonth(new Date(props.timeData.year, props.timeData.month, props.timeData.day));
  let day = props.timeData.day;
  if (props.timeData.last) {
    day = 1;
    days = props.timeData.day;
  }
  const _dayList: Array<number> = [];

  for (let i = day; i <= days; i++) {
    _dayList.push(i);
  }
  dayList.value = _dayList;
}
MakeDayList();
</script>

<style>
.ganttTimeItem {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  text-align: center;
  height: calc(var(--gantt-chart-height) + calc(var(--gantt-time-totalheight) - 2px));
  user-select: none;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.ganttTimeItem__head {
  overflow: hidden;
  text-align: center;
  padding: 0 auto;
  user-select: none;
  pointer-events: none;
  line-height: var(--gantt-time-height);
  background-color: var(--col-bg-2);
  border-bottom: 1px solid var(--col-bg-5);
  border-right: 1px solid var(--col-bg-5);
  max-height: var(--gantt-time-height);
  min-height: var(--gantt-time-height);
}

.ganttTimeItem__head_value {
  overflow: hidden;
  text-align: center;
  text-overflow: clip;
  word-break: break-all;
  max-height: var(--gantt-time-height);
  min-height: var(--gantt-time-height);
  max-width: fit-content;
  margin: 0 auto;
}

.ganttTimeItem__values {
  display: flex;
  user-select: none;
  pointer-events: none;
  height: 100%;
}

.ganttTimeItem__values_item {
  line-height: var(--gantt-time-height);
  border-right: 1px solid var(--col-bg-5);
  min-width: 20px;
  max-width: 20px;
  height: 100%;
  user-select: none;
  pointer-events: none;
}
.ganttTimeItem__values_value {
  min-width: 20px;
  max-width: 20px;
  max-height: var(--gantt-time-height);
  min-height: var(--gantt-time-height);
  background-color: var(--col-bg-2);
  border-right: 1px solid var(--col-bg-5);
}
</style>
