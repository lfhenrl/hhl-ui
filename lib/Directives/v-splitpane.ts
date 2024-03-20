export const vSplitpane = {
  mounted(el: HTMLElement) {
    const leftSide = el.previousElementSibling as HTMLElement;
    let x = 0,
      // y = 0,
      leftWidth = 0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      x = e.clientX;
      // y = e.clientY;
      leftWidth = leftSide.getBoundingClientRect().width;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      const dx = e.clientX - x;
      // const dy = e.clientY - y;
      const parent = el.parentNode as HTMLElement;
      const parentWidth = parent.getBoundingClientRect().width;
      const newLeftWidth = ((leftWidth + dx) * 100) / parentWidth;
      leftSide.style.width = `${newLeftWidth + 1}%`;
      leftSide.style.minWidth = `${newLeftWidth + 1}%`;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  unmounted() {
    document.onmouseup = null;
    document.onmousemove = null;
  },
};
