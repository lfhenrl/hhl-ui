<template>
  <div class="H_menuBody" @click="menuClick">
    <div
      class="H_menu-popup-item"
      data-action="asc"
      data-subtype="menuSortAsc"
      :data-selected="col.sortDirection.value === 'asc'"
      v-if="col.props.sorting !== 'none'"
    >
      <div class="ico-arrow_upward iconBtn pointer-events-none" />
      <div class="H_menu-noPointerEvents">Sort Ascending</div>
    </div>
    <div
      class="H_menu-popup-item"
      data-action="desc"
      data-subtype="menuSortDesc"
      :data-selected="col.sortDirection.value === 'desc'"
      v-if="col.props.sorting !== 'none'"
    >
      <div class="ico-arrow_downward iconBtn pointer-events-none" />
      <div class="H_menu-noPointerEvents">Sort Descending</div>
    </div>
    <div class="H_menu-popup-item" data-action="filter" v-if="col.filter.type !== 'none'" data-subtype="menuFilter">
      <div class="ico-filter iconBtn pointer-events-none" />
      <div class="H_menu-noPointerEvents">Filter</div>
    </div>

    <div class="H_menu-popup-item" data-action="autoSize" data-subtype="menuAutoSize">
      <div class="ico-expand_horizontal iconBtn pointer-events-none" />
      <div class="H_menu-noPointerEvents">Auto size</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { iColumn } from "../provide/Column";
import { iDgrid } from "../provide/Dgrid";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const E = defineEmits(["filteropen"]);

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

function menuClick(e: MouseEvent) {
  const ele = e.target as HTMLElement;
  if (!ele) return;
  if (!ele.dataset.action) return;
  const action = ele.dataset.action;

  if (action === "asc") {
    if (col.sortDirection.value === "asc") {
      col.sortDirection.value = "none";
    } else {
      col.sortDirection.value = "asc";
    }
    return;
  }

  if (action === "desc") {
    if (col.sortDirection.value === "desc") {
      col.sortDirection.value = "none";
    } else {
      col.sortDirection.value = "desc";
    }
    return;
  }

  if (action === "filter") {
    E("filteropen");
  }

  if (action === "autoSize") {
    col.autoWidth = true;
    col.Dgrid.ColumnWidthAdjustment.findMaxSingelColumn(col);
  }
}
</script>

<style>
@layer hhl-components {
  .H_menuBody {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--col-bg-2);
    background-color: var(--col-bg-0);
    padding-top: 4px;
    color: var(--col-txt-1);
    font-size: 12px;
    font-weight: 400;
  }
  .H_menu-popup-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    border-bottom: 1px solid var(--col-bg-4);
    padding: 2px 8px;
  }
  .H_menu-popup-item[data-selected="true"] {
    background-color: var(--col-pri);
    color: var(--col-on-pri);
  }
  .H_menu-popup-item:hover {
    background-color: var(--col-bg-3);
  }
}
</style>
