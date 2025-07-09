<template>
  <div class="flex flex-col gap-4 py-4">
    <H_select v-model="condition1" :list="list" hide-filter />
    <H_datePicker v-model="value1" :show-seconds="col.filter.type === 'datetime'" class="w-full" />
    <H_selectbox
      row
      narrow
      class="w-full my-2"
      list-gap="20px"
      label-gap="5px"
      v-model="logical"
      :list="[
        { label: 'AND', value: 'and' },
        { label: 'OR', value: 'or' },
      ]"
    />
    <H_select v-model="condition2" :list="list" hide-filter />
    <H_datePicker v-model="value2" :show-seconds="col.filter.type === 'datetime'" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import H_datePicker from "../../../../Components/H_datePicker.vue";
import H_select from "../../../../Components/H_select.vue";
import H_selectbox from "../../../../Components/H_selectbox.vue";
import { type iDgrid } from "../../provide/Dgrid";
import { type iColumn } from "../../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

const list = [
  { label: "Equal to.", value: "equal" },
  { label: "Not equal to.", value: "not_equal" },
  { label: "Greater than.", value: "greater" },
  { label: "Greater than or Equal.", value: "greaterOrEqual" },
  { label: "Less than.", value: "less" },
  { label: "Less than or Equal.", value: "lessOrEqual" },
];

const condition1 = ref("equal");
const condition2 = ref("equal");
const value1 = ref();
const value2 = ref();
const logical = ref("and");

const canSave = computed(() => {
  if (value1.value === null && col.filter.value1 === null) return false;
  if (value1.value !== col.filter.value1 || condition1.value !== col.filter.condition1) return true;
  if (value2.value === col.filter.value2 && value2.value === null) return false;
  if (
    value2.value !== col.filter.value2 ||
    condition2.value !== col.filter.condition2 ||
    logical.value !== col.filter.logical
  )
    return true;
  return false;
});

function save() {
  col.filter.condition1 = condition1.value;
  col.filter.condition2 = condition2.value;
  col.filter.value1 = value1.value;
  col.filter.value2 = value2.value;
  col.filter.logical = logical.value;
  col.filter.active = col.filter.value1 !== null;
}

function clear() {
  col.filter.condition1 = "equal";
  col.filter.condition2 = "equal";
  col.filter.value1 = null;
  col.filter.value2 = null;
  col.filter.logical = "and";
  col.filter.active = false;
}

function open() {
  condition1.value = col.filter.condition1;
  condition2.value = col.filter.condition2;
  value1.value = col.filter.value1;
  value2.value = col.filter.value2;
  logical.value = col.filter.logical;
}

function close() {}

onMounted(() => {
  col.filter.condition1 = col.filter.condition1 === "" ? "equal" : col.filter.condition1;
  col.filter.condition2 = col.filter.condition2 === "" ? "equal" : col.filter.condition2;
  col.filter.value1 = col.filter.value1 === "" ? null : col.filter.value1;
  col.filter.value2 = col.filter.value2 === "" ? null : col.filter.value2;
});

defineExpose({ save, clear, open, close, canSave });
</script>
