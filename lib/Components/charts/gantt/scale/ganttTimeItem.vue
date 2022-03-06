<template>
  <div class="ganttTimeItem">
    <div class="ganttTimeItem__head">
      {{ Header }}
    </div>
    <div class="ganttTimeItem__values">
      <div class="ganttTimeItem__values_item" v-for="item in dayList">
        {{ item }}
      </div>
    </div>
    <div class="ganttTimeItem__valuesGrid">
      <div class="ganttTimeItem__valuesgrid_item" :data-id="item" v-for="item in dayList"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
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

const timeData = props.timeData;
const Header = monthNames[timeData.month] + " " + timeData.year;

function MakeDayList() {
  let days = getDaysInMonth(new Date(timeData.year, timeData.month, timeData.day));
  let day = timeData.day;
  if (timeData.last) {
    day = 1;
    days = timeData.day;
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
  border-top: 1px solid var(--col-bg-5);
  font-size: 10px;
  text-align: center;
  height: 100%;
}

.ganttTimeItem__head {
  border-right: 1px solid var(--col-bg-5);
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-height: 16px;
  min-height: 16px;
}

.ganttTimeItem__values {
  display: flex;
  border-top: 1px solid var(--col-bg-5);
}

.ganttTimeItem__values_item {
  border-right: 1px solid var(--col-bg-5);
  text-align: center;
  min-width: 20px;
  max-width: 20px;
  max-height: 16px;
  min-height: 16px;
}

.ganttTimeItem__valuesGrid {
  height: 100%;
  display: flex;
}

.ganttTimeItem__valuesgrid_item {
  border-right: 1px solid var(--col-bg-5);
  border-top: 1px solid var(--col-bg-5);
  min-width: 20px;
  max-width: 20px;
  height: 100%;
}
</style>
