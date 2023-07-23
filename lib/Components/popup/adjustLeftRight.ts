import { iPop, ipos } from "./Pop";

export function adjustLeftRight(Pop: iPop, rect: ipos) {
  const refBox = Pop.refRect;
  if (refBox) {
    if (rect.left < Pop.padding) {
      rect.left = Pop.padding;
    } else if (rect.right < Pop.padding) {
      rect.left = Pop.wWidth - rect.width - Pop.padding;
    }
  }
  return rect;
}
