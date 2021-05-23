<script lang="ts">
import { defineComponent, inject } from "vue";
import { iHHLchart } from "./use/hhlChart";

class Bar {
  shape: Path2D = new Path2D();

  constructor(
    public ch: iHHLchart,
    public left: number,
    public width: number,
    public top: number,
    public height: number,
    public color: string,
    public index: number,
    public data?: any
  ) {}
  draw() {
    if (this.ch.ColorListActive || this.ch.ColorList[this.color]?.active) {
      this.shape = new Path2D();
      this.shape.moveTo(this.ch.PosLeft(this.left), this.top + this.height / 2);
      this.shape.lineTo(this.ch.PosLeft(this.width), this.top + this.height / 2);
      this.ch.Ctx.lineWidth = this.height;
      this.ch.Ctx.strokeStyle = this.color;
      this.ch.Ctx.stroke(this.shape);
    }
    return;
  }
}

export default defineComponent({
  name: "hhl-gantt",
  setup() {
    const ch = inject("ch") as iHHLchart;
    const shapes: Bar[] = [];

    ch.Event.on("newdata", () => {
      const startTime = ch.Data.Xmin / 1000;
      ch.Data.items.forEach((item: any, index: number) => {
        const left = item.start.valueOf() / 1000 - startTime;
        const right = item.end.valueOf() / 1000 - startTime;
        const top = ch.Y.bands.list[item.name].pos;
        const w = ch.Y.bands.size;

        const bar = new Bar(ch, left, right, top, w, item.color, index, item);
        shapes.push(bar);
        ch.MouseObserveList.push(bar);
      });
    });

    ch.Event.on("update", () => {
      shapes.forEach((item) => {
        item.draw();
      });
    });

    return {};
  }
});
</script>
<template>&#32;</template>

<style>
.hhl-gantt {
  overflow: hidden;
}
</style>
