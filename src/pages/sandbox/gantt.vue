<template>
  <div class="gantt relative">
    <H_virtualList data-key="id" :data-sources="dataList" direction="horizontal" class="ganttList" :keeps="5">
      <template v-slot="data">
        <GanttTimeItem :time-data="data.item" />
      </template>
      <template v-slot:absoluteItems>
        <!-- <gantt_item :item="item" :global-start-time="dataList[0].id" :index="index" v-for="(item, index) in gData" /> -->
        <canvas class="gantt_svg"> </canvas>
      </template>
    </H_virtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import gantt_item from "./gantt_item.vue";
import { iGanttTimeItem, makeTimelist } from "../../../lib/Components/gantt/makeTimelist";
const startDate = new Date(2022, 0, 0, 0);
const endDate = new Date(2023, 1, 2);
const dataList = ref<iGanttTimeItem[]>(makeTimelist(startDate, endDate));

// const gData = [
//   { id: 1, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 3, 0) },
//   { id: 2, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 3, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 4, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 5, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 6, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 7, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 8, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 9, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 10, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 11, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 12, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 13, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 14, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) },
//   { id: 15, startTime: new Date(2019, 0, 2, 0), endTime: new Date(2019, 0, 22, 0) },
//   { id: 16, startTime: new Date(2019, 1, 2, 0), endTime: new Date(2019, 1, 22, 0) }
// ];
</script>

<style>
.gantt {
  overflow: hidden;
}

.gantt_svg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 255, 0.445);
}

.ganttList {
  overflow: auto;
  height: 80vh;
}

.H_virtualList-scroller {
  height: 100%;
  position: relative;
}
</style>
