<template>
  <button
    type="button"
    :role="variant"
    :check
    class="H_switchbase"
    :class="{
      switch: variant === 'switch',
      checkbox: variant === 'checkbox',
      radio: variant === 'radio',
      checked: check,
    }"
  >
    <H_icon v-if="check && variant === 'checkbox'" name="check" class="H_switchbase__indicator_checkbox" />
    <div v-if="check && variant === 'radio'" class="H_switchbase__indicator_radio"></div>

    <div v-if="variant === 'switch'" class="H_switchbase__indicator_switch"></div>
  </button>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import H_icon from "./H_icon.vue";

defineProps({
  check: { type: Boolean, default: false },
  bgcolor: { String, default: "var(--color-priTxt)" },
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
    border: 0.15em solid var(--color-txt5);
    border-radius: 4px;
  }

  .H_switchbase.checkbox {
    height: 1.2em;
    width: 1.2em;
    background-color: transparent;
  }
  .H_switchbase__indicator_checkbox {
    color: var(--h-color-contrast);
    padding-bottom: 0.1em;
  }
  .H_switchbase.checkbox.checked {
    background-color: var(--h-color);
    border-color: var(--h-color);
  }

  .H_switchbase.radio {
    height: 1.2em;
    width: 1.2em;
    border-radius: calc(infinity * 1px);
    background-color: transparent;
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
    background-color: var(--color-txt5);
    --switch-translate: 0;
  }
  .H_switchbase__indicator_switch {
    display: flex;
    align-items: center;
    height: 1em;
    width: 1em;
    border-radius: calc(infinity * 1px);
    background-color: var(--color-bg6);
    transition-duration: 200ms;
    transform: translateX(var(--switch-translate));
  }
  .H_switchbase.switch.checked {
    background-color: var(--h-color);
    --switch-translate: 100%;
  }
}
</style>
