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

    if (placement.startsWith("top")) {
      if (inner === true) {
        top = ref.top - oT;
      } else {
        top = ref.top - dia.height - oT;
      }

      bottom = Pop.wHeight - (top + ref.height);
      maxHeight = ref.top - padding;
      switch (placement) {
        case "top-start":
          left = ref.left + oL;
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
          left = ref.width - dia.width + ref.left - oL;
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
        top = ref.top + ref.height - dia.height + oT;
      } else {
        top = ref.top + ref.height + oT;
      }
      bottom = Pop.wHeight - (top + dia.height);
      maxHeight = ref.bottom - oT - padding;
      switch (placement) {
        case "bottom-start":
          left = ref.left + oL;
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
          left = ref.width - dia.width + ref.left - oL;
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
