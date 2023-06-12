export function setBgColor(element: HTMLElement) {
  if (element) {
    let parent = element.parentElement;
    let col = getCol(parent);
    element.style.backgroundColor = col;
   // console.log("BGcol end ", col)
  }

  function getCol(_p: any): string {
    let _col = window.getComputedStyle(_p, null).getPropertyValue("background-color");
   // console.log("BGcol ", _col, _p)
    if (_col && _col != "rgba(0, 0, 0, 0)") {
      return _col;
    } else {
      let _parent = _p.parentElement;
      if (_parent) {
        return getCol(_parent);
      }
      return "black";
    }
  }
}
