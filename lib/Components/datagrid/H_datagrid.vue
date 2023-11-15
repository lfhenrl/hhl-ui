<template>
  <div
    class="H_datagrid grid-row-[1fr_auto] grid max-h-full overflow-hidden rounded border border-bg5 text-sm"
    ref="H_datagridRef"
  >
    <H_virtualList
      ref="H_datagridVirtualRef"
      :key="columns.changeCounter.value"
      :data-key="dataKey"
      v-if="virtualscroll"
      :data-sources="dataHandler.rows.value"
      item-class="H_dataRow"
      class="H_datagrid-table grid-row-[auto_1fr] relative h-full max-h-full min-h-[59px] w-full overflow-x-auto overflow-y-scroll"
      :estimate-size="virtualscroll_rowheight"
      :keeps="virtualscroll_keeps"
      :class="guid"
      :selectedId="selectedId"
      :item_style="row_style"
      @click="datagridClick"
    >
      <template v-slot:header>
        <div class="H_datagrid-head sticky top-0 z-[1] flex flex-col">
          <H_headerRow role="headitem" />
          <H_progressBar :show="columns.dataHandler?.rowsLoading.value" />
        </div>
      </template>
      <template v-slot="data">
        <H_dataRow :row="data.item" />
      </template>
    </H_virtualList>

    <div
      v-else
      ref="H_datagridVirtualRef"
      :key="columns.changeCounter.value + 1"
      class="H_datagrid-table"
      :class="guid"
      @click="datagridClick"
    >
      <div class="H_datagrid-head">
        <H_headerRow role="headitem" />
        <H_progressBar :show="columns.dataHandler?.rowsLoading.value" />
      </div>
      <div
        class="H_dataRow"
        :style="rowStyle(row)"
        v-for="row in dataHandler.rows.value"
        :data-id="row[dataKey]"
        :key="row[dataKey]"
        role="listitem"
        :selected="selectedId == row[dataKey] ? true : null"
      >
        <H_dataRow :row="row" />
      </div>
    </div>
    <div
      class="H_datagrid-footer flex h-10 flex-wrap items-center gap-2 border-t border-bg6 bg-bg2 pr-3 text-sm text-pri"
    >
      <H_btn round type="icon-text" icon="refresh" title="Reload data" />
      <H_btn
        round
        type="icon-text"
        icon="columns"
        title="Edit Columns"
        @click="editColumns"
      />
      <H_btn
        round
        type="icon-text"
        icon="expand_horizontal"
        title="Auto adjust all columns"
        @click="autoAdjustColumns"
      />
      <H_btn
        round
        type="icon-text"
        icon="excel"
        title="Download to excel"
        @click="excel"
      />
      <H_btn
        round
        type="icon-text"
        icon="zoom_out_map"
        title="fullScreen"
        @click="fullScreen"
      />
      <div class="flex-1" />
      <div class="H_datagrid__rowcount">
        {{ columns.dataHandler?.rowsCount }} Loaded of
        {{ columns.dataHandler?.rowsCountTotal }} Rows.
      </div>
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<script setup lang="ts">
import { PropType, provide, ref, useSlots, watch } from "vue";
// import H_headerRow from "./headerRow/H_headerRow.vue";
import H_headerRow from "../../SubComponents/datagrid/headerRow/H_headerRow.vue";
import H_dataRow from "../../SubComponents/datagrid/dataRow/H_dataRow.vue";
import H_menuColumns from "../../SubComponents/datagrid/sub/columns/H_menuColumns.vue";
import H_btn from "../../Components/H_btn.vue";
import H_progressBar from "../H_progressBar.vue";
import { Columns } from "../../SubComponents/datagrid/provide/Columns";
import H_virtualList from "../../Components/H_virtualList.vue";
import { datagridClickHandler } from "../../SubComponents/datagrid/provide/datagridClickHandler";
import { ColumnsResizing } from "../../SubComponents/datagrid/provide/columnsSizing";
import { iClickData } from "../../SubComponents/datagrid/provide/datagridTypes";

const P = defineProps({
  dataKey: {
    type: [String, Number],
    required: true,
  },
  row_style: { type: Function, default: null },
  dataHandler: {
    type: Object as PropType<any>,
    required: true,
  },
  virtualscroll: { type: Boolean, default: false },
  virtualscroll_keeps: { type: Number, default: 50 },
  virtualscroll_rowheight: { type: Number, default: 50 },
  filterList: { type: Array as PropType<string[]>, default: [] },
  filterstring: { type: String, default: "" },
});

const E = defineEmits<{
  rowClick: [data: iClickData];
  headClick: [data: iClickData];
}>();

const guid = `g${new Date().getTime().toString()}`;
const slots = useSlots();
const selectedId = ref("");
const H_datagridRef = ref();
const H_datagridVirtualRef = ref();
let scrollPos = 0;
const menuColumnsRef = ref();
const columns = new Columns();
const ClickHandler = new datagridClickHandler(
  P.dataHandler.rows,
  P.dataKey,
  columns,
);
const adjustColumns = new ColumnsResizing(columns);

provide("Columns", columns);

columns.dataHandler = P.dataHandler;
columns.adjustColumns = adjustColumns;
columns.rowStyle = P.row_style;

if (columns.dataHandler !== undefined) {
  columns.dataHandler.newDataEvent = () => {
    ClickHandler.newData(columns.dataHandler?.rows.value);
    if (scrollPos > 0) {
      if (P.virtualscroll) {
        H_datagridVirtualRef.value.scrollToOffset(scrollPos);
      } else {
        H_datagridVirtualRef.value.scrollTop = scrollPos;
      }
    }
    setTimeout(() => {
      scrollPos = 0;
    }, 100);
  };
}

columns.loadColumns(slots, guid, H_datagridRef);
columns.updateSeekFilterList(P.filterList);

watch(
  () => P.filterstring,
  () => columns.updateSeekFilterString(P.filterstring),
);

watch(
  () => columns.dataHandler?.MaxSizeRow.value,
  () => {
    setTimeout(() => {
      adjustColumns.adjust();
      console.log("adjustColumns.adjust()");
    }, 100);
  },
  { deep: true },
);

function rowStyle(row: any) {
  return columns.rowStyle?.(row) ?? "";
}

function datagridClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("row")) E("rowClick", data);
  if (data && data.type.startsWith("head")) E("headClick", data);
  selectedId.value = data?.dataId ?? "";
}

function editColumns() {
  if (P.virtualscroll) {
    scrollPos = H_datagridVirtualRef.value.getOffset();
  } else {
    scrollPos = H_datagridVirtualRef.value.scrollTop;
  }

  menuColumnsRef.value.columnsOpen();
}

async function autoAdjustColumns() {
  adjustColumns.autoColumns();
}

function excel() {
  columns.dataHandler?.toExcel(columns.columns);
}

function fullScreen() {
  if (!document.fullscreenElement) {
    columns.H_datagridRef.value.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>
