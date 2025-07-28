<template>
  <div class="H_menuBody" @click="menuClick">
    <div
      class="H_menuBody__item"
      :selected="col.sortDirection.value === 'asc' ? '' : undefined"
      data-action="asc"
      data-subtype="menuSortAsc"
      v-if="col.props.sorting !== 'none'"
    >
      <H_icon name="arrow_upward" size="1.6em" :color="col.sortDirection.value === 'asc' ? 'white' : 'txt2'" />
      <div class="H_menuBody__item_title">Sort Ascending</div>
    </div>

    <div
      class="H_menuBody__item"
      :selected="col.sortDirection.value === 'desc' ? '' : undefined"
      data-action="desc"
      data-subtype="menuSortDesc"
      v-if="col.props.sorting !== 'none'"
    >
      <H_icon name="arrow_downward" size="1.6em" :color="col.sortDirection.value === 'asc' ? 'white' : 'txt2'" />
      <div class="H_menuBody__item_title">Sort Descending</div>
    </div>

    <div
      class="H_menuBody__item"
      :selected="col.filter.active ? '' : undefined"
      data-action="filter"
      v-if="col.filter.type !== 'none'"
      data-subtype="menuFilter"
    >
      <H_icon name="filter" size="1.4em" :color="col.filter.active ? 'white' : 'txt2'" />
      <div class="H_menuBody__item_title">Filter</div>
    </div>

    <div class="H_menuBody__item" data-action="autoSize" data-subtype="menuAutoSize">
      <H_icon name="expand_horizontal" size="1.6em" />
      <div class="H_menuBody__item_title">Auto size</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../Components/H_icon.vue";
import { inject } from "vue";
import { type iColumn } from "../provide/Column";
import { type iDgrid } from "../provide/Dgrid";

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
