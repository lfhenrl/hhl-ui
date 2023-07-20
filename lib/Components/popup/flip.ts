import { iPop, ipos } from "./Pop";
import { flipTop } from "./flipTop";
import { flipBottom } from "./flipBottom";

export function flip(PosPop: iPop, rect: ipos) {
  if (PosPop.placement.startsWith("top")) {
    rect = flipTop(PosPop, rect);
  }
  if (PosPop.placement.startsWith("bottom")) {
    rect = flipBottom(PosPop, rect);
  }

  return rect;
}
