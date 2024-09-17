<template>
  <dialog
    ref="dialog"
    :class="{
      modal: backdrop,
    }"
    v-movable="movable"
    class="H_dialog"
    @close="onClose"
  >
    <div class="H_dialog__header" moveable-drag>
      <slot name="header" />
    </div>
    <div class="H_dialog__body"><slot /></div>
    <div class="H_dialog__footer">
      <slot name="footer" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { vMovable } from "../Directives/v-movable";
const P = defineProps({
  modal: { type: Boolean, default: true },
  backdrop: { type: Boolean, default: true },
  noShake: { default: false, type: Boolean },
  noClickOutsite: { type: Boolean, default: true },
  movable: { default: true, type: Boolean },
  offsetUp: {
    type: String,
    default: "0",
  },
  offsetLeft: {
    type: String,
    default: "0",
  },
});

defineExpose({
  open,
  close,
});

const modelValue = defineModel();
const dialog = ref<HTMLDialogElement | null>(null);

let openActive = false;

watch(modelValue, () => {
  if (modelValue.value === true) {
    open();
  } else {
    close();
  }
});

function open() {
  if (P.modal) {
    dialog.value?.showModal();
  } else {
    dialog.value?.show();
  }

  setTimeout(() => {
    openActive = true;
  }, 50);
}

function close() {
  dialog.value?.close();
  openActive = false;
}

function onClose() {
  modelValue.value = false;
}

function onClick(e: any) {
  if (outsideClick(e) && openActive) {
    if (!P.noClickOutsite) {
      close();
    } else {
      if (!P.noShake) {
        const el = dialog.value!;
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 700);
      }
    }
  }
}

function outsideClick(e: any) {
  var rect = dialog.value?.getBoundingClientRect();
  if (!rect) return;
  var isInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;
  if (!isInDialog) return true;
  return false;
}

const insetBlock = computed(() => {
  if (P.offsetUp === "0") {
    return "0 0";
  } else {
    return P.offsetUp + " auto";
  }
});

const insetInline = computed(() => {
  if (P.offsetLeft === "0") {
    return "0 0";
  } else {
    return P.offsetLeft + " auto";
  }
});

onMounted(() => {
  document.addEventListener("click", onClick);
});
</script>
<style>
.H_dialog {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  z-index: 1;
  border: none;
  padding: 0;
  margin: auto;
  border-radius: 4px;
  background-color: var(--col-bg-0);
  inset-block: v-bind(insetBlock);
  inset-inline: v-bind(insetInline);
  outline: none;
  transform: scaleY(0);
  transition: opacity 0.3s, transform 0.2s, display 0.3s allow-discrete;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.2);
}

.H_dialog__header {
  background-color: var(--col-pri);
  color: var(--col-on-pri);
  text-align: center;
  font-weight: bold;
}

.H_dialog__header[moveable-drag] {
  cursor: move;
}

.H_dialog__body {
  padding: 12px;
}

.H_dialog__footer {
  padding: 0 12px 12px 12px;
}

.H_dialog[open] {
  opacity: 1;
  transform: scaleY(1);
}

.H_dialog.shake {
  animation: shaking 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@starting-style {
  .H_dialog[open] {
    opacity: 0;
    transform: scaleY(0);
  }
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

.H_dialog.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
