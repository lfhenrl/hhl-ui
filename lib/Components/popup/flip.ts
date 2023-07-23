import { iPop, ipos } from "./Pop";
import { flipTop } from "./flipTop";
import { flipBottom } from "./flipBottom";
import { adjustLeftRight } from "./adjustLeftRight";
import { adjustUpDown } from "./adjustUpDown";

export function flip(PosPop: iPop, rect: ipos) {
  if (PosPop.placement.startsWith("top")) {
    rect = flipTop(PosPop, rect);
  }
  if (PosPop.placement.startsWith("bottom")) {
    rect = flipBottom(PosPop, rect);
  }

  if (PosPop.placement.startsWith("left") || PosPop.placement.startsWith("right")) {
    rect = adjustUpDown(PosPop, rect);
  }

  rect = adjustLeftRight(PosPop, rect);
  return rect;
}
