<template>
  <H_inputbase
    :label="label"
    :clearable="showClear"
    :disabled
    :readonly
    :hintStart="hintStart"
    :hintEnd="stringCounter"
    :ErrorMessage="validate"
    h-padding="0 0 0 0.3em"
    class="H_textarea"
  >
    <slot> </slot>
    <textarea
      ref="el"
      v-model="model"
      :autofocus
      :rows="rows"
      @click="$emit('input_click')"
      :maxlength="counter"
      spellcheck="false"
      :readonly="readonly"
      :placeholder="placeholder"
      class="input"
      h-width="100%"
      h-margin="0 0 0 0.2em"
    />
    <H_icon name="close" h-color="var(--color-txt3)" h-margin="0 0.1em" btn v-if="showClear" @click="model = ''" />
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import H_inputbase from "./H_inputbase.vue";
import H_icon from "./H_icon.vue";
import { validateFunc } from "../utils/validateFunc";
const P = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  counter: { type: String, default: "" },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
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
@layer components {
  .H_textarea {
    &:focus-within {
      border-color: var(--color-pri);
    }
    [set-end] {
      margin-inline: 0.2em;
    }
  }
}
</style>
