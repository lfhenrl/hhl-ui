import { iChartGantt } from "../common";
import { ganttConnectChange } from "./ganttConnectRender";
import { TimeToPixcel, PixcelToTime, MinMaxDatesFromArray } from "./utils/converter";

export type iGanttItem = InstanceType<typeof ganttItem>;

export class ganttItem {
  public data: any;
  public toConnectors = {};
  public fromConnectors = {};
  public chart: iChartGantt;
  public index: number;
  public id: number;
  public tempId?: string;
  public l = 0;
  public w = 0;
  public t = 0;
  public top = 0;
  public bar: HTMLElement;
  public itemType = "bar";
  public offSetBar = 0;
  public orgWidth = 0;
  public children: Array<iGanttItem> = [];

  constructor(_chart: iChartGantt, _data: any, _index: number) {
    this.chart = _chart;
    this.data = _data;
    this.id = _data.id;
    this.index = _index;
    this.bar = document.createElement("div");
    this.top = 0;
  }

  setPosWidth() {
    this.bar.style.left = this.l + "px";
    this.bar.style.width = this.w + "px";
  }

  mouseDown(x: number, y: number, type: string) {
    this.offSetBar = x - this.l;
    this.orgWidth = this.w;
    this.itemType = type;

    if (this.itemType === "bar_connectLeft") return;

    if (this.itemType === "bar_connectRight") {
      this.chart.lineTool.mouseDown(this, x, y);
    }
  }

  mouseMove(x: number, y: number) {
    if (this.itemType === "bar_connectRight") {
      this.chart.lineTool.mouseMove(x, y);
      return;
    }

    const val = x - this.offSetBar;
    const diff = this.l - val;
    let needUpdate = false;

    if (this.itemType === "bar_dragLeft") {
      this.l = val;
      this.w = this.w + diff;
      needUpdate = true;
    }

    if (this.itemType === "bar_dragRight") {
      this.w = this.orgWidth - diff;
      needUpdate = true;
    }

    if (this.itemType === "bar" && this.data.type === "data") {
      this.l = val;
      needUpdate = true;
    }

    if (needUpdate) {
      this.setPosWidth();
      this.updateToConnectors();
      this.updateFromConnectors();
    }
  }

  mouseUp(x: number, y: number) {
    if (this.itemType === "bar_connectRight") {
      this.chart.lineTool.mouseUp(x, y);
    } else {
      this.updateData();
    }
  }

  update() {
    if (this.data.children.length > 0) {
      const { Min, Max } = MinMaxDatesFromArray(this.data.children);
      this.l = TimeToPixcel(this.chart, Min);
      this.w = TimeToPixcel(this.chart, Max) - this.l;
      this.data.startTime = Min;
      this.data.endTime = Max;
      this.setPosWidth();
    } else {
      if (this.data.type === "group") {
        this.data.endTime = new Date(this.data.startTime);
        this.setPosWidth();
      }
    }
  }

  updateData() {
    this.data.startTime = PixcelToTime(this.chart, this.l);
    this.data.endTime = PixcelToTime(this.chart, this.l + this.w);
    const parent = this.chart.ganttData.dataStore[this.data.pId].bar as iGanttItem;
    parent.updateFromChild();
    this.chart.ganttData.lightUpdateDatagrid();
  }

  updateFromChild() {
    this.update();
    if (this.data.children.length > 0 && this.data.type !== "root") {
      const parent = this.chart.ganttData.dataStore[this.data.pId].bar as iGanttItem;
      parent.updateFromChild();
    }

    if (this.data.type === "root") {
      this.chart.ganttData.NeedTimeScaleAdjusted(this);
    }
  }

  updateToConnectors() {
    for (const item in this.toConnectors) {
      const connector = this.toConnectors[item];
      const source = this.chart.ganttData.dataStore[connector.from].bar;
      const target = this.chart.ganttData.dataStore[connector.to].bar;
      ganttConnectChange(connector.line, source, target);
    }
  }

  updateFromConnectors() {
    for (const item in this.fromConnectors) {
      const connector = this.fromConnectors[item];
      const source = this.chart.ganttData.dataStore[connector.from].bar;
      const target = this.chart.ganttData.dataStore[connector.to].bar;
      ganttConnectChange(connector.line, source, target);
    }
  }
}
