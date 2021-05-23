<script lang="ts">
import { defineComponent, inject } from "vue";
import { iHHLchart } from "./use/hhlChart";
import { DateAddSeconds } from "../utils/dateFunctions";
import {  D_HHMM, D_01_dec, D_2021 } from "../utils/dateFormat";

const timeArray = [
  31536000,
  25920000,
  15552000,
  10368000,
  5184000,
  2592000,
  864000,
  345600,
  259200,
  172800,
  86400,
  43200,
  21600,
  14400,
  10800,
  7200,
  3600,
  1800,
  900,
  600,
  300,
  120,
  60,
  30,
  10,
  1
];

export default defineComponent({
  name: "hhl-chart-xscale-time",
  props: {
    modelValue: { type: String, default: "" }
  },
  setup() {
    const ch = inject("ch") as iHHLchart;

    ch.Event.on("update", () => {
      if (!ch.Data?.Xmin && !ch.Data?.Xmax) return;
      const totalSeconds = (ch.Data.Xmax - ch.Data.Xmin) / 1000;
      if (totalSeconds < 1) return;

      const height = ch.CanvasContainer.clientHeight;
      const scaleMaxWidth = ch.CanvasContainer.clientWidth;
      const chartWidth = scaleMaxWidth * ch.X.zoomFaktor - ch.Margin.right - ch.Margin.left;

      const w = chartWidth / totalSeconds;
      const ww = totalSeconds / chartWidth;
      ch.X.faktor = w;
      ch.X.pixelFaktor = ww;

      const goal = 60;
      var closest = timeArray.reduce(function (prev, curr) {
        return Math.abs(curr * w - goal) < Math.abs(prev * w - goal) ? curr : prev;
      });

      let tick = closest * w;
      let tickCount = chartWidth / tick;

      ch.X.tickCount = tickCount;
      ch.X.tickSpace = tick * ww;

      let dato = new Date(ch.Data.Xmin);
      for (let i = 0; i < tickCount; i++) {
        renderText(dato, height - 38, Math.round(ch.Margin.left + i * tick));
        dato = DateAddSeconds(dato, closest);
      }
    });

    function renderText(dato: Date, top: number, left: number) {
      const div = document.createElement("div");
      div.innerHTML = `${D_HHMM(dato)} <br/> ${D_01_dec(dato)} <br/> ${D_2021(dato)} `;
      div.className = "hhl-chart-timescale-text";
      div.style.left = left + "px";
      div.style.top = top + "px";
      ch.Div.appendChild(div);
    }
    return {};
  }
});
</script>
<template>&#32;</template>
<style>
.hhl-chart-timescale-text {
  position: absolute;
  font-size: 10px;
  text-align: center;
  transform: translate(-50%, 0);
  width: 36px;
  line-height: 12px;
  pointer-events: none;
}
</style>
