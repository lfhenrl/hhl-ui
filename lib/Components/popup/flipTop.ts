import { iPop, ipos } from "./Pop";

export function flipTop(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.top < 2 && refBox.top < refBox.bottom) {
      const pl = Pop.placement.replace("top", "bottom");
      console.log("bbbbbbbbbbbbbbb ", Pop.placement);
      rect = Pop.screen_pos(pl);
    } else {
      if (rect.top < 2) {
        rect.top = 2;
      }
    }
  }
  return rect;
}
