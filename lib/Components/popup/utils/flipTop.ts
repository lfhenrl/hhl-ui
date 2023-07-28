import { iPop, ipos } from "./Pop";

export function flipTop(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.top < Pop.padding && refBox.top < refBox.bottom) {
      const pl = Pop.placement.replace("top", "bottom");

      rect = Pop.screen_pos(pl);
    } else {
      if (rect.top < Pop.padding) {
        rect.top = Pop.padding;
      }
    }
  }
  return rect;
}
