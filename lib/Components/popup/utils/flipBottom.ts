import { iPop, ipos } from "./Pop";

export function flipBottom(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.bottom < Pop.padding && refBox.bottom < refBox.top) {
      const pl = Pop.placement.replace("bottom", "top");
      rect = Pop.screen_pos(pl);
      if (rect.top < Pop.padding) {
        rect.top = Pop.padding;
      }
    } else {
      if (rect.bottom < Pop.padding) {
        rect.top = rect.top - Pop.padding;
      }
    }
  }
  return rect;
}
