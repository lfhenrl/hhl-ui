<template>
  <H_pop :offset-top="20" :offset-left="-20" v-model="isOpen" movable>
    <div class="shadow-4 rounded bg-bg0 text-txt1">
      <div
        moveable-drag
        class="col-pri flex items-center overflow-hidden rounded-t"
      >
        <div class="flex-1 p-2 text-center font-medium">
          {{ col.props.title }}
        </div>
        <div style="width: 25px">
          <H_icon btn @click="isOpen = false" />
        </div>
      </div>

      <component ref="filterCompRef" :is="filtComponent" :index="index" />

      <div class="flex justify-end px-5 py-3">
        <H_btn
          @click="filterSave"
          class="ml-3 bg-ok"
          :disabled="!filterCompRef?.canSave"
          >OK</H_btn
        >
        <H_btn @click="filterClear" class="ml-3" :disabled="!col.filter.active"
          >CLEAR</H_btn
        >
      </div>
    </div>
  </H_pop>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import H_pop from "../../../Components/popup/H_pop.vue";
import H_filterString from "./filterTypes/H_filterString.vue";
import H_filterNumber from "./filterTypes/H_filterNumber.vue";
import H_filterDate from "./filterTypes/H_filterDate.vue";
import H_filterBool from "./filterTypes/H_filterBool.vue";
import H_filterSelect from "./filterTypes/H_filterSelect.vue";
import H_filterNone from "./filterTypes/H_filterNone.vue";
import { iColumns } from "../provide/Columns";
import { icolumnData } from "../provide/datagridTypes";

const P = defineProps({
  index: { type: Number, default: 0 },
});

defineExpose({ filterOpen });

const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];

const isOpen = ref(false);
const filterCompRef = ref<any>();

function filterOpen() {
  isOpen.value = true;
  filterCompRef.value.open();
}

function filterSave() {
  filterCompRef.value.save();
  Columns.updateFilterArray();
  isOpen.value = false;
}

function filterClear() {
  filterCompRef.value.clear();
  Columns.updateFilterArray();
  isOpen.value = false;
}

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
</script>

<style>
.H_menuFilter {
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 4px;
  resize: vertical;
  overflow: hidden;
  max-height: 90vh;
}

.H_menuFilter-head {
  cursor: move;
  border-radius: 4px 4px 0 0;
}

.H_menuFilter-head-title {
  flex: 1;
  padding: 9px;
  text-align: center;
}

.H_filtercomponent {
  display: flex;
  flex-direction: column;
  font-weight: normal;
  gap: 10px;
  padding: 20px 20px 0 20px;
}

.H_filtercomponent .h_selectBox {
  border: none;
}

.H_filtercomponent .h_selectBox .h_inputbase-slot {
  align-items: center;
  gap: 20px;
}
</style>
