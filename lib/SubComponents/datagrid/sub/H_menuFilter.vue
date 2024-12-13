<template>
  <H_popover :offset-left="-20" v-model="isOpen" movable class="H_menuFilter">
    <div class="grid text-txt1 font-normal bg-bg2 overflow-hidden ring-1 ring-bg6 ring-inset rounded">
      <div
        moveable-drag
        class="flex items-center text-base font-bold bg-pri text-priTxt [&[moveable-drag]]:cursor-move py-1"
      >
        <div class="flex-1" />
        <div>{{ col.props.title }}</div>
        <div class="flex-1" />
        <div class="ico-close iconBtn text-lg cursor-pointer outline-txt3 mr-1" @click="isOpen = false" />
      </div>
      <div class="H_menuFilter_comp overflow-hidden px-4">
        <component ref="filterCompRef" :is="filtComponent" :index="index" />
      </div>
      <div class="flex items-center justify-end gap-2 p-4">
        <H_btn @click="filterSave" class="bg-ok text-sm" :disabled="!filterCompRef?.canSave">OK</H_btn>
        <H_btn @click="filterClear" :disabled="!col.filter.active" class="text-sm">CLEAR</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import H_popover from "../../../Components/H_popover.vue";
import H_btn from "../../../Components/H_btn.vue";
import H_filterString from "./filterTypes/H_filterString.vue";
import H_filterNumber from "./filterTypes/H_filterNumber.vue";
import H_filterDate from "./filterTypes/H_filterDate.vue";
import H_filterBool from "./filterTypes/H_filterBool.vue";
import H_filterSelect from "./filterTypes/H_filterSelect.vue";
import H_filterNone from "./filterTypes/H_filterNone.vue";
import { iDgrid } from "../provide/Dgrid";
import { iColumn } from "../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

defineExpose({ filterOpen });

const DG = inject("DG") as iDgrid;

const col: iColumn = DG.columns[P.index];

const isOpen = ref(false);
const filterCompRef = ref<any>();

function filterOpen() {
  isOpen.value = true;
  filterCompRef.value.open();
}

function filterSave() {
  filterCompRef.value.save();
  DG.updateFilter();
  isOpen.value = false;
}

function filterClear() {
  filterCompRef.value.clear();
  DG.updateFilter();
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
