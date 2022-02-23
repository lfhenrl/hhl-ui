<template>
  <div ref="dom" class="H_datagrid" :class="classGuid">
    <H_virtualList
      ref="virtualList"
      style="overflow-y: scroll; height: 100%; position: relative"
      data-key="id"
      :data-sources="gridData"
      :estimate-size="30"
      :keeps="40"
      item-class="H_datagridRow"
      :selectedId="selectedId"
      @click="datagridClick"
    >
      <template v-slot:header>
        <div class="H_datagrid-header">
          <H_datagridHeadCell v-for="(col, index) in columns" :key="col.orgIndex" :column="col" :index="index" />
          <div class="H_datagridHeadCell__spacer" />
        </div>
      </template>
      <template v-slot="data">
        <H_row :data="data.item" :expanded="data.item.expanded" />
      </template>
    </H_virtualList>
    <H_progressBar class="H_virtualList-info" :show="isLoading" />
    <div class="H_virtualList-footer">
      <H_btn size="sm" round type="icon-text" icon="refresh" title="Reload data" @click="reload" />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="expand_horizontal"
        class="col-pri-light"
        title="Auto adjust columns"
        @click="resizeColSize"
      />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="excel"
        class="col-pri-light"
        title="Download to excel"
        @click="downloadExcel"
      />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="zoom_out_map"
        class="col-pri-light"
        title="fullScreen"
        @click="toggleFullScreen"
      />
      <H_spacer />
      <div class="H_datagrid__rowcount">{{ rowCount }} Loaded of {{ rowCountTotal }} Rows.</div>
    </div>
    <H_datagridPopup />
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, provide, ref, useSlots, watch } from "vue";
import { Datagrid } from "./provide";
import { Columns } from "./provide/Columns";
import { toExcel } from "./toExcel";
import { debounce } from "../../utils/debounce";
import H_row from "./H_row.vue";
import H_virtualList from "../virtualList/H_virtualList.vue";
import H_datagridHeadCell from "./sub/H_datagridHeadCell.vue";
import H_datagridPopup from "./sub/popup/H_datagridPopup.vue";
import H_btn from "../H_btn.vue";
import H_spacer from "../H_spacer.vue";
import { iReturnData } from "./datagridTypes";
import { dataController, iDataHandler } from "./dataController";
import H_progressBar from "../H_progressBar.vue";

const props = defineProps({
  dataKey: {
    type: String,
    required: true
  },
  groups: { type: Array as PropType<string[]>, default: () => [] },
  search: String,
  pageSize: { type: Number, default: 20 },
  excelMaxRows: { type: Number, default: 5000 },
  searchFields: {
    type: Array as PropType<string[]>,
    default() {
      return [];
    }
  },
  dataHandler: {
    type: Object as PropType<iDataHandler>,
    required: true
  }
});
const slots = useSlots();
const selectedId = ref("");
const dom = ref(<HTMLElement>{});
const dg = new Datagrid(dom, slots);
const isLoading = ref(false);
const virtualList = ref();
provide("dg", dg);
dg.GroupBy = props.groups;
dg.OrgGroupBy = props.groups;
dg.searchFields = props.searchFields ?? [];
dg.pageSize = props.pageSize;
dg.excelMaxRows = props.excelMaxRows;
const columnsHandler = new Columns(slots, dg);
dg.Columns = columnsHandler.columns;
const columns = dg.Columns;
const classGuid = dg.ClassGuid;
const gridData = ref<any[]>([]);
const rowCount = ref(0);
const rowCountTotal = ref(0);

dg.DataHandler = props.dataHandler;
dg.DataHandler.setRefToDg(dg);
dg.DataController = new dataController(dg);

dg.DataController.setInternalData = (data: iReturnData) => {
  gridData.value = data.data;
  rowCount.value = data.rowCount;
  rowCountTotal.value = data.totalCount;
  isLoading.value = false;
  dg.isLoading = false;
};

dg.Event.on("isLoading", (val: boolean) => {
  isLoading.value = val;
});

