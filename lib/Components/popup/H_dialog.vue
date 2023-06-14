<template>
  <H_modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :no-persistent="noPersistent"
    :offset="offset"
    :show-overlay="showOverlay"
    :no-shake="noShake"
    :movable="movable"
  >
    <div class="H_dialog col-bg-0 shadow-4">
      <div class="H_dialog__header col-pri" moveable-drag>
        <slot name="header" />
      </div>
      <div class="H_dialog__body"><slot /></div>
      <div class="H_dialog__footer"><slot name="footer" /></div>
    </div>
  </H_modal>
</template>

<script setup lang="ts">
import H_modal from "./H_modal.vue";

{
  /* @ts-ignore */
}
defineEmits(["update:modelValue"]);

// @ts-ignore
const props = defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  showOverlay: { default: false, type: Boolean },
  noPersistent: { default: false, type: Boolean },
  noShake: { default: false, type: Boolean },
  offset: { default: "50%", type: String },
  movable: { default: true, type: Boolean }
});
</script>

<style>
.H_dialog {
  overflow: auto;
  border-radius: 4px;
}

.H_dialog__header {
  text-align: center;
  padding: 6px 12px;
  font-weight: bold;
}
.H_dialog__body {
  padding: 12px;
}
.H_dialog__footer {
  padding: 12px;
  display: flex;
  gap: 10px;
  width: 100%;
}
</style>
