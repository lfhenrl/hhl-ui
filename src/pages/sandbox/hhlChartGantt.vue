<template>
  <div class="gantt relative"><H_chartGantt /></div>
</template>

<script setup lang="ts">
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
