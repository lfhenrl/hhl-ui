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
  >
    <slot> </slot>
    <template v-slot:input>
      <input
        v-model="model"
        class="H_inputbase-input no-slot"
        size="30"
        :max
        :min
        :readonly
        :disabled
        autocomplete="off"
        :maxlength="counter"
        :type="type"
        :placeholder="placeholder"
      />
    </template>
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";
const P = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  counter: { type: String, default: "" },
  max: { type: String, default: "" },
  min: { type: String, default: "" },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  validator: Array,
  type: {
    type: String as PropType<"string" | "number" | "password" | "color">,
    default: "string",
  },
});

const model: any = defineModel();

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
.h_inputx .H_inputbase-input {
  font-family: Arial, Helvetica, sans-serif;
}

.h_inputx input[type="color"] {
  width: 3em;
  height: 1em;
  padding: 0 3px;
}

.h_inputx input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
.h_inputx input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>
