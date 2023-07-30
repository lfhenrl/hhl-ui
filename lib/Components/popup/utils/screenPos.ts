import { iPop } from "./Pop";

export function screenPos(Pop: iPop) {
  const oT = Pop.offsetTop;
  const oL = Pop.offsetLeft;
  const inner = Pop.inner;
  const padding = Pop.padding;

  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;
  let maxHeight = 0;

  function getScreenPos(placement: string) {
    const ref = Pop.refRect!;
    const dia = Pop.diaRect!;
    const container = Pop.container;
    let pad = container === "slotElement" ? 0 : padding;

    if (placement.startsWith("top")) {
      if (inner === true) {
        if (container === "slotElement") {
          top = ref.top + oT;
          maxHeight = Pop.wHeight - padding - top;
        } else {
          top = ref.top + oT + padding;
          maxHeight = ref.top + ref.height - top - padding;
        }
      } else {
        top = ref.top - dia.height - oT;
        maxHeight = ref.top - padding;
      }

      bottom = Pop.wHeight - (top + ref.height);

      switch (placement) {
        case "top-start":
          if (inner === true) {
            left = ref.left + oL + pad;
          } else {
            left = ref.left + oL;
          }
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "bottom" : "top"
          };
        case "top-end":
          if (inner === true) {
            left = ref.width - dia.width + ref.left - oL - pad;
          } else {
            left = ref.width - dia.width + ref.left - oL;
          }
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "bottom" : "top"
          };
        default:
          left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "bottom" : "top"
          };
      }
    }

    if (placement.startsWith("bottom")) {
      if (inner === true) {
        top = ref.top + ref.height - dia.height - oT - pad;

        if (container === "slotElement") {
          maxHeight = ref.top - padding - oT;
          if (top < padding) top = padding;
        } else {
          maxHeight = ref.bottom - oT - padding;
        }
      } else {
        top = ref.top + ref.height + oT;
        maxHeight = ref.bottom - oT - padding;
      }
      bottom = Pop.wHeight - (top + dia.height);

      switch (placement) {
        case "bottom-start":
          if (inner === true) {
            left = ref.left + oL + pad;
          } else {
            left = ref.left + oL;
          }
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "top" : "bottom"
          };
        case "bottom-end":
          if (inner === true) {
            left = ref.width - dia.width + ref.left - oL - pad;
          } else {
            left = ref.width - dia.width + ref.left - oL;
          }
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "top" : "bottom"
          };
        default:
          left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          right = Pop.wWidth - (left + dia.width);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "top" : "bottom"
          };
      }
    }

    if (placement.startsWith("left")) {
      left = inner ? ref.left + oL : ref.left - dia.width - oL;
      maxHeight = Pop.wHeight - padding * 2;
      right = Pop.wWidth - (left + dia.width);
      switch (placement) {
        case "left-start":
          top = ref.top + oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "right" : "left"
          };
        case "left-end":
          top = ref.height - dia.height + ref.top - oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "right" : "left"
          };
        default:
          top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "right" : "left"
          };
      }
    }

    if (placement.startsWith("right")) {
      left = inner ? ref.left + ref.width - dia.width - oL : ref.left + ref.width + oL;
      right = left + dia.width;
      maxHeight = Pop.wHeight - padding * 2;
      right = Pop.wWidth - (left + dia.width);
      switch (placement) {
        case "right-start":
          top = ref.top + oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "left" : "right"
          };
        case "right-end":
          top = ref.height - dia.height + ref.top - oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "left" : "right"
          };
        default:
          top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          bottom = Pop.wHeight - (top + dia.height);
          return {
            top,
            left,
            bottom,
            right,
            width: dia.width,
            height: dia.height,
            maxHeight,
            pos: inner ? "left" : "right"
          };
      }
    }
    maxHeight = Pop.wHeight - padding * 2;
    top = ref.height / 2 - dia.height / 2 + ref.top + oT;
    left = ref.width / 2 - dia.width / 2 + ref.left + oL;
    bottom = Pop.wHeight - (top + ref.height);
    right = Pop.wWidth - (left + dia.width);

    return {
      top,
      left,
      bottom,
      right,
      width: dia.width,
      height: dia.height,
      maxHeight,
      pos: "center"
    };
  }
  return getScreenPos;
}
