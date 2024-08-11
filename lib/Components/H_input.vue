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
    class="H_input"
  >
    <slot> </slot>
    <template v-slot:input>
      <input
        v-model="model"
        size="30"
        :max
        :min
        :readonly
        :disabled
        autocomplete="off"
        :maxlength="counter"
        :type="type"
        :placeholder="placeholder"
        :name="label === '' ? 'No name' : label"
        @click="$emit('input_click')"
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
const E = defineEmits(["input_click"]);
const model: any = defineModel();

const showClear = computed(() => {
  if (P.clearable === false) return false;
  if (model.value === null) return false;
  if (model.value === "") return false;
  return true;
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
  .H_input .H_inputbase-input {
    font-family: Arial, Helvetica, sans-serif;
  }

  .H_input .H_inputbase-input input {
    width: 100%;
    background-color: transparent;
  }

  .H_input .H_inputbase-input input[type="color"] {
    width: 3em;
    height: 1em;
    padding: 0 3px;
  }

  .H_input .H_inputbase-input input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  .H_input .H_inputbase-input input[type="color"]::-webkit-color-swatch {
    border: none;
  }
}
</style>
