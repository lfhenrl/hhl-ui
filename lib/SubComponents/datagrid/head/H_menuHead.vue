<template>
  <div class="H_menuHead" data-subtype="menu">
    <div class="H_menuHead__sorting" v-if="col.props.sorting !== 'none'">
      <H_icon
        name="arrow_upward"
        :h-color="col.sortDirection.value === 'asc' ? 'var(--color-pri)' : 'var(--color-txt6)'"
        v-if="col.sortDirection.value === 'asc' || col.sortDirection.value === 'none'"
      />
      <H_icon
        name="arrow_downward"
        :h-color="col.sortDirection.value === 'desc' ? 'var(--color-pri)' : 'var(--color-txt6)'"
        v-if="col.sortDirection.value === 'desc' || col.sortDirection.value === 'none'"
      />
      <div class="H_menuHead__sorting_order" h-color="var(--color-pri)" v-if="col.sortDirection.value !== 'none'">
        {{ col.sortIndex.value + 1 }}
      </div>
    </div>
    <H_icon
      name="filter"
      h-font-size="1.1em"
      :h-color="col.filter.active ? 'var(--color-pri)' : 'var(--color-txt6)'"
      v-if="col.filter.type !== 'none'"
    />
    <H_icon
      name="menu_small"
      h-font-size="1.1em"
      btn
      v-if="col.filter.type === 'none' && col.props.sorting === 'none'"
    />
  </div>
</template>
<style>
@layer components {
  .H_menuHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: visible;
    min-width: 1.5em;
    gap: 5px;
  }
  .H_menuHead:hover {
    background-color: var(--color-bg4);
  }
  .H_menuHead__sorting {
    display: flex;
    flex: 1;
    overflow: visible;
    font-size: 0.75em;
    max-height: 1em;
    .H_icon {
      margin: 0 -5px;
      font-size: 1.8em;
    }
  }
}
</style>

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
