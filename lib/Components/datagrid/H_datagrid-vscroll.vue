<template>
  <div ref="dom" class="H_datagrid-vscroll" :class="classGuid">
    <H_virtualList
      ref="virtualList"
      style="overflow-y: scroll; height: 100%; position: relative"
      data-key="id"
      :data-sources="gridData"
      :estimate-size="pageSize"
      :keeps="pageSize"
      item-class="H_datagridRow"
      :selectedId="selectedId"
      role="listitem"
      @click="datagridClick"
    >
      <template v-slot:header>
        <div class="H_datagrid-header">
          <H_datagridHeadCell v-for="(col, index) in columns" :key="col.orgIndex" :column="col" :index="index" />
          <div class="H_datagridHeadCell__spacer" />
        </div>
      </template>
      <template v-slot="data">
        <H_row
          :id="data.item.id"
          :data="data.item.data"
          :type="data.item.type"
          :level="data.item.level"
          :name="data.item.name"
          :child-rows-count="data.item.childRowsCount"
          :expanded="data.item.expanded"
        />
      </template>
    </H_virtualList>
    <H_progressBar class="H_virtualList-info" :show="isLoading" />
    <div class="H_virtualList-footer" v-if="!hideFooter">
      <H_btn size="sm" round type="icon-text" icon="refresh" title="Reload data" @click="reload" />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="expand_horizontal"
        class="col-pri"
        title="Auto adjust columns"
        @click="resizeColSize"
      />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="excel"
        class="col-pri"
        title="Download to excel"
        @click="downloadExcel"
      />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="zoom_out_map"
        class="col-pri"
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
import "./H_datagrid.css";
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
import { dataController, iDataHandler } from "./virtualScroll";
import H_progressBar from "../H_progressBar.vue";

const props = defineProps({
  dataKey: {
    type: String,
    required: true,
  },
  groups: { type: Array as PropType<string[]>, default: () => [] },
  hideFooter: { type: Boolean, default: false },
  search: String,
  pageSize: { type: Number, default: 20 },
  excelMaxRows: { type: Number, default: 5000 },
  searchFields: {
    type: Array as PropType<string[]>,
    default() {
      return [];
    },
  },
  dataHandler: {
    type: Object as PropType<iDataHandler>,
    required: true,
  },
});

const emit = defineEmits(["rawdata", "rowClicked"]);
defineExpose({ update });

const slots = useSlots();
const selectedId = ref("");
const dom = ref<HTMLElement | any>({});
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
dg.groupRowTemplate = dg.getSlotsData(slots, "H_group-row");
dg.Columns = columnsHandler.columns;
const columns = dg.Columns;
const classGuid = dg.ClassGuid;
const gridData = ref<any[]>([]);
const rowCount = ref(0);
const rowCountTotal = ref(0);

// dg.DataHandler = props.dataHandler;
props.dataHandler.setRefToDg(dg);
const DataController = new dataController(dg, props.dataHandler);
dg.loadSelectList = props.dataHandler.loadSelectList;

DataController.setInternalData = (data: iReturnData) => {
  gridData.value = data.data;
  emit("rawdata", data.data);
  rowCount.value = data.rowCount;
  rowCountTotal.value = data.totalCount;
  isLoading.value = false;
  dg.isLoading = false;
};

dg.Event.on("isLoading", (val: boolean) => {
  isLoading.value = val;
});

dg.Event.on("UpdateData", () => {
  DataController.reLoad();
});

dg.Event.on("MoreRows", (id) => {
  DataController.moreRows(id);
  console.log("moreRows", id);
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
  const ro = new ResizeObserver((entries) => {
    for (const _e of entries) {
      dg.Resize();
    }
  });
  ro?.observe(dom.value);
  dg.Init();
});

function update() {
  virtualList.value.update();
}

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
      id: ele.parentElement.dataset.id,
    };
  }
  return null;
}

function rowClicked(data: any) {
  selectedId.value = data.id;
  const index = Number(data.id.replaceAll("_", ""));
  const row = gridData.value[index];
  emit("rowClicked", data, row);
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
  const data = await DataController.getRawData();
  toExcel(data.items, dg.Columns.value, "GridData");
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
.H_datagrid-vscroll {
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: 0 0 1px 1px var(--col-bg-5);
  overflow: hidden;
  font-family: var(--comp-font-family);
  font-size: var(--comp-font-size);
}
</style>
