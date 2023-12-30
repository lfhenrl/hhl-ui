<template>
  <H_pop :offset-top="0" :offset-left="-20" v-model="isOpen" movable>
    <div class="H_menuFilter">
      <div moveable-drag class="H_menuFilter-header">
        <div>{{ col.props.title }}</div>
        <H_icon btn="standard" @click="isOpen = false" />
      </div>

      <component ref="filterCompRef" :is="filtComponent" :index="index" />

      <div class="H_menuFilter-footer">
        <H_btn
          @click="filterSave"
          class="bg-ok"
          :disabled="!filterCompRef?.canSave"
          >OK</H_btn
        >
        <H_btn @click="filterClear" :disabled="!col.filter.active">CLEAR</H_btn>
      </div>
    </div>
  </H_pop>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import H_pop from "../../../Components/popup/H_pop.vue";
import H_icon from "../../../Components/H_icon.vue";
import H_btn from "../../../Components/H_btn.vue";
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
@layer hhl-components {
  .H_menuFilter {
    max-height: 80vh;
    overflow: hidden;
    color: var(--col-txt-1);
    background-color: var(--col-bg-0);
    font-weight: 400;
  }

  .H_menuFilter-header {
    display: flex;
    background-color: var(--col-pri);
    color: var(--col-on-pri);
    font-weight: bold;
    padding: 4px;
  }
  .H_menuFilter-header div {
    flex: 1 1 100%;
    text-align: center;
    font-size: 16px;
  }
  .H_menuFilter-header .H_icon {
    cursor: pointer;
  }
  .H_menuFilter-footer {
    display: flex;
    justify-content: flex-end;
    padding: 12px 20px;
    gap: 12px;
  }
}
</style>
