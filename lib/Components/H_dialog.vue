<template>
  <dialog
    ref="dialog"
    :closedby
    v-movable="movable"
    @close="onClose"
    @click="onClick"
    @keyup.esc="tryClose()"
    class="H_modal flex flex-col border-none m-auto rounded bg-bg0 outline-none"
  >
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { useTemplateRef, watch, type PropType } from "vue";
import { vMovable } from "../Directives/v-movable";

const P = defineProps({
  noShake: { default: false, type: Boolean },
  movable: { default: true, type: Boolean },
  closedby: {
    type: String as PropType<"any" | "closerequest" | "none">,
    default: "closerequest",
  },
  insetLeft: {
    type: String,
    default: "0 0",
  },
  insetTop: {
    type: String,
    default: "0 0",
  },
});

defineExpose({
  open,
  close,
});

const dialog = useTemplateRef<HTMLDialogElement>("dialog");
const modelValue: any = defineModel();

watch(
  modelValue,
  () => {
    if (modelValue.value === true) {
      dialog.value?.showModal();
    } else {
      dialog.value?.close();
    }
  },
  { immediate: true }
);

function onClose() {
  modelValue.value = false;
}
function onClick(e: any) {
  if (e.target?.nodeName === "DIALOG") tryClose();
}

function tryClose() {
  if (!P.noShake && P.closedby !== "any") {
    const el = dialog.value!;
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 700);
  }
}

function open() {
  modelValue.value = true;
}

function close() {
  modelValue.value = false;
}
</script>

<style>
.H_modal {
  position: fixed;
  z-index: 10;
  inset-block: v-bind(insetTop);
  inset-inline: v-bind(insetLeft);
  transform: scaleY(0);
  transition: opacity 0.3s, transform 0.2s, display 0.3s allow-discrete;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.2);
}

[moveable-drag] {
  cursor: move;
}

.H_modal[open] {
  opacity: 1;
  transform: scaleY(1);
}

@starting-style {
  .H_modal[open] {
    opacity: 0;
    transform: scaleY(0);
  }
}

.H_modal.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}

.H_modal.shake {
  animation: shaking 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97);
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
</style>
