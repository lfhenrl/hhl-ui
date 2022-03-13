<template>
  <div class="H_gantt">
    <H_chartGantt :start-date="new Date(2019, 0, 0, 0)" :end-date="new Date(2022, 0, 0, 0)" :data="gData" />
  </div>
</template>

<script setup lang="ts">
import gData from "../../testData/ganttData";
</script>

<style>
.H_gantt {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  height: 90vh;
}
</style>
