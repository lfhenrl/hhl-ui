export function ColResize(col: any, mousePos: any) {
  const PosX: number = mousePos.screenX;
  const rowWidth = col.dom?.clientWidth ?? 100;
  document.addEventListener("mousemove", ResizeMouseMove, false);
  document.addEventListener("mouseup", MouseUp, false);

  function ResizeMouseMove(e: MouseEvent) {
    const diffX = e.screenX - PosX;
    const newWidth = rowWidth + diffX;
    if (newWidth > 40) {
      const newWidthString = rowWidth + diffX + 1 + "px";
      col.cssRule.style.maxWidth = newWidthString;
      col.cssRule.style.minWidth = newWidthString;
      col.autoWidth = false;
    }
  }

  function MouseUp() {
    document.removeEventListener("mousemove", ResizeMouseMove, false);
    document.removeEventListener("mouseup", MouseUp, false);
  }
}
