import { iPop, ipos } from "./Pop";

export function flipBottom(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.bottom < 2 && refBox.bottom < refBox.top) {
      const pl = Pop.placement.replace("bottom", "top");
      rect = Pop.screen_pos(pl);
      if (rect.top < 2) {
        rect.top = 2;
      }
    } else {
    }
  }
  return rect;
}
