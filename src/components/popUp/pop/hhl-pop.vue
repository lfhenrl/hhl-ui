<template>
  <div class="hhl-pop inline" :class="{'flx-1': referenceFullWidth}" @mouseleave="mouseOut" @mouseover="mouseOver">
    <hhl-pop-reference :class="{'flx-1': referenceFullWidth}">
      <slot name="reference" />
    </hhl-pop-reference >
    <hhl-pop-content v-if="show">
      <slot />
    </hhl-pop-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref, PropType, watchEffect } from "vue";
import hhlPopReference from "./hhl-pop-reference.vue";
import hhlPopContent from "./hhl-pop-content.vue";
import { PopUp } from "./provide";

const HhlPop = defineComponent({
  components: {
    hhlPopReference,
    hhlPopContent
  },
  name: "hhl-pop",
  props: {
    modelValue: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    trigger: { type: String as PropType<"toggle" | "click" | "hover" | "none">, default: "toggle" },
    inner: { type: Boolean, default: false },
    referenceFullWidth: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    noOutsideClick: { type: Boolean, default: false },
    noReferenceClick: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maxWidth: { type: String, default: "none" },
    minWidth: { type: String, default: "none" },
    maxHeight: { type: String, default: "none" },
    minHeight: { type: String, default: "none" },
    viewportPadding: { type: String, default: "11" },
    offsetWhenUp: { type: String, default: "0" },
    offsetWhenDown: { type: String, default: "0" },
    offsetLeft: { type: String, default: "0" },
    delayOnMouseOver: { type: String, default: "100" },
    delayOnMouseOut: { type: String, default: "500" }
  },
  setup(props, { emit }) {
    const p = new PopUp();
    provide("p", p);
    const show = ref(false);
    let Xtimer = {} as any;

    watchEffect(() => {
      if (props.modelValue === true && p.IsOpen === false) {
        p.Event.emit("AskOpen");
      }
      if (props.modelValue === false && p.IsOpen === true) {
        p.Event.emit("AskClose");
      }
    });

    p.Props = computed(() => {
      return props;
    }).value;

    p.Event.on("AskOpen", () => {
      if (props.disabled) return;
      console.log("AskOpen");
      show.value = true;
    });

    p.Event.on("CanClose", () => {
      console.log("CanClose");
      show.value = false;
    });

    p.Event.on("ContentMounted", () => {
      p.IsOpen = true;
      emit("update:modelValue", true);
    });

    p.Event.on("ContentUnMounted", () => {
      p.IsOpen = false;
      emit("update:modelValue", false);
    });

    function Close() {
      p.Event.emit("AskClose");
    }

    function mouseOut() {
      if (!p.IsOpen) return;
      if (p.Props.trigger !== "hover") return;
      clearTimeout(Xtimer);
      Xtimer = setTimeout(() => {
        p.Event.emit("AskClose");
      }, parseInt(props.delayOnMouseOut));
    }

    function mouseOver() {
      if (!p.IsOpen) return;
      if (p.Props.trigger !== "hover") return;
      clearTimeout(Xtimer);
    }

    return { show, mouseOut, mouseOver, Close };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-pop": typeof HhlPop;
  }
}
export type iHhlPop = InstanceType<typeof HhlPop>;
export default HhlPop;
</script>
<style>
  .hhl-pop {
    width: min-content;

  }
</style>
