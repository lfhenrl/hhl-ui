import { iChartGantt } from "../common";
import { chartGanttShapeBar } from "./chartGanttShapeBar";

export type iChartGanttChart = InstanceType<typeof chartGanttChart>;
export class chartGanttChart {
  public gantt: iChartGantt;
  public shapes: any = [];
  private oldItem: any;
  private mouseIsDown = false;
  private mouseDownoffSet = 0;

  constructor(_gantt: iChartGantt) {
    this.gantt = _gantt;
    this.gantt.canvasChart.addEventListener("mousemove", this.mousemove.bind(this));
    this.gantt.canvasChart.addEventListener("mousedown", this.mousedown.bind(this));
    document.addEventListener("mouseup", this.mouseup.bind(this));
  }

  draw() {
    this.gantt.ctxChart.clearRect(0, 0, this.gantt.canvasChart.width, this.gantt.canvasChart.height);
    this.gantt.ctxChart.beginPath();
    this.shapes.forEach((item: any) => {
      item.draw();
    });
    console.log("DRAW");
  }

  load() {
    this.gantt.ganttStartTimeSec = this.gantt.startDate.valueOf() / 1000;
    const { data } = this.gantt;

    data.forEach((item: any, index: number) => {
      const { l, w, t, h } = this.getBarPosSize(item.startTime, item.endTime, index, 16);
      const bar = new chartGanttShapeBar(this.gantt, l, w, t, h, "red", index, {});
      this.shapes.push(bar);
    });
    this.draw();
  }

  getBarPosSize(start: Date, end: Date, index: number, height: number) {
    const { secPixcel, ganttStartTimeSec, gridHeight } = this.gantt;

    const testStarttimeSec = start.valueOf() / 1000;
    const testEndtimeSec = end.valueOf() / 1000;
    const leftInSeconds = testStarttimeSec - ganttStartTimeSec;
    const widthInSeconds = testEndtimeSec - testStarttimeSec;

    const l = leftInSeconds * secPixcel;
    const w = (widthInSeconds + leftInSeconds) * secPixcel;
    const hIndex = gridHeight * index;
    let t = this.gantt.ganttChartTop + (gridHeight - height) / 2;
    t = t + hIndex;

    return { l, w, t, h: height };
  }

  mousemove(e: MouseEvent) {
    const x = e.offsetX;
    const y = e.offsetY;

    const mouseOver = this.shapes.find((item: any) => {
      if (this.gantt.ctxChart.isPointInStroke(item.shape, x * this.gantt.ratio, y * this.gantt.ratio)) {
        return item;
      }
    });

    // **** No Actions
    if (!this.oldItem && !mouseOver) return;

    // **** MOUSE MOVE ******
    if (this.mouseIsDown && this.oldItem) {
      const dist = x - this.mouseDownoffSet;
      const w = this.oldItem.width - this.oldItem.left;
      this.oldItem.left = dist;
      this.oldItem.width = dist + w;
      this.draw();
      return;
    }

    // **** MOUSE OVER ******
    if (!this.oldItem && mouseOver) {
      mouseOver.color = "lime";
      this.oldItem = mouseOver;
      this.draw();
      return;
    }

    // **** MOUSE OUT ******
    if (this.oldItem && !mouseOver) {
      this.oldItem.color = "red";
      this.oldItem = null;
      this.draw();
      return;
    }
  }

  mousedown(e: MouseEvent) {
    const x = e.offsetX;
    console.log("RATIO", this.gantt.ratio);
    this.mouseIsDown = true;
    if (this.oldItem) {
      this.mouseDownoffSet = x - this.oldItem.left;
    } else {
      this.mouseDownoffSet = 0;
    }
  }

  mouseup(e: MouseEvent) {
    console.log("mouseup", e.x);
    this.mouseIsDown = false;
  }

  destroy() {
    this.gantt.canvasChart.removeEventListener("mousemove", this.mousemove.bind(this));
    this.gantt.canvasChart.removeEventListener("mousedown", this.mousedown.bind(this));
    document.removeEventListener("mouseup", this.mouseup.bind(this));
  }
}
