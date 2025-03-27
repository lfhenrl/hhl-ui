<template>
  <div
    class="flex flex-col items-center justify-center overflow-visible cursor-pointer text-bg6 hover:bg-bg4 min-w-6"
    data-subtype="menu"
  >
    <div class="flex overflow-visible items-start flex-1 text-xs max-h-4" v-if="col.props.sorting !== 'none'">
      <div
        class="mx-[-5px] ico-arrow_upward"
        :class="{ 'text-pri': col.sortDirection.value === 'asc' }"
        v-if="col.sortDirection.value === 'asc' || col.sortDirection.value === 'none'"
      />
      <div
        class="mx-[-5px] ico-arrow_downward"
        :class="{ 'text-pri': col.sortDirection.value === 'desc' }"
        v-if="col.sortDirection.value === 'desc' || col.sortDirection.value === 'none'"
      />
      <div class="text-pri" v-if="col.sortDirection.value !== 'none'">
        {{ col.sortIndex.value + 1 }}
      </div>
    </div>
    <div class="ico-filter text-xs" v-if="col.filter.type !== 'none'" :class="{ 'text-pri': col.filter.active }" />
    <div class="ico-menuSmall" v-if="col.filter.type === 'none' && col.props.sorting === 'none'" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { type iColumn } from "../provide/Column";
import { type iDgrid } from "../provide/Dgrid";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;

const col: iColumn = DG.columns[P.index];
</script>
