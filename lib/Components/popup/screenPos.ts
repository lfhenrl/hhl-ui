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
            maxHeight
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
            maxHeight
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
            maxHeight
          };
      }
    }

    if (placement.startsWith("bottom")) {
      top = inner ? ref.top + ref.height - dia.height - oT : ref.top + ref.height + oT;
      bottom = top + ref.height;
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
            maxHeight: ""
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
            maxHeight: ""
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
            maxHeight: ref.bottom - oT - 5 + "px"
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
            maxHeight: ""
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
            maxHeight: ""
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
            maxHeight: ""
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
            maxHeight: ""
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
            maxHeight: ""
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
            maxHeight: ""
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
      maxHeight: ""
    };
  }
  return getScreenPos;
}
