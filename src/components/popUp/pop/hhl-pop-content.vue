<template>
  <div class="hhl-pop-content fixed pos-all-0 z-50 pointer-events-none">
    <div
      class="hhl-pop-content__view absolute flx-row z-10 top-0 left-0 pointer-events-auto"
      :class="{ contentShow: isFirstLoadet, show: show, showOnTop: showOnTop }"
      :style="style"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, ref } from "vue";
import { debounce } from "../../utils/debounce";
import { iPopUp } from "./provide";

function elementContains(elm: any, otherElm: any) {
  if (typeof elm.contains === "function") {
    return elm.contains(otherElm);
  }
  return false;
}

const HhlPopContent = defineComponent({
  name: "hhl-pop-content",
  props: {
    modelValue: { type: String, default: "" }
  },
  setup() {
    let backGroundDom: HTMLElement;
    let dom: HTMLElement;
    const p = inject("p") as iPopUp;
    const isFirstLoadet = ref(false);
    const show = ref(false);
    const showOnTop = ref(false);
    const setPosition = debounce(_setPosition, 15);

    const style = {
      maxWidth: p.Props.maxWidth,
      minWidth: p.Props.minWidth,
      maxHeight: p.Props.maxHeight,
      minHeight: p.Props.minHeight
    };

    function bgClick(e: any) {
      if (elementContains(dom, e.target) || elementContains(p.Reference.dom, e.target)) {
        return;
      }
      p.Event.emit("AskClose");
    }

    function _setPosition() {
      p.Setposition();
      isFirstLoadet.value = true;
      setTimeout(() => {
        showOnTop.value = p.ShowOnTop;
        show.value = true;
        p.Event.emit("ContentMounted");
      });
    }

    p.Event.on("AskClose", () => {
      console.log("AskClose");
      show.value = false;
      setTimeout(() => {
        isFirstLoadet.value = false;
        p.Event.emit("CanClose");
      }, 400);
    });

    onMounted(() => {
      const instance = getCurrentInstance();
      backGroundDom = instance?.vnode.el as HTMLElement;
      p.content.backgroundDom = backGroundDom;
      dom = instance?.vnode.el?.firstChild as HTMLElement;
      p.content.dom = dom;
      if (!p.Props.noOutsideClick) {
        document.addEventListener("click", bgClick, true);
      }
      window.addEventListener("resize", setPosition, true);
      document.addEventListener("scroll", setPosition, true);
      setPosition();
    });

    onUnmounted(() => {
      document.removeEventListener("click", bgClick, true);
      window.removeEventListener("resize", setPosition, true);
      document.removeEventListener("scroll", setPosition, true);

      p.Event.emit("ContentUnMounted");
    });

    return {
      isFirstLoadet,
      show,
      showOnTop,
      style
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-pop-content": typeof HhlPopContent;
  }
}
export type iHhlPopContent = InstanceType<typeof HhlPopContent>;
export default HhlPopContent;
</script>

<style>
.hhl-pop-content {
  --hhlPop-origin: top;
  overflow: hidden;
  background-color: transparent;
}
.hhl-pop-content__view {
  opacity: 0;
}
.hhl-pop-content__view.contentShow {
  opacity: 1;
}

.hhl-pop-content__view div {
  transition: transform 0.3s ease-in-out;
  transform-origin: top;
  transform: scaleY(0);
}
.hhl-pop-content__view.showOnTop div {
  transform-origin: bottom;
}
.hhl-pop-content__view.contentShow div {
  transform: scaleY(0);
}

.hhl-pop-content__view.contentShow.show div {
  transform: scaleY(1);
}
</style>
