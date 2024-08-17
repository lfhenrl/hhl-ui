import { iPop } from "./Pop";

//function adjustLeft(place: string) {}

export function screenPos(Pop: iPop) {
  const oT = Pop.offsetTop;
  const oL = Pop.offsetLeft;
  const padding = Pop.padding;

  function getScreenPos(placement: string) {
    function adjustLeft() {
      if (placement.endsWith("start")) {
        return ref.left + oL;
      }
      if (placement.endsWith("end")) {
        return ref.left + oL;
      }
      return ref.width / 2 - dia.width / 2 + ref.left + oL;
    }

    function adjustTop() {
      if (placement.endsWith("start")) {
        return ref.top + oT;
      }
      if (placement.endsWith("end")) {
        return ref.height - dia.height + ref.top - oT;
      }
      return ref.height / 2 - dia.height / 2 + ref.top + oT;
    }

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
      P.left = adjustLeft();
      P.right = Pop.wWidth - (P.left + dia.width);
      return P;
    }

    if (placement.startsWith("bottom")) {
      P.top = ref.top + ref.height + oT;
      P.bottom = Pop.wHeight - (P.top + dia.height);
      P.maxHeight = ref.bottom - oT - padding;
      P.pos = "bottom";
      P.left = adjustLeft();
      P.right = Pop.wWidth - (P.left + dia.width);
      return P;
    }

    if (placement.startsWith("left")) {
      P.left = ref.left - dia.width - oL;
      P.right = Pop.wWidth - (P.left + dia.width);
      P.maxHeight = Pop.wHeight - padding * 2;
      P.pos = "left";
      P.top = adjustTop();
      P.bottom = Pop.wHeight - (P.top + dia.height);
      return P;
    }

    if (placement.startsWith("right")) {
      P.left = ref.left + ref.width + oL;
      P.right = P.left + dia.width;
      P.maxHeight = Pop.wHeight - padding * 2;
      P.right = Pop.wWidth - (P.left + dia.width);
      P.pos = "right";
      P.top = adjustTop();
      P.bottom = Pop.wHeight - (P.top + dia.height);
      return P;
    }
  }
  return getScreenPos;
}
