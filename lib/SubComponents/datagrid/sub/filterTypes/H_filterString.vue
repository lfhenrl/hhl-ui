<template>
  <div class="H_filterString">
    <H_select v-model="condition1" :list="list" hide-filter />
    <H_inputText v-model="value1" />
    <H_selectBox
      row
      list-gap="20px"
      label-gap="5px"
      v-model="logical"
      :list="[
        { label: 'AND', value: 'and' },
        { label: 'OR', value: 'or' },
      ]"
    />
    <H_select v-model="condition2" :list="list" hide-filter />
    <H_inputText v-model="value2" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import H_inputText from "../../../../Components/H_inputText.vue";
import H_select from "../../../../Components/select/H_select.vue";
import H_selectBox from "../../../../Components/select/H_selectBox.vue";
import { iDgrid } from "../../provide/Dgrid";
import { iColumn } from "../../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

const list = [
  { label: "Contain.", value: "contain" },
  { label: "Equal to.", value: "equal" },
  { label: "Starts with.", value: "startwith" },
  { label: "Ends with.", value: "endwith" },
  { label: "Not Contain.", value: "notContain" },
  { label: "Not Equal to.", value: "notEqual" },
  { label: "Not Starts with.", value: "notStartwith" },
  { label: "Not Ends with.", value: "notEndwith" },
];

const condition1 = ref("contain");
const condition2 = ref("contain");
const value1 = ref();
const value2 = ref();
const logical = ref("and");

const canSave = computed(() => {
  if (value1.value === "" && col.filter.value1 === "") return false;
  if (value1.value !== col.filter.value1 || condition1.value !== col.filter.condition1) return true;
  if (value2.value === col.filter.value2 && value2.value === "") return false;
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
  col.filter.active = col.filter.value1 !== "";
}

function clear() {
  col.filter.condition1 = "contain";
  col.filter.condition2 = "contain";
  col.filter.value1 = "";
  col.filter.value2 = "";
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
  col.filter.condition1 = col.filter.condition1 === "" ? "contain" : col.filter.condition1;
  col.filter.condition2 = col.filter.condition2 === "" ? "contain" : col.filter.condition2;
});

defineExpose({ save, clear, open, close, canSave });
</script>
<style>
@layer hhl-components {
  .H_filterString {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
    gap: 12px;
    overflow: hidden;
    padding: 20px 20px 0 20px;
  }
}
</style>
