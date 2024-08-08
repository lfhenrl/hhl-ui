import { iPop } from "./Pop";

export function screenPos(Pop: iPop) {
  const oT = Pop.offsetTop;
  const oL = Pop.offsetLeft;
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
      top = ref.top - dia.height - oT;
      maxHeight = ref.top - padding;

      bottom = Pop.wHeight - (top + ref.height);

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
            pos: "top",
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
            pos: "top",
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
            pos: "top",
          };
      }
    }

    if (placement.startsWith("bottom")) {
      top = ref.top + ref.height + oT;
      maxHeight = ref.bottom - oT - padding;
      bottom = Pop.wHeight - (top + dia.height);

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
            pos: "bottom",
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
            pos: "bottom",
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
            pos: "bottom",
          };
      }
    }

    if (placement.startsWith("left")) {
      left = ref.left - dia.width - oL;
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
            pos: "left",
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
            pos: "left",
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
            pos: "left",
          };
      }
    }

    if (placement.startsWith("right")) {
      left = ref.left + ref.width + oL;
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
            pos: "right",
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
            pos: "right",
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
            pos: "right",
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
      pos: "center",
    };
  }
  return getScreenPos;
}
