import { iChartGantt } from "../common";
import { ganttConnectChange } from "./ganttConnectRender";

export type iGanttItem = InstanceType<typeof ganttItem>;

export class ganttItem {
  public data: any;
  public toConnectors = {};
  public fromConnectors = {};
  public chart: iChartGantt;
  public index: number;
  public id: number;
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

    if (this.itemType === "bar_dragLeft") {
      this.l = val;
      this.w = this.w + diff;
    }

    if (this.itemType === "bar_dragRight") {
      this.w = this.orgWidth - diff;
    }

    if (this.itemType === "bar") {
      this.l = val;
    }
    this.chart.ganttData.updateBarItem(this);
    this.updateToConnectors();
    this.updateFromConnectors();
  }

  mouseUp(x: number, y: number) {
    if (this.itemType === "bar_connectRight") {
      this.chart.lineTool.mouseUp(x, y);
    } else {
      this.chart.ganttData.updateBarItemSave(this);
    }
  }

  updateToConnectors() {
    if (this.itemType === "bar_dragRight" || this.itemType === "bar") {
      for (const item in this.toConnectors) {
        const s_id = Number(item.split("@")[0]);
        const t_id = Number(item.split("@")[1]);
        const source = this.chart.ganttData.dataStore[s_id];
        const target = this.chart.ganttData.dataStore[t_id];
        const line = this.toConnectors[item];
        ganttConnectChange(line, source, target);
      }
    }
  }

  updateFromConnectors() {
    if (this.itemType === "bar_dragLeft" || this.itemType === "bar") {
      for (const item in this.fromConnectors) {
        const s_id = Number(item.split("@")[0]);
        const t_id = Number(item.split("@")[1]);
        const source = this.chart.ganttData.dataStore[s_id];
        const target = this.chart.ganttData.dataStore[t_id];
        const line = this.fromConnectors[item];
        ganttConnectChange(line, source, target);
      }
    }
  }
  connectRender() {}

  render() {
    this.bar.innerHTML = "";
    const { startDate, secPixcel, barHeight } = this.chart;
    const timeLeft = (this.data.startTime.valueOf() - startDate.valueOf()) / 1000;
    const timeWidth = (this.data.endTime.valueOf() - this.data.startTime.valueOf()) / 1000;
    this.w = timeWidth * secPixcel;
    this.l = timeLeft * secPixcel;
    this.t = this.index * barHeight + this.top;

    const gantt__Item = document.createElement("div");
    const gantt__Item_bar_dragLeft = document.createElement("div");
    const gantt__Item_bar_dragRight = document.createElement("div");
    const gantt__Item_bar_connectLeft = document.createElement("div");
    const gantt__Item_bar_connectRight = document.createElement("div");

    gantt__Item.classList.add("gantt__Item");
    gantt__Item.style.top = this.t + "px";

    if (this.data.type === "group") {
      this.bar.classList.add("gantt__Item_group");
    }

    this.bar.classList.add("gantt__Item_bar");
    this.bar.dataset.id = this.id.toString();
    this.bar.style.left = this.l + "px";
    this.bar.style.width = this.w + "px";

    if (this.data.type !== "group") {
      gantt__Item_bar_dragLeft.classList.add("gantt__Item_bar_dragLeft");
      gantt__Item_bar_dragLeft.dataset.id = this.id.toString();

      gantt__Item_bar_dragRight.classList.add("gantt__Item_bar_dragRight");
      gantt__Item_bar_dragRight.dataset.id = this.id.toString();
    }

    gantt__Item_bar_connectLeft.classList.add("gantt__Item_bar_connectLeft");
    gantt__Item_bar_connectLeft.dataset.id = this.id.toString();

    gantt__Item_bar_connectRight.classList.add("gantt__Item_bar_connectRight");
    gantt__Item_bar_connectRight.dataset.id = this.id.toString();

    this.bar.appendChild(gantt__Item_bar_dragLeft);
    this.bar.appendChild(gantt__Item_bar_dragRight);
    this.bar.appendChild(gantt__Item_bar_connectLeft);
    this.bar.appendChild(gantt__Item_bar_connectRight);
    gantt__Item.appendChild(this.bar);
    return gantt__Item;
  }
}
