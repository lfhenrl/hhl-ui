<template>
  <button
    ref="referance"
    :popovertarget="id"
    type="button"
    role="popover"
    :autofocus
    class="H_pop-referance flex items-center"
    :class="refClass"
    :disabled="disabled || readonly"
  >
    <slot name="referance"></slot>
  </button>
  <div
    :popover="closeAction"
    v-bind="$attrs"
    ref="popup"
    :id="id"
    class="H_pop-popup drop-shadow-bg4 drop-shadow-md"
    :class="{
      top: placement.startsWith('top'),
      bottom: placement.startsWith('bottom'),
      right: placement.startsWith('right'),
      left: placement.startsWith('left'),
      widthAsRef: widthAsRef,
    }"
    :placement
    :offsettop="offsetTop"
    :offsetleft="offsetLeft"
    @toggle="toggleEvent"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useId, useTemplateRef, watch, onMounted, type PropType } from "vue";

const id = useId();
const P = defineProps({
  placement: {
    type: String as PropType<
      | "top"
      | "top-start"
      | "top-end"
      | "right"
      | "right-start"
      | "right-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "left"
      | "left-start"
      | "left-end"
    >,
    default: "bottom-start",
  },
  closeAction: {
    type: String as PropType<"auto" | "manual" | "hint">,
    default: "auto",
  },
  autofocus: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  refClass: {},
  offsetTop: { type: String, default: "0" },
  offsetLeft: { type: String, default: "0" },
  widthAsRef: { type: Boolean, default: false },
  movable: { default: false, type: Boolean },
});
defineExpose({
  open,
  close,
});
const E = defineEmits(["toggled"]);
const modelValue = defineModel();
const popup = useTemplateRef("popup");

let lastTop = 0;
let lastLeft = 0;

watch(modelValue, () => {
  if (modelValue.value === true) {
    open();
  } else {
    close();
  }
});

function open() {
  if (popup.value) {
    (popup.value as any).showPopover();
  }
}

function close() {
  if (popup.value) {
    (popup.value as any).hidePopover?.();
  }
}

function toggleEvent(e: ToggleEvent) {
  if (e.newState === "open") {
    modelValue.value = true;
    E("toggled", true);
  } else if (e.newState === "closed") {
    modelValue.value = false;
    E("toggled", false);
  }
}

onMounted(() => {
  if (popup.value && P.movable) {
    const dragInitTest = popup.value.querySelector("[moveable-drag]") as HTMLElement;
    let dragInit = {} as HTMLElement;
    if (dragInitTest) {
      dragInit = dragInitTest;
      dragInit.onmousedown = dragMouseDown;
    }
  }
});

function dragMouseDown(e: any) {
  e.preventDefault();
  if (modelValue.value !== true || !popup.value) return;
  lastTop = e.clientY - parseInt(window.getComputedStyle(popup.value, null).getPropertyValue("top"));
  lastLeft = e.clientX - parseInt(window.getComputedStyle(popup.value, null).getPropertyValue("left"));
  document.addEventListener("mouseup", closeDragElement);
  document.addEventListener("mousemove", elementDrag);
}

function elementDrag(e: MouseEvent) {
  e.preventDefault();
  if (!popup.value) return;

  popup.value.style.top = -(lastTop - e.clientY) + "px";
  popup.value.style.left = -(lastLeft - e.clientX) + "px";
}

function closeDragElement() {
  document.removeEventListener("mouseup", closeDragElement);
  document.removeEventListener("mousemove", elementDrag);
}
</script>

<style>
/* stylelint-disable declaration-property-value-no-unknown */
/* stylelint-disable function-no-unknown */
/* stylelint-disable custom-property-no-missing-var-function */
@layer components {
  .H_pop-referance {
    anchor-name: v-bind("--" + id);
  }

  [moveable-drag] {
    cursor: move;
  }

  .H_pop-popup {
    position: absolute;
    width: max-content;

    background-color: transparent;
    position-anchor: v-bind("--" + id);
    margin-block: attr(offsettop type(<length>));
    margin-inline: attr(offsetleft type(<length>));
    --placement: attr(placement type(<custom-ident>));
    position-area: if(
      style(--placement: top): top; style(--placement: top-start): top span-right; style(--placement: top-end): top
        span-left; style(--placement: right): right center; style(--placement: right-start): right span-bottom;
        style(--placement: right-end): right span-top; style(--placement: bottom): bottom center;
        style(--placement: bottom-start): bottom span-right; style(--placement: bottom-end): bottom span-left;
        style(--placement: left): left center; style(--placement: left-start): left span-bottom;
        style(--placement: left-end): left span-top; else: center;
    );
    position-try-fallbacks: flip-block, flip-inline;

    transition: transform 0.3s, overlay 0.3s allow-discrete, display 0.5s allow-discrete;
  }

  .H_pop-popup.widthAsRef {
    width: anchor-size(width);
  }

  .H_pop-popup.top {
    transform: scaleY(0);
    transform-origin: bottom;
  }

  .H_pop-popup.bottom {
    transform: scaleY(0);
    transform-origin: top;
  }

  .H_pop-popup.right {
    transform: scaleX(0);
    transform-origin: left;
  }

  .H_pop-popup.left {
    transform: scaleX(0);
    transform-origin: right;
  }

  .H_pop-popup.top:popover-open {
    transform: scaleY(1);
    transform-origin: bottom;
  }

  .H_pop-popup.bottom:popover-open {
    transform: scaleY(1);
    transform-origin: top;
  }

  .H_pop-popup.right:popover-open {
    transform: scaleX(1);
    transform-origin: left;
  }
  .H_pop-popup.left:popover-open {
    transform: scaleX(1);
    transform-origin: right;
  }

  @starting-style {
    .H_pop-popup.top:popover-open {
      transform: scaleY(0);
    }
    .H_pop-popup.bottom:popover-open {
      transform: scaleY(0);
      transform-origin: top;
    }
    .H_pop-popup.right:popover-open {
      transform: scaleX(0);
      transform-origin: left;
    }
    .H_pop-popup.left:popover-open {
      transform: scaleX(0);
      transform-origin: right;
    }
  }
}
</style>
