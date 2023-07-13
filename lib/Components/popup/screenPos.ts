import { PopPos } from "./PopPos";

export function screenPos(PosPop: PopPos) {
  const oT = PosPop.offsetTop;
  const oL = PosPop.offsetLeft;
  const wW = PosPop.wWidth;
  const wH = PosPop.wHeight;
  const diaW = PosPop.diaRect!.width;
  const diaH = PosPop.diaRect!.height;
  const pos: any = {
    top: { top: oT, left: wW / 2 - diaW / 2 + oL },
    "top-start": { top: oT, left: oL },
    "top-end": { top: oT, left: wW - diaW - oL },
    right: { top: wH / 2 - diaH / 2 + oT, left: wW - diaW - oL },
    "right-start": { top: oT, left: wW - diaW - oL },
    "right-end": { top: wH - diaH - oT, left: wW - diaW - oL },
    bottom: { top: wH - diaH - oT, left: wW / 2 - diaW / 2 + oL },
    "bottom-start": { top: wH - diaH - oT, left: oL },
    "bottom-end": { top: wH - diaH - oT, left: wW - diaW - oL },
    left: { top: oT, left: oL },
    "left-start": { top: oT, left: oL },
    "left-end": { top: wH - diaH - oT, left: oL },
    center: { top: wH / 2 - diaH / 2 + oT, left: wW / 2 - diaW / 2 + oL }
  };
  const y = pos[PosPop.placement];
  return y;
}
