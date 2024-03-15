<template>
  <button
    class="H_btn"
    type="button"
    :class="{
      'H_btn-xs': size === 'xs',
      'H_btn-sm': size === 'sm',
      'H_btn-lg': size === 'lg',
      'H_btn-outline': type === 'outline',
      'H_btn-text': type === 'text',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

const P = defineProps({
  /** @type {type} The type of Btn it can be standard, outline or text default is standard */
  type: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
  size: {
    type: String as PropType<"lg" | "md" | "sm" | "xs">,
    default: "md",
  },
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});
const bgColor = computed(() => {
  return `var(--col-${P.color})`;
});
const txtColor = computed(() => {
  return `var(--col-on-${P.color})`;
});
</script>
<style>
@layer hhl-components {
  .H_btn {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    gap: 4px;
    white-space: nowrap;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 10px;
    height: 36px;
    --btn-icon-size: 1rem;
    --color-bg: v-bind(bgColor);
    --color-txt: v-bind(txtColor);
    background-color: var(--color-bg);
    color: var(--color-txt);
  }

  .H_btn:hover {
    filter: brightness(90%);
    -webkit-backdrop-filter: drop-shadow(4px 4px 10px blue);
    backdrop-filter: drop-shadow(4px 4px 10px blue);
  }

  .H_btn[disabled] {
    opacity: 0.5;
    pointer-events: none;
    cursor: none;
  }

  .H_btn:active {
    transform: scale(0.95);
  }

  .H_btn.H_btn-outline {
    background-color: transparent;
    color: var(--color-bg);
    border: 1px solid currentColor;
  }

  .H_btn.H_btn-text {
    background-color: transparent;
    color: var(--color-bg);
  }

  button.H_btn.H_btn-xs {
    height: 20px;
    font-size: 10px;
    --btn-icon-size: 0.6rem;
  }

  button.H_btn.H_btn-sm {
    height: 28px;
    font-size: 12px;
    --btn-icon-size: 0.8rem;
  }

  .H_btn-lg {
    height: 44px;
    font-size: 17px;
    --btn-icon-size: 1.5rem;
  }

  .H_btn .H_icon {
    --icon-size: var(--btn-icon-size);
    --current-bg-col: currentColor;
  }
}
</style>
