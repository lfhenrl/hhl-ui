<template>
  <label
    class="H_switch"
    :class="{ 'H_switch-labelLeft': labelLeft, 'H_switch-input-sm': size === 'sm', 'H_switch-input-lg': size === 'lg' }"
    :disabled="disabled ? '' : undefined"
  >
    <input
      v-show="P.switch === false"
      :type
      class="H_switch-input"
      :aria-label="label === '' ? 'No label' : label"
      :value="value"
      v-model="modelValue"
    />
    <span v-if="switch" class="slider"></span>
    <div class="H_switch-label">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

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
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});
const Color = computed(() => {
  return `var(--col-${P.color})`;
});

const modelValue = defineModel();
</script>

<style>
@layer hhl-components {
  .H_switch {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    background-color: transparent;
    color: var(--col-txt-2);
    --color: v-bind(Color);
    --size: 1.2rem;
    font-size: var(--size);
    line-height: 0.7em;
  }

  .H_switch-labelLeft {
    flex-direction: row-reverse;
  }

  input.H_switch-input {
    aspect-ratio: 1 / 1;
    width: var(--size);
    accent-color: var(--color);
  }

  .H_switch[disabled] {
    opacity: 0.8;
    pointer-events: none;
    cursor: none;
  }
  .H_switch[disabled] .H_switch-input {
    opacity: 0.5;
  }

  .H_switch.H_switch-input-sm {
    --size: 1rem;
  }

  .H_switch.H_switch-input-lg {
    --size: 1.6rem;
  }

  .H_switch-label {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    font-size: 0.6em;
    padding-bottom: 0.1em;
  }

  .slider {
    position: relative;
    display: inline-flex;
    height: 1em;
    align-items: center;
    aspect-ratio: 20 / 12;
    cursor: pointer;
    background-color: var(--col-bg-6);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 1em;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 70%;
    aspect-ratio: 1 / 1;
    left: 5%;
    background-color: var(--col-bg-0);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: color-mix(in srgb, var(--color) 20%, white);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(86%);
    -ms-transform: translateX((86%));
    transform: translateX((86%));
    height: 78%;
    background-color: var(--color);
  }
}
</style>
