<template>
  <!-- <div class="ganttTimeItem"> -->
  <div class="ganttTimeItem__head">
    <div class="ganttTimeItem__head_value">
      {{ Header }}
    </div>
  </div>
  <div class="ganttTimeItem__values">
    <div class="ganttTimeItem__values_item monthItem" :key="item" v-for="item in monthList">
      <div class="ganttTimeItem__values_value">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./ganttTimeItem.css";
import { PropType, ref, watch } from "vue";
import { iGanttTimeItem } from "./makeTimelist";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const props = defineProps({
  timeData: { type: Object as PropType<iGanttTimeItem>, default: [] }
});

const monthList = ref<string[]>([]);
const Header = ref("");

watch(
  () => props.timeData,
  () => {
    MakeDayList();
  }
);

function MakeDayList() {
  Header.value = props.timeData.year.toString();
  const _monthList: Array<string> = [];
  for (var d = new Date(props.timeData.dayFirst); d <= props.timeData.dayLast; d.setMonth(d.getMonth() + 1)) {
    _monthList.push(monthNames[d.getMonth()]);
  }
  monthList.value = _monthList;
}
MakeDayList();
</script>
