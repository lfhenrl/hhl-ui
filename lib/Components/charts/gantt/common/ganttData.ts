import { iChartGantt } from ".";
import { ganttItem, iGanttItem } from "../chart/ganttItem";
import { makeTimelist } from "../scale/makeTimelist";
import { DateAddDays } from "../../../../utils/dateFunctions";
import { debounce } from "../../../../utils/debounce";

export type iGanttData = InstanceType<typeof GanttData>;
export type iConnectors = {
  [id: string]: {
    to: string;
    from: string;
  };
};

export class GanttData {
  public chart: iChartGantt;
  public rawData?: any;
  public dataStore = {};
  public barItems: Array<iGanttItem> = [];
  public connectors: iConnectors = {};
  public activeBars: Array<string> = [];
  public rootId = "";
  public listFields = {
    id: { type: "string", title: "ID" },
    pId: { type: "string", title: "ParrentId" },
    text: { type: "string", title: "Tile" },
    type: { type: "string", title: "Type" },
    subType: { type: "string", title: "SubType" },
    workLoad: { type: "number", title: "Workload" },
    progress: { type: "number", title: "Progress" },
    level: { type: "number", title: "Level" },
    startTime: { type: "date", title: "StartTime" },
    endTime: { type: "date", title: "EndTime" },
    children: { type: "number", title: "Children" }
  };
  private minDate = new Date(3300, 1, 1).valueOf();
  private maxDate = new Date(0).valueOf();
  private runningIndex = 0;

  constructor(_chart: iChartGantt) {
    this.chart = _chart;
  }

  newData(data: any) {
    console.log("rawData", this.rawData)
    // @ts-ignore structuredClone is a new function
    const _data = structuredClone(data);
    this.dataStore = {};
    this.barItems = [];
    this.activeBars = [];
    this.connectors = _data.connectors;
    this.rawData = _data.data;
    this.rootId = _data.data[0].id;
    const minDate = new Date(3300, 1, 1);
    const maxDate = new Date(0);
    this.minDate = new Date(minDate).valueOf();
    this.maxDate = new Date(maxDate).valueOf();
    this.makeDataStore(_data.data);
    this.chart.startDate = DateAddDays(new Date(this.minDate), -2);
    this.chart.endDate = DateAddDays(new Date(this.maxDate), 2);
    this.makeTimeList();
    this.makeGridData();
    this.groupData();
  }

  makeDataStore(arr: Array<any>) {
    arr.forEach((item: any) => {
      const _bar = new ganttItem(this.chart, item, 0);
      this.minDate = Math.min(item.startTime.valueOf(), this.minDate);
      this.maxDate = Math.max(item.endTime.valueOf(), this.maxDate);
      this.dataStore[item.id] = { data: item, bar: _bar };
      this.makeDataStore(item.children);
    });
  }

  groupData() {
    this.barItems = [];
    this.activeBars = [];
    this.runningIndex = 0;
    // this.barItems = this.groupDataMakeHeraki(this.rawData[0].children, this.barItems);
    this.barItems = this.groupDataMakeHeraki(this.dataStore[this.rootId].data.children, this.barItems);

    // console.log("hhhhhhhhhhhhhhhhh", this.rawData);
    this.chart.drawBarItems(this.barItems);
    this.chart.drawConnectors(this.activeBars, this.connectors);
  }

  groupDataMakeHeraki(arr: Array<any>, barItems: Array<any>) {
    arr.forEach((item: any) => {
      const bar = this.dataStore[item.id].bar;
      bar.index = this.runningIndex;
      barItems.push(bar);
      this.activeBars.push(bar.data.id.toString());
      this.runningIndex = this.runningIndex + 1;
      if (item.expanded) {
        return this.groupDataMakeHeraki(item.children, barItems);
      }
    });
    return barItems;
  }

  makeTimeList() {
    const tList = makeTimelist(this.chart.startDate, this.chart.endDate);
    this.chart.Event.emit("setTimeList", tList);
  }

  setGridDataLevels(data: any, level: number) {
    data.forEach((item: any) => {
      item.level = level;
      return this.setGridDataLevels(item.children, item.level + 1);
    });
    return data;
  }

  makeGridData() {
    const data = this.setGridDataLevels(this.dataStore[this.rootId].data.children, 0);
    this.chart.Event.emit("setGriddata", data);
  }

  lightUpdateDatagrid = debounce(() => {
    this.chart.Event.emit("LigtUpdateGriddata");
  }, 100);

  dragDrop(data: any) {
    const sourceItem = this.dataStore[data.sourceId].data;
    const targetItem = this.dataStore[data.targetId].data;
    const sourceParent = this.dataStore[sourceItem.pId].data;
    const targetParent = this.dataStore[targetItem.pId].data;

    const sIndex = sourceParent.children.indexOf(sourceItem);
    const tIndex = targetParent.children.indexOf(targetItem);

    sourceParent.children.splice(sIndex, 1);

    if (targetItem.type === "group" && data.pos === "over") {
      sourceItem.pId = targetItem.id;
      targetItem.expanded = true;
      targetItem.children.push(sourceItem);
      this.makeGridData();
      this.groupData();
      return;
    }
    const newIndex = data.pos === "after" ? tIndex + 1 : tIndex;
    sourceItem.pId = targetItem.pId;
    targetParent.children.splice(newIndex, 0, sourceItem);
    this.makeGridData();
    this.groupData();
  }

  NeedTimeScaleAdjusted(rootItem: iGanttItem) {
    if (rootItem.data.endTime > this.chart.endDate) {
      this.chart.endDate = DateAddDays(new Date(rootItem.data.endTime), 2);
      this.chart.ganttData.makeTimeList();
    }

    if (rootItem.data.startTime < this.chart.startDate) {
      this.chart.startDate = DateAddDays(new Date(rootItem.data.startTime), -2);
      this.chart.ganttData.makeTimeList();
      this.chart.drawBarItems(this.chart.ganttData.barItems);
      this.chart.drawConnectors(this.activeBars, this.connectors);
    }
  }

  addConnector(id: string, data: any) {
    this.connectors[id] = data;
  }

  getGuid() {
    return Math.floor(new Date().valueOf() * Math.random()).toString(36);
  }

  getFlatList() {
    const data = [];
    for (const key in this.dataStore) {
      const item = { ...this.dataStore[key].data };
      item.children = item.children.length;
      data.push(item);
    }
    return data;
  }
}
