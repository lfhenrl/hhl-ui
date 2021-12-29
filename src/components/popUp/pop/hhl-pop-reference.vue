<template>
  <div class="hhl-pop-reference flx-row" @click="click" @mouseover="hover">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted } from "vue";
import { debounce } from "../../utils/debounce";
import { iPopUp } from "./provide";

const HhlPopReference = defineComponent({
  name: "hhl-pop-reference",
  props: {
    trigger: { type: String, default: "toggle" }
  },
  setup() {
    const p = inject("p") as iPopUp;
    const hover = debounce(_hover, parseInt(p.Props.delayOnMouseOver));

    function click() {
      if (p.IsOpen && p.Props.noReferenceClick) return;
      if (p.Props.trigger === "toggle") toggleTrigger();
      if (p.Props.trigger === "click") clickTrigger();
    }

    function _hover() {
      if (p.Props.trigger === "hover") {
        clickTrigger();
      }
    }

    function toggleTrigger() {
      if (p.IsOpen) {
        p.Event.emit("AskClose");
      } else {
        p.Event.emit("AskOpen");
      }
    }

    function clickTrigger() {
      if (!p.IsOpen) {
        p.Event.emit("AskOpen");
      }
    }

    onMounted(() => {
      const instance = getCurrentInstance();
      setTimeout(() => {
        p.Reference.dom = instance?.vnode.el?.firstElementChild as HTMLElement;
      }, 10);
    });
    return { click, hover };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-pop-reference": typeof HhlPopReference;
  }
}
export type iHhlPopReference = InstanceType<typeof HhlPopReference>;
export default HhlPopReference;
</script>
