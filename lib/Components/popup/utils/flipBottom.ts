import { iPop, ipos } from "./Pop";

export function flipBottom(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (Pop.inner) return Pop.screen_pos(Pop.placement);
    if (rect.bottom < Pop.padding && refBox.bottom < refBox.top) {
      const pl = Pop.placement.replace("bottom", "top");
      rect = Pop.screen_pos(pl);
    }
  }
  return rect;
}
