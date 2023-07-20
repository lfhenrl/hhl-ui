import { iPop } from "./Pop";

export function screenPos(Pop: iPop) {
  const oT = Pop.offsetTop;
  const oL = Pop.offsetLeft;
  const inner = Pop.inner;
  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;
  let maxHeight = "";

  function getScreenPos(placement: string) {
    const ref = Pop.refRect!;
    const dia = Pop.diaRect!;

    if (placement.startsWith("top")) {
      if (inner === true) {
        top = ref.top + oT;
      } else {
        top = ref.top - dia.height - oT;
      }

      bottom = Pop.wHeight - (top + ref.height);
      maxHeight = ref.top - oT - 5 + "px";
      switch (placement) {
        case "top-start":
          left = ref.left + oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: "top"
          };
        case "top-end":
          left = ref.width - dia.width + ref.left - oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: "top"
          };
        default:
          left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: "top"
          };
      }
    }

    if (placement.startsWith("bottom")) {
      top = inner ? ref.top + ref.height - dia.height - oT : ref.top + ref.height + oT;
      bottom = Pop.wHeight - (top + dia.height);
      switch (placement) {
        case "bottom-start":
          left = ref.left + oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "bottom"
          };
        case "bottom-end":
          left = ref.width - dia.width + ref.left - oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "bottom"
          };
        default:
          left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          return {
            top,
            left,
            bottom,
            right: left + dia.width,
            width: dia.width,
            height: dia.height,
            maxHeight: ref.bottom - oT - 5 + "px",
            pos: "bottom"
          };
      }
    }

    if (placement.startsWith("left")) {
      left = inner ? ref.left + oL : ref.left - dia.width - oL;
      right = left + dia.width;
      switch (placement) {
        case "left-start":
          top = ref.top + oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "left-start"
          };
        case "left-end":
          top = ref.height - dia.height + ref.top - oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "left-end"
          };
        default:
          top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "left"
          };
      }
    }

    if (placement.startsWith("right")) {
      left = inner ? ref.left + ref.width - dia.width - oL : ref.left + ref.width + oL;
      right = left + dia.width;
      switch (placement) {
        case "right-start":
          top = ref.top + oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "right-start"
          };
        case "right-end":
          top = ref.height - dia.height + ref.top - oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "right-end"
          };
        default:
          top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          return {
            top,
            left,
            bottom: top + dia.height,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight: "",
            pos: "right"
          };
      }
    }

    top = ref.height / 2 - dia.height / 2 + ref.top + oT;
    left = ref.width / 2 - dia.width / 2 + ref.left + oL;

    return {
      top,
      left,
      bottom: top + dia.height,
      right: left + dia.width,
      width: dia.width,
      height: dia.height,
      maxHeight: "",
      pos: "center"
    };
  }
  return getScreenPos;
}
