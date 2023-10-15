<template>
  <button
    class="h_btn col-pri inline-flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded leading-loose ring-offset-1 ring-offset-pri hover:scale-105 focus:outline-none focus:ring active:scale-95"
    :style="{
      'background-color':
        type === 'outline' ||
        type === 'text' ||
        type === 'icon-outline' ||
        type === 'icon-text'
          ? 'transparent'
          : 'var(--current-bg-col)',
      color:
        type === 'outline' ||
        type === 'text' ||
        type === 'icon-outline' ||
        type === 'icon-text'
          ? 'var(--current-bg-col)'
          : 'var(--current-txt-col)',
      'border-color':
        type === 'outline' ? 'var(--current-bg-col)' : 'var(--current-txt-col)',
    }"
    type="button"
    :class="{
      'text-xs': size === 'sm',
      'text-base': size === 'md',
      'text-xl': size === 'lg',
      'rounded-[50%]': round,
      border: type === 'outline' || type === 'icon-outline',
      'aspect-square px-1 py-1': type.startsWith('icon'),
      'px-4 py-0.5': !type.startsWith('icon'),
      'flex-row-reverse': iconRight,
    }"
  >
    <H_icon v-if="icon !== ''" :icon="icon" :size="iconSize"></H_icon
    ><slot></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  type: {
    type: String as PropType<
      "standard" | "outline" | "text" | "icon" | "icon-outline" | "icon-text"
    >,
    default: "standard",
  },
  round: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
  icon: { type: String, default: "" },
  iconRight: { type: Boolean, default: false },
});

const iconSize = computed(() => {
  if (P.size === "sm") return "16px";
  if (P.size === "lg") return "26px";
  return "24px";
});
</script>
