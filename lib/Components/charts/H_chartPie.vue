<template>
  <div
    class="H_chartPie relative flex items-center justify-center p-0"
    :class="cl_pie"
    :style="{ fontSize: fontSize }"
  >
    <svg viewBox="0 0 64 64" class="H_chartPie_pie w-full rounded-full">
      <circle
        :style="item.style"
        v-for="item in pieData"
        class="H_chartPie_circle"
      >
        <title>{{ item.name }} - {{ item.value }}%</title>
      </circle>
    </svg>
    <div
      v-if="!hideLegend"
      class="flex-0 relative inline-flex flex-wrap justify-center"
      :class="cl_legend"
    >
      <div
        class="m-0.5 flex items-center whitespace-nowrap text-xs"
        v-for="item in pieData"
      >
        <div class="mr-1 h-3 w-3" :style="{ backgroundColor: item.color }" />
        {{ item.name }} ({{ item.value }}%)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";

type iPieItem = {
  name: string;
  value: number;
  color: string;
};

const P = defineProps({
  data: { type: Array as PropType<iPieItem[]>, default: [] },
  legendPlacement: {
    type: String as PropType<"bottom" | "center" | "top" | "right" | "left">,
    default: "center",
  },
  legendStacked: { type: Boolean, default: true },
  hideLegend: { type: Boolean, default: false },
  fontSize: { type: String, default: "14px" },
  pieWidth: {
    type: Number,
    default: 20,
    validator: (value: number) => value > 1 && value < 65,
  },
});

const cl_pie = computed(() => {
  return {
    "flex-col":
      P.legendPlacement.includes("bottom") ||
      P.legendPlacement.includes("center"),
    "flex-col-reverse": P.legendPlacement.includes("top"),
    "flex-row-reverse": P.legendPlacement.includes("left"),
    "flex-row": P.legendPlacement.includes("right"),
  };
});

const cl_legend = computed(() => {
  return {
    "inline-flex absolute flex-col flex-0 justify-content-center":
      P.legendPlacement.includes("center"),
    "flex flex-0 flex-col": P.legendStacked,
  };
});

const pieData = ref<any>([]);

watch(
  () => P.data,
  () => {
    pieData.value = [];
    setTimeout(() => {
      let runningSum = -25;
      pieData.value = P.data.map((item: iPieItem) => {
        const rotate = (360 / 100) * runningSum;
        const d = {
          name: item.name,
          value: item.value.toFixed(1),
          color: item.color,
          rotate,
          style: {
            "stroke-dasharray": `${item.value * 2 + 0.2} 200`,
            stroke: item.color,
            transform: `rotate(${-90}deg)`,
          },
        };
        runningSum = runningSum + item.value;
        return d;
      });
      setTimeout(() => {
        pieData.value.forEach((element: any) => {
          element.style.transform = `rotate(${element.rotate}deg)`;
        });
      }, 50);
    }, 50);
  },
  { immediate: true },
);
</script>

<style>
.H_chartPie_circle {
  fill: none;
  stroke-width: v-bind(pieWidth);
  r: 50%;
  cx: 50%;
  cy: 50%;
  transform-origin: center;
  transition: transform 0.8s ease-in-out;
}
</style>
