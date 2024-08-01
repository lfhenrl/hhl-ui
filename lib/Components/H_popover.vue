<template>
  <div class="H_popover">
    <div class="H_popover-referance" :style="({anchorName: id} as any)" @mouseup="click">
      <slot name="referance"></slot>
    </div>

    <div ref="popup" @toggle="toggle" class="H_popover-popup" popover="manual" :style="({positionAnchor: id} as any)">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";

const P = defineProps({
  placement: {
    type: String as PropType<
      | "top"
      | "top left"
      | "top span-left"
      | "top span-right"
      | "top right"
      | "bottom"
      | "bottom left"
      | "bottom span-left"
      | "bottom span-right"
      | "bottom right"
      | "left"
      | "left span-top"
      | "left span-bottom"
      | "right"
      | "right span-top"
      | "right span-bottom"
    >,
    default: "right",
  },
  offsetUp: {
    type: String,
    default: "0",
  },
  offsetLeft: {
    type: String,
    default: "0",
  },
  readonly: { type: Boolean, default: false },
});
const modelValue = defineModel();
defineExpose({
  open,
  close,
});
const id = "--" + new Date().valueOf();
const popup = ref<HTMLInputElement | null>(null);

watch(modelValue, () => {
  if (modelValue.value === true) {
    open();
  } else {
    close();
  }
});

function click() {
  if (P.readonly) return;
  popup.value?.togglePopover(!modelValue.value) ?? false;
}

function toggle(e: any) {
  const parent = e.target.parentNode;
  if (e.newState === "open") {
    parent.classList.add("open");
    modelValue.value = true;
  } else {
    parent.classList.remove("open");
    modelValue.value = false;
  }
}

function close() {
  popup.value?.hidePopover();
}
function open() {
  popup.value?.showPopover();
}
</script>

<style>
.H_popover {
  width: 100%;
}

.H_popover-referance {
  display: inline-block;
}

.H_popover-popup {
  width: fit-content;
  box-sizing: border-box;
  border: none;
  padding: 0;
  top: v-bind(offsetUp);
  bottom: v-bind(offsetUp);
  left: v-bind(offsetLeft);
  right: v-bind(offsetLeft);
}

@supports (anchor-name: --kkkk) {
  .H_popover-popup {
    inset-area: v-bind(placement);
    position-try-options: flip-block;
    margin: 0;
    opacity: 0;
    transform: scaleY(0);
    transition: opacity 0.3s, transform 0.2s, display 0.3s allow-discrete;
  }

  .H_popover-popup:popover-open {
    opacity: 1;
    transform: scaleY(1);
  }

  @starting-style {
    .H_popover-popup:popover-open {
      opacity: 0;
      transform: scaleY(0);
    }
  }
}

@supports not (anchor-name: --kkkk) {
  .H_popover-popup {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
  }
}
</style>
