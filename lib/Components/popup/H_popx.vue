<template>
  <div class="H_pop" ref="H_popRef">
    <div class="H_pop-referance">
      <slot name="referance" />
    </div>
    <div popover="manual" :pos="pos" class="H_pop-dialog"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref, watch } from "vue";
import { Pop } from "./Pop";

const P = defineProps({
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
    default: "top"
  },
  offsetTop: { type: Number, default: 0 },
  offsetLeft: { type: Number, default: 0 },
  padding: { type: Number, default: 20 },
  inner: { type: Boolean, default: false },
  modal: { type: Boolean, default: false }
});
const E = defineEmits(["open", "close"]);

const H_popRef = ref();
const isOpen = ref(false);
const pos = ref("NA");
let refBox: HTMLElement;
let dialogBox: any;
let opserveTimer: any = null;

const dialogPos = new Pop();

watch(isOpen, () => {
  if (isOpen.value) {
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
  });
}

function diaClose() {
  dialogPos.endPos();
  stopOpserve();
  setTimeout(() => {
    dialogBox.hidePopover();
    Object.assign(dialogBox.style, {
      maxHeight: "none"
    });
  }, 400);
}

function refClick() {
  isOpen.value = !isOpen.value;
  console.log("refClick");
}

function popupClick() {
  console.log("popupClick");
}

function outsideClick() {
  console.log("outsideClick");
  isOpen.value = false;
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
  document.addEventListener("click", docClick);
});

onUnmounted(() => {
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

/* .H_pop [popover]:popover-open::backdrop {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
} */

@keyframes scaleY-display {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  50% {
    opacity: 1;
    transform: scaleY(0);
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
