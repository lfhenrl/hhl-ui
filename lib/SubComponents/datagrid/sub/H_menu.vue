<template>
  <div class="H_menu">
    <H_pop :offset-top="8" :offset-left="2" close-popup-click position="fixed">
      <template v-slot:referance>
        <div class="H_HeadCell-Icon" data-subtype="menu">
          <H_icon icon="menuSmall" v-if="sort === '' && !col.filter.active" />
          <div class="H_HeadCell-sorting" v-if="sort !== ''">
            <H_icon icon="arrow_upward" size="16px" v-if="sort === 'asc'" />
            <H_icon icon="arrow_downward" size="16px" v-else />
            <div class="H_HeadCell-sortingText">
              {{ sortItemIndex + 1 }}
            </div>
          </div>
          <H_icon icon="filter" size="16px" v-if="col.filter.active" />
        </div>
      </template>
      <div class="H_menu-popup" @click="menuClick">
        <div
          class="H_menu-popup-item"
          data-action="asc"
          :data-selected="sort === 'asc'"
          v-if="col.props.sorting !== 'none'"
        >
          <H_icon
            class="H_menu-noPointerEvents"
            btn="standard"
            icon="arrow_upward"
            size="18px"
          />
          <div class="H_menu-noPointerEvents">Sort Ascending</div>
        </div>
        <div
          class="H_menu-popup-item"
          data-action="desc"
          :data-selected="sort === 'desc'"
          v-if="col.props.sorting !== 'none'"
        >
          <H_icon
            class="H_menu-noPointerEvents"
            btn="standard"
            icon="arrow_downward"
            size="18px"
          />
          <div class="H_menu-noPointerEvents">Sort Descending</div>
        </div>
        <div
          class="H_menu-popup-item"
          data-action="filter"
          v-if="col.filter.type !== 'none'"
        >
          <H_icon
            class="H_menu-noPointerEvents"
            btn="standard"
            icon="filter"
            size="18px"
          />
          <div class="H_menu-noPointerEvents">Filter</div>
        </div>

        <div class="H_menu-popup-item" data-action="autoSize">
          <H_icon
            class="H_menu-noPointerEvents"
            btn="standard"
            icon="expand_horizontal"
            size="18px"
          />
          <div class="H_menu-noPointerEvents">Auto size</div>
        </div>
      </div>
    </H_pop>
    <H_menuFilter :index="index" ref="menuFilterRef" data-subtype="menu" />
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../Components/H_icon.vue";
import H_pop from "../../../Components/popup/H_pop.vue";
import H_menuFilter from "./H_menuFilter.vue";
import { computed, inject, ref } from "vue";
import { iColumns } from "../provide/Columns";
import { icolumnData } from "../provide/datagridTypes";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const menuFilterRef = ref();
const Columns = inject("Columns") as iColumns;
const col: icolumnData = Columns.columns[P.index];
const sortArray = Columns.sortArray;

const sort = computed(() => {
  if (sortItemIndex.value > -1) {
    return sortArray.value[sortItemIndex.value].direction;
  }
  return "";
});

const sortItemIndex = computed(() => {
  return sortArray.value.findIndex((item) => item.field === col.props.field);
});

function updateSortArray(sort: string) {
  if (sort === "" && sortItemIndex.value > -1) {
    sortArray.value.splice(sortItemIndex.value, 1);
  } else {
    if (sortItemIndex.value > -1) {
      sortArray.value[sortItemIndex.value].direction = sort;
    } else {
      sortArray.value.push({ field: col.props.field, direction: sort });
    }
  }
  Columns.dataHandler?.setSorting(sortArray.value);
}

function menuClick(e: MouseEvent) {
  const ele = e.target as HTMLElement;
  if (!ele) return;
  if (!ele.dataset.action) return;
  const action = ele.dataset.action;

  if (action === "asc") {
    if (sort.value === "asc") {
      updateSortArray("");
    } else {
      updateSortArray("asc");
    }
    return;
  }

  if (action === "desc") {
    if (sort.value === "desc") {
      updateSortArray("");
    } else {
      updateSortArray("desc");
    }
  }

  if (action === "filter") {
    menuFilterRef.value.filterOpen();
  }

  if (action === "autoSize") {
    Columns.adjustColumns?.adjustColumn(col);
    setTimeout(() => {});
  }
}
</script>
<style>
@layer hhl-components {
  .H_menu {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: visible;
    color: var(--col-pri);
  }
  .H_menu:hover {
    background-color: var(--col-bg-5);
  }
  .H_HeadCell-Icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    overflow: visible;
  }
  .H_HeadCell-sorting {
    display: flex;
    overflow: visible;
    font-size: 12px;
  }
  .H_HeadCell-sorting {
    display: flex;
    overflow: visible;
    flex: 1 1 0%;
  }

  .H_menu-popup {
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
  .H_menu-noPointerEvents {
    pointer-events: none;
  }
}
</style>
