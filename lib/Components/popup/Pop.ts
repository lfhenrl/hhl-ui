import { watch } from "vue";
import { screenPos } from "./screenPos";
import { flip } from "./flip";

export type iPop = InstanceType<typeof Pop>;
export type ipos = {
  left: number;
  top: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
  maxHeight: string;
};

export class Pop {
  private loaded = false;
  public wWidth: number = 0;
  public wHeight: number = 0;
  public referance?: HTMLElement;
  public dialog?: HTMLElement;
  public refRect?: ipos;
  public diaRect?: DOMRect;
  public offsetTop: number = 0;
  public offsetLeft: number = 0;
  public inner: boolean = false;
  public screen_pos: any;
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
    | "left-end" = "top-start";

  init(ref: HTMLElement, dia: HTMLElement, props: any) {
    this.referance = ref;
    this.dialog = dia;
    this.placement = props.placement;
    this.container = props.container;
    this.inner = props.inner;
    this.offsetTop = props.offsetTop;
    this.offsetLeft = props.offsetLeft;
    this.screen_pos = screenPos(this);

    watch(props, () => {
      this.placement = props.placement;
      this.container = props.container;
      this.inner = props.inner;
      this.offsetTop = props.offsetTop;
      this.offsetLeft = props.offsetLeft;
      this.screen_pos = screenPos(this);
    });
  }

  hasResized() {
    if (this.wWidth !== window.innerWidth) return true;
    if (this.wHeight !== window.innerHeight) return true;
    return false;
  }

  hasScrolled() {
    const rect = this.referance?.getBoundingClientRect() ?? undefined;
    if (rect && this.refRect) {
      if (rect.left !== this.refRect.left) return true;
      if (rect.top !== this.refRect.top) return true;
    }
    return false;
  }

  getRefRect(): ipos | undefined {
    const R = this.referance?.getBoundingClientRect() ?? undefined;
    if (!R) return;
    const bottom = this.wHeight - R.bottom;
    const right = this.wWidth - R.right;
    return {
      top: R.top,
      left: R.left,
      right,
      bottom,
      width: R.width,
      height: R.height,
      maxHeight: ""
    };
  }

  getPos() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;
    this.refRect = this.getRefRect();
    if (!this.loaded) {
      this.diaRect = this.dialog?.getBoundingClientRect() ?? undefined;
      this.loaded = true;
    }

    if (this.refRect && this.diaRect && this.dialog) {
      const posi: ipos = this.screen_pos(this.placement);
      const posiFlip: ipos = flip(this, posi);
      Object.assign(this.dialog.style, {
        left: `${posiFlip.left}px`,
        top: `${posiFlip.top}px`,
        bottom: "auto",
        right: "auto",
        maxHeight: posiFlip.maxHeight
      });
      // console.log("www ", posiFlip);
    }
  }
}
