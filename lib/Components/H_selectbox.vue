<template>
  <H_inputbase
    class="H_selectbox"
    :label="label"
    :HelpTextStart="HelpTextStart"
    :HelpTextEnd="HelpTextEnd"
    :disabled="disabled ? '' : undefined"
  >
    <H_selectbase
      :row="row ? '' : undefined"
      v-model:label="labelValue"
      :multi
      v-model="model"
      :filter="filter"
      :listGap="listGap"
      :labelGap="labelGap"
      :labelLeft="labelLeft"
      :list="list"
      :readonly
    />
  </H_inputbase>
</template>

<script setup lang="ts">
import H_selectbase from "./H_selectbase.vue";
import H_inputbase from "./H_inputbase.vue";
import { ref } from "vue";
/* import { validateFunc } from "../utils/validateFunc"; */
defineProps({
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
const E = defineEmits([]);
const model: any = defineModel();
const labelValue = ref("");
</script>

<style>
.H_selectbox {
  font-size: 1rem;
  line-height: 0;
}

.H_selectbox .H_selectbase {
  padding: 6px;
  font-size: 1rem;
  line-height: 1;
  gap: 6px;
}

.H_selectbox .H_selectbase[row] {
  flex-direction: row;
  gap: 14px;
  padding: 0 10px;
}
</style>
