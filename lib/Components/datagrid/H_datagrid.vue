<template>
  <div class="H_datagrid">
    <div ref="header" class="H_datagrid-header">
      <H_headerRow role="heading" aria-level="2" :key="DG.changeCounter.value" />
      <H_progressBar :show="DG.dataHandler?.rowsLoading.value" />
    </div>
    <div class="H_datagrid-body">
      <H_virtualList
        :row_style="rowStyle"
        data-key="id"
        @scroll="onScroll"
        item-class="H_dataRow"
        :data-sources="DG.dataHandler?.outData.value"
        :selectedId="selectedId"
        ref="vscroll"
        @click="datagridClick"
      >
        <template v-slot:header><H_spaceRow /></template>
        <template v-slot="{ item }">
          <H_dataRow :row="item" :key="DG.changeCounter.value" />
          <adjustColumnsWidth :row="item" />
        </template>
      </H_virtualList>
    </div>
    <H_datagridFooter />
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, provide, ref, useSlots, watch } from "vue";
import H_virtualList from "../H_virtualList.vue";
import H_headerRow from "../../SubComponents/datagrid/head/H_headerRow.vue";
import H_dataRow from "../../SubComponents/datagrid/body/H_dataRow.vue";
import H_spaceRow from "../../SubComponents/datagrid/body/H_spaceRow.vue";
import H_datagridFooter from "../../SubComponents/datagrid/H_datagridFooter.vue";
import H_progressBar from "../H_progressBar.vue";
import { Dgrid } from "../../SubComponents/datagrid/provide/Dgrid";
import { datagridClickHandler } from "../../SubComponents/datagrid/provide/datagridClickHandler";
import { iClickData } from "../../SubComponents/datagrid/provide/datagridTypes";

type iVscroller = InstanceType<typeof H_virtualList>;

const P = defineProps({
  dataKey: {
    type: String,
    required: true,
  },
  dataHandler: {
    type: Object as PropType<any>,
    required: true,
  },
  row_style: { type: Function, default: null },
  filterList: { type: Array as PropType<string[]>, default: [] },
  filterstring: { type: String, default: "" },
  groupList: { type: Array as PropType<string[]>, default: [] },
});

const E = defineEmits<{
  rowClick: [data: iClickData];
  headClick: [data: iClickData];
}>();

const header = ref();
const row_styleActive = P.row_style ? true : false;
const vscroll = ref<iVscroller | null>(null);
const slots = useSlots();
const DG = new Dgrid(slots, P.dataHandler);
const selectedId = ref("");

provide("DG", DG);
const ClickHandler = new datagridClickHandler(DG);
DG.SeekList = P.filterList;
DG.dataHandler!.dataKey = P.dataKey;
DG.dataHandler!.groupList = P.groupList;

function datagridClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("row")) {
    selectedId.value = data?.dataId;
    E("rowClick", data);
  }
  if (data && data.type.startsWith("head")) E("headClick", data);
}

function onScroll(e: any) {
  console.log("bb ", e.target.scrollLeft);
  header.value.scrollLeft = e.target.scrollLeft;
}

function rowStyle(index: number) {
  if (row_styleActive) {
    return P.row_style(index);
  }
}

function adjustColumnsWidth(row: any) {
  if (row.row.__type) return;
  DG.ColumnWidthAdjustment.findMaxAllColumns(row.row);
}
watch(
  () => P.filterstring,
  () => {
    DG.SeekString = P.filterstring;
    DG.updateFilter();
  }
);
onMounted(() => {
  DG.Vscroller = vscroll.value!;
});
</script>

<style>
@layer hhl-components {
  .H_datagrid {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    height: 100%;
    border: 1px solid var(--col-bg-6);
    border-radius: 4px;
    font-size: 14px;
    overflow: hidden;
  }

  .H_datagrid-header {
    display: flex;
    height: 33px;
    max-height: 33px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: aqua;
  }

  .H_datagrid-header::-webkit-scrollbar {
    border-radius: 0;
  }

  .H_datagrid-header::-webkit-scrollbar-track {
    border-radius: 0;
    background-color: var(--col-bg-2);
  }

  .H_datagrid-header::-webkit-scrollbar-thumb {
    background-color: transparent;
    opacity: 0;
  }

  .H_datagrid-body-spacer {
    display: flex;
    max-height: 0;
  }

  .H_datagrid-body {
    overflow: hidden;
  }
}
</style>
