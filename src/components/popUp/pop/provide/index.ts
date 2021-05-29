import { EventHandler } from "../../../utils/eventHandler";
import { setPosition } from "./setPosition";

export type iPopUp = InstanceType<typeof PopUp>;
export class PopUp {
  public Event = new EventHandler<"ContentMounted" | "ContentUnMounted" | "AskOpen" | "AskClose" | "CanClose">();

  public Reference = {
    dom: {} as HTMLElement
  };
  public content = {
    dom: {} as HTMLElement,
    backgroundDom: {} as HTMLElement
  };
  public IsOpen = false;
  public ShowOnTop = false;
  public Props = {
    modelValue: false,
    top: false,
    right: false,
    trigger: "toggle" as "toggle" | "click" | "hover" | "none",
    inner: false,
    fullWidth: false,
    noOutsideClick: false,
    noReferenceClick: false,
    disabled: false,
    maxWidth: "none",
    minWidth: "none",
    maxHeight: "none",
    minHeight: "none",
    viewportPadding: "11",
    offsetWhenUp: "0",
    offsetWhenDown: "0",
    offsetLeft: "0",
    delayOnMouseOver: "100",
    delayOnMouseOut: "300"
  };
  constructor() {}

  Setposition() {
    setPosition(this);
  }
}
