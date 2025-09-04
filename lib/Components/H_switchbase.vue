<template>
  <button
    type="button"
    :role="variant"
    :aria-checked="check"
    class="H_switchbase"
    :class="{
      switch: variant === 'switch',
      checkbox: variant === 'checkbox',
      radio: variant === 'radio',
      checked: check,
    }"
  >
    <svg
      v-if="check && variant === 'checkbox'"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      fill="none"
      class="H_switchbase__indicator_checkbox"
    >
      <path
        fill="currentColor"
        d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"
        style="pointer-events: none"
      />
    </svg>
    <div v-if="check && variant === 'radio'" class="H_switchbase__indicator_radio"></div>

    <div v-if="variant === 'switch'" class="H_switchbase__indicator_switch"></div>
  </button>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  check: { type: Boolean, default: false },
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "radio",
  },
});
const E = defineEmits([]);
</script>

<style>
@layer components {
  .H_switchbase {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.15em solid var(--col-5);
    border-radius: 4px;
    --color-contrast: oklch(from var(--h-color) var(--h-l) 0 h) !important;
  }

  .H_switchbase.checkbox {
    height: 1.2em;
    width: 1.2em;
    background-color: transparent;
  }

  .H_switchbase__indicator_checkbox {
    aspect-ratio: 1/1;
    color: var(--color-contrast);
    padding-bottom: 0.05em;
  }
  .H_switchbase.checkbox.checked {
    background-color: var(--h-color);
    border-color: var(--h-color);
  }

  .H_switchbase.radio {
    height: 1.2em;
    width: 1.2em;
    border-radius: calc(infinity * 1px);
    background-color: transparent !important;
    padding: 0.2em;
  }
  .H_switchbase__indicator_radio {
    background-color: var(--h-color);
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .H_switchbase.radio.checked {
    border-color: var(--h-color);
  }

  .H_switchbase.switch {
    width: 2.25em;
    border-radius: calc(infinity * 1px);
    justify-content: start;
    border-color: transparent;
    background-color: var(--col-5);
    --switch-translate: 0;
  }
  .H_switchbase__indicator_switch {
    display: flex;
    align-items: center;
    height: 1em;
    width: 1em;
    border-radius: calc(infinity * 1px);
    background-color: var(--bgcol-2);
    transition-duration: 200ms;
    transform: translateX(var(--switch-translate));
  }
  .H_switchbase.switch.checked {
    background-color: var(--h-color);
    --switch-translate: 100%;
  }
}
</style>
