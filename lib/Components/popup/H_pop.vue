<template>
  <div class="H_pop" ref="H_popRef" :readonly="readonly">
    <div class="H_pop-referance">
      <slot name="referance" />
    </div>
    <dialog popover="manual" v-movable="movable" :pos="pos" :modal="modal" class="H_pop-dialog" :shake="shake">
      <slot />
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref, watch } from "vue";
import { vMovable } from "../../Directives/v-movable";
import { Pop } from "./utils/Pop";

const P = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  container: {
    type: String as PropType<"box" | "slotElement">,
    default: "slotElement",
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
    default: "bottom-start",
  },
  trigger: {
    type: String as PropType<"toggle" | "click" | "hover" | "none">,
    default: "toggle",
  },
  readonly: { type: Boolean, default: false },
  offsetTop: { type: Number, default: 0 },
  offsetLeft: { type: Number, default: 0 },
  padding: { type: Number, default: 20 },
  widthAsRef: { type: Boolean, default: true },
  inner: { type: Boolean, default: false },
  modal: { type: Boolean, default: false },
  noShake: { default: false, type: Boolean },
  movable: { default: false, type: Boolean },
  closePopupClick: { type: Boolean, default: false },
  delayOnMouseOver: { type: String, default: "100" },
  delayOnMouseOut: { type: String, default: "400" },
});
const E = defineEmits(["open", "close"]);

const H_popRef = ref();
const pos = ref("NA");
const shake = ref(false);
let refBox: HTMLElement;
let dialogBox: any;
let opserveTimer: any = null;
let ModelValueDelay = false;
let mouseOvertimer = {} as any;
const dialogPos = new Pop();
const modelValue = defineModel<boolean>({ default: false });

watch(modelValue, (val: boolean) => {
  if (val === true) {
    if (P.readonly === true) {
      modelValue.value = false;
      E("close");
      return;
    }
    diaOpen();
    E("open");
    ModelValueDelay = true;
    setTimeout(() => {
      ModelValueDelay = false;
    });
  } else {
    diaClose();
    E("close");
  }
});

watch([() => P.container, () => P.querySelector], () => {
  if (P.container === "box") {
    refBox = dialogBox.closest(P.querySelector);
  } else {
    refBox = H_popRef.value.children[0];
  }
  dialogPos.referance = refBox;
});

function diaOpen() {
  modelValue.value = true;
  if (P.modal) {
    dialogBox.showModal();
  } else {
    dialogBox.showPopover();
  }
  dialogPos.startPos();
  setTimeout(() => {
    if (!P.modal) startOpserve();
  });
}

function diaClose() {
  dialogPos.endPos();
  modelValue.value = false;
  stopOpserve();
  setTimeout(() => {
    if (P.modal) {
      dialogBox.close();
    } else {
      dialogBox.hidePopover();
    }
    Object.assign(dialogBox.style, {
      maxHeight: "none",
    });
  }, 400);
}

function refClick() {
  if (P.trigger === "toggle") {
    modelValue.value = !modelValue.value;
  }
  if (P.trigger === "click") {
    modelValue.value = true;
  }
}

function mouseOver() {
  if (modelValue.value === false) {
    clearTimeout(mouseOvertimer);
    mouseOvertimer = setTimeout(() => {
      modelValue.value = true;
    }, parseInt(P.delayOnMouseOver));
  }
}

function mouseOut() {
  clearTimeout(mouseOvertimer);
  mouseOvertimer = setTimeout(() => {
    modelValue.value = false;
  }, parseInt(P.delayOnMouseOut));
}

function popupClick() {
  if (P.closePopupClick) {
    modelValue.value = false;
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
  modelValue.value = false;
}

function keyCancel(event: any) {
  event.preventDefault();
}

function docClick(e: any) {
  if (!e.target) return;

  if (H_popRef.value?.contains(e.target)) {
    e.stopPropagation;
    if (e.target.getAttribute("pop-close") !== null) {
      modelValue.value = false;
    }

    if (P.modal && modelValue.value) {
      if (e.target.contains(dialogBox)) {
        outsideClick();
        return;
      }
      if (dialogBox.contains(e.target)) popupClick();
      return;
    }
    if (refBox?.contains(e.target)) {
      refClick();
    }
    if (dialogBox.contains(e.target)) popupClick();
  } else {
    if (modelValue.value) outsideClick();
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
  dialogPos.init(refBox, dialogBox, P, pos);

  if (P.trigger === "hover") {
    refBox.addEventListener("mouseover", mouseOver);
    refBox.addEventListener("mouseleave", mouseOut);
  } else {
    document.addEventListener("click", docClick);
    if (P.modal) {
      dialogBox.addEventListener("cancel", keyCancel);
    }
  }
});

onUnmounted(() => {
  refBox.removeEventListener("mouseover", mouseOver);
  refBox.removeEventListener("mouseleave", mouseOut);
  document.removeEventListener("click", docClick);
  dialogBox.removeEventListener("cancel", keyCancel);
});
</script>

<style>
@layer hhl-components {
  .H_pop-referance {
    display: flex;
    height: 100%;
  }
  dialog:popover-open {
    display: flex;
    flex-direction: column;
  }

  .H_pop-dialog {
    overflow: hidden;
    border-radius: 4px;
    background-color: transparent;
    opacity: 0;
    transform-origin: top;
    outline: none;
    z-index: 99;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .H_pop-dialog.open-end {
    opacity: 1;
  }

  .H_pop-dialog.open[pos="bottom"]:not(.open-end) {
    animation: scaleY-display 0.3s forwards;
    transform-origin: top;
  }

  .H_pop-dialog.open[pos="top"]:not(.open-end) {
    animation: scaleY-display 0.3s forwards;
    transform-origin: bottom;
  }

  .H_pop-dialog.open[pos="left"]:not(.open-end) {
    animation: scaleX-display 0.3s forwards;
    transform-origin: right;
  }

  .H_pop-dialog.open[pos="right"]:not(.open-end) {
    animation: scaleX-display 0.3s forwards;
    transform-origin: left;
  }

  .H_pop-dialog.open[pos="center"]:not(.open-end) {
    animation: scaleX-display 0.3s forwards;
    transform-origin: center;
  }

  .H_pop-dialog.close[pos="bottom"] {
    animation: scaleY-display--reversed 0.5s forwards;
    transform-origin: top;
  }

  .H_pop-dialog.close[pos="top"] {
    animation: scaleY-display--reversed 0.5s forwards;
    transform-origin: bottom;
  }

  .H_pop-dialog.close[pos="left"] {
    animation: scaleX-display--reversed 0.5s forwards;
    transform-origin: right;
  }

  .H_pop-dialog.close[pos="right"] {
    animation: scaleX-display--reversed 0.5s forwards;
    transform-origin: left;
  }

  .H_pop-dialog.close[pos="center"] {
    animation: scaleX-display--reversed 0.5s forwards;
    transform-origin: center;
  }

  .H_pop-dialog div[moveable-drag] {
    cursor: move;
  }

  .H_pop-dialog[shake="true"] {
    animation: shaking 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both !important;
    opacity: 1;
  }

  dialog.H_pop-dialog:modal::backdrop {
    position: fixed;
    inset: 0px;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
  }

  dialog.H_pop-dialog:modal.open::backdrop {
    opacity: 1;
  }

  @keyframes shaking {
    10%,
    90% {
      transform: rotate(-1deg);
    }

    20%,
    80% {
      transform: rotate(1deg);
    }

    30%,
    50%,
    70% {
      transform: rotate(-1deg);
    }

    40%,
    60% {
      transform: rotate(1deg);
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
}
</style>
