import { type iPop, type ipos } from "./Pop";

export function adjustUpDown(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.top < Pop.padding) {
      rect.top = Pop.padding;
    } else if (rect.bottom < Pop.padding) {
      rect.top = Pop.wHeight - Math.min(rect.maxHeight, rect.height) - Pop.padding;
    }
  }
  return rect;
}
