<template>
  <label
    class="H_switch"
    :style="{ '--switch-size': endSize, '--color-currentBg': txtColor, '--color-current': bgColor, gap: labelGap }"
    :class="{ 'flex-row-reverse': labelLeft }"
    :disabled="disabled ? '' : undefined"
  >
    <input
      v-show="P.variant !== 'switch'"
      :type="P.variant === 'switch' ? 'checkbox' : P.variant"
      class="H_switch-input accent-currentBg aspect-square h-[1.2em]"
      :aria-label="label === '' ? 'No label' : label"
      :value="value"
      v-model="modelValue"
    />
    <span v-show="P.variant === 'switch'" class="slider relative inline-flex items-center bg-bg6"></span>
    <div class="H_switch-label overflow-hidden line-clamp-1 text-txt2 text-[.9em]">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { toRef, type PropType } from "vue";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";

const P = defineProps({
  ...useColorProp("pri"),
  ...sizeProp,
  value: {
    type: [String, Number],
    default: "",
  },
  label: { type: String, default: "" },
  labelGap: { type: String, default: "6px" },
  labelLeft: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  variant: {
    type: String as PropType<"checkbox" | "radio" | "switch">,
    default: "checkbox",
  },
});

const modelValue = defineModel();

const { bgColor, txtColor } = useColor(toRef(() => P.color));
const { endSize } = useSize(toRef(() => P.size));
</script>

<style>
@layer components {
  .H_switch {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    background-color: transparent !important;
    cursor: pointer;
    font-size: var(--switch-size);
  }

  .H_switch[disabled] {
    opacity: 40%;
    pointer-events: none;
  }
  .H_switch .slider {
    height: 1.2em;
    aspect-ratio: 20 / 12;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 1em;
  }

  .H_switch .slider:before {
    position: absolute;
    content: "";
    height: 70%;
    aspect-ratio: 1 / 1;
    left: 5%;
    background-color: var(--color-bg0);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  .H_switch input:checked + .slider {
    background-color: color-mix(in srgb, var(--color-currentBg) 30%, white);
  }

  .H_switch input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .H_switch input:checked + .slider:before {
    -webkit-transform: translateX(86%);
    -ms-transform: translateX((86%));
    transform: translateX((86%));
    height: 78%;
    background-color: var(--color-currentBg);
  }
}
</style>
