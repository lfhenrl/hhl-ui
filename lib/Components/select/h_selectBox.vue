<template>
  <h_inputbase
    class="h_selectBox"
    :label="label"
    :HelpTextStart="HelpTextStart"
    :HelpTextEnd="HelpTextEnd"
    :disabled="disabled"
    :movelabel="true"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
  >
    <h_baseSelectList
      row
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :filter="filter"
      :listGap="listGap"
      :labelGap="labelGap"
      :labelLeft="labelLeft"
      :multi="multi"
      :list="list"
    />
  </h_inputbase>
</template>

<script setup lang="ts">
import { validateFunc } from "../../utils/validateFunc";

const P = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: { type: String, default: "" },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  listGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  validator: Array
});
const E = defineEmits(["update:modelValue"]);

const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
.h_selectBox {
  align-items: center;
  margin: 0;
  padding: 8px 15px 5px 15px !important;
}
</style>
