<template>
  <div
    class="hhl-chart-zoombox"
    v-if="pos.show"
    :style="{
      top: pos.top + 'px',
      left: pos.left + 'px',
      height: pos.height + '%',
      width: pos.width + 'px'
    }"
  ></div>
  <div class="hhl-chart-zoombox-warn" v-if="maxZoom">You have reached the maximum zoom value!!</div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from "vue";
import { iHHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-zoombox",

  setup() {
    const ch = inject("ch") as iHHLchart;
    const maxZoom = ref(false);
    const pos = reactive({
      top: 0,
      left: 500,
      width: 100,
      height: 100,
      show: false
    });

    ch.Event.on("mouse.move", () => {});

    ch.Event.on("mouse.zoombox", (rect: any) => {
      pos.left = rect.left - ch.CanvasContainer.scrollLeft;
      pos.width = rect.width;
      pos.top = 0;
      if (rect.mouseDown) {
        pos.show = true;
      } else {
        const startTime = ch.GetTimeFromPixel(rect.left);

        let zoomlevel = ch.CanvasContainer.scrollWidth / rect.width;
        if (ch.X.maxZoomFaktor < zoomlevel) {
          maxZoom.value = true;
          zoomlevel = ch.X.maxZoomFaktor;
        }
        ch.ZoomX(zoomlevel);

        setTimeout(() => {
          if (maxZoom.value) {
            setTimeout(() => (maxZoom.value = false), 3000);
          }
    
          ch.CanvasContainer.scrollLeft = ch.GetPixelFromTime(startTime);
          pos.show = false;
        }, 5);
      }
    });

    return { pos, maxZoom };
  }
});
</script>

<style>
.hhl-chart-zoombox {
  grid-area: main;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.13);
  pointer-events: none;
}
.hhl-chart-zoombox-warn {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%);
  background-color: red;
  color: white;
  border-radius: 4px;
  padding: 5px;
}
</style>
