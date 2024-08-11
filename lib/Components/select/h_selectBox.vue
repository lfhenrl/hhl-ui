<template>
  <H_inputbase
    class="H_selectBox"
    :label="label"
    :HelpTextStart="HelpTextStart"
    :HelpTextEnd="HelpTextEnd"
    :disabled="disabled"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
  >
    <H_baseSelectList
      :row="row"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :filter="filter"
      :listGap="listGap"
      :labelGap="labelGap"
      :labelLeft="labelLeft"
      :multi="multi"
      :list="list"
      :readonly="readonly"
    />
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed } from "vue";
import H_baseSelectList from "../../SubComponents/H_baseSelectList.vue";
import H_inputbase from "../H_inputbase.vue";
import { validateFunc } from "../../utils/validateFunc";

const P = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: { type: String, default: "" },
  row: { type: Boolean, default: false },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "2px" },
  listGap: { type: String, default: "6px 20px" },
  labelLeft: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  validator: Array,
});
defineEmits(["update:modelValue"]);

const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>
