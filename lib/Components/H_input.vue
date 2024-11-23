<template>
  <H_inputbase
    @clear="model = null"
    :label="label"
    :clearable="showClear"
    :disabled="disabled ? '' : undefined"
    :readonly
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :ErrorMessage="validate"
    :narrow
    class="H_input"
  >
    <div class="grid grid-cols-[auto_1fr_auto] w-full h-full *:row-start-1 max-h-[1.875em] items-center">
      <slot> </slot>
      <input
        class="col-start-2 w-full bg-transparent border-none appearance-none focus:outline-none"
        :class="{ 'w-[3em] h-[1em] p-0': type === 'color' }"
        v-model="model"
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
    </div>
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
  narrow: { type: Boolean, default: false },
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
