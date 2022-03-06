import { iChartGantt } from "../common";

export type iChartGanttShapeBar = InstanceType<typeof chartGanttShapeBar>;
export class chartGanttShapeBar {
  public shape: Path2D = new Path2D();

  constructor(
    public gantt: iChartGantt,
    public left: number,
    public width: number,
    public top: number,
    public height: number,
    public color: string,
    public index: number,
    public data?: any
  ) {}
  draw() {
    const { left, top, height, width, color, gantt } = this;
    const _top = top + height / 2;

    this.shape = new Path2D();
    this.shape.moveTo(left, _top);
    this.shape.lineTo(width, _top);
    gantt.ctxChart.lineWidth = height;
    gantt.ctxChart.strokeStyle = color;
    gantt.ctxChart.stroke(this.shape);

    const resizeLeft = new Path2D();
    resizeLeft.moveTo(left, _top);
    resizeLeft.lineTo(left + 6, _top);
    gantt.ctxChart.strokeStyle = "blue";
    gantt.ctxChart.stroke(resizeLeft);

    // const joinLeft = new Path2D();
    // this.shape.addPath(joinLeft);
    // joinLeft.arc(left - 5, _top, 5, 0, 2 * Math.PI);
    // gantt.ctxChart.lineWidth = 1;
    // gantt.ctxChart.strokeStyle = "blue";
    // gantt.ctxChart.stroke(joinLeft);

    return;
  }
  mouseOver() {}
}
