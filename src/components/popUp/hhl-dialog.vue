<template>
    <hhl-modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue',$event)"
    :no-persistent="noPersistent"
    :offset="offsetTop"
    :show-overlay="showOverlay"
    :no-shake="noShake">
    <div class="hhl-dialog col-bg-0 shadow-5 borderRadius-4">
      <div class="hhl-dialog__header col-pri px-12 py-6 txt-bold">
        <slot name="header"/>
      </div>
      <div class="hhl-dialog__body p-12"><slot/></div>
      <div class="hhl-dialog__footer flx-row gap-3 p-12"><slot name="footer"/></div>
    </div>
  </hhl-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const HhlDialog = defineComponent({
  name: "hhl-dialog",
  props: {
    modelValue: { type: Boolean, default: false, required: true },
    showOverlay: { default: false, type: Boolean },
    noPersistent: { default: false, type: Boolean },
    noShake: { default: false, type: Boolean },
    offsetTop: { default: "20%", type: String }
  },
  setup() {
    return {};
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-dialog": typeof HhlDialog;
  }
}
export type iHhlDialog = InstanceType<typeof HhlDialog>;
export default HhlDialog;
</script>

<style>
.hhl-dialog {
  overflow: auto;
}
</style>
