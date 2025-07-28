<template>
  <H_popover offset-left="-20px" v-model="isOpen" movable class="H_menuFilter">
    <div class="H_menuFilter__content">
      <div moveable-drag class="H_menuFilter__header">
        <div></div>
        <div>{{ col.props.title }}</div>

        <H_icon name="close" btn color="white" @click="isOpen = false" />
      </div>
      <div class="H_menuFilter_comp">
        <component ref="filterCompRef" :is="filtComponent" :index="index" />
      </div>
      <div class="H_menuFilter__action">
        <H_btn @click="filterSave" size="sm" color="pri" :disabled="!filterCompRef?.canSave">OK</H_btn>
        <H_btn @click="filterClear" :disabled="!col.filter.active" size="sm" color="sec">CLEAR</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import H_popover from "../../../Components/H_popover.vue";
import H_btn from "../../../Components/H_btn.vue";
import H_icon from "../../../Components/H_icon.vue";
import H_filterString from "./filterTypes/H_filterString.vue";
import H_filterNumber from "./filterTypes/H_filterNumber.vue";
import H_filterDate from "./filterTypes/H_filterDate.vue";
import H_filterBool from "./filterTypes/H_filterBool.vue";
import H_filterSelect from "./filterTypes/H_filterSelect.vue";
import H_filterNone from "./filterTypes/H_filterNone.vue";
import { type iDgrid } from "../provide/Dgrid";
import { type iColumn } from "../provide/Column";

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
@layer components {
  .H_menuFilter__content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-bg6);
    color: var(--color-txt1);
    border-radius: 4px;
    font-weight: normal;
    min-width: 18em;

    .H_menuFilter__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-block: 0.25em;
      font-size: 1.125em;
      font-weight: bold;
      background-color: var(--color-pri);
      color: var(--color-priTxt);
      .H_icon {
        cursor: pointer;
        margin: 2px 4px;
      }
    }

    .H_menuFilter_comp {
      overflow: hidden;
      padding-inline: 1em;
    }

    .H_menuFilter__action {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5em;
      padding: 1em;
    }
  }
}
</style>
