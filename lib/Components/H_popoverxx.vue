<template>
  <div class="H_popover">
    <div class="H_popover-referance" :style="({anchorName: id} as any)" @mouseup="click">
      <slot name="referance"></slot>
    </div>

    <div
      ref="popup"
      @toggle="toggle"
      class="H_popover-popup"
      :popover="closeAction"
      :style="({positionAnchor: id} as any)"
    >
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
    default: "bottom span-right",
  },
  closeAction: {
    type: String as PropType<"auto" | "manual">,
    default: "auto",
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
//const id = "--" + new Date().valueOf();
const id = generate_uuidv4();
const popup = ref<HTMLInputElement | null>(null);

function generate_uuidv4() {
  var dt = new Date().getTime();
  return "--xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var rnd = Math.random() * 16; //random number in range 0 to 16
    rnd = (dt + rnd) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? rnd : (rnd & 0x3) | 0x8).toString(16);
  });
}

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
  width: 100%;
  line-height: 0;
}

.H_popover-popup {
  position: absolute;

  box-sizing: border-box;
  border: none;
  margin: 0;
  padding: 0;
  top: v-bind(offsetUp);
  bottom: v-bind(offsetUp);
  left: v-bind(offsetLeft);
  right: v-bind(offsetLeft);
}

@supports (anchor-name: --kkkk) {
  .H_popover-popup {
    inset-area: v-bind(placement);
    position-visibility: no-overflow;
    position-try: flip-block;
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
