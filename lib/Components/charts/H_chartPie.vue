<template>
  <div class="H_chartPie" :class="cl_pie" :style="{ fontSize: fontSize ? fontSize : 'var(--comp-font-size)' }">
    <svg viewBox="0 0 64 64" class="H_chartPie_pie">
      <circle :style="item.style" v-for="item in pieData" class="H_chartPie_circle">
        <title>{{ item.name }} - {{ item.value }}%</title>
      </circle>
    </svg>
    <div v-if="!hideLegend" class="H_chartPieLegend" :class="cl_legend">
      <div class="H_chartPieLegend__item" v-for="item in pieData">
        <div class="H_chartPieLegend__box" :style="{ backgroundColor: item.color }" />
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

const props = defineProps({
  data: { type: Array as PropType<iPieItem[]>, default: [] },
  legendPlacement: { type: String as PropType<"bottom" | "center" | "top" | "right" | "left">, default: "center" },
  legendStacked: { type: Boolean, default: true },
  hideLegend: { type: Boolean, default: false },
  fontSize: String,
  pieWidth: {
    type: Number,
    default: 20,
    validator: (value: number) => value > 1 && value < 65
  }
});

const cl_pie = computed(() => {
  return {
    H_chartPieLegend_bottom: props.legendPlacement.includes("bottom"),
    H_chartPieLegend_center: props.legendPlacement.includes("center"),
    H_chartPieLegend_top: props.legendPlacement.includes("top"),
    H_chartPieLegend_left: props.legendPlacement.includes("left"),
    H_chartPieLegend_right: props.legendPlacement.includes("right")
  };
});

const cl_legend = computed(() => {
  return {
    H_chartPieLegendBox_center: props.legendPlacement.includes("center"),
    H_chartPieLegendBox_stacked: props.legendStacked
  };
});

const pieData = ref<any>([]);

watch(
  () => props.data,
  () => {
    pieData.value = [];
    setTimeout(() => {
      let runningSum = -25;
      pieData.value = props.data.map((item: iPieItem) => {
        const rotate = (360 / 100) * runningSum;
        const d = {
          name: item.name,
          value: item.value.toFixed(1),
          color: item.color,
          rotate,
          style: {
            "stroke-dasharray": `${item.value * 2 + 0.2} 200`,
            stroke: item.color,
            transform: `rotate(${-90}deg)`
          }
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
.H_chartPie {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: relative;
  padding: 0;
  font-family: var(--comp-font-family);
}

.H_chartPie.H_chartPieLegend_bottom {
  flex-direction: column;
}

.H_chartPieLegend_center {
  flex-direction: column;
}

.H_chartPieLegend_top {
  flex-direction: column-reverse;
}

.H_chartPieLegend_left {
  flex-direction: row;
}

.H_chartPieLegend_right {
  flex-direction: row-reverse;
}

.H_chartPie_pie {
  width: 100%;
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

.H_chartPieLegend {
  position: relative;
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0;
}

.H_chartPieLegendBox_center {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  flex: 0;
}

.H_chartPieLegendBox_stacked {
  display: flex;
  flex-direction: column;
  flex: 0;
}

.H_chartPieLegend__item {
  display: flex;
  align-items: center;
  line-height: 1em;
  font-size: 0.7em;
  margin: 4px;
  white-space: nowrap;
}

.H_chartPieLegend__box {
  min-height: 1em;
  min-width: 1em;
  max-height: 1em;
  max-width: 1em;
  margin-right: 4px;
}
</style>
