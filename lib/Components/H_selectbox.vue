<template>
  <H_inputbase
    class="H_selectbox"
    :label="label"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :disabled="disabled ? '' : undefined"
    :readonly
    :ErrorMessage="validate"
    :narrow
  >
    <H_selectbase
      :row="row"
      v-model:label="labelValue"
      :multi
      v-model="model"
      :filter="filter"
      :listGap="listGap"
      :labelGap="labelGap"
      :labelLeft="labelLeft"
      :list="list"
      :readonly
      class="px-2"
      :class="{ 'py-1': !row }"
    />
  </H_inputbase>
</template>

<script setup lang="ts">
import H_selectbase from "./H_selectbase.vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";
import { computed, ref } from "vue";
const P = defineProps({
  label: { type: String, default: "" },
  row: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "8px" },
  listGap: { type: String, default: "3px" },
  labelLeft: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  narrow: { type: Boolean, default: false },
  validator: Array,
});
const E = defineEmits([]);
const model: any = defineModel();
const labelValue = ref("");
const validate = computed(() => validateFunc(P.validator, model.value));
</script>
