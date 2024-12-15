<template>
  <div
    class="flex flex-col ring-1 ring-bg6 ring-inset rounded bg-bg0 pt-1text-txt1 text-sm font-light"
    @click="menuClick"
  >
    <div
      class="flex items-center pl-1 pr-3 py-1.5 cursor-pointer gap-2 border-b border-b-bg4 hover:bg-bg3"
      :class="{ 'bg-pri text-priTxt': col.sortDirection.value === 'asc' }"
      data-action="asc"
      data-subtype="menuSortAsc"
      v-if="col.props.sorting !== 'none'"
    >
      <div class="ico-arrow_upward iconBtn pointer-events-none" />
      <div class="pointer-events-none">Sort Ascending</div>
    </div>
    <div
      class="flex items-center pl-1 pr-3 py-1.5 cursor-pointer gap-2 border-b border-b-bg4 hover:bg-bg3"
      :class="{ 'bg-pri text-priTxt': col.sortDirection.value === 'desc' }"
      data-action="desc"
      data-subtype="menuSortDesc"
      v-if="col.props.sorting !== 'none'"
    >
      <div class="ico-arrow_downward iconBtn pointer-events-none" />
      <div class="pointer-events-none">Sort Descending</div>
    </div>
    <div
      class="flex items-center pl-1 pr-3 py-1.5 cursor-pointer gap-2 border-b border-b-bg4 hover:bg-bg3"
      :class="{ 'bg-pri text-priTxt': col.filter.active }"
      data-action="filter"
      v-if="col.filter.type !== 'none'"
      data-subtype="menuFilter"
    >
      <div class="ico-filter iconBtn pointer-events-none" />
      <div class="pointer-events-none">Filter</div>
    </div>

    <div
      class="flex items-center pl-1 pr-3 py-1.5 cursor-pointer gap-2 hover:bg-bg3"
      data-action="autoSize"
      data-subtype="menuAutoSize"
    >
      <div class="ico-expand_horizontal iconBtn pointer-events-none" />
      <div class="pointer-events-none">Auto size</div>
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

const E = defineEmits(["filteropen", "popupClose"]);

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

function menuClick(e: MouseEvent) {
  const ele = e.target as HTMLElement;
  if (!ele) return;
  if (!ele.dataset.action) return;
  const action = ele.dataset.action;

  if (action === "asc") {
    E("popupClose");
    if (col.sortDirection.value === "asc") {
      col.sortDirection.value = "none";
    } else {
      col.sortDirection.value = "asc";
    }
    return;
  }

  if (action === "desc") {
    E("popupClose");
    if (col.sortDirection.value === "desc") {
      col.sortDirection.value = "none";
    } else {
      col.sortDirection.value = "desc";
    }
    return;
  }

  if (action === "filter") {
    E("popupClose");
    E("filteropen");
  }

  if (action === "autoSize") {
    E("popupClose");
    col.autoWidth = true;
    col.Dgrid.ColumnWidthAdjustment.findMaxSingelColumn(col);
  }
}
</script>
