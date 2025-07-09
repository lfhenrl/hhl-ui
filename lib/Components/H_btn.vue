<template>
  <button :size="endSize" :color="col.bg" :bgcolor="col.txt" :variant :disabled class="H_btn" type="button">
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

const col = useColor(toRef(() => P.color));
const endSize = useSize(toRef(() => P.size));
</script>
<style>
/* stylelint-disable declaration-property-value-no-unknown */
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
    font-size: attr(size type(<length>));

    line-height: 1.2;
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
      color: attr(color type(<color>));
      background-color: attr(bgcolor type(<color>));
    }

    &[variant="outline"] {
      background-color: transparent;
      color: attr(bgcolor type(<color>));
      border: 1px solid attr(bgcolor type(<color>));
    }

    &[variant="text"] {
      background-color: transparent;
      color: attr(bgcolor type(<color>));
    }
  }
}
</style>
