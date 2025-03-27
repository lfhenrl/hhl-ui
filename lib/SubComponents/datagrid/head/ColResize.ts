import { type iColumn } from "../provide/Column";

export function ColResize(col: iColumn, mousePos: any) {
  const PosX: number = mousePos.screenX;
  const rowWidth = col.dom?.clientWidth ?? 100;
  document.addEventListener("mousemove", ResizeMouseMove, false);
  document.addEventListener("mouseup", MouseUp, false);

  const headWidth = col.Dgrid.headDom?.clientWidth;
  col.Dgrid.headDom!.style.minWidth = headWidth + "px";

  function ResizeMouseMove(e: MouseEvent) {
    const diffX = e.screenX - PosX;
    const newWidth = rowWidth + diffX;
    if (newWidth > 40) {
      const newWidthString = rowWidth + diffX + 1 + "px";
      col.head_width.value = newWidthString;
      col.autoWidth = false;
    }
  }

  function MouseUp() {
    document.removeEventListener("mousemove", ResizeMouseMove, false);
    document.removeEventListener("mouseup", MouseUp, false);
    col.width.value = col.head_width.value;
    col.Dgrid.headDom!.style.minWidth = "none";
  }
}
