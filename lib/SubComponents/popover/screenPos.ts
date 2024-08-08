import { iPop } from "./Pop";

export function screenPos(Pop: iPop) {
  const oT = Pop.offsetTop;
  const oL = Pop.offsetLeft;
  const padding = Pop.padding;

  function getScreenPos(placement: string) {
    const ref = Pop.refRect!;
    const dia = Pop.diaRect!;
    const P = {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: dia.width,
      height: dia.height,
      maxHeight: 0,
      pos: "na",
    };

    if (placement.startsWith("top")) {
      P.top = ref.top - dia.height - oT;
      P.bottom = Pop.wHeight - (P.top + ref.height);
      P.maxHeight = ref.top - padding;
      P.pos = "top";

      switch (placement) {
        case "top-start":
          P.left = ref.left + oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;

        case "top-end":
          P.left = ref.width - dia.width + ref.left - oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;

        default:
          P.left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;
      }
    }

    if (placement.startsWith("bottom")) {
      P.top = ref.top + ref.height + oT;
      P.bottom = Pop.wHeight - (P.top + dia.height);
      P.maxHeight = ref.bottom - oT - padding;
      P.pos = "bottom";

      switch (placement) {
        case "bottom-start":
          P.left = ref.left + oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;

        case "top-end":
          P.left = ref.width - dia.width + ref.left - oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;
        case "bottom-end":
          P.left = ref.width - dia.width + ref.left - oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;
        default:
          P.left = ref.width / 2 - dia.width / 2 + ref.left + oL;
          P.right = Pop.wWidth - (P.left + dia.width);
          return P;
      }
    }

    if (placement.startsWith("left")) {
      P.left = ref.left - dia.width - oL;
      P.right = Pop.wWidth - (P.left + dia.width);
      P.maxHeight = Pop.wHeight - padding * 2;
      P.pos = "left";

      switch (placement) {
        case "left-start":
          P.top = ref.top + oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;

        case "left-end":
          P.top = ref.height - dia.height + ref.top - oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;

        default:
          P.top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;
      }
    }

    if (placement.startsWith("right")) {
      P.left = ref.left + ref.width + oL;
      P.right = P.left + dia.width;
      P.maxHeight = Pop.wHeight - padding * 2;
      P.right = Pop.wWidth - (P.left + dia.width);
      P.pos = "right";

      switch (placement) {
        case "right-start":
          P.top = ref.top + oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;

        case "right-end":
          P.top = ref.height - dia.height + ref.top - oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;

        default:
          P.top = ref.height / 2 - dia.height / 2 + ref.top + oT;
          P.bottom = Pop.wHeight - (P.top + dia.height);
          return P;
      }
    }
  }
  return getScreenPos;
}
