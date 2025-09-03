<template>
  <div class="data-grid" ref="dataGrid">
    <div style="display: inline-block">
      <div class="data-grid-head">
        <head-cell v-for="col in Columns" :col="col" :key="col.Id" />
      </div>

      <row-group :level="0" :row="item" :parent-row="undefined" v-for="item in rows" :key="item.Id" />

      <div class="gantt-space" />
    </div>
    <H_popover placement="left" :inner="true" container="box" query-selector=".data-grid" v-model="moveDialogIsOpen">
      <div class="data-grid-moveDialog">
        <H_btn size="sm" @click="insertOver">Over</H_btn>
        <H_btn size="sm" @click="insertAsChild">As a child</H_btn>
        <H_btn size="sm" @click="insertUnder">Under</H_btn>
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { type PropType, inject, ref, watch } from "vue";
import { type iRow } from "../data/rowModel";
import { Columns } from "../data/Columns";
import headCell from "./headCell.vue";
import rowGroup from "./rowGroup.vue";
import H_popover from "../../H_popover.vue";
import H_btn from "../../H_btn.vue";
import { type iMoveRow } from "../data/moveRowModel";
import { type iGantt } from "../provide/gantt";
const dataGrid = ref<HTMLElement>();

const P = defineProps({
  data: { type: Array as PropType<iRow[]> },
  scrollTop: { type: Number, default: 0 },
});

const rows: any = ref([]);
const moveDialogIsOpen: any = ref(false);
let sorceArray: any = [];
let destArray: any = [];
let sorce: iMoveRow;
let dest: iMoveRow;

const GT = inject("GT") as iGantt;

watch(
  () => P.data,
  () => {
    rows.value = P.data;
    GT.Data.value = rows.value;
  },
  { immediate: true }
);
watch(
  () => rows,
  () => {
    GT.Data.value = rows.value;
  },
  { immediate: true }
);

watch(
  () => P.scrollTop,
  () => {
    if (!dataGrid.value) return;
    dataGrid.value.scrollTop = P.scrollTop;
  }
);

function moveDialogOpen(_source: iMoveRow, _dest: iMoveRow) {
  sorceArray = _source.parentRow === null ? rows.value : _source.parentRow.Children;
  destArray = _dest.parentRow === null ? rows.value : _dest.parentRow.Children;
  sorce = _source;
  dest = _dest;

  setTimeout(() => {
    moveDialogIsOpen.value = true;
  });
}

function move(under: number) {
  sorce.rowComp.classList.add("start-remove");
  setTimeout(() => {
    sorceArray.splice(sorceArray.indexOf(sorce.row), 1);
    destArray.splice(destArray.indexOf(dest.row) + under, 0, sorce.row);
    rows.value = [...rows.value];
    setTimeout(() => {
      sorce.rowComp.classList.remove("start-remove");
    }, 5);
  }, 300);
}

function insertOver() {
  move(0);
}

function insertUnder() {
  move(1);
}

function insertAsChild() {
  if (!sorce.row) return;
  setTimeout(() => {
    sorceArray.splice(sorceArray.indexOf(sorce.row), 1);
    if (!sorce.row) return;
    dest.row!.Expanded = true;
    dest.row?.Children.push(sorce.row);

    rows.value = [...rows.value];
    setTimeout(() => {
      sorce.rowComp.classList.remove("start-remove");
    }, 5);
  }, 300);
}

defineExpose({
  moveDialogOpen,
});
</script>

<style>
@layer components {
  .data-grid {
    display: inline-block;
    border-left: 1px solid var(--color-bg3);
    font-size: 14px;
    overflow-x: scroll;
    overflow-y: scroll;
    font-size: 12px;
    line-height: 1;
  }
  .data-grid-head {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    max-height: 38px;
    min-height: 38px;
    background-color: var(--bgcol-1);
    border-bottom: 1px solid var(--color-bg3);
  }

  .drag-head {
    width: 30px;
    text-align: center;
    border-right: 1px solid var(--color-bg4);
    min-height: var(--gantt-row-height);
    max-height: var(--gantt-row-height);
  }

  .data-grid-row {
    width: 100%;
    display: flex;
    align-items: center;
    max-height: 30px;
    min-height: 30px;
    border-bottom: 1px solid var(--color-bg3);
  }

  .data-grid-moveDialog {
    display: flex;
    flex-direction: column;
    gap: 7px;
    background-color: var(--color-bg3);
    padding: 12px;
  }
}
</style>
../data/rowModel ../data/moveRowModel
