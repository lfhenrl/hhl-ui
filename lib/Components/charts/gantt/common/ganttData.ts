import { iChartGantt } from ".";
import { ganttItem, iGanttItem } from "../chart/ganttItem";
import { makeTimelist } from "../scale/makeTimelist";
import { DateDiffDays } from "../../../../utils/dateFunctions";

export type iGanttData = InstanceType<typeof GanttData>;

export class GanttData {
  public chart: iChartGantt;
  public rawData?: Array<any>;
  public dataStore = {};
  public barItems: Array<iGanttItem> = [];
  public gridItems: Array<any> = [];
  public connectorList: Array<string> = [];
  public activeBars: Array<string> = [];

  constructor(_chart: iChartGantt) {
    this.chart = _chart;
  }

  newData(data: Array<any>) {
    this.rawData = data;
    this.makeTimeList();
    this.makeGridData();
    this.dataStore = {};
    let index = 0;
    data.forEach((item: any) => {
      const bar = new ganttItem(this.chart, item, index);
      index = index + 1;
      const gs = this.dataStore[item.group];
      if (gs) {
        gs.data.startTime = new Date(Math.min(item.startTime, gs.data.startTime));
        gs.data.endTime = new Date(Math.max(item.endTime, gs.data.endTime));
        gs.children.push(bar);
        gs.data.days = DateDiffDays(gs.data.startTime, gs.data.endTime);
      } else {
        const d = {
          id: item.group,
          text: item.group,
          type: "group",
          group: "",
          startTime: item.startTime,
          endTime: item.endTime,
          days: DateDiffDays(item.startTime, item.endTime)
        };

        const gBar = new ganttItem(this.chart, d, index);
        gBar.children.push(bar);
        this.dataStore[item.group] = gBar;
        index = index + 1;
      }
      bar.data.days = DateDiffDays(item.startTime, item.endTime);
      this.dataStore[item.id] = bar;
    });
  }

  groupData(data: Array<any>) {
    this.gridItems = data;
    this.activeBars = [];
    this.barItems = [];
    this.gridItems.forEach((item: any, index: number) => {
      let id = "";
      if (item.type === "group") {
        id = item.name;
      } else {
        id = item.data.id;
      }
      const bar = this.dataStore[id];
      item.data.days = bar.data.days;
      bar.index = index;
      item.index = index.toString();
      this.barItems.push(bar);
      this.activeBars.push(id.toString());
    });
    this.chart.drawBarItems(this.barItems);
    // console.log("hhhhhh", this.dataStore);
    this.chart.drawConnectors(this.connectorList, this.activeBars);
  }

  makeTimeList() {
    const tList = makeTimelist(this.chart.startDate, this.chart.endDate);
    this.chart.Event.emit("setTimeList", tList);
  }

  makeGridData() {
    this.chart.Event.emit("setGriddata", this.rawData);
  }

  updateBarItem(item: iGanttItem) {
    item.bar.style.left = item.l + "px";
    item.bar.style.width = item.w + "px";
    this.updateGroupItem(item);
  }

  updateGroupItem(item: iGanttItem) {
    const gBar = this.dataStore[item.data.group] as any;

    let min = Number.POSITIVE_INFINITY;
    let max = 0;
    gBar.children.forEach((item: any) => {
      min = Math.min(min, item.l);
      max = Math.max(max, item.l + item.w);
    });
    gBar.l = min;
    gBar.w = max - min;
    gBar.bar.style.left = gBar.l + "px";
    gBar.bar.style.width = gBar.w + "px";
  }

  updateBarItemSave(item: iGanttItem) {
    const data = this.getTimeData(item);
    item.data.startTime = data.startTime;
    item.data.endTime = data.endTime;
    item.data.days = data.days;
    this.gridItems[item.index].data = { ...item.data };

    const gBar = this.dataStore[item.data.group] as any;
    const gData = this.getTimeData(gBar);
    const gItem = this.gridItems[gBar.index];
    gBar.data.startTime = gData.startTime;
    gBar.data.endTime = gData.endTime;
    gBar.data.days = gData.days;

    gBar.data = { ...gBar.data };
    gItem.data.days = gData.days;
    gItem.data = { ...gItem.data };
    this.chart.Event.emit("updateDgrid");
  }

  getTimeData(item: iGanttItem) {
    const s = new Date((item.l / this.chart.secPixcel) * 1000 + this.chart.startDate.valueOf());
    const e = new Date(((item.l + item.w) / this.chart.secPixcel) * 1000 + this.chart.startDate.valueOf());
    return {
      startTime: s,
      endTime: e,
      days: DateDiffDays(s, e)
    };
  }
}
