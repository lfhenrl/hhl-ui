import { iPop, ipos } from "./Pop";

export function flipTop(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (Pop.inner) return Pop.screen_pos(Pop.placement);
    if (rect.top < Pop.padding && refBox.top < refBox.bottom) {
      const pl = Pop.placement.replace("top", "bottom");
      rect = Pop.screen_pos(pl);
    }
  }
  return rect;
}
