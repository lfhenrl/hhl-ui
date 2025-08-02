<template>
  <button :color :bgcolor type="button" :role="variant" :check class="H_switchbase h_flexInline h_items-center">
    <div class="H_switchbase__indicator h_flex h_items-center">
      <H_icon v-if="check && variant === 'checkbox'" name="check" size="1.2em" class="H_switchbase__indicator_svg" />
      <div v-if="check && variant === 'radio'" class="H_switchbase__indicator_radio"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import H_icon from "./H_icon.vue";

defineProps({
  check: { type: Boolean, default: false },
  color: { String, default: "var(--color-pri)" },
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
    border-width: 2px;
    --switch-color: attr(color type(<color>));
    --switch-bgcolor: attr(bgcolor type(<color>));

    &[role="checkbox"] {
      height: 1.2em;
      width: 1.2em;
      justify-content: center;
      border-radius: 4px;
      border-color: var(--color-txt5);
      &[check="true"] {
        background-color: var(--switch-color);
        border-color: var(--switch-color);
      }

      .H_switchbase__indicator_svg {
        color: var(--switch-bgcolor);
        padding-bottom: 0.1em;
      }
    }

    &[role="radio"] {
      height: 1.2em;
      width: 1.2em;
      justify-content: center;
      border-radius: calc(infinity * 1px);
      border-color: var(--color-txt5);

      &[check="true"] {
        border-color: var(--switch-color);
        border-width: 0.15em;
      }

      .H_switchbase__indicator {
        height: 100%;
        width: 100%;
        border-radius: calc(infinity * 1px);
        border-width: 0.2em;
        border-color: transparent;
      }

      .H_switchbase__indicator_radio {
        height: 100%;
        width: 100%;
        border-radius: calc(infinity * 1px);
        background-color: var(--switch-color);
      }
    }

    &[role="switch"] {
      width: 2.25em;
      border-radius: calc(infinity * 1px);
      border-color: transparent;
      background-color: var(--color-txt5);
      --switch-translate: 0;

      &[check="true"] {
        background-color: var(--switch-color);
        --switch-translate: 100%;
      }

      .H_switchbase__indicator {
        height: 1em;
        width: 1em;
        border-radius: calc(infinity * 1px);
        background-color: var(--color-bg6);
        transition-duration: 200ms;
        transform: translateX(var(--switch-translate));
      }
    }
  }
}
</style>
