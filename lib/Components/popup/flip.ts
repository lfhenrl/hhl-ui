import { iPop, ipos } from "./Pop";
import { flipTop } from "./flipTop";

export function flip(PosPop: iPop, rect: ipos) {
  if (PosPop.placement.startsWith("top")) {
    return flipTop(PosPop, rect);
  }

  return rect;
}
