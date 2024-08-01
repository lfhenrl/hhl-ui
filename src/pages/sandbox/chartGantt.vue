<template>
  <H_datePicker label="Date" v-model="dato"></H_datePicker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_datePicker from "../../../lib/Components/H_datePicker.vue";

const dato = ref(new Date());
</script>

<!-- <template>
  <div class="overflow-auto">
    <hhl-chart @ready="ready">
      <div class="hhl-chart-header">
        <div class="header-left flex-1">
          <hhl-chart-btn type="refresh" />
          <hhl-chart-btn type="zoomfit" />
          <hhl-chart-btn type="print" />
        </div>
        <div class="header-center flex-1 text-center">Header</div>
        <div class="header-right flex-1 text-right"></div>
      </div> -->

<!-- <div class="hhl-chart-footer">Footer</div> -->

<!-- <div class="rotate hhl-chart-left">Left</div> -->
<!--  <hhl-chart-yscale-band :item-height="40" /> -->

<!-- <div class="rotate hhl-chart-right">Right</div> -->

<!--       <hhl-chart-xscale-time class="hhl-chart-bottom-scale" />

      <hhl-chart-legend />

      <hhl-chart-zoombox />
      <hhl-chart-hover-box />
      <hhl-chart-tooltip v-slot="data">
        <div class="box">
          <span class="label">Start:</span>
          <span class="text">{{ D_01_dec_2021_HHMMSS(data.item.start) }}</span>
        </div>
        <div class="box">
          <span class="label">End:</span>
          <span class="text">{{ D_01_dec_2021_HHMMSS(data.item.end) }}</span>
        </div>
        <div class="box">
          <span class="label">Duration:</span>
          <span class="text">{{ data.item.duration }}</span>
          <span class="label">Color:</span>
          <span class="text">{{ data.item.color }}</span>
        </div>
      </hhl-chart-tooltip>
      <hhl-chart-xgrid-lines />
      <hhl-gantt />
    </hhl-chart>
  </div>
</template> -->

<!-- <script lang="ts">
import { defineComponent } from "vue";
import { iHHLchart } from "../../components/canvas/use/hhlChart";
import { testData } from "../../components/canvas/data";
import { D_01_dec_2021_HHMMSS } from "../../../lib/utils/dateFormat";
import { getStops } from "../../components/canvas/data_EventLog";

export default defineComponent({
  name: "chart_gantt",
  setup() {
    let ch: iHHLchart;
    const data = ref(testData(24));

     async function ready(chart: iHHLchart) {
      ch = chart;
      ch.Event.on("refresh", Refresh);
    }

    async function Refresh() { 
      const startTime = new Date("2020-9-4");
      const endTime = new Date("2020-9-4 13:00");
      const stops = await getStops(startTime.toJSON(), endTime.toJSON());

      const val = {
      Xmin: startTime.valueOf(),
      Xmax: endTime.valueOf(),
      items: Object.freeze(stops.gData_1)
      };

       const d = testData(240);

      const val = {
        Xmin: d.x.min,
        Xmax: d.x.max,
        items: Object.freeze(d.x.items)
      };

      ch.SetData(val);
    }

    return { D_01_dec_2021_HHMMSS, ready };
  }
});
</script>
 -->
