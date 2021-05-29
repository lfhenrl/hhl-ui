import { iPopUp } from ".";

export function setPosition(p: iPopUp) {
  const ref = p.Reference.dom.getBoundingClientRect();
  const pop = p.content.dom as HTMLElement;
  const spaceAbove = ref.top;
  const spaceBelow = window.innerHeight - ref.bottom;
  const viewportPadding = parseInt(p.Props.viewportPadding);
  // const isVisbel = window.innerHeight - ref.top > 10 && ref.top > 10 && window.innerWidth - ref.left > 50 && ref.right > 10;
  // if (!isVisbel) {
  //   p.Event.emit("AskClose");
  // }

  if (p.Props.fullWidth) {
    pop.style.width = ref.width + "px";
  }
  const popHeight = spaceAbove > spaceBelow ? spaceAbove - viewportPadding : spaceBelow - viewportPadding;
  const maxHeight = parseInt(p.Props.maxHeight) || 0;

  if (popHeight < maxHeight) {
    pop.style.maxHeight = popHeight + "px";
  } else {
    pop.style.maxHeight = p.Props.maxHeight;
  }

  setTimeout(() => {
    const hasEnoughSpaceBelow = spaceBelow > pop.offsetHeight;
    const hasEnoughSpaceAbove = spaceAbove > pop.offsetHeight;
    const setBelow = hasEnoughSpaceBelow || spaceBelow > spaceAbove;
    const setAbove = hasEnoughSpaceAbove || spaceAbove > spaceBelow;

    if (p.Props.top) {
      if (setAbove) {
        setPosTop(ref);
      } else {
        setPosBottom(ref);
      }
    }

    if (!p.Props.top) {
      if (setBelow) {
        p.ShowOnTop = false;
        setPosBottom(ref);
      } else {
        p.ShowOnTop = true;
        setPosTop(ref);
      }
    } else {
      p.ShowOnTop = true;
    }

    if (p.Props.right) {
      setPosEnd(ref);
    } else {
      setPosStart(ref);
    }
  });

  const setPosTop = (ref: any) => {
    let top = 0;
    const offsetWhenUp = parseInt(p.Props.offsetWhenUp);

    if (p.Props.inner) {
      top = ref.bottom - pop.offsetHeight - offsetWhenUp;
    } else {
      top = ref.top - pop.offsetHeight - offsetWhenUp;
    }
    if (top < viewportPadding) {
      top = viewportPadding;
    }
    pop.style.top = top + "px";
  };

  const setPosBottom = (ref: any) => {
    let top = 0;
    const offsetWhenDown = parseInt(p.Props.offsetWhenDown);

    if (p.Props.inner) {
      top = ref.top + offsetWhenDown;
    } else {
      top = ref.bottom + offsetWhenDown;
    }
    const bottom = window.innerHeight - pop.offsetHeight - top;
    if (bottom < viewportPadding) {
      top = top + bottom - viewportPadding;
    }
    pop.style.top = top + "px";
  };

  const setPosStart = (ref: any) => {
    let left = 0;
    const offsetLeft = parseInt(p.Props.offsetLeft);
    left = ref.left + offsetLeft;
    const right = window.innerWidth - pop.offsetWidth - left;

    if (left < viewportPadding) {
      left = viewportPadding;
    }
    if (right < viewportPadding) {
      left = left + right - viewportPadding - 5;
    }
    pop.style.left = left + "px";
  };

  const setPosEnd = (ref: any) => {
    let left = 0;
    const offsetLeft = parseInt(p.Props.offsetLeft);
    left = ref.right + offsetLeft - pop.offsetWidth;
    const right = window.innerWidth - pop.offsetWidth - left;

    if (left < viewportPadding) {
      left = viewportPadding;
    }
    if (right < viewportPadding) {
      left = left + right - viewportPadding - 5;
    }
    pop.style.left = left + "px";
  };
}
