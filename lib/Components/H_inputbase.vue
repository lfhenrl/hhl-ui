<template>
  <label class="H_inputbase" :h-disabled="disabled ? '35%' : undefined">
    <slot />
    <span class="H_inputbase__label">{{ label }}</span>
    <span
      class="H_inputbase__hintStart"
      :class="{
        error: ErrorMessage != '',
      }"
      >{{ infotext }}</span
    >
    <span class="H_inputbase__hintEnd" v-if="ErrorMessage === ''">{{ hintEnd }}</span>
  </label>
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
    box-sizing: border-box;
    position: relative;
    align-items: center;
    width: stretch;
    width: -moz-available;
    width: -webkit-fill-available;
    border: 1px solid var(--col-6);
    border-radius: 4px;
    color: var(--col-1);
    min-height: 1.875em;

    [set-end] {
      order: 20;
    }
  }

  .H_inputbase__label {
    position: absolute;
    top: -1.6em;
    left: 2px;
    color: var(--col-2);
    white-space: nowrap;
    font-size: 0.9em;
  }

  .H_inputbase__hintStart {
    position: absolute;
    bottom: -1.5em;
    left: 4px;
    font-size: 0.65em;
    color: var(--col-2);
  }

  .H_inputbase__hintStart.error {
    color: var(--col-err);
    white-space: nowrap;
  }

  .H_inputbase__hintEnd {
    position: absolute;
    bottom: -1.5em;
    right: 4px;
    color: var(--col-2);
    font-size: 0.65em;
  }
}
</style>
