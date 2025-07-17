<template>
  <div class="H_inputbase" :disabled="disabled ? '' : undefined" :data-error="ErrorMessage != '' ? true : undefined">
    <slot />
    <span class="label">{{ label }}</span>
    <span class="hintStart">{{ infotext }}</span>
    <span class="hintEnd">{{ hintEnd }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const P = defineProps({
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  ErrorMessage: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

const infotext = computed(() => {
  if (P.ErrorMessage === "") {
    return P.hintStart;
  } else {
    return P.ErrorMessage;
  }
});
</script>

<style>
@layer components {
  .H_inputbase {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    width: stretch;
    width: -moz-available;
    width: -webkit-fill-available;
    min-height: 1.875em;
    color: var(--color-txt1);
    border: 1px solid var(--color-txt5);
    border-radius: 4px;

    .label {
      position: absolute;
      color: var(--color-txt2);
      font-size: 0.9em;
      top: -1.6em;
      left: 2px;
    }
    .hintStart {
      position: absolute;
      color: var(--color-txt2);
      font-size: 0.65em;
      bottom: -1.5em;
      left: 4px;
    }

    .hintEnd {
      position: absolute;
      color: var(--color-txt2);
      font-size: 0.7em;
      bottom: -1.6em;
      right: 4px;
    }

    &[disabled] {
      pointer-events: none;
      opacity: 50%;
    }
    &[data-error] {
      .H_inputbase__hintEnd {
        display: none;
      }
      .hintStart {
        color: var(--color-err);
      }
    }

    [set-end] {
      order: 20;
    }
  }
}
</style>
