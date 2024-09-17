<template>
  <div class="H_menuHead" data-subtype="menu">
    <div class="H_HeadCell-sorting" v-if="col.props.sorting !== 'none'">
      <H_icon
        icon="arrow_upward"
        size="18px"
        class="H_HeadCell-sorting_icon"
        :class="{ H_HeadCellActive: col.sortDirection.value === 'asc' }"
        v-if="col.sortDirection.value === 'asc' || col.sortDirection.value === 'none'"
      />
      <H_icon
        icon="arrow_downward"
        size="18px"
        class="H_HeadCell-sorting_icon"
        :class="{ H_HeadCellActive: col.sortDirection.value === 'desc' }"
        v-if="col.sortDirection.value === 'desc' || col.sortDirection.value === 'none'"
      />
      <div class="H_HeadCell-sortingText" v-if="col.sortDirection.value !== 'none'">
        {{ col.sortIndex.value + 1 }}
      </div>
    </div>
    <H_icon
      icon="filter"
      size="14px"
      v-if="col.filter.type !== 'none'"
      :class="{ H_HeadCellActive: col.filter.active }"
    />
    <H_icon icon="menuSmall" size="18px" v-if="col.filter.type === 'none' && col.props.sorting === 'none'" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import H_icon from "../../../Components/H_icon.vue";
import { iColumn } from "../provide/Column";
import { iDgrid } from "../provide/Dgrid";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;

const col: iColumn = DG.columns[P.index];
</script>

<style>
.H_menuHead {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
  cursor: pointer;
  color: var(--col-bg-6);
  min-width: 24px;
  overflow: visible;
}
.H_menuHead:hover {
  background-color: var(--col-bg-5);
}

.H_HeadCellActive {
  color: var(--col-pri);
}

.H_HeadCell-sorting {
  display: flex;
  overflow: visible;
  align-items: start;
  flex: 1 1 0%;
  font-size: 12px;
  max-height: 16px;
}
.H_HeadCell-sorting_icon {
  margin-left: -5px;
  margin-right: -5px;
}
.H_HeadCell-sortingText {
  color: var(--col-pri);
}
</style>
