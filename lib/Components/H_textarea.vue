<template>
  <H_inputbase
    @clear="model = null"
    :label="label"
    :clearable="showClear"
    :disabled="disabled ? '' : undefined"
    :readonly="readonly ? '' : undefined"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :ErrorMessage="validate"
    class="H_textarea"
  >
    <slot> </slot>
    <template v-slot:input>
      <textarea
        ref="el"
        v-model="model"
        :rows="rows"
        @click="$emit('input_click')"
        :maxlength="counter"
        spellcheck="false"
        :readonly="readonly"
        :placeholder="placeholder"
        class="focus:outline-none"
      />
    </template>
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";
const P = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  counter: { type: String, default: "" },
  hintStart: { type: String, default: "Start" },
  hintEnd: { type: String, default: "End" },
  validator: Array,
  rows: { type: String, default: "1" },
  noGrow: { type: Boolean, default: false },
});
const E = defineEmits(["input_click"]);
const model: any = defineModel();
const el = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (el.value) {
    model.value;
    if (P.noGrow) return;
    calculateInputHeight(el.value);
  }
});

function calculateInputHeight(input: HTMLInputElement) {
  input.style.height = "0";
  const parent = input.parentElement;
  if (model.value === null) return;
  const scrollHeight = input.scrollHeight;
  if (parent && parent.style.height) {
    input.style.height = "100%";
  } else {
    input.style.height = scrollHeight + "px";
  }
}

const showClear = computed(() => {
  if (P.clearable === false) return false;
  if (model.value !== null) return true;

  return false;
});

const stringCounter = computed(() => {
  if (P.counter == "") return P.hintEnd;
  let c = model.value.toString().length;
  return c.toString() + "/" + P.counter;
});

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
@layer hhl-components {
  .H_textarea .H_inputbase-input {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    max-height: none;
    padding-top: 2px;
  }

  .H_textarea textarea {
    resize: vertical;
    width: 100%;
  }
}
</style>
