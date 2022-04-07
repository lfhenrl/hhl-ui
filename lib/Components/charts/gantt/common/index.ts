import { EventHandler } from "../../../../utils/eventHandler";
import { iGanttConnectTool, ganttConnectTool } from "../chart/ganttConnectTool";
import { iGanttItem } from "../chart/ganttItem";
import { GanttData, iConnectors, iGanttData } from "./ganttData";
import { ganttConnectRender } from "../chart/ganttConnectRender";
import { iDatagrid } from "../../../datagrid/provide";
import { ganttItemRender } from "../chart/ganttItemRender";

export type iChartGantt = InstanceType<typeof chartGantt>;

export class chartGantt {
  public Event = new EventHandler<
    | "setBarItems"
    | "setChartHeight"
    | "scrollTop"
    | "setTimeList"
    | "setGriddata"
    | "updateDgrid"
    | "ganttRowClicked"
    | "gridRowExpanded"
    | "LigtUpdateGriddata"
    | "userAction"
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
    this.offsetTop = this.timeHeight * 2;
    this.chartContainer.style.height = this.chart.clientHeight - this.offsetTop - 11 + "px";
    this.chartContainer.style.top = this.offsetTop + "px";
    this.chartCanvas.style.height = this.chartHeight + "px";
    this.svg.style.height = this.chartHeight + "px";
    // this.chartTime.style.height = 200 + "px";
  }

  drawBarItems(data: Array<iGanttItem>) {
    this.chartCanvas.innerHTML = "";
    this.chartSvg.innerHTML = "";
    const fragment = document.createDocumentFragment();
    data.forEach((bar) => {
      bar.update();
      const _bar = ganttItemRender(bar);
      fragment.appendChild(_bar);
    });
    this.setCanvasSize();
    this.chartCanvas.appendChild(fragment);
  }

  drawConnectors(activeBars: Array<string>, data?: iConnectors) {
    for (let key in data) {
      const connector = data[key];
      if (!activeBars.includes(connector.to)) return;
      if (!activeBars.includes(connector.from)) return;
      const source = this.ganttData.dataStore[connector.from].bar;
      const target = this.ganttData.dataStore[connector.to].bar;
      ganttConnectRender(this, source, target, key);
    }
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
      hhl
        .dialog("Delete", `Are you sure you will delete?...`)
        .then(() => {
          const id = ele.dataset.id ?? "";
          const connector = this.ganttData.connectors[id];
          const source = this.ganttData.dataStore[connector.from].bar;
          const target = this.ganttData.dataStore[connector.to].bar;
          delete source.toConnectors[id];
          delete target.fromConnectors[id];
          delete this.ganttData.connectors[id];
          ele.remove();
        })
        .catch(() => {
          return;
        });
    }
  }

  public mouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    const ele = e.target as any;

    const clName = ele.classList[0] ?? "";
    if (clName.startsWith("gantt__Item_bar")) {
      const typ = clName.replace("gantt__Item_bar", "bar") ?? "bar";
      const data = ele.dataset;
      this.activeBar = this.ganttData.dataStore[data.id].bar;
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
