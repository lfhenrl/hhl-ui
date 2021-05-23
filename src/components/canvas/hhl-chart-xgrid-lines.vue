<script lang="ts">
import { defineComponent, inject } from "vue";
import { iHHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-xgrid-lines",
  props: {
    modelValue: { type: String, default: "" }
  },
  setup() {
    const ch = inject("ch") as iHHLchart;
    ch.Event.on("update", () => {
      const height = ch.CanvasContainer.clientHeight;
      for (let i = 0; i < ch.X.tickCount; i++) {
        ch.Ctx.beginPath();
        ch.Ctx.strokeStyle = "black";
        ch.Ctx.lineWidth = 0.6;
        ch.Ctx.moveTo(Math.round(ch.PosLeft(i * ch.X.tickSpace)), 0);
        ch.Ctx.lineTo(Math.round(ch.PosLeft(i * ch.X.tickSpace)), height - 43);
        ch.Ctx.stroke();
      }
    });
    return {};
  }
});
</script>
<template>&#32;</template>
