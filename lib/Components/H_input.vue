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
    <template #input>
      <input
        v-model="model"
        class="H_inputbase-input no-slot"
        size="30"
        :maxlength="counter"
        :readonly="readonly"
        :disabled="disabled"
        autocomplete="off"
        :type="type"
        :placeholder="placeholder"
      />
    </template>
    <template #undertext>
      <template v-if="validate == ''">
        <div>hej</div>
        <div>hej end</div>
      </template>
      <template v-else>
        <div class="H_inputbase-err">{{ validate }}</div>
      </template>
    </template>
  </H_inputbase>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
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
  type: {
    type: String as PropType<"string" | "number" | "password" | "color">,
    default: "string",
  },
});

const model: any = defineModel();

const showClear = computed(() => {
  if (P.clearable === false) return false;
  if (P.type === "number" && model.value !== null) return true;
  if (P.type !== "number" && model.value !== null) return true;
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
.H_input .H_inputbase-input {
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
