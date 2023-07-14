import { PopPos } from "./PopPos";

export function screenPos(PosPop: PopPos) {
  const oT = PosPop.offsetTop;
  const oL = PosPop.offsetLeft;
  let refW = PosPop.refRect!.width;
  let refH = PosPop.refRect!.height;
  let refL = PosPop.refRect!.left;
  let refT = PosPop.refRect!.top;
  const refW_halv = refW / 2;
  const refH_halv = refH / 2;
  const diaW = PosPop.diaRect!.width;
  const diaH = PosPop.diaRect!.height;
  const diaW_halv = diaW / 2;
  const diaH_halv = diaH / 2;
  const inner = PosPop.inner;

  if (PosPop.placement.startsWith("top")) {
    const top = inner === true ? refT = refT + oT : refT - diaH - oT;
    const bottom = top + refH;
    let left = 0;
    switch (PosPop.placement) {

      case "top-start":
        left = refL + oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
      case "top-end":
        left = refW - diaW + refL - oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
      default:
        left = refW_halv - diaW_halv + refL + oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
    }
  }

  if (PosPop.placement.startsWith("bottom")) {
    const top = inner ? refT = refT + refH - diaH - oT : refT + refH + oT;
    const bottom = top + refH;
    let left = 0;
    switch (PosPop.placement) {
      case "bottom-start":
        left = refL + oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
      case "bottom-end":
        left = refW - diaW + refL - oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
      default:
        left = refW_halv - diaW_halv + refL + oL;
        return {
          top,
          left,
          bottom,
          right: left + diaW
        }
    }

  }

  if (PosPop.placement.startsWith("left")) {
    const left = inner ? refL = refL + oL : refL - diaW - oL;
    const right = left + diaW;
    let top = 0;
    switch (PosPop.placement) {
      case "left-start":
        top = refT + oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
      case "left-end":
        top = refH - diaH + refT - oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
      default:
        top = refH_halv - diaH_halv + refT  + oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
    }
  }

  if (PosPop.placement.startsWith("right")) {
    const left = inner ? refL + refW - diaW - oL : refL = refL + refW + oL;
    const right = left + diaW;
    let top = 0;
    switch (PosPop.placement) {
      case "right-start":
        top = refT + oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
      case "right-end":
        top = refH - diaH + refT - oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
      default:
        top = refH_halv - diaH_halv + refT + oT;
        return {
          top,
          left,
          bottom: top + diaH,
          right
        }
    }
  }


  const top = refH_halv - diaH_halv + refT + oT;
  const left = refW_halv - diaW_halv + refL + oL;

  return {
    top,
    left,
    bottom: top + diaH,
    right: left + diaW
  };
}
