<template>
  <div class="H_pop" ref="H_popRef">
    <div class="H_pop-referance">
      <slot name="referance" />
    </div>
    <div popover="manual" v-movable="movable" :pos="pos" :modal="modal" class="H_pop-dialog" :class="{ 'shake': shake }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref, watch } from "vue";
import { vMovable } from "../../Directives/v-movable";
import { Pop } from "./Pop";

const P = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  container: {
    type: String as PropType<"box" | "slotElement">,
    default: "slotElement"
  },
  querySelector: { type: String, default: "body" },
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
    default: "bottom-start"
  },
  trigger: { type: String as PropType<"toggle" | "click" | "hover" | "none">, default: "toggle" },
  readonly: { type: Boolean, default: false },
  offsetTop: { type: Number, default: 0 },
  offsetLeft: { type: Number, default: 0 },
  padding: { type: Number, default: 20 },
  widthAsRef: { type: Boolean, default: true },
  inner: { type: Boolean, default: false },
  modal: { type: Boolean, default: false },
  noShake: { default: false, type: Boolean },
  movable: { default: true, type: Boolean },
  closePopupClick: { type: Boolean, default: false },
  delayOnMouseOver: { type: String, default: "100" },
  delayOnMouseOut: { type: String, default: "400" },
});
const E = defineEmits(["open", "close", "update:modelValue"]);

const H_popRef = ref();
const isOpen = ref(false);
const pos = ref("NA");
const shake = ref(false);
let refBox: HTMLElement;
let dialogBox: any;
let opserveTimer: any = null;
let ModelValueDelay = false
let mouseOvertimer = {} as any;

const dialogPos = new Pop();

watch(
  () => P.modelValue,
  (val: boolean) => {
    if (val === true) {
      ModelValueDelay = true;
      isOpen.value = true
      setTimeout(() => {
        ModelValueDelay = false;
      });
    } else {
      isOpen.value = false
    }
  }
);

watch(isOpen, () => {
  if (isOpen.value) {
    if (P.readonly === true) return;
    diaOpen();
    E("open");
  } else {
    diaClose();
    E("close");
  }
});

function diaOpen() {
  dialogBox.showPopover();
  dialogPos.startPos();

  setTimeout(() => {
    startOpserve();
    E("update:modelValue", true);
  });
}

function diaClose() {
  dialogPos.endPos();
  stopOpserve();
  E("update:modelValue", false);
  setTimeout(() => {
    dialogBox.hidePopover();
    Object.assign(dialogBox.style, {
      maxHeight: "none"
    });   
  }, 400);
}

function refClick() {
  if (P.trigger === "toggle") {
    isOpen.value = !isOpen.value;
  }

  if (P.trigger === "click") {
    isOpen.value = true;
  }
}

function mouseOver() {
  if (isOpen.value === false) {
    clearTimeout(mouseOvertimer);
    mouseOvertimer = setTimeout(() => {
      isOpen.value = true;
    }, parseInt(P.delayOnMouseOver));
  }
}

function mouseOut() {
  clearTimeout(mouseOvertimer);
  mouseOvertimer = setTimeout(() => {
    isOpen.value = false;
  }, parseInt(P.delayOnMouseOut));
}

function popupClick() {
  if (P.closePopupClick) {
    isOpen.value = false;
  }
}

function outsideClick() {
  if (ModelValueDelay) return;
  if (P.modal) {
    if (!P.noShake) {
      shake.value = true;
      setTimeout(() => {
        shake.value = false;
      }, 800);
    }
    return;
  }
/*   isOpen.value = false; */
}

function docClick(e: any) {
  if (!e.target) return;
  if (H_popRef.value?.contains(e.target)) {
    e.stopPropagation;
    if (refBox?.contains(e.target)) refClick();
    if (dialogBox.contains(e.target)) popupClick();
  } else {
    if (isOpen.value) outsideClick();
  }
}

function startOpserve() {
  if (!opserveTimer) {
    opserveTimer = setInterval(onOpserve, 20);
  }
}
function stopOpserve() {
  clearInterval(opserveTimer);
  opserveTimer = null;
}

function onOpserve() {
  if (dialogPos.hasResized()) {
    dialogPos.getPos();
    return;
  }
  if (dialogPos.hasScrolled()) {
    dialogPos.getPos();
    return;
  }
}

onMounted(() => {
  if (H_popRef.value) {
    dialogBox = H_popRef.value.children[1];
    if (P.container === "box") {
      refBox = dialogBox.closest(P.querySelector);
    } else {
      refBox = H_popRef.value.children[0];
    }
  }
  dialogPos.init(refBox, dialogBox, P, isOpen, pos);

  if (P.trigger === "hover") {
    refBox.addEventListener("mouseover", mouseOver);
    refBox.addEventListener("mouseleave", mouseOut);
  } else {
    document.addEventListener("click", docClick);
  }
  document.addEventListener("click", docClick);
});

onUnmounted(() => {
  refBox.removeEventListener("mouseover", mouseOver);
  refBox.removeEventListener("mouseleave", mouseOut);
  document.removeEventListener("click", docClick);
});
</script>

<style>
.H_pop-dialog {
  padding: 0;
  border: none;
  overflow: auto;
  transform-origin: top;
  opacity: 0;
  width: max-content;
}

.H_pop-dialog.open[pos="bottom"] {
  animation: scaleY-display 0.3s forwards;
  transform-origin: top;
}

.H_pop-dialog.open[pos="top"] {
  animation: scaleY-display 0.3s forwards;
  transform-origin: bottom;
}

.H_pop-dialog.open[pos="left"] {
  animation: scaleX-display 0.3s forwards;
  transform-origin: right;
}

.H_pop-dialog.open[pos="right"] {
  animation: scaleX-display 0.3s forwards;
  transform-origin: left;
}

.H_pop-dialog.open[pos="center"] {
  animation: scaleX-display 0.3s forwards;
  transform-origin: center;
}

.H_pop-dialog.close[pos="bottom"] {
  animation: scaleY-display--reversed 0.3s forwards;
  transform-origin: top;
}

.H_pop-dialog.close[pos="top"] {
  animation: scaleY-display--reversed 0.3s forwards;
  transform-origin: bottom;
}

.H_pop-dialog.close[pos="left"] {
  animation: scaleX-display--reversed 0.3s forwards;
  transform-origin: right;
}

.H_pop-dialog.close[pos="right"] {
  animation: scaleX-display--reversed 0.3s forwards;
  transform-origin: left;
}

.H_pop-dialog.close[pos="center"] {
  animation: scaleX-display--reversed 0.3s forwards;
  transform-origin: center;
}

.H_pop-dialog div[moveable-drag] {
  background-color: brown;
  cursor: move;
}

.H_pop-dialog.open.shake {
  animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: rotate(-1deg) translateY(10%);
  }

  20%,
  80% {
    transform: rotate(1deg) translateY(10%);
  }

  30%,
  50%,
  70% {
    transform: rotate(-1deg) translateY(10%);
  }

  40%,
  60% {
    transform: rotate(1deg) translateY(10%);
  }
}

@keyframes scaleY-display {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  50% {
    opacity: 1;
    transform: scaleY(1);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
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

@keyframes scaleX-display {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }

  50% {
    opacity: 1;
    transform: scaleX(0);
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
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
</style>
