<template>
  <button
    :style="{ '--color-currentBg': txtColor, '--color-current': bgColor, '--btn-size': endSize }"
    class="H_btn hover:brightness-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    type="button"
    :class="{
      'bg-transparent border text-currentBg border-currentBg border-solid ': variant === 'outline',
      'text-currentBg bg-transparent': variant === 'text',
      'pointer-events-none opacity-35': disabled,
    }"
  >
    <slot>{{ size }}</slot>
  </button>
</template>

<script setup lang="ts">
import { toRef, type PropType } from "vue";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";

const P = defineProps({
  ...useColorProp("pri"),
  ...sizeProp,
  /** @type {variant} The variant of Btn it can be standard, outline or text default is standard */
  variant: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
  disabled: { type: Boolean, default: false },
});

const { bgColor, txtColor } = useColor(toRef(() => P.color));
const { endSize } = useSize(toRef(() => P.size));
</script>
<style>
@layer components {
  .H_btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-family: "Public Sans", sans-serif;
    gap: 0.3em;
    padding-inline: 0.9em;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 0.25rem;
    background-color: var(--color-currentBg);
    color: var(--color-current);
    font-size: var(--btn-size);
    line-height: 1.2;
    max-height: calc(var(--btn-size) * 1.9);
    min-height: calc(var(--btn-size) * 1.9);
  }
}
</style>
