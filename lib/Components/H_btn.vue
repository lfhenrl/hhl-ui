<template>
  <button
    class="H_btn hover:brightness-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    type="button"
    :class="{
      'bg-transparent border text-currentBg border-currentBg border-solid ': type === 'outline',
      'text-currentBg bg-transparent': type === 'text',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  /** @type {type} The type of Btn it can be standard, outline or text default is standard */
  type: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
});
</script>
<style>
@layer components {
  .H_btn {
    display: inline-flex;
    flex-grow: 0;
    align-items: center;
    align-self: center;
    justify-content: center;
    gap: 0.3em;
    padding-block: 0.4em;
    padding-inline: 0.9em;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 0.25rem;
    background-color: var(--color-pri);
    color: var(--color-priTxt);
  }
}
</style>
