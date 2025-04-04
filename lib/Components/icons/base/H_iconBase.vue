<template>
  <svg
    viewBox="0 0 24 24"
    class="H_iconBase"
    height="24"
    width="24"
    :outline="outline ? '' : undefined"
    :round="round ? '' : undefined"
    :filled="filled ? '' : undefined"
    :btn="btn ? '' : undefined"
    :disabled="disabled ? '' : undefined"
    fill="none"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Props } from "./shProps";

const P = defineProps(Props);

const bColor = computed(() => {
  if (P.color === "current") {
    return `var(--color-current`;
  }
  return `var(--color-${P.color})`;
});

const tColor = computed(() => {
  if (P.color === "current") {
    return `var(--color-currentBg`;
  }
  return `var(--color-${P.color}Txt)`;
});
</script>

<style>
.H_iconBase {
  display: block;
  min-width: v-bind(size);
  max-width: v-bind(size);
  min-height: v-bind(size);
  max-height: v-bind(size);
  color: v-bind(bColor);
  aspect-ratio: 1/1;
  border-radius: 4px;
}
.H_iconBase[disabled] {
  pointer-events: none;
  opacity: 0.35;
}

.H_iconBase[outline] {
  border: 1px solid currentColor;
  padding: 0.15em;
}

.H_iconBase[round] {
  border-radius: 50%;
}

.H_iconBase[filled] {
  color: v-bind(tColor);
  background-color: v-bind(bColor);
  border: none;
  padding: 0.2em;
}

.H_iconBase[btn]:hover {
  border: 2px solid currentColor;
}

.H_iconBase[btn]:active {
  border: 2px solid currentColor;
  transform: scale(0.9);
}
</style>
