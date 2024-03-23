export function TaskResize(size: any, mousePos: any) {
  const PosX: number = mousePos.screenX;
  const w = size.value;
  document.addEventListener("mousemove", ResizeMouseMove, false);
  document.addEventListener("mouseup", MouseUp, false);

  function ResizeMouseMove(e: MouseEvent) {
    const diff = e.screenX - PosX;
    size.value = w + diff;
  }

  function MouseUp() {
    document.removeEventListener("mousemove", ResizeMouseMove, false);
    document.removeEventListener("mouseup", MouseUp, false);
  }
}
