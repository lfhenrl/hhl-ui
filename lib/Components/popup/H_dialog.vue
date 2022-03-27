<template>
  <H_modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :no-persistent="noPersistent"
    :offset="offset"
    :show-overlay="showOverlay"
    :no-shake="noShake"
    :placement="placement"
  >
    <div class="H_dialog col-bg-0">
      <div class="H_dialog__header col-pri">
        <slot name="header" />
      </div>
      <div class="H_dialog__body"><slot /></div>
      <div class="H_dialog__footer"><slot name="footer" /></div>
    </div>
  </H_modal>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import H_modal from "./H_modal.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  showOverlay: { default: false, type: Boolean },
  noPersistent: { default: false, type: Boolean },
  noShake: { default: false, type: Boolean },
  offset: { default: "1px", type: String },
  placement: { type: String as PropType<"start" | "center" | "end">, default: "center" }
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style>
.H_dialog {
  overflow: auto;
  border-radius: 4px;
  box-shadow: var(--comp-shadow);
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
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
  width: 100%;
  flex-direction: column;
}
</style>
