<template>
  <label
    class="H_switch inline-flex items-center gap-[.3em] !bg-transparent cursor-pointer [&[disabled]]:opacity-40 [&[disabled]]:pointer-events-none"
    :class="{ 'flex-row-reverse': labelLeft }"
    :disabled="disabled ? '' : undefined"
  >
    <input
      v-show="P.switch === false"
      :type
      class="H_switch-input accent-current-bg-col aspect-square rounded h-[1.2em]"
      :aria-label="label === '' ? 'No label' : label"
      :value="value"
      v-model="modelValue"
    />
    <span v-if="switch" class="slider relative inline-flex items-center bg-bg6"></span>
    <div class="H_switch-label overflow-hidden line-clamp-1 text-txt2 text-[.9em]">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

const P = defineProps({
  label: { type: String, default: "" },
  labelGap: { type: String, default: "6px" },
  labelLeft: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  switch: { type: Boolean, default: false },
  value: {
    type: [String, Number],
  },
  type: {
    type: String as PropType<"checkbox" | "radio">,
    default: "checkbox",
  },
});

const modelValue = defineModel();
</script>

<style>
@layer components {
  .H_switch {
    background-color: var(--color-pri);
    color: var(--color-priTxt);
    --color-currentBg: var(--color-pri);
    --color-current: var(--color-priTxt);
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