const debounceSearchString = debounce(() => {
  dg.searchString = props.search ?? "";
  dg.UpdateData();
}, 300);

watch(
  () => props.search,
  () => debounceSearchString()
);

onMounted(() => {
  dg.Init();
});

function datagridClick(e: MouseEvent) {
  const ele = e.target as HTMLElement;
  let data = tryGetRowClickData(ele);
  if (!data) data = tryGetRowClickData(ele.parentElement ?? undefined);
  if (!data) data = tryGetRowClickData(ele.parentElement?.parentElement ?? undefined);
  if (data) rowClicked(data);
}

function tryGetRowClickData(ele?: HTMLElement) {
  if (!ele) return null;
  if (ele.dataset && ele.dataset.orgindex && ele.dataset.field && ele.parentElement?.dataset.id) {
    return {
      orgindex: parseInt(ele.dataset.orgindex),
      field: ele.dataset.field,
      id: ele.parentElement.dataset.id
    };
  }
  return null;
}

function rowClicked(data: any) {
  selectedId.value = data.id;
}

function reload() {
  dg.UpdateData();
}

function resizeColSize() {
  dg.setColumnsHeadWidth();
  setTimeout(() => {
    dg.setColumnsBodyWidth();
  });
}

async function downloadExcel() {
  const data = await dg.DataController.getRawData();
  toExcel(data, dg.Columns.value, "GridData");
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    dom.value.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>

<style>
.H_datagrid {
  margin-top: 5px;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: 0 0 1px 1px var(--col-bg-5);
  overflow: hidden;
  font-family: var(--comp-font-family);
  font-size: var(--comp-font-size);
}

.H_datagrid-header {
  position: sticky;
  display: flex;
  flex-shrink: 0;
  justify-content: stretch;
  min-width: 0;
  align-items: center;
  height: 33px;
  top: 0;
  margin-right: 2px;
  z-index: 1;
  overflow: visible;
}

.H_virtualList-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 3px;
  gap: 5px;
  background-color: var(--col-bg-3);
  border-top: 1px solid var(--col-bg-5);
}

.H_datagrid__rowcount {
  color: var(--col-txt-1);
  font-size: 0.9em;
  margin-right: 4px;
}

.H_datagridHeadCell {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 4px;
  flex: 1 1 auto;
  height: 100%;
  min-width: 0;
  border-right: 1px solid var(--col-bg-5);
  background-color: var(--col-bg-2);
}

.H_datagridHeadCell:hover {
  background-color: var(--col-bg-3);
}

.H_datagridHeadCell__spacer {
  height: 100%;
  width: 1px;
  border-right: 1px solid var(--col-bg-5);
}

.H_datagridHeadCell:nth-last-child(2) {
  border-right: none;
}

.H_datagridHeadCell__content {
  display: flex;
  align-items: center;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.H_datagridHeadCell__menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20px;
  cursor: pointer;
}

.H_datagridHeadCell__sortIcons {
  display: flex;
}

.H_datagridHeadCell__sortIcons .hhl-icon {
  margin-right: -2px;
  margin-left: -4px;
}
.H_datagridHeadCell__sortIndex {
  line-height: 16px;
  font-size: 13px;
}

.H_datagridHeadCell__resizer {
  position: absolute;
  z-index: 11;
  top: 0;
  width: 6px;
  height: 100%;
  user-select: none;
  cursor: col-resize;
  right: -3px;
}

.H_datagridRow {
  display: flex;
  border-bottom: var(--col-bg-3) 1px solid;
}

.H_datagridRow:nth-child(even) {
  background-color: var(--col-bg-1);
}

.H_datagridRow:hover {
  background-color: var(--col-bg-2);
}

.H_datagridRow[selected] {
  background-color: var(--col-bg-4);
}

.H_datagridRowCell {
  display: flex;
  align-items: center;
  padding: 4px;
  border-right: var(--col-bg-3) 1px solid;
}
.H_datagridRowCell:last-child {
  border-right: none;
}
</style>
