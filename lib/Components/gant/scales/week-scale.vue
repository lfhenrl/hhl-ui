<template>
  <div class="week-scale">
    <div class="week-scale-header">
      <div class="week-scale-head">{{ getWeek(startDate) }}</div>
      <div class="week-scale-body">
        <div class="week-scale-item">man</div>
        <div class="week-scale-item">tir</div>
        <div class="week-scale-item">ons</div>
        <div class="week-scale-item">tor</div>
        <div class="week-scale-item">fre</div>
        <div class="week-scale-item">lør</div>
        <div class="week-scale-item">søn</div>
      </div>
    </div>
    <div class="week-scale-grid">
      <div class="week-scale-item"></div>
      <div class="week-scale-item"></div>
      <div class="week-scale-item"></div>
      <div class="week-scale-item"></div>
      <div class="week-scale-item"></div>
      <div class="week-scale-item holyday"></div>
      <div class="week-scale-item holyday"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { iScaleItem } from "./getScaleList";
import { DateGetWeek } from "../../../utils/dateFunctions";
import { D_01_dec_2021 } from "../../../utils/dateFormat";

defineProps({
  startDate: { type: Object as PropType<iScaleItem>, default: {} },
});

function getWeek(item: iScaleItem) {
  const w = DateGetWeek(item.dayFirst);
  const d = D_01_dec_2021(item.dayFirst);
  return d + " w" + w;
}
</script>

<style>
.week-scale {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 12px;
}
.week-scale-header {
  position: sticky;
  top: 0;
  background-color: var(--col-bg-1);
  max-height: 38px;
  min-height: 38px;
  border-bottom: 1px solid var(--col-bg-3);
}
.week-scale-head {
  text-align: center;
  border-bottom: 1px solid var(--col-bg-3);
}
.week-scale-body {
  display: flex;
}
.week-scale-item {
  padding: 0 4px;
  width: 35px;
  text-align: center;
  border-right: 1px solid var(--col-bg-3);
}

.week-scale-grid {
  display: flex;
  height: var(--gantt-scroll-height);
}

.holyday {
  background-color: var(--col-bg-1);
}
</style>
