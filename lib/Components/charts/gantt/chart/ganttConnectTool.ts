import { iChartGantt } from "../common";
import { iGanttItem } from "./ganttItem";
import { ganttConnectRender } from "./ganttConnectRender";

export type iGanttConnectTool = InstanceType<typeof ganttConnectTool>;

export class ganttConnectTool {
  public chart: iChartGantt;
  public ganttItem?: iGanttItem;
  public line: SVGLineElement;
  public sX = 0;
  public sY = 0;
  public eX = 0;
  public eY = 0;
  public firstX = 0;
  public firstY = 0;

  constructor(_chart: iChartGantt, _line: SVGLineElement) {
    this.chart = _chart;
    this.line = _line;
  }

  mouseDown(item: iGanttItem, x: number, y: number) {
    this.firstX = x;
    this.firstY = y;
    this.ganttItem = item;
    this.sX = item.l + item.w;
    this.sY = item.t + this.chart.barHeight / 2;
    this.line!.x1.baseVal.value = this.sX;
    this.line!.y1.baseVal.value = this.sY;
    this.line!.x2.baseVal.value = this.sX;
    this.line!.y2.baseVal.value = this.sY;
    this.line!.style.strokeWidth = "2";
    this.chart.chartCanvas.classList.add("connectToolActive");
  }

  mouseMove(x: number, y: number) {
    const diffX = x - this.firstX;
    const diffY = y - this.firstY;
    this.line!.x2.baseVal.value = this.sX + diffX;
    this.line!.y2.baseVal.value = this.sY + diffY;
  }

  mouseUp(x: number, y: number) {
    if (this.ganttItem?.itemType === "bar_connectRight") {
      const elem = document.elementFromPoint(x, y) as HTMLElement;
      if (elem.classList.contains("gantt__Item_bar_connectLeft")) {
        const data: any = elem?.dataset;
        if (data.id === this.ganttItem.id.toString()) return;
        const target = this.chart.ganttData.dataStore[data.id];
        const id = `${this.ganttItem.id}@${data.id}`;
        ganttConnectRender(this.chart, this.ganttItem, target, id);
        this.chart.ganttData.connectorList.push(id);
      }
    }

    this.resetLineTool();
  }

  resetLineTool() {
    this.chart.chartCanvas.classList.remove("connectToolActive");
    this.line!.x1.baseVal.value = 0;
    this.line!.y1.baseVal.value = 0;
    this.line!.x2.baseVal.value = 0;
    this.line!.y2.baseVal.value = 0;
    this.line!.style.strokeWidth = "0";
  }
}
