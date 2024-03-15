<template>
  <div class="H_switch">
    <div
      class="H_switch-container"
      :class="{ reverse: labelLeft }"
      @click="Click"
      :disabled="disabled ? '' : undefined"
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
import { PropType, computed } from "vue";

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
  disabled: { type: Boolean, default: false },
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});
const E = defineEmits(["update:modelValue", "changed"]);

function Click() {
  const val = !P.modelValue;
  E("update:modelValue", val);
}
const Color = computed(() => {
  return `var(--col-${P.color})`;
});
</script>

<style>
@layer hhl-components {
  .H_switch {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: start;
    background-color: transparent;
    --color: v-bind(Color);
  }

  .H_switch-container[disabled] {
    opacity: 0.7;
    pointer-events: none;
    cursor: none;
  }
  .H_switch-container[disabled] .H_switch-box {
    opacity: 0.5;
  }

  .H_switch-container {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: start;
    gap: 10px;
  }

  .H_switch-container.reverse {
    flex-direction: row-reverse;
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
    background-color: var(--color);
    opacity: 1;
  }

  .H_switch-box[checked="true"] .H_switch-icon-outer {
    background-color: var(--color);
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
