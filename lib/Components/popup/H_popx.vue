<template>
  <div class="H_pop" ref="H_popRef">
    <div class="H_pop-referance">
      <slot name="referance" />
    </div>
    <div popover="manual" class="H_pop-dialog"><slot /></div>
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
  inner: { type: Boolean, default: false },
  modal: { type: Boolean, default: false }
});
const E = defineEmits(["open", "close"]);

const H_popRef = ref();
const isOpen = ref(false);
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
  dialogPos.init(refBox, dialogBox, P, isOpen);
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

.H_pop-dialog.open {
  animation: scale-display 0.3s forwards;
}

.H_pop-dialog.close {
  animation: scale-display--reversed 0.3s forwards;
}

.H_pop-dialog.top {
  transform-origin: bottom;
}

/* .H_pop [popover]:popover-open::backdrop {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
} */

@keyframes scale-display {
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

@keyframes scale-display--reversed {
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
