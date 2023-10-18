<template>
  <dialog
    ref="dialogRef"
    @close="OnClose"
    @click="click"
    class="H_dialog overflow-auto rounded bg-bg0 shadow"
    :class="{ 'H_modal-pop__shake': shake }"
    v-movable="movable"
  >
    <div
      class="H_dialog__header col-pri py-1 text-center font-bold"
      moveable-drag
      :class="{ 'cursor-move': movable }"
    >
      <slot name="header" />
    </div>
    <div class="H_dialog__body p-3"><slot /></div>
    <div class="H_dialog__footer p-3"><slot name="footer" /></div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { vMovable } from "../../Directives/v-movable";

const P = defineProps({
  modelValue: { type: Boolean, default: false },
  noPersistent: { default: false, type: Boolean },
  noShake: { default: false, type: Boolean },
  offsetTop: { default: "0", type: String },
  offsetLeft: { default: "0", type: String },
  movable: { default: true, type: Boolean },
});

const E = defineEmits(["update:modelValue", "open", "close"]);

const dialogRef = ref();
const shake = ref(false);

watch(
  () => P.modelValue,
  () => {
    if (P.modelValue) {
      dialogRef.value.showModal();
      E("open");
    } else {
      dialogRef.value.close();
      E("close");
    }
  },
);

function click(e: any) {
  const NodeName = e.target.nodeName;
  if (!NodeName) return;
  if (NodeName === "DIALOG") overlayClick();
}

function OnClose() {
  E("update:modelValue", false);
}

function overlayClick() {
  if (P.noPersistent) {
    E("update:modelValue", false);
  } else {
    if (!P.noShake && !P.noPersistent) {
      shake.value = true;
      setTimeout(() => {
        shake.value = false;
      }, 800);
    }
  }
}
</script>

<style>
.H_dialog {
  top: v-bind(offsetTop);
  left: v-bind(offsetLeft);
  opacity: 1;
}

.H_dialog[open] {
  animation: fadein 0.2s ease-in 1;
}

.H_dialog.H_modal-pop__shake {
  animation: fadein 0.2s ease-in 1,shaking 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97);
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

@keyframes fadein {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
