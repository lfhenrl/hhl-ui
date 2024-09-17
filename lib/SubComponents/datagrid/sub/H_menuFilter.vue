<template>
  <H_popover :offset-left="-20" v-model="isOpen" movable class="H_menuFilter">
    <div class="H_menuFilter_innerbox">
      <div moveable-drag class="H_menuFilter-header">
        <div>{{ col.props.title }}</div>
        <H_icon btn="standard" @click="isOpen = false" />
      </div>
      <div class="H_menuFilter_comp">
        <component ref="filterCompRef" :is="filtComponent" :index="index" />
      </div>
      <div class="H_menuFilter-footer">
        <H_btn @click="filterSave" class="bg-ok" :disabled="!filterCompRef?.canSave">OK</H_btn>
        <H_btn @click="filterClear" :disabled="!col.filter.active">CLEAR</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import H_popover from "../../../Components/H_popover.vue";
import H_icon from "../../../Components/H_icon.vue";
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
<style>
.H_menuFilter_innerbox {
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: var(--col-txt-1);
  background-color: var(--col-bg-0);
  font-weight: 400;
  overflow: hidden;
  background-color: transparent;
  max-height: 50%;
}

.H_menuFilter .H_inputbase.H_input,
.H_menuFilter .H_inputbase.H_datetime,
.H_menuFilter .H_inputbase.H_select_input {
  max-height: 3rem;
}

.H_menuFilter .H_popover-popup {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.H_menuFilter_comp {
  overflow: hidden;
}

.H_menuFilter-header {
  display: flex;
  align-items: center;
  background-color: var(--col-pri);
  color: var(--col-on-pri);
  font-weight: bold;
  padding: 4px;
}
.H_menuFilter-header div {
  flex: 1 1 100%;
  text-align: center;
  font-size: 1.2em;
}
.H_menuFilter-header .H_icon {
  cursor: pointer;
  flex: 0;
}
.H_menuFilter-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
}
</style>
