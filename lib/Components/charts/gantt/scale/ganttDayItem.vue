<template>
  <!-- <div class="ganttTimeItem"> -->
  <div class="ganttTimeItem__head">
    <div class="ganttTimeItem__head_value">
      {{ Header }}
    </div>
  </div>
  <div class="ganttTimeItem__values">
    <div class="ganttTimeItem__values_item dayItem" :key="item" v-for="item in dayList">
      <div class="ganttTimeItem__values_value">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./ganttTimeItem.css";
import { PropType, ref, watch } from "vue";
import { iGanttTimeItem } from "./makeTimelist";

const monthNames = [
  "January",
  "Febuary",
  "Marts",
  "April",
  "May",
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
  const _dayList: Array<number> = [];
  for (var d = new Date(props.timeData.dayFirst); d <= props.timeData.dayLast; d.setDate(d.getDate() + 1)) {
    _dayList.push(d.getDate());
  }
  dayList.value = _dayList;
}
MakeDayList();
</script>
