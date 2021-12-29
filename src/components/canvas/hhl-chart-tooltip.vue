<template>
  <div
    class="hhl-chart-tooltip"
    :style="{
      top: pos.top + 'px',
      left: pos.left + 'px',
      height: pos.height + 'px',
      width: pos.width + 'px',
      opacity: pos.opacity,
      'border-color': pos.color
    }"
  >
    <slot :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from "vue";
import { iHHLchart, iShape } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-tooltip",
  props: {
    width: { type: Number, default: 200 },
    height: { type: Number, default: 50 }
  },
  setup(props) {
    const ch = inject("ch") as iHHLchart;
    let item = ref({}) as any;
    const pos = reactive({
      top: 100,
      left: 100,
      width: 100,
      height: 100,
      opacity: 0,
      color: "black"
    });

    ch.Event.on("mouse.over", (shape: iShape) => {
      item.value = shape.data;
      let width = shape.ch.PosLeftRaw(shape.width - shape.left);
      let left = shape.ch.PosLeft(shape.left) - ch.CanvasContainer.scrollLeft;

      left = left + width / 2 - props.width / 2;
      const maxRight = ch.MainContainer.clientWidth - ch.CanvasContainer.offsetLeft;
      const maxLeft = -ch.CanvasContainer.offsetLeft;
      if (left + props.width + 2 > maxRight) {
        left = maxRight - props.width - 5;
      }
      if (left < maxLeft) {
        left = maxLeft + 5;
      }

      let top = 0;
      const spaceTop = shape.top + ch.CanvasContainer.offsetTop;
      const spaceBottom = ch.MainContainer.scrollHeight - ch.CanvasContainer.offsetTop - (shape.top + shape.height);
      if (spaceTop > spaceBottom) {
        top = shape.top - props.height - 5;
      } else {
        top = shape.top + shape.height + 5;
      }

      const maxTop = -ch.CanvasContainer.offsetTop;
      const maxBottom = ch.MainContainer.scrollHeight - ch.CanvasContainer.offsetTop - props.height;

      if (top < maxTop) {
        top = maxTop + 5;
      }

      if (top > maxBottom) {
        top = maxBottom - 5;
      }

      pos.top = top;
      pos.left = left;
      pos.height = props.height;
      pos.width = props.width;
      pos.opacity = 1;
      pos.color = shape.color;
    });

    ch.Event.on("mouse.out", () => {
      item.value = {};
      pos.left = ch.MainContainer.clientWidth / 2 - props.width / 2;
      pos.height = 0;
      pos.width = 0;
      pos.top = 0;
      pos.opacity = 0;
      pos.color = "black";
    });

    return {
      pos,
      item
    };
  }
});
</script>

<style>
.hhl-chart-tooltip {
  grid-area: main;
  position: absolute;
  background-color: white;
  color: black;
  border-radius: 5px;
  border-width: 3px;
  border-style: solid;
  height: 0;
  width: 0;
  top: 0;
  left: 50%;
  padding: 4px;
  pointer-events: none;
  transition: all 0.3s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hhl-chart-tooltip .box {
  font-size: 12px;
  line-height: 14px;
}
.hhl-chart-tooltip .box .label {
  font-weight: bold;
  margin-right: 4px;
}
.hhl-chart-tooltip .box .text {
  margin-right: 11px;
}
</style>
