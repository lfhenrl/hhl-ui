/* stylelint-disable declaration-property-value-no-unknown */
<template>
  <svg
    :h-disabled="disabled ? '35%' : undefined"
    :class="{
      outline: variant.startsWith('outline'),
      filled: variant.startsWith('filled'),
      round: variant.endsWith('round'),
      btn: btn,
    }"
    :variant
    viewBox="0 0 24 24"
    class="H_icon"
    height="24"
    width="24"
    fill="none"
  >
    <path fill="currentColor" :d="icon" style="pointer-events: none" />
  </svg>
</template>

<script setup lang="ts">
import { iconsProps } from "../SubComponents/icons/iconProp";
import { icons } from "../SubComponents/icons/icons";
import { shallowRef, watch, type PropType } from "vue";

const P = defineProps({
  name: { type: iconsProps, default: "close" },
  variant: {
    type: String as PropType<"base" | "outline" | "outline-round" | "filled" | "filled-round">,
    default: "base",
  },
  btn: {
    type: Boolean,
    default: false,
  },
  disabled: { type: Boolean, default: false },
});

const icon = shallowRef("");
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
@layer components {
  .H_icon {
    display: block;
    font-size: 1.2em;
    aspect-ratio: 1/1;
    min-height: 1em;
    max-height: 1em;
    min-width: 1em;
    max-width: 1em;
    border-radius: 4px;
    --h-color: var(--col-3);
    --color-contrast: oklch(from var(--h-color) var(--h-l) 0 h);
    color: var(--h-color);

    &.filled {
      padding: 0.2em;
      color: var(--color-contrast) !important;
      background-color: var(--h-color);
    }

    &.outline {
      padding: 0.15em;
      border: 1px solid var(--h-color);
    }

    &.round {
      padding: 0.15em;
      border-radius: 50%;
    }
  }

  .H_icon.btn:hover {
    transform: scale(0.9);
  }
  .H_icon.btn:active {
    transform: scale(1.1);
  }

  .H_icon.btn:focus {
    outline: solid 1px var(--col-pri);
    outline-offset: 2px;
  }
}
</style>
