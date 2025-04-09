<template>
  <svg
    viewBox="0 0 24 24"
    class="H_icon"
    height="24"
    width="24"
    fill="none"
    :outline="outline ? '' : undefined"
    :round="round ? '' : undefined"
    :filled="filled ? '' : undefined"
    :disabled="disabled ? '' : undefined"
    :btn="btn ? '' : undefined"
  >
    <path fill="currentColor" :d="icon" />
  </svg>
</template>

<script setup lang="ts">
import { sharedProps } from "../SubComponents/icons/props";
import { computed, ref, watch, type PropType } from "vue";
import { icons } from "../SubComponents/icons/icons";

const P = defineProps({
  ...sharedProps,
  color: {
    type: String as PropType<
      | "pri"
      | "ok"
      | "sec"
      | "warn"
      | "err"
      | "info"
      | "white"
      | "black"
      | "txt0"
      | "txt1"
      | "txt2"
      | "txt3"
      | "txt4"
      | "txt5"
      | "txt6"
      | "bg0"
      | "bg1"
      | "bg2"
      | "bg3"
      | "bg4"
      | "bg5"
      | "bg6"
      | "current"
    >,
    default: "current",
  },
  size: {
    type: String,
    default: "1.4rem",
  },
  outline: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: true,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  btn: {
    type: Boolean,
    default: false,
  },
  disabled: { type: Boolean, default: false },
});

const icon = ref("");
const bColor = computed(() => {
  if (P.color === "current") {
    return `var(--color-current)`;
  }
  return `var(--color-${P.color})`;
});

const tColor = computed(() => {
  if (P.color === "current") {
    return `var(--color-currentBg)`;
  }
  return `var(--color-${P.color}Txt)`;
});

watch(
  () => P.name,
  () => {
    icons[P.name]().then((res: any) => {
      icon.value = res.ico;
    });
  },
  { immediate: true }
);
</script>
<style>
.H_icon {
  display: block;
  min-width: v-bind(size);
  max-width: v-bind(size);
  min-height: v-bind(size);
  max-height: v-bind(size);
  color: v-bind(bColor);
  aspect-ratio: 1/1;
  border-radius: 4px;
}
.H_icon[disabled] {
  pointer-events: none;
  opacity: 0.35;
}

.H_icon[outline] {
  border: 1px solid currentColor;
  padding: 0.15em;
}

.H_icon[round] {
  border-radius: 50%;
}

.H_icon[filled] {
  color: v-bind(tColor);
  background-color: v-bind(bColor);
  border: none;
  padding: 0.2em;
}

.H_icon[btn]:hover {
  outline: 2px solid var(--color-pri);
  outline-offset: 2px;
  /*  transform: scale(1.5); */
}

.H_icon[btn]:active {
  border: 2px solid currentColor;
  transform: scale(0.9);
}
</style>
