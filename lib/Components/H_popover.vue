<template>
  <div class="H_popover">
    <div ref="referance" class="H_popover-referance" @mouseup="click" :readonly>
      <slot name="referance"></slot>
    </div>

    <div ref="popup" @toggle="toggle" :pos="pos" v-movable="movable" class="H_popover-popup" :popover="popoverType">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, PropType, ref, watch } from "vue";
import { Pop } from "../SubComponents/popover/Pop";
import { vMovable } from "../Directives/v-movable";

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
      | "center"
    >,
    default: "bottom-start",
  },
  querySelector: { type: String, default: "" },
  closeAction: {
    type: String as PropType<"auto" | "manual">,
    default: "auto",
  },
  offsetTop: { type: Number, default: 0 },
  offsetLeft: { type: Number, default: 0 },
  padding: { type: Number, default: 20 },
  widthAsRef: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  movable: { default: false, type: Boolean },
});
const modelValue = defineModel();
defineExpose({
  open,
  close,
});
const dialogPos = new Pop();
const pos = ref("NA");
const referance = ref<HTMLInputElement | null>(null);
const popup = ref<HTMLInputElement | null>(null);
let IsOpen = false;

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
  if (e.newState === "open") {
    IsOpen = true;
    dialogPos.startPos();
    console.log("open from toggle");
    if (!modelValue.value) modelValue.value = true;
  } else {
    IsOpen = false;
    dialogPos.endPos();
    console.log("close from toggle");
    if (modelValue.value) modelValue.value = false;
  }
}

const popoverType = computed(() => {
  if (P.readonly) return "manual";
  return P.closeAction;
});

function close() {
  if (!IsOpen) return;
  popup.value?.hidePopover();
  console.log("close");
}

function open() {
  if (IsOpen) return;
  popup.value?.showPopover();
  console.log("open");
}

onMounted(() => {
  if (popup.value && referance.value) {
    let cRef: any;
    if (P.querySelector === "") {
      cRef = referance.value;
    } else {
      cRef = referance.value.querySelector(P.querySelector) ?? referance.value;
    }

    dialogPos.init(cRef, popup.value, P, pos);
  }
});
</script>

<style>
.H_popover {
  position: relative;
  line-height: 0;
}
.H_popover-referance {
  display: inline-block;
  width: 100%;
}

.H_popover-popup {
  position: absolute;
  box-sizing: border-box;
  border: none;
  padding: 0;
  line-height: 1;
  opacity: 0;
  --scaleversion: scaleY-display;
  transition: overlay 0.7s allow-discrete, display 0.7s allow-discrete;
}

.H_popover-popup::backdrop {
  inset: auto;
}

.H_popover-popup.open-end {
  opacity: 1;
}

.H_popover-popup[pos="bottom"] {
  --scaleversion: scaleY-display;
  transform-origin: top;
}

.H_popover-popup[pos="top"] {
  --scaleversion: scaleY-display;
  transform-origin: bottom;
}

.H_popover-popup[pos="left"] {
  --scaleversion: scaleX-display;
  transform-origin: right;
}

.H_popover-popup[pos="right"] {
  --scaleversion: scaleX-display;
  transform-origin: left;
}

.H_popover-popup:popover-open {
  animation: var(--scaleversion) 0.4s forwards;
}

.H_popover-popup.close:not(:popover-open) {
  animation: var(--scaleversion) reverse 0.3s forwards;
}

@keyframes scaleY-display {
  0% {
    opacity: 0;
    transform: scaleY(1);
  }

  20% {
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
@keyframes scaleY-display--reversed {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }

  50% {
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    opacity: 0;
    transform: scaleY(0);
  }
}

@keyframes scaleX-display {
  0% {
    opacity: 0;
    transform: scaleX(1);
  }

  20% {
    opacity: 0;
    transform: scaleX(0);
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes scaleX-display--reversed {
  0% {
    opacity: 1;
    transform: scaleX(1);
  }

  50% {
    opacity: 0;
    transform: scaleX(0);
  }

  100% {
    opacity: 0;
    transform: scaleX(0);
  }
}
</style>
