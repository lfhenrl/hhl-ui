<template>
  <div
    class="H_menu flex h-full items-center justify-center overflow-visible text-pri hover:bg-bg5"
  >
    <H_pop :offset-top="8" :offset-left="2" close-popup-click position="fixed">
      <template v-slot:referance>
        <div
          class="H_HeadCell-Icon flex min-w-[24px] flex-col items-center justify-center overflow-visible"
          data-subtype="menu"
        >
          <H_icon
            btn
            icon="menuSmall"
            v-if="sort === '' && !col.filter.active"
          />
          <div
            class="H_HeadCell-sorting flex overflow-visible text-xs"
            v-if="sort !== ''"
          >
            <H_icon
              btn
              :icon="sort === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              size="16px"
            />
            <div class="flex flex-1 overflow-visible">
              {{ sortItemIndex + 1 }}
            </div>
          </div>
          <H_icon btn icon="filter" size="16px" v-if="col.filter.active" />
        </div>
      </template>
      <div
        class="H_menu-popup flex flex-col border border-bg2 bg-bg0 pt-1 text-xs font-normal text-txt1"
        @click="menuClick"
      >
        <div
          class="H_menu-popup-item flex cursor-pointer items-center gap-2 border-b border-bg4 px-2 py-0.5 data-[selected=true]:col-pri hover:bg-bg3"
          data-action="asc"
          :data-selected="sort === 'asc'"
          v-if="col.props.sorting !== 'none'"
        >
          <H_icon
            class="pointer-events-none"
            btn
            icon="arrow_upward"
            size="18px"
          />
          <div class="pointer-events-none">Sort Ascending</div>
        </div>
        <div
          class="H_menu-popup-item flex cursor-pointer items-center gap-2 border-b border-bg3 px-2 py-0.5 data-[selected=true]:col-pri hover:bg-bg3"
          data-action="desc"
          :data-selected="sort === 'desc'"
          v-if="col.props.sorting !== 'none'"
        >
          <H_icon
            class="pointer-events-none"
            btn
            icon="arrow_downward"
            size="18px"
          />
          <div class="pointer-events-none">Sort Descending</div>
        </div>
        <div
          class="H_menu-popup-item flex cursor-pointer items-center gap-2 border-b border-bg3 px-2 py-0.5 hover:bg-bg3"
          data-action="filter"
          v-if="col.filter.type !== 'none'"
        >
          <H_icon class="pointer-events-none" btn icon="filter" size="18px" />
          <div class="pointer-events-none">Filter</div>
        </div>

        <div
          class="H_menu-popup-item flex cursor-pointer items-center gap-2 px-2 py-0.5 hover:bg-bg3"
          data-action="autoSize"
        >
          <H_icon
            class="pointer-events-none"
            btn
            icon="expand_horizontal"
            size="18px"
          />
          <div class="pointer-events-none">Auto size</div>
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
