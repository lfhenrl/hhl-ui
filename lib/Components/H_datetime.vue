<template>
  <H_inputbase
    :label="label"
    :disabled="disabled ? '' : undefined"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    class="H_datetime"
  >
    <slot> </slot>
    <template v-slot:input>
      <input
        ref="el"
        @input="onInput"
        :readonly="readonly"
        autocomplete="off"
        :step="type === 'datetimesec' ? 1 : 0"
        :type="inputType"
      />
    </template>
  </H_inputbase>
</template>

<script setup lang="ts">
import { PropType, ref, computed, watchEffect } from "vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";
const P = defineProps({
  label: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  type: {
    type: String as PropType<"date" | "datetime" | "datetimesec">,
    default: "datetime",
  },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  validator: Array,
});
const E = defineEmits([]);
const model: any = defineModel();
const el = ref<HTMLInputElement | null>(null);
const changeCount = ref(0);

const inputType = computed(() => {
  if (P.type === "datetime" || P.type === "datetimesec") {
    return "datetime-local";
  }
  return P.type;
});

function onInput(val: any) {
  if (isDateValid(val.target.value)) {
    model.value = new Date(val.target.value);
  } else {
    if (val.target.value === null) {
      model.value = val.target.value;
    } else {
      changeCount.value++;
    }
  }
}

watchEffect(() => {
  if (el.value && isDateValid(model.value)) {
    changeCount.value;
    if (P.type == "date") {
      el.value.value = getDateString(model.value, 10);
    } else if (P.type == "datetime") {
      el.value.value = getDateString(model.value, 16);
      console.log("datetime ", el.value.value);
    } else if (P.type == "datetimesec") {
      el.value.value = getDateString(model.value, 19);
    }
  }
});

function isDateValid(dateS: string) {
  const D = Date.parse(dateS);
  return !isNaN(D);
}

function getDateString(date: any, slice: number) {
  return new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, slice);
}

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
@layer hhl-components {
  .H_datetime .H_inputbase-input {
    font-family: Arial, Helvetica, sans-serif;
  }

  .H_datetime .H_inputbase-input input {
    width: 100%;
    background-color: transparent;
  }
}
</style>
