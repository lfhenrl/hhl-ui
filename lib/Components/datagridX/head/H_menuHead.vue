<template>
  <div class="H_menuHead" data-subtype="menu">
    <H_icon
      icon="menuSmall"
      v-if="col.sortDirection.value === 'none' && !col.filter.active"
    />
    <div class="H_menuHead-active" v-else>
      <div class="H_HeadCell-sorting" v-if="col.sortDirection.value !== 'none'">
        <H_icon
          icon="arrow_upward"
          size="18px"
          v-if="col.sortDirection.value === 'asc'"
        />
        <H_icon icon="arrow_downward" size="18px" v-else />
        <div class="H_HeadCell-sortingText">{{ col.sortIndex.value + 1 }}</div>
      </div>
      <H_icon icon="filter" size="16px" v-if="col.filter.active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import H_icon from "../../H_icon.vue";
import { iColumn } from "../provide/Column";
import { iDgrid } from "../provide/Dgrid";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;

const col: iColumn = DG.columns[P.index];
</script>

<style>
@layer hhl-components {
  .H_menuHead {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: visible;
    cursor: pointer;
    color: var(--col-txt-5);
    /*   border: 1px solid red; */
    padding-right: 4px;
  }
  .H_menuHead:hover {
    background-color: var(--col-bg-5);
  }
  .H_menuHead-active {
    display: flex;
    color: var(--col-txt-2);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    overflow: visible;
  }
  .H_HeadCell-sorting {
    display: flex;
    overflow: visible;
    align-items: center;
    flex: 1 1 0%;
    font-size: 12px;
  }
}
</style>
