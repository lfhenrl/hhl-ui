<template>
  <div class="H_switch col-pri">
    <div
      class="H_switch-container"
      :class="{ 'flex-row-reverse': labelLeft }"
      @click="Click"
      @keyup.space="Click"
      @keyup.enter="Click"
    >
      <div
        class="H_switch-box"
        :checked="modelValue"
        :class="{
          'H_switch-box-sm': size === 'sm',
          'H_switch-box-lg': size === 'lg',
        }"
      >
        <div class="H_switch-icon-outer" />
        <div tabindex="0" class="H_switch-icon-inner" />
      </div>
      <span class="H_switch-label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const P = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false,
  },
  label: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
});
const E = defineEmits(["update:modelValue", "changed"]);

function Click() {
  const val = !P.modelValue;
  E("update:modelValue", val);
}
</script>

<style>
@layer hhl-components {
  .H_switch {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: start;
    background-color: transparent;
  }

  .H_switch-container {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: start;
    gap: 10px;
  }

  .H_switch-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 40px;
    height: 14px;
  }

  .H_switch-box-sm {
    width: 30px;
    height: 11px;
  }

  .H_switch-box-lg {
    width: 55px;
    height: 20px;
  }

  .H_switch-box[checked="true"] .H_switch-icon-inner {
    transform: translateX(80%);
    background-color: var(--current-bg-col);
    opacity: 1;
  }

  .H_switch-box[checked="true"] .H_switch-icon-outer {
    background-color: var(--current-bg-col);
    opacity: 0.5;
  }

  .H_switch-icon-outer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background-color: var(--col-bg-5);
    opacity: 90%;
  }

  .H_switch-icon-inner {
    aspect-ratio: 1 / 1;
    z-index: 10;
    height: 160%;
    border-radius: 50%;
    background-color: var(--col-bg-6);
  }

  .H_switch-label {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    user-select: none;
    font-size: 14px;
    color: var(--col-txt-1);
  }
}
</style>
