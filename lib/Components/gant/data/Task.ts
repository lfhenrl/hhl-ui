import { iGantt } from "../provide/gantt";
import { iRow } from "./rowModel";

export type iTask = InstanceType<typeof Task>;
export class Task {
  public GT: iGantt;
  public dom: HTMLElement;
  public row: iRow;
  public left = 0;
  public width = 0;
  public top = 0;

  constructor(_GT: iGantt, _dom: HTMLElement, _row: iRow) {
    this.GT = _GT;
    this.dom = _dom;
    this.row = _row;
    this.left = this.GT.calc.PixFrSec(_GT.calc.SecFr2dates(this.row.StartTime, this.GT.StartTime));
    this.width = this.GT.calc.PixFrSec(_GT.calc.SecFr2dates(this.row.EndTime, this.row.StartTime));
    this.setLeft(this.left);
    this.setWidth(this.width);
    this.top = this.dom.offsetTop;
  }

  setLeft(size: number) {
    this.dom.style.left = size + "px";
    this.left = size;
  }
  setWidth(size: number) {
    this.dom.style.width = size + "px";
    this.width = size;
  }
}
