export const movable = {
  mounted(el: HTMLElement) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0,
      maxRight = 0,
      maxBottom = 0,
      dragInit = {} as HTMLElement;

    const dragInitTest = el.querySelector("[moveable-drag]") as HTMLElement;
    if (dragInitTest) {
      dragInit = dragInitTest;
    } else {
      dragInit = el;
    }

    dragInit.onmousedown = dragMouseDown;
    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      if (el.offsetParent) {
        maxRight = el.offsetParent?.clientWidth || 0;
        maxBottom = el.offsetParent?.clientHeight || 0;
      } else {
        const pageContainer = document.querySelector("#page-container") as HTMLElement;
        if (pageContainer) {
          maxRight = pageContainer.offsetWidth;
          maxBottom = pageContainer.offsetHeight;
        } else {
          maxRight = document.body.offsetWidth;
          maxBottom = document.body.clientHeight;
        }
      }

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      let top = el.offsetTop - pos2;
      let left = el.offsetLeft - pos1;
      let right = el.offsetLeft + el.offsetWidth - maxRight;
      let bottom = el.offsetTop + el.offsetHeight - maxBottom;

      if (top < 0) {
        top = 0;
        el.style.top = top + "px";
        closeDragElement();
      }

      if (left < 0) {
        left = 0;
        el.style.left = left + "px";
        closeDragElement();
      }

      if (right > 0) {
        left = maxRight - el.offsetWidth - 2;
        el.style.left = left + "px";
        closeDragElement();
      }

      if (bottom > 0) {
        top = maxBottom - el.offsetHeight - 2;
        el.style.top = top + "px";
        closeDragElement();
      }

      el.style.top = top + "px";
      el.style.left = left + "px";
      el.style.bottom = "auto";
      el.style.right = "auto";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  unmounted() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};
