import { iChartGantt } from ".";
import { ganttItem, iGanttItem } from "../chart/ganttItem";
import { makeTimelist } from "../scale/makeTimelist";
import { debounce } from "../../../../utils/debounce";
import { DateAddDays } from "../../../../utils/dateFunctions";

export type iGanttData = InstanceType<typeof GanttData>;
export type iConnectors = {
  [id: string]: {
    to: string;
    from: string;
  };
};

export class GanttData {
  public chart: iChartGantt;
  // public rawData?: any;
  public dataStore = {};
  public barItems: Array<iGanttItem> = [];
  public connectors: iConnectors = {};
  public activeBars: Array<string> = [];
  public rootId = "";
  public timeScale = "month";
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
  public dayInSeconds = 60 * 60 * 24;
  public minDate = 0;
  public maxDate = 0;
  private runningIndex = 0;

  constructor(_chart: iChartGantt) {
    this.chart = _chart;
  }

  newData(data: any) {
    this.dataStore = {};
    this.barItems = [];
    this.activeBars = [];
    this.connectors = {};
    this.connectors = data.connectors;
    this.rootId = data.data[0].id;
    this.minDate = 4112719200;
    this.maxDate = 0;
    this.makeDataStore(data.data);
    this.chart.startDate = this.minDate;
    this.chart.endDate = this.maxDate;
    this.makeTimeList();
    this.makeGridData();
    this.renderChart();
  }

  makeDataStore(arr: Array<any>) {
    arr.forEach((item: any) => {
      const _bar = new ganttItem(this.chart, item, 0);
      this.minDate = Math.min(item.startTime, this.minDate);
      this.maxDate = Math.max(item.endTime, this.maxDate);
      this.dataStore[item.id] = { data: item, bar: _bar };
      this.makeDataStore(item.children);
    });
  }

  renderChart() {
    this.barItems = [];
    this.activeBars = [];
    this.runningIndex = 0;
    this.barItems = this.groupDataMakeHeraki(this.dataStore[this.rootId].data.children, this.barItems);
    this.chart.drawBarItems(this.barItems);
    setTimeout(() => {
      this.chart.drawConnectors(this.activeBars, this.connectors);
    }, 100);
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
    let start = new Date(this.minDate * 1000);
    let end = new Date(this.maxDate * 1000);
    let listScale = "month";

    switch (this.timeScale) {
      case "Day":
        start = DateAddDays(start, -5);
        end = DateAddDays(end, 5);
        listScale = "month";
        break;
      case "Week":
        start = DateAddDays(start, -15);
        end = DateAddDays(end, 15);
        listScale = "month";
        break;
      case "Month":
        start = DateAddDays(start, -30);
        end = DateAddDays(end, 30);
        listScale = "year";
        break;
      default:
        start = DateAddDays(start, -5);
        end = DateAddDays(end, 5);
        listScale = "month";
    }

    const tList = makeTimelist(start, end, listScale);
    this.chart.startDate = tList[0].dayFirst.valueOf() / 1000;
    this.chart.endDate = tList.slice(-1)[0].dayFirst.valueOf() / 1000;
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

  validateConnectors() {
    for (let key in this.dataStore) {
      const connector = this.dataStore[key];
      const source = this.dataStore[connector.from];
      const target = this.dataStore[connector.to];
      if (source && target) {
        console.error("Connector with ID: ", key, " is missing source or target");
      }
    }
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
      this.renderChart();
      return;
    }
    const newIndex = data.pos === "after" ? tIndex + 1 : tIndex;
    sourceItem.pId = targetItem.pId;
    targetParent.children.splice(newIndex, 0, sourceItem);
    this.makeGridData();
    this.renderChart();
  }

  NeedTimeScaleAdjusted(rootItem: iGanttItem) {
    if (rootItem.data.endTime > this.maxDate) {
      this.maxDate = rootItem.data.endTime;
      this.chart.ganttData.makeTimeList();
    }
    const startDiff = (rootItem.data.startTime - this.minDate) / this.dayInSeconds;
    if (startDiff < 2) {
      this.minDate = rootItem.data.startTime;
      this.chart.ganttData.makeTimeList();
      this.renderChart();
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
