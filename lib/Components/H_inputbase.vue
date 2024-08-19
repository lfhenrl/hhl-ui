<template>
  <label class="H_inputbase" :data-error="ErrorMessage != '' ? true : undefined" :narrow="narrow ? '' : undefined">
    <span class="H_inputbase-label">{{ label }}</span>
    <div class="H_inputbase-inputBox">
      <slot> </slot>
      <div class="H_inputbase-input">
        <slot name="input"> </slot>
      </div>
      <span @click="$emit('clear')" v-if="clearable" class="H_inputbase-clear no-slot">⛌</span>
    </div>
    <div class="H_inputbase-info">
      <template v-if="ErrorMessage == ''">
        <div>{{ HelpTextStart }}</div>
        <div>{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="H_inputbase-err">{{ ErrorMessage }}</div>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  narrow: { type: Boolean, default: false },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  ErrorMessage: { type: String, default: "" },
});
const E = defineEmits(["clear"]);
</script>

<style>
@layer hhl-components {
  .H_inputbase {
    position: relative;
    display: inline-grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 0.9em auto 0.9em;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    height: min-content;
    box-sizing: border-box;
    background-color: transparent;
  }

  .H_inputbase[narrow] {
    margin: -0.8em 0;
  }

  .H_inputbase * {
    box-sizing: border-box;
  }

  .H_inputbase[disabled] {
    opacity: 0.5;
    pointer-events: none;
    cursor: none;
  }

  .H_inputbase-label {
    grid-column-start: 2;
    grid-row-start: 1;
    align-self: self-start;
    font-size: 0.8em;
    padding: 0 0 0 2px;
    margin: 0;
    line-height: 0.8em;
    color: var(--col-txt-3);
  }

  .H_inputbase[data-error] .H_inputbase-label {
    color: var(--col-err);
  }

  .H_inputbase-inputBox {
    position: relative;
    grid-column-start: 2;
    grid-row-start: 2;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    border: 1px solid var(--col-txt-5);
    border-radius: 4px;
    padding: 0.2em;
    align-items: center;
    color: var(--col-txt-2);
    transition: all 0.1s ease-in-out;
    min-height: 30px;
  }

  .H_inputbase-input {
    display: flex;
    align-items: center;
    grid-column-start: 2;
    grid-row-start: 1;
    padding: 0 6px;
    margin: 0;
    background-color: transparent;
    font-size: 1em;
    min-height: 1.2em;
    line-height: 1em;
    resize: none;
  }

  .H_inputbase-input input {
    appearance: none;
    border: none;
  }

  .H_inputbase-inputBox:hover {
    border-color: var(--col-txt-2);
  }

  .H_inputbase-inputBox:focus-within {
    border-color: var(--col-pri);
  }

  .H_inputbase[data-error] .H_inputbase-inputBox {
    border-color: var(--col-err);
  }

  .H_inputbase-clear {
    grid-column-start: 4;
    grid-row-start: 1;
    font-size: 0.9em;
    line-height: 1.1em;
    font-weight: bold;
    font-family: monospace;
    padding: 0 3px 0 0;
    /*   border: solid red 1px; */
    padding-top: 2px;
  }

  .H_inputbase[readonly] .H_inputbase-clear {
    pointer-events: none;
    cursor: none;
  }

  .H_inputbase-clear:hover {
    color: var(--col-txt-2);
  }
  .H_inputbase-clear:active {
    transform: scale(0.9);
  }

  /*   .H_inputbase-inputBox > :not(.H_inputbase-input) {
    max-height: 1em;
  } */

  .H_inputbase-inputBox > :not(.H_inputbase-input) :nth-child(1 of :not(.no-slot)) {
    line-height: 1em;
    max-height: 1.2em;
  }

  .H_inputbase-inputBox > :not(.H_inputbase-input) :nth-child(2 of :not(.no-slot)) {
    grid-column-start: 5;
    grid-row-start: 1;
    line-height: 1em;
    max-height: 1.2em;
  }

  .H_inputbase-inputBox > [set-end] {
    grid-column-start: 5;
    grid-row-start: 1;
  }

  .H_inputbase-info {
    grid-column-start: 2;
    grid-row-start: 3;
    display: flex;
    justify-content: space-between;
    grid-column: span 4 / span 4;
    max-height: 0;
    width: 100%;
    line-height: 1;
    user-select: none;
    color: var(--col-txt-2);
    font-size: 0.7em;
    padding: 3px 0 0 2px;
  }

  .H_inputbase-err {
    color: var(--col-err);
  }
}
</style>
