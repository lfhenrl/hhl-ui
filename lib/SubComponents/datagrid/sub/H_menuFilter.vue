<template>
  <H_dialog v-model="open" @close="filterClose">
    <template #header>
      <H_row padding="0" align="center">
        <div style="width: 25px"></div>
        <div style="flex: 1">{{ col.props.title }}</div>
        <div style="width: 25px"><H_icon btn @click="open = false" /></div>
      </H_row>
    </template>
    <component ref="filterCompRef" :is="filtComponent" :index="index" />
    <template #footer>
      <H_row justify="end" padding="0">
        <H_btn @click="filterSave" class="ml-3 bg-ok" :disabled="!filterCompRef?.canSave">OK</H_btn>
        <H_btn @click="filterClear" class="ml-3" :disabled="!col.filter.active">CLEAR</H_btn>
      </H_row>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import H_dialog from "../../../Components/popup/H_dialog.vue";
import H_btn from "../../../Components/H_btn.vue";
import H_icon from "../../../Components/H_icon.vue";
import H_row from "../../../Components/layout/H_row.vue";

import { computed, inject, ref } from "vue";
import { iColumns } from "../provide/Columns";
import { icolumnData } from "../provide/datagridTypes";
import H_filterString from "./filterTypes/H_filterString.vue";
import H_filterNumber from "./filterTypes/H_filterNumber.vue";
import H_filterDate from "./filterTypes/H_filterDate.vue";
import H_filterBool from "./filterTypes/H_filterBool.vue";
import H_filterSelect from "./filterTypes/H_filterSelect.vue";
import H_filterNone from "./filterTypes/H_filterNone.vue";

const P = defineProps({
  index: { type: Number, default: 0 }
});
// const E = defineEmits([]);

const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];
const filterCompRef = ref<any>();

defineExpose({ filterOpen });

const filtComponent = computed(() => {
  switch (col.filter.type) {
    case "string":
      return H_filterString;
    case "number":
      return H_filterNumber;
    case "date":
      return H_filterDate;
    case "datetime":
      return H_filterDate;
    case "bool":
      return H_filterBool;
    case "select":
      return H_filterSelect;
    default:
      return H_filterNone;
  }
});

const open = ref(false);

function filterOpen() {
  open.value = true;
  filterCompRef.value.open();
}

function filterClose() {
  filterCompRef.value.close();
}

function filterSave() {
  filterCompRef.value.save();
  Columns.updateFilterArray();
  open.value = false;
}

function filterClear() {
  filterCompRef.value.clear();
  Columns.updateFilterArray();
  open.value = false;
}
</script>

<style>
.H_filtercomponent {
  display: flex;
  flex-direction: column;
  font-weight: normal;
  gap: 10px;
}

.H_menu .H_dialog__body {
  flex: 1;
  overflow: auto;
}

.H_filtercomponent .h_selectBox {
  border: none;
}

.H_filtercomponent .h_selectBox .h_inputbase-slot {
  align-items: center;
  gap: 20px;
}
</style>
