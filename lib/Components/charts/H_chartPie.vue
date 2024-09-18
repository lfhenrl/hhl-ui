<template>
  <div class="H_chartPie" :class="cl_pie" :style="{ fontSize: fontSize }">
    <svg viewBox="0 0 64 64" class="H_chartPie_pie">
      <circle :style="item.style" v-for="item in pieData" class="H_chartPie_circle">
        <title>{{ item.name }} - {{ item.value }}%</title>
      </circle>
    </svg>
    <div v-if="!hideLegend" class="H_chartPie-legend" :class="cl_legend">
      <div class="H_chartPie-pieData" v-for="item in pieData">
        <div class="H_chartPie-pieData-item" :style="{ backgroundColor: item.color }" />
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
    type: String as PropType<"bottom" | "top" | "right" | "left">,
    default: "bottom",
  },
  legendStacked: { type: Boolean, default: true },
  hideLegend: { type: Boolean, default: false },
  fontSize: { type: String, default: "14px" },
  size: { type: String, default: "200px" },
  pieWidth: {
    type: Number,
    default: 20,
    validator: (value: number) => value > 1 && value < 65,
  },
});

const cl_pie = computed(() => {
  return {
    Placement_bottom: P.legendPlacement.includes("bottom"),
    Placement_top: P.legendPlacement.includes("top"),
    Placement_left: P.legendPlacement.includes("left"),
    Placement_right: P.legendPlacement.includes("right"),
  };
});

const cl_legend = computed(() => {
  return {
    legendStacked: P.legendStacked,
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
  { immediate: true }
);
</script>

<style>
@layer hhl-components {
  .Placement_bottom {
    flex-direction: column;
  }
  .Placement_right {
    flex-direction: row;
  }
  .Placement_top {
    flex-direction: column-reverse;
  }
  .Placement_left {
    flex-direction: row-reverse;
  }
  .H_chartPie {
    display: flex;
    flex: 0 0 0%;
    position: relative;
    align-items: center;
    padding: 0;
    gap: 10px;
  }

  .H_chartPie_pie {
    width: v-bind(size);
    border-radius: 50%;
  }

  .H_chartPie_circle {
    fill: none;
    stroke-width: v-bind(pieWidth);
    r: 50%;
    cx: 50%;
    cy: 50%;
    transform-origin: center;
    transition: transform 0.8s ease-in-out;
  }

  .H_chartPie-legend {
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }
  .H_chartPie-legend.legendStacked {
    flex-direction: column;
  }

  .H_chartPie-pieData {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin: 2px;
  }

  .H_chartPie-pieData-item {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
}
</style>
