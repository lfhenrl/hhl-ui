<template>
  <button
    class="H_btn col-pri"
    type="button"
    :class="{
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
import { PropType } from "vue";

defineProps({
  type: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
});
</script>
<style>
@layer hhl-components {
  button.H_btn {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
    border-radius: 4px;
    line-height: 1.7;
    font-size: 1.1rem;
    padding: 0 10px !important;
    --btn-icon-size: 1.1rem;
  }

  .H_btn:hover {
    filter: brightness(90%);
    -webkit-backdrop-filter: drop-shadow(4px 4px 10px blue);
    backdrop-filter: drop-shadow(4px 4px 10px blue);
  }

  .H_btn:active {
    transform: scale(0.95);
  }

  .H_btn.H_btn-outline {
    background-color: transparent;
    color: var(--current-bg-col);
    border: 1px solid var(--current-bg-col);
  }

  .H_btn.H_btn-text {
    background-color: transparent;
    color: var(--current-bg-col);
  }

  button.H_btn.H_btn-sm {
    font-size: 0.8rem;
    --btn-icon-size: 0.8rem;
  }

  button.H_btn-lg {
    font-size: 1.5rem;
    --btn-icon-size: 1.5rem;
  }

  .H_btn .H_icon {
    --icon-size: var(--btn-icon-size);
    --current-bg-col: currentColor;
  }
}
</style>
