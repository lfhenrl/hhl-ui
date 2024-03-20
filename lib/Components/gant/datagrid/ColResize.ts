export function ColResize(col: any, mousePos: any) {
  const PosX: number = mousePos.screenX;
  const rowWidth = parseInt(col.Width.value) ?? 100;
  document.addEventListener("mousemove", ResizeMouseMove, false);
  document.addEventListener("mouseup", MouseUp, false);
  console.log("nnnn");

  function ResizeMouseMove(e: MouseEvent) {
    const diffX = e.screenX - PosX;
    const newWidth = rowWidth + diffX;
    if (newWidth > 30) {
      const newWidthString = rowWidth + diffX + 1 + "px";
      col.Width.value = newWidthString;
    }
  }

  function MouseUp() {
    document.removeEventListener("mousemove", ResizeMouseMove, false);
    document.removeEventListener("mouseup", MouseUp, false);
  }
}
