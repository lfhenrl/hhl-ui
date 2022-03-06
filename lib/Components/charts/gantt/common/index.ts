import { DateDiffDays } from "../../../../utils/dateFunctions";
import { chartGanttChart, iChartGanttChart } from "../chart";
import { chartGanttScale, iChartGanttScale } from "./scale";

export type iChartGantt = InstanceType<typeof chartGantt>;

export class chartGantt {
  public canvasScale: HTMLCanvasElement;
  public canvasChart: HTMLCanvasElement;
  public ctxScale: CanvasRenderingContext2D;
  public ctxChart: CanvasRenderingContext2D;
  public scale: iChartGanttScale;
  public chart: iChartGanttChart;
  public ratio = Math.ceil(window.devicePixelRatio);
  public gridWidth = 20;
  public gridTimeHeight = 16;
  public gridHeight = 26;
  public gridLinesWidthAmount = 0;
  public gridLinesHeightAmount = 5;
  public startDate: Date = new Date();
  public endDate = this.startDate;
  public ganttStartTimeSec = 0;
  public ganttChartTop = 0;
  public secPixcel = 20 / (24 * 60 * 60);
  public data = [
    {
      id: 1,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 3, 0),
      color: "red",
    },
    {
      id: 2,
      startTime: new Date(2019, 1, 2, 0),
      endTime: new Date(2019, 1, 22, 0),
      color: "red",
    },
    {
      id: 3,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 22, 0),
      color: "red",
    },
    {
      id: 4,
      startTime: new Date(2019, 1, 2, 0),
      endTime: new Date(2019, 1, 22, 0),
      color: "red",
    },
    {
      id: 5,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 22, 0),
      color: "red",
    },
    {
      id: 6,
      startTime: new Date(2019, 1, 2, 0),
      endTime: new Date(2019, 1, 22, 0),
      color: "red",
    },
    {
      id: 7,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 22, 0),
      color: "red",
    },
    {
      id: 8,
      startTime: new Date(2019, 1, 2, 0),
      endTime: new Date(2019, 1, 22, 0),
      color: "red",
    },
    {
      id: 9,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 22, 0),
      color: "red",
    }
  ];

  constructor(
    _canvasScale: HTMLCanvasElement,
    _canvasChart: HTMLCanvasElement
  ) {
    this.canvasChart = _canvasChart;
    this.canvasScale = _canvasScale;
    this.ctxChart = this.canvasChart.getContext("2d")!;
    this.ctxScale = this.canvasScale.getContext("2d")!;
    this.scale = new chartGanttScale(this);
    this.chart = new chartGanttChart(this);
  }

  setCanvasSize() {
    this.gridLinesWidthAmount = DateDiffDays(this.startDate, this.endDate);
    const width = this.gridLinesWidthAmount * this.gridWidth;
    const height = 2 * this.gridTimeHeight + 5 * this.gridHeight + 5;

    this.canvasScale.width = width * this.ratio;
    this.canvasScale.height = height * this.ratio;
    this.canvasScale.style.width = `${width}px`;
    this.canvasScale.style.height = `${height}px`;

    this.canvasChart.width = width * this.ratio;
    this.canvasChart.height = height * this.ratio;
    this.canvasChart.style.width = `${width}px`;
    this.canvasChart.style.height = `${height}px`;

    this.ctxScale.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    this.ctxChart.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
  }

  load() {
    this.setCanvasSize();
    this.scale.load();
    this.chart.load();
  }
}
