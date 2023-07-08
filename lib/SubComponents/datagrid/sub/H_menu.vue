<template>
  <div class="H_menu">
    <H_pop class="H_menu" :offset-top="2" :offset-left="2" close-popup-click position="fixed">
      <template v-slot:referance>
        <div class="H_HeadCell-Icon" data-subtype="menu">
          <H_icon btn icon="menuSmall" v-if="sort === '' && !col.filter.active" />
          <div class="H_HeadCell-sorting" v-if="sort !== ''">
            <H_icon btn :icon="sort === 'asc' ? 'arrow_upward' : 'arrow_downward'" size="16px" />
            <div>{{ sortItemIndex + 1 }}</div>
          </div>
          <H_icon btn icon="filter" size="16px" v-if="col.filter.active" />
        </div>
      </template>
      <div class="H_menu-popup shadow-2" @click="menuClick">
        <div class="H_menu-popup-item" data-action="asc" :selected="sort === 'asc'">
          <H_icon class="H_menu-popup-item-noMouseEvent" btn icon="arrow_upward" size="18px" />
          <div class="H_menu-popup-item-noMouseEvent">Sort Ascending</div>
        </div>
        <div class="H_menu-popup-item" data-action="desc" :selected="sort === 'desc'">
          <H_icon class="H_menu-popup-item-noMouseEvent" btn icon="arrow_downward" size="18px" />
          <div class="H_menu-popup-item-noMouseEvent">Sort Descending</div>
        </div>
        <div class="H_menu-popup-item" data-action="filter">
          <H_icon class="H_menu-popup-item-noMouseEvent" btn icon="filter" size="18px" />
          <div class="H_menu-popup-item-noMouseEvent">Filter</div>
        </div>
        <div class="H_menu-popup-item" data-action="autoSize" v-if="col.cssRule.style.minWidth !== ''">
          <H_icon class="H_menu-popup-item-noMouseEvent" btn icon="expand_horizontal" size="18px" />
          <div class="H_menu-popup-item-noMouseEvent">Auto size</div>
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
  index: { type: Number, default: 0 }
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
    col.cssRule.style.minWidth = "";
    col.cssRule.style.maxWidth = "";
  }
}
</script>

<style>
.H_menu {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: var(--col-pri);
  overflow: hidden;
}

.H_menu:hover {
  background-color: var(--col-bg-5);
}

.H_HeadCell-Icon {
  display: flex;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  padding: 0;
}

.H_HeadCell-sorting {
  display: flex;
  font-size: 10px;
}

.H_HeadCell-sorting div {
  display: flex;
  flex: 1;
  align-items: center;
  line-height: 16px;
}

.H_menu-popup {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: normal;
  padding-top: 4px;
}

.H_menu-popup-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--col-bg-3);
  padding: 4px 7px;
  cursor: pointer;
}

.H_menu-popup-item .H_menu-popup-item-noMouseEvent {
  pointer-events: none;
}

.H_menu-popup-item:hover {
  background-color: var(--col-bg-3);
}

.H_menu-popup-item[selected="true"] {
  background-color: var(--col-pri);
  color: var(--col-on-pri);
}
</style>
