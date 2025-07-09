<template>
  <div class="flex flex-col gap-4 py-4">
    <H_selectbox
      multi
      list-gap="6px"
      v-model="value1"
      class="w-full"
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
import H_selectbox from "../../../../Components/H_selectbox.vue";
import { type iDgrid } from "../../provide/Dgrid";
import { type iColumn } from "../../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

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
  value1.value = col.filter.value1 === "" ? "true,false,null" : col.filter.value1;
}

function close() {}

onMounted(() => {
  col.filter.condition1 = "bool_list";
});

defineExpose({ save, clear, open, close, canSave });
</script>
