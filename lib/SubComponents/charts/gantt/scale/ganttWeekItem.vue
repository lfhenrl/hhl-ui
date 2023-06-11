<template>
  <!-- <div class="ganttTimeItem"> -->
  <div class="ganttTimeItem__head">
    <div class="ganttTimeItem__head_value">
      <span v-if="dayList.length > 1">{{ Header }}</span>
    </div>
  </div>
  <div class="ganttTimeItem__values">
    <div
      class="ganttTimeItem__values_item weekItem"
      :class="{ ganttTimeItem__values_item__border: item.last }"
      :style="{ maxWidth: item.dayCount * 3 + 'px', minWidth: item.dayCount * 3 + 'px' }"
      :key="item"
      v-for="item in dayList"
    >
      <div class="ganttTimeItem__values_value">
        <div v-if="item.last" :class="{ ganttTimeItem__values_padLeft: item.last && item.dayCount < 6 }">{{
          item.week
        }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./ganttTimeItem.css";
import { PropType, ref, watch } from "vue";
import { iGanttTimeItem } from "./makeTimelist";
import { DateAddDays, DateGetWeek } from "../../../../utils/dateFunctions";

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

const dayList = ref<any[]>([]);
const Header = ref("");

watch(
  () => props.timeData,
  () => {
    MakeDayList();
  }
);

function MakeDayList() {
  Header.value = monthNames[props.timeData.month] + " " + props.timeData.year;
  const list = {};
  let index = 0;

  for (var d = new Date(props.timeData.dayFirst); d <= props.timeData.dayLast; d.setDate(d.getDate() + 1)) {
    const w = DateGetWeek(d);
    const wNext = DateGetWeek(DateAddDays(d, 1));
    if (list[w]) {
      list[w].dayCount = list[w].dayCount + 1;
      if (w !== wNext) {
        list[w].last = true;
      }
    } else {
      list[w] = {
        week: w,
        dayCount: 1,
        last: w !== wNext ? true : false,
        index
      };
    }
    index = index + 1;
  }
  const arr = Object.values(list);
  const sorted = arr.sort((a: any, b: any) => {
    return a.index - b.index;
  });

  dayList.value = sorted;
}
MakeDayList();
</script>
