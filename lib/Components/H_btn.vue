<template>
  <button
    class="H_btn inline-flex flex-grow-0 gap-[.3em] py-[.4em] px-[.9em] items-center justify-center self-center whitespace-nowrap o-col-pri cursor-pointer rounded hover:brightness-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
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
import { PropType } from "vue";

defineProps({
  /** @type {type} The type of Btn it can be standard, outline or text default is standard */
  type: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
});
</script>
