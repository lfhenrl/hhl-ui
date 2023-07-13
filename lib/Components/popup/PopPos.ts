import { screenPos } from "./screenPos";

export type iPosPop = InstanceType<typeof PopPos>;
export type ipos = {
  left: number;
  top: number;
};

export class PopPos {
  public wWidth: number = 0;
  public wHeight: number = 0;
  public referance?: HTMLElement;
  public dialog?: HTMLDialogElement;
  public refRect?: DOMRect;
  public diaRect?: DOMRect;
  public offsetTop: number = 0;
  public offsetLeft: number = 0;
  public container: "screen" | "parent" | "refElement" = "refElement";
  public placement:
    | "center"
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end" = "bottom-start";

  init(ref: HTMLElement, dia: HTMLDialogElement, _placement: any, _container: any) {
    this.referance = ref;
    this.dialog = dia;
    this.placement = _placement;
    this.container = _container;
  }

  getPos() {
    this.refRect = this.referance?.getBoundingClientRect() ?? undefined;
    this.diaRect = this.dialog?.getBoundingClientRect() ?? undefined;
    if (this.refRect && this.diaRect && this.dialog) {
      this.wWidth = window.innerWidth;
      this.wHeight = window.innerHeight;
      const posi: ipos = screenPos(this) ?? null;
      Object.assign(this.dialog.style, {
        left: `${posi.left}px`,
        top: `${posi.top}px`,
        bottom: "auto",
        right: "auto"
      });
    }
  }
}
