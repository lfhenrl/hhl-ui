import { Ref } from "vue";
import { EventHandler } from "../../../../../lib/utils/eventHandler";
import { MouseEvents } from "./mouseEvents";
export type iHHLchart = InstanceType<typeof HHLchart>;

export declare class iShape {
  constructor(ch: iHHLchart, left: number, width: number, top: number, height: number, color: string, index: number, data?: any);
  shape: Path2D;
  ch: iHHLchart;
  draw(): void;
  left: number;
  width: number;
  top: number;
  height: number;
  color: string;
  index: number;
  data?: any;
}

export class HHLchart {
  // #region Properties
  public Event = new EventHandler<
    "init" | "ready" | "update" | "resize" | "refresh" | "newdata" | "mouse.over" | "mouse.move" | "mouse.out" | "mouse.zoombox"
  >();
  public MouseObserveList = [] as any[];

  public MainContainer = {} as HTMLElement;
  public CanvasContainer = {} as HTMLElement;
  public Div = {} as HTMLElement;
  public Canvas = {} as HTMLCanvasElement;
  public Ctx = {} as CanvasRenderingContext2D;

  public ColorList = {} as any;
  public ColorListActive = false;

  public Margin = {
    left: 30,
    right: 30,
    top: 0,
    bottom: 0
  };
  public X = {
    zoomFaktor: 1,
    maxZoomFaktor: 30,
    pixelFaktor: 1,
    faktor: 1,
    tickCount: 0,
    tickSpace: 0
  };

  public Y = {
    zoomFaktor: 1,
    maxZoomFaktor: 4,
    faktor: 1,
    tickCount: 0,
    tickSpace: 0,
    bands: {
      size: 70,
      list: {} as any
    }
  };

  public Data = {
    Xmin: 0,
    Xmax: 0,
    Ymin: 0,
    Ymax: 0,
    items: []
  };
  // #endregion
  constructor(public ChartDiv: Ref) {}

  Init() {
    this.MainContainer = this.ChartDiv.value;
    setTimeout(() => {
      this.CanvasContainer = this.MainContainer.querySelector(".hhl-chart-main")! as HTMLElement;
      this.Canvas = this.CanvasContainer.querySelector(".hhl-chart-main_canvas")! as HTMLCanvasElement;
      this.Div = this.CanvasContainer.querySelector(".hhl-chart-main_div")! as HTMLElement;
      this.Ctx = this.Canvas.getContext("2d")!;
      window.addEventListener("resize", this.Update.bind(this));
      this.Event.emit("init");
      new MouseEvents(this);
      setTimeout(() => {
        this.Event.emit("ready");
      });
    });
  }

  SetSize() {
    const cont = this.CanvasContainer.getBoundingClientRect();
    this.Canvas.height = this.CanvasContainer.clientHeight;
    this.Canvas.width = cont.width * this.X.zoomFaktor;
    const scaleWidth = cont.width;
    this.X.maxZoomFaktor = 65000 / scaleWidth;
  }

  Clear() {
    this.Ctx.clearRect(0, 0, this.Canvas.width, this.Ctx.canvas.height);
    this.Div.innerHTML = "";
    console.log("clear");
  }

  ZoomX(zoomFaktor: number = 1): void {
    this.X.zoomFaktor = zoomFaktor;
    this.Update();
  }

  SetData(d: any) {
    this.MouseObserveList = [];
    this.Data = d;
    this.Event.emit("newdata");
    setTimeout(() => {
      this.Update();
    });
  }

  Update() {
    this.ColorListActive = Object.keys(this.ColorList).length === 0
    this.Clear();

    this.SetSize();
    console.log("Update");
    setTimeout(() => {
      this.Event.emit("update");
    });
  }

  Refresh() {
    this.Event.emit("refresh");
  }

  Print() {
    const rect = this.MainContainer.getBoundingClientRect();
    const scale = (1123 - 60) / window.innerWidth;
    this.MainContainer.style.width = rect.width + "px";
    this.MainContainer.style.marginTop = -(rect.top - 40) + "px";
    this.MainContainer.style.height = this.MainContainer.scrollHeight + "px";
    this.MainContainer.style.transform = `scale(${scale})`;

    window.print();
    this.MainContainer.style.transform = "none";
    this.MainContainer.style.marginTop = "";
    this.MainContainer.style.width = "auto";
    this.MainContainer.style.height = "auto";
  }

  ColorActive(colorlist: any) {
    this.ColorList = colorlist;
    this.Update();
  }
  PosLeft(value: number) {
    return Math.round(value * this.X.faktor + this.Margin.left);
  }
  PosLeftRaw(value: number) {
    return Math.round(value * this.X.faktor);
  }

  GetTimeFromPixel(value: number) {
    const _value = value - this.Margin.left;
    return this.Data.Xmin + _value * this.X.pixelFaktor * 1000;
  }

  GetPixelFromTime(value: number) {
    return this.PosLeft((value - this.Data.Xmin) / 1000);
  }
}
