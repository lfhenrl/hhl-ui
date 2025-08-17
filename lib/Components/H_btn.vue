<template>
  <button
    :h-disabled="disabled ? '35%' : undefined"
    class="H_btn"
    :class="{
      outline: variant === 'outline',
      text: variant === 'text',
    }"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  /** @type {variant} The variant of Btn it can be standard, outline or text default is standard */
  variant: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
  disabled: { type: Boolean, default: false },
});
</script>
<style>
@layer components {
  .H_btn {
    display: inline-flex;
    max-height: calc(1em * 1.9);
    min-height: calc(1em * 1.9);
    padding: 0 0.9em;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-style: none;
    gap: 0.3em;
    white-space: nowrap;
    cursor: pointer;
    --h-color: var(--color-pri);
    background-color: var(--h-color);
    --color-contrast: oklch(from var(--h-color) var(--h-l) 0 h);
    color: var(--color-contrast) !important;

    &.outline {
      background-color: transparent;
      color: var(--h-color) !important;
      border: 1px solid var(--h-color);
    }

    &.text {
      background-color: transparent;
      color: var(--h-color) !important;
    }

    .H_icon {
      font-size: 1.3em;
      color: var(--h-color-contrast);
    }
  }

  .H_btn:active {
    transform: scale(0.95);
  }
  .H_btn:focus {
    outline: solid 1px var(--color-pri);
    outline-offset: 2px;
  }
  .H_btn:hover {
    filter: brightness(80%);
  }
}
</style>
