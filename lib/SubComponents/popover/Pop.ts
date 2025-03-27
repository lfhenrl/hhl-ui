import { type Ref, watch } from "vue";
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
  maxHeight: number;
  pos: string;
};

export class Pop {
  private pos?: Ref;
  private opserveTimer: any = null;
  public wWidth: number = 0;
  public wHeight: number = 0;
  public referance?: HTMLElement;
  public dialog?: HTMLElement;
  public refRect?: ipos;
  public diaRect?: DOMRect;
  public offsetTop: number = 0;
  public offsetLeft: number = 0;
  public minWidth: string = "auto";
  public widthAsRef: boolean = true;
  public padding: number = 10;
  public screen_pos: any;
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

  init(ref: HTMLElement, dia: HTMLElement, props: any, _pos: Ref) {
    this.referance = ref;
    this.dialog = dia;
    this.placement = props.placement;
    this.offsetTop = props.offsetTop;
    this.offsetLeft = props.offsetLeft;
    this.widthAsRef = props.widthAsRef;
    this.padding = props.padding;
    this.screen_pos = screenPos(this);
    this.pos = _pos;

    watch(props, () => {
      this.placement = props.placement;
      this.offsetTop = props.offsetTop;
      this.offsetLeft = props.offsetLeft;
      this.widthAsRef = props.widthAsRef;
      this.padding = props.padding;
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
      maxHeight: 0,
      pos: "",
    };
  }

  startOpserve() {
    if (!this.opserveTimer) {
      this.opserveTimer = setInterval(this.onOpserve.bind(this), 20);
    }
  }
  stopOpserve() {
    clearInterval(this.opserveTimer);
    this.opserveTimer = null;
  }

  onOpserve() {
    if (this.hasResized()) {
      this.getPos();
      return;
    }
    if (this.hasScrolled()) {
      this.getPos();
      return;
    }
  }

  startPos() {
    this.dialog?.classList.remove("close");
    this.dialog?.classList.add("open");

    this.getPos();
    this.startOpserve();

    setTimeout(() => {
      this.dialog?.classList.add("open-end");
    }, 500);
  }

  endPos() {
    if (this.dialog) {
      this.dialog?.classList.remove("open", "open-end");
      this.dialog?.classList.add("close");
    }
    this.stopOpserve();
  }

  getPos() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;
    this.refRect = this.getRefRect();
    this.diaRect = this.dialog?.getBoundingClientRect() ?? undefined;

    if (this.widthAsRef) {
      this.minWidth = this.refRect?.width + "px";
    } else {
      this.minWidth = "auto";
    }

    if (this.refRect && this.diaRect && this.dialog) {
      const posi: ipos = this.screen_pos(this.placement);
      const posiFlip: ipos = flip(this, posi);
      this.pos!.value = posiFlip.pos;

      Object.assign(this.dialog.style, {
        left: `${posiFlip.left}px`,
        top: `${posiFlip.top}px`,
        bottom: "auto",
        right: "auto",
        maxHeight: `${posiFlip.maxHeight}px`,
        minWidth: this.minWidth,
      });
    }
  }
}
