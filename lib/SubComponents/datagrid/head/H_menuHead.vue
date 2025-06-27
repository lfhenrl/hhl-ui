<template>
  <div
    class="flex flex-col items-center justify-center overflow-visible cursor-pointer text-bg6 hover:bg-bg4 min-w-6"
    data-subtype="menu"
  >
    <div class="flex overflow-visible items-start flex-1 text-xs max-h-4" v-if="col.props.sorting !== 'none'">
      <H_icon
        name="arrow_upward"
        class="mx-[-5px]"
        size="1.2rem"
        :color="col.sortDirection.value === 'asc' ? 'pri' : 'txt6'"
        v-if="col.sortDirection.value === 'asc' || col.sortDirection.value === 'none'"
      />
      <H_icon
        name="arrow_downward"
        class="mx-[-5px]"
        size="1.2rem"
        :color="col.sortDirection.value === 'desc' ? 'pri' : 'txt6'"
        v-if="col.sortDirection.value === 'desc' || col.sortDirection.value === 'none'"
      />
      <div class="text-pri" v-if="col.sortDirection.value !== 'none'">
        {{ col.sortIndex.value + 1 }}
      </div>
    </div>
    <H_icon name="filter" size="1.1rem" :color="col.filter.active ? 'pri' : 'txt6'" v-if="col.filter.type !== 'none'" />
    <H_icon name="menu_small" size="1.1rem" btn v-if="col.filter.type === 'none' && col.props.sorting === 'none'" />
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

const DG = inject("DG") as iDgrid;

const col: iColumn = DG.columns[P.index];
</script>
