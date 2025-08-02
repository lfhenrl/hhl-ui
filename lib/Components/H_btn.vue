<template>
  <button
    :size="endSize"
    :color="col.bg"
    :bgcolor="col.txt"
    :variant
    :disabled
    class="H_btn h_flexInline h_items-center h_justify-center h_rounded h_cursor-pointer"
    type="button"
  >
    <slot>{{ size }}</slot>
  </button>
</template>

<script setup lang="ts">
import { toRef, type PropType } from "vue";
import { colorProps, useColor } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";

const P = defineProps({
  color: { type: colorProps, default: "pri" },
  size: { type: sizeProp, default: "md" },
  /** @type {variant} The variant of Btn it can be standard, outline or text default is standard */
  variant: {
    type: String as PropType<"standard" | "outline" | "text">,
    default: "standard",
  },
  disabled: { type: Boolean, default: false },
});

const col = useColor(toRef(() => P.color));
const endSize = useSize(toRef(() => P.size));
</script>
<style>
@layer components {
  .H_btn {
    --btn-color: attr(color type(<color>));
    --btn-bgcolor: attr(bgcolor type(<color>));
    --btn-size: attr(size type(<length>));
    font-family: "Public Sans", sans-serif;
    gap: 0.3em;
    padding-inline: 0.9em;
    white-space: nowrap;
    font-size: var(--btn-size);
    max-height: calc(1em * 1.9);
    min-height: calc(1em * 1.9);

    &:active {
      transform: scale(0.95);
    }

    &:focus {
      outline: solid 1px var(--color-pri);
      outline-offset: 2px;
    }

    &:hover {
      filter: brightness(80%);
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.35;
    }

    &[variant="standard"] {
      color: var(--btn-color);
      background-color: var(--btn-bgcolor);
    }

    &[variant="outline"] {
      background-color: transparent;
      color: var(--btn-bgcolor);
      border: 1px solid var(--btn-bgcolor);
    }

    &[variant="text"] {
      background-color: transparent;
      color: var(--btn-bgcolor);
    }
  }
}
</style>
