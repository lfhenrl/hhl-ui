import { iHHLchart, iShape } from "./index";
export class MouseEvents {
  private ch: iHHLchart;
  private mouseMoveStatus = {
    activeIndex: -1,
    activeShape: null as null | iShape
  };
  private xStart = 0;
  private yStart = 0;
  private xMove = 0;
  private yMove = 0;
  private _mouseDown = false;
  constructor(ch: iHHLchart) {
    this.ch = ch;
    this.ch.Canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    this.ch.Canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.ch.Canvas.addEventListener("mouseup", this.mouseUp.bind(this));
  }

  private reCalc() {
    const left = Math.min(this.xStart, this.xMove); //Smaller X
    const right = Math.max(this.xStart, this.xMove); //Larger X
    const top = Math.min(this.yStart, this.yMove); //Smaller Y
    const bottom = Math.max(this.yStart, this.yMove); //Larger Y
    const rect = {
      top,
      left,
      width: right - left,
      height: bottom - top,
      mouseDown: this._mouseDown
    };
    this.ch.Event.emit("mouse.zoombox", rect);
  }

  private mouseDown(e: MouseEvent) {
    this.xStart = e.offsetX;
    this.yStart = e.offsetY;

    this._mouseDown = true;
    this.reCalc();
  }

  private mouseUp() {
    this._mouseDown = false;
    this.reCalc();
  }

  private mouseMove(e: MouseEvent) {
    this.xMove = e.offsetX;
    this.yMove = e.offsetY;
    const rect = {
      x: e.offsetX,
      y: e.offsetY
    };
    this.ch.Event.emit("mouse.move", rect);
    // console.log(this.xMove);
    if (this._mouseDown) {
      this.reCalc();
      return;
    }

    const mouseOverList = this.ch.MouseObserveList.filter((item) => {
      if (this.ch.Ctx.isPointInStroke(item.shape, e.offsetX, e.offsetY)) {
        return item;
      }
    });
    if (mouseOverList.length > 0) {
      if (this.mouseMoveStatus.activeIndex !== mouseOverList[0].index) {
        if (this.mouseMoveStatus.activeShape !== null) {
          this.ch.Event.emit("mouse.out", this.mouseMoveStatus.activeShape);
        }
        this.mouseMoveStatus.activeIndex = mouseOverList[0].index;
        this.mouseMoveStatus.activeShape = mouseOverList[0];
        if (this.ch.ColorListActive || this.ch.ColorList[mouseOverList[0].color]?.active) {
          this.ch.Event.emit("mouse.over", mouseOverList[0]);
        }
      }
    } else {
      if (this.mouseMoveStatus.activeIndex >= 0) {
        if (this.mouseMoveStatus.activeShape) {
          this.ch.Event.emit("mouse.out", this.mouseMoveStatus.activeShape);
          this.mouseMoveStatus.activeIndex = -1;
          this.mouseMoveStatus.activeShape = null;
        }
      }
    }
  }
}
