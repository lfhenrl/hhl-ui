<template>
  <div
    class="hhl-chart-hover-box"
    v-if="pos.show"
    :style="{
      top: pos.top + 'px',
      left: pos.left + 'px',
      height: pos.height + 'px',
      width: pos.width + 'px'
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { iHHLchart, iShape } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-hover-box",
  props: {
    width: { type: String, default: "200px" }
  },
  setup() {
    const ch = inject("ch") as iHHLchart;

    const pos = reactive({
      top: 100,
      left: 100,
      width: 100,
      height: 100,
      show: false
    });

    ch.Event.on("mouse.over", (shape: iShape) => {
      let width = shape.ch.PosLeftRaw(shape.width - shape.left);
      let left = shape.ch.PosLeft(shape.left) - ch.CanvasContainer.scrollLeft;

      if (left < 0) {
        width = width + left;
        left = 0;
      }
      if (left + width > ch.CanvasContainer.clientWidth) {
        width = ch.CanvasContainer.clientWidth - left;
      }

      pos.left = left;
      pos.height = shape.height;
      pos.width = width;
      pos.top = shape.top;
      pos.show = true;
    });

    ch.Event.on("mouse.out", () => {
      pos.left = 0;
      pos.height = 0;
      pos.width = 0;
      pos.top = 0;
      pos.show = false;
    });

    return {
      pos
    };
  }
});
</script>

<style>
.hhl-chart-hover-box {
  grid-area: main;
  position: absolute;
  overflow: hidden;
  margin: 0;
  height: 0;
  width: 0;
  outline: black dotted 2px;
}
</style>
