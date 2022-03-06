<template>
  <div class="H_chartGantt">
    <div class="H_chartGantt_inner">
      <canvas ref="canvasScale" class="H_chartGantt_scale" />
      <canvas ref="canvasChart" class="H_chartGantt_chart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { chartGantt, iChartGantt } from "./common";
const canvasScale = ref<HTMLCanvasElement>();
const canvasChart = ref<HTMLCanvasElement>();
let gantt: iChartGantt;

onMounted(() => {
  gantt = new chartGantt(canvasScale.value!, canvasChart.value!);

  gantt.startDate = new Date(2018, 11, 27, 0);
  gantt.endDate = new Date(2023, 1, 5);
  gantt.load();

  // ctx.fillText("Januar 2022", 300, GridTimeHeight * 0.75);
});
</script>

<style>
.H_chartGantt {
  position: relative;
  margin: 10px;
  overflow: hidden;
}

.H_chartGantt_inner {
  position: relative;
  overflow: auto;
}

.H_chartGantt_scale {
  padding: 0;
}

.H_chartGantt_chart {
  position: absolute;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
