<template>
  <div class="H_filterBool">
    <H_selectBox
      multi
      list-gap="10px"
      label-gap="5px"
      v-model="value1"
      :list="[
        { label: 'Is True', value: 'true' },
        { label: 'Is False', value: 'false' },
        { label: 'Is Empty', value: 'null' },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { iColumns } from "../../provide/Columns";
import { icolumnData } from "../../provide/datagridTypes";
import H_selectBox from "../../../../Components/select/H_selectBox.vue";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];

const value1 = ref();

const canSave = computed(() => {
  const list: string[] = value1.value?.split(",");
  if (list?.length === 3 && col.filter.value1 !== "") return true;
  if (list?.length === 3 && col.filter.value1 === "") return false;
  if (col.filter.value1 !== value1.value) return true;
  return false;
});

function save() {
  const list: string[] = value1.value?.split(",");
  col.filter.value1 = list.length === 3 ? "" : value1.value;
  col.filter.active = col.filter.value1 !== "";
}

function clear() {
  col.filter.value1 = "";
  col.filter.active = false;
}

function open() {
  value1.value =
    col.filter.value1 === "" ? "true,false,null" : col.filter.value1;
}

function close() {}

onMounted(() => {
  col.filter.condition1 = "bool_list";
});

defineExpose({ save, clear, open, close, canSave });
</script>
<style>
@layer hhl-components {
  .H_filterBool {
    display: grid;
    grid-template-rows: auto auto;
    height: 100%;
    gap: 12px;
    overflow: hidden;
    padding: 20px 20px 0 20px;
  }
}
</style>
