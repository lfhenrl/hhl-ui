<template>
  <div class="H_datagrid grid relative h-full text-sm" ref="datagridRef">
    <div class="flex">
      <slot name="head"></slot>
    </div>
    <div
      ref="header"
      class="H_datagrid-header flex flex-col relative h-[36px] max-h-[36px] overflow-x-hidden overflow-y-scroll rounded-t bg-bg2 border border-bg6"
    >
      <H_headerRow role="heading" aria-level="2" :key="DG.changeCounter.value" @click="headerClick" />
      <H_progressBar :show="DG.dataHandler?.rowsLoading.value" class="absolute bottom-0 z-10" />
    </div>
    <div class="H_datagrid-body overflow-hidden border-r border-l border-bg6">
      <H_virtualList
        :item_style="rowStyle"
        :data-key="dataKey"
        @scroll="onScroll"
        :keeps="keeps"
        :overscan="overscan"
        item-class="H_dataRow flex flex-1 h-min w-full bg-bg0 odd:bg-bg1 hover:bg-bg2 data-[selected]:bg-bg3 leading-4 min-h-(--dgrid-row-height) max-h-(--dgrid-row-height)"
        :data-sources="DG.dataHandler?.outData.value"
        :selectedId="selected_Id"
        :estimateSize="parseInt(row_height)"
        ref="vscroll"
        @click="bodyClick"
      >
        <template v-slot:header
          ><H_spaceRow />
          <div
            v-if="DG.dataHandler?.rowsCount.value === 0"
            class="H_datagrid-noRows flex items-end justify-center text-xl h-24"
          >
            No rows loaded...
          </div>
        </template>
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
    default: "id",
  },
  dataHandler: {
    type: Object as PropType<any>,
    required: true,
    default: null,
  },
  keeps: {
    type: Number,
    default: 50,
  },
  overscan: {
    type: Number,
    default: 20,
  },
  row_style: { type: Function, default: null },
  row_height: { type: String, default: "26px" },
  filterList: { type: Array as PropType<string[]>, default: [] },
  filterstring: { type: String, default: "" },
  groupList: { type: Array as PropType<string[]>, default: [] },
  stickyGroups: { type: Boolean, default: true },
  selectedId: { type: String },
});

const E = defineEmits<{
  rowClick: [data: iClickData];
  headClick: [data: iClickData];
}>();

const datagridRef = ref();
const header = ref();
const row_styleActive = P.row_style ? true : false;
const vscroll = ref<iVscroller | null>(null);
const slots = useSlots();
const DG = new Dgrid(slots, P.dataHandler);
const selected_Id = ref("");

watch(
  () => P.selectedId,
  () => {
    selected_Id.value = P.selectedId ?? "";
  }
);

provide("DG", DG);
const ClickHandler = new datagridClickHandler(DG);
DG.SeekList = P.filterList;
DG.StickyGroups = P.stickyGroups;
DG.dataHandler!.dataKey = P.dataKey;
DG.dataHandler!.groupList = P.groupList;

function bodyClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("row")) {
    selected_Id.value = data?.dataId;
    E("rowClick", data);
  }
}

function headerClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("head")) E("headClick", data);
}

function onScroll(e: any) {
  header.value.scrollLeft = e.target.scrollLeft;
}

function rowStyle(index: any) {
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
    DG.SeekString = P.filterstring.toLocaleLowerCase();
    DG.updateFilter();
  }
);
onMounted(() => {
  DG.Vscroller = vscroll.value!;
  DG.datagridRef = datagridRef.value;
});
</script>

<style>
@layer components {
  .H_datagrid {
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: 1fr;
    --dgrid-row-height: v-bind(row_height);
  }

  .H_datagrid-header::-webkit-scrollbar {
    border-radius: 0;
    border-top-right-radius: 4px;
  }

  .H_datagrid-header::-webkit-scrollbar-track {
    border-radius: 0;
    border-top-right-radius: 4px;
    background-color: var(--color-bg2);
  }

  .H_datagrid-header::-webkit-scrollbar-thumb {
    background-color: transparent;
    opacity: 0;
  }
}
</style>
