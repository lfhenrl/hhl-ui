import { EventHandler } from "../../../../utils/eventHandler";
import { iGanttConnectTool, ganttConnectTool } from "../chart/ganttConnectTool";
import { iGanttItem } from "../chart/ganttItem";
import { GanttData, iGanttData } from "./ganttData";
import { ganttConnectRender } from "../chart/ganttConnectRender";
import { iDatagrid } from "../../../datagrid/provide";

export type iChartGantt = InstanceType<typeof chartGantt>;

export class chartGantt {
  public Event = new EventHandler<
    "setBarItems" | "setChartHeight" | "scrollTop" | "setTimeList" | "setGriddata" | "updateDgrid" | "ganttRowClicked"
  >();
  public ganttData: iGanttData;
  public chart!: HTMLElement;
  public dg!: iDatagrid;
  public chartContent!: HTMLElement;
  public chartTime!: HTMLElement;
  public chartContainer!: HTMLElement;
  public chartCanvas!: HTMLElement;
  public scrollDummi!: HTMLElement;
  public svg!: SVGElement;
  public chartSvg!: SVGGElement;
  public startDate = new Date();
  public endDate = new Date(this.startDate);
  public secPixcel = 20 / (24 * 60 * 60);
  public activeBar?: iGanttItem;
  public isMouseDown = false;
  public lineTool!: iGanttConnectTool;
  public chartHeight = 0;
  public barHeight = 0;
  public timeHeight = 0;
  public offsetTop = 0;

  constructor() {
    this.ganttData = new GanttData(this);
  }

  init(_chart: HTMLElement, _line: SVGLineElement) {
    this.chart = _chart;
    this.lineTool = new ganttConnectTool(this, _line);
    this.chartContent = this.chart.querySelector(".H_chartGantt__content") as HTMLElement;
    this.chartTime = this.chart.querySelector(".H_virtualList-scroller") as HTMLElement;
    this.chartContainer = this.chartContent.querySelector(".H_chartGantt__chartContainer") as HTMLElement;
    this.chartCanvas = this.chartContent.querySelector(".H_chartGantt__chartContent") as HTMLElement;
    this.svg = this.chart.querySelector(".H_chartGantt_svg") as SVGElement;
    this.chartSvg = this.svg.querySelector("#H_ChartGantt_svg_viewport") as SVGGElement;
    this.scrollDummi = this.chart.querySelector(".H_chartGantt_scroll_dummi") as HTMLElement;
    document.addEventListener("mouseup", this.mouseUp.bind(this), false);
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  unload() {
    document.removeEventListener("mouseup", this.mouseUp.bind(this), false);
    window.removeEventListener("resize", this.resize.bind(this), false);
  }

  setCanvasSize() {
    this.chartHeight = this.ganttData.barItems.length * this.barHeight + 2;
    this.Event.emit("setChartHeight", this.chartHeight);
    this.scrollDummi.style.height = this.chartHeight + "px";
    this.offsetTop = this.timeHeight * 2 + 2;
    this.chartContainer.style.height = this.chart.clientHeight - this.offsetTop - 11 + "px";
    this.chartContainer.style.top = this.offsetTop + "px";
    this.chartCanvas.style.height = this.chartHeight + "px";
    this.svg.style.height = this.chartHeight + "px";
  }

  drawBarItems(data: Array<iGanttItem>) {
    this.chartCanvas.innerHTML = "";
    this.chartSvg.innerHTML = "";
    const fragment = document.createDocumentFragment();
    data.forEach((bar) => {
      const _bar = bar.render();
      fragment.appendChild(_bar);
    });
    this.setCanvasSize();
    this.chartCanvas.appendChild(fragment);
  }

  drawConnectors(data: Array<string>, activeBars: Array<string>) {
    data.forEach((item: string) => {
      const idArr = item.split("@");
      if (!activeBars.includes(idArr[0])) return;
      if (!activeBars.includes(idArr[1])) return;
      const source = this.ganttData.dataStore[idArr[0]];
      const target = this.ganttData.dataStore[idArr[1]];
      ganttConnectRender(this, source, target, item);
    });
  }

  public scrollBar(e: any) {
    this.chartContainer.scroll(0, e.target.scrollTop);
  }

  public scrollContainer(e: any) {
    this.scrollDummi.parentElement?.scroll(0, e.target.scrollTop);
    this.Event.emit("scrollTop", e.target.scrollTop);
  }

  public resize() {
    this.chartContainer.style.height = this.chart.clientHeight - this.offsetTop - 11 + "px";
  }

  public mouseDblClick(e: MouseEvent) {
    const ele = e.target as HTMLElement;
    if (ele.classList.contains("ganttConnector")) {
      const id = ele.dataset.id;
      if (id?.includes("@")) {
        const idArray = id.split("@");
        const s_id = Number(idArray[0]);
        const t_id = Number(idArray[0]);
        const source = this.ganttData.dataStore[s_id];
        const target = this.ganttData.dataStore[t_id];
        delete source.toConnectors[id];
        delete target.fromConnectors[id];
        console.log("DELETE", id);
        ele.remove();
      }
    }
  }

  public mouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    const ele = e.target as any;

    const clName = ele.classList[0] ?? "";
    if (clName.startsWith("gantt__Item_bar")) {
      const typ = clName.replace("gantt__Item_bar", "bar") ?? "bar";
      const data = ele.dataset;
      this.activeBar = this.ganttData.dataStore[data.id];
      this.activeBar?.mouseDown(e.x, e.y, typ);
      this.Event.emit("ganttRowClicked", this.activeBar);
    }
  }

  public mouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.activeBar?.mouseMove(e.x, e.y);
    }
  }

  public mouseUp(e: MouseEvent) {
    this.isMouseDown = false;
    this.activeBar?.mouseUp(e.x, e.y);
    this.activeBar = undefined;
  }
}
