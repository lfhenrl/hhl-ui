<template>
  <div ref="hhlChart" class="hhl-chart">
    <div class="hhl-chart-main">
      <canvas class="hhl-chart-main_canvas" />
      <div class="hhl-chart-main_div" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, provide } from "vue";
import { HHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart",
  props: {
    data: { type: Object, default: {} }
  },
  setup({}, { emit }) {
    const hhlChart = ref();
    const ch = new HHLchart(hhlChart);
    provide("ch", ch);

    onMounted(() => {
      ch.Init();
      emit("ready", ch);
    });

    return {
      hhlChart
    };
  }
});
</script>

<style>
.hhl-chart-printActive {
  display: none;
}

.hhl-chart {
  overflow: hidden;
  display: grid;
  position: relative;
  margin: 10px;
  box-shadow: var(--shadow-1);
  grid-template-columns: auto auto 1fr auto auto;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header header"
    "left left-scale main right-scale right"
    "left . scroller . right"
    "footer footer footer footer footer";
}



.hhl-chart-main {
  position: relative;
  grid-area: main;
  overflow-x: scroll;
}

.hhl-chart-header {
  display: flex;
  grid-area: header;
  align-items: center;
  border-bottom: 1px rgb(201, 200, 200) solid;
  padding: 5px;
}
.hhl-chart-footer {
  grid-area: footer;
  text-align: center;
}
.hhl-chart-left {
  grid-area: left;
}

.hhl-chart-right {
  grid-area: right;
}

.hhl-chart .rotate {
  writing-mode: vertical-rl;
}

.hhl-chart-main_canvas {
  display: block;
}

@media print {
  @page {
    size: A4 landscape;
    margin: 30px;
    width: auto;
  }
  body,
  .hhl-btn {
    visibility: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .hhl-chart {
    margin: 0;
    visibility: visible;
    transform-origin: 0 0;
    box-shadow: none;
  }
  .hhl-chart-main {
    border: 1px solid rgb(201, 200, 200);
  }
  .hhl-chart-header {
    border: none;
  }
}

</style>
