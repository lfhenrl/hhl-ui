<template>
  <div class="H_popover">
    <div ref="referance" class="H_popover-referance" @mouseup="click">
      <slot name="referance"></slot>
    </div>

    <div ref="popup" @toggle="toggle" v-movable="movable" class="H_popover-popup" :popover="closeAction">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
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
    modelValue.value = true;
  } else {
    modelValue.value = false;
  }
}

function close() {
  popup.value?.hidePopover();
  dialogPos.endPos();
}

function open() {
  popup.value?.showPopover();
  dialogPos.startPos();
}

onMounted(() => {
  if (popup.value && referance.value) {
    dialogPos.init(referance.value, popup.value, P, pos);
  }
});
</script>

<style>
@layer hhl-components {
  .H_popover {
    line-height: 0;
  }
  .H_popover-referance {
    display: inline-block;
    width: 100%;
  }

  .H_popover-popup:popover-open {
    display: flex;
    flex-direction: column;
  }

  .H_popover .H_popover-popup {
    position: absolute;
    box-sizing: border-box;
    border: none;
    padding: 0;
    line-height: 1;
  }
}
</style>
