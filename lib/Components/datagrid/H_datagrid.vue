<template>
  <div class="H_datagrid" ref="datagridRef">
    <div h-display="flex">
      <slot name="head"></slot>
    </div>
    <H_progressBar h-z-index="10" :show="DG.dataHandler?.rowsLoading.value" h-bgcolor="transparent" />
    <div
      ref="header"
      class="H_datagrid-header"
      h-display="flex"
      h-flex-direction="column"
      h-position="relative"
      h-bgcolor="var(--bgcol-1)"
      h-height="36px"
      h-min-height="36px"
      h-overflow-x="hidden"
      h-overflow-y="scroll"
      h-border="1px solid var(--col-8)"
      h-border-radius="4px 4px 0 0"
    >
      <H_headerRow role="heading" aria-level="2" :key="DG.changeCounter.value" @click="headerClick" />
    </div>
    <div
      class="H_datagrid-body"
      h-display="flex"
      h-flex-direction="column"
      h-bgcolor="var(--bgcol-2)"
      h-border-radius="4px"
      h-overflow="hidden"
      h-border-color="var(--col-8)"
      h-border-style="solid"
      h-border-width="0 1px"
    >
      <H_virtualList
        :item_style="rowStyle"
        :data-key="dataKey"
        @scroll="onScroll"
        :keeps="keeps"
        :overscan="overscan"
        item-class="H_dataRow"
        :data-sources="DG.dataHandler!.outData.value"
        :selectedId="selected_Id"
        :estimateSize="parseInt(row_height)"
        ref="vscroll"
        @click="bodyClick"
      >
        <template v-slot:header
          ><H_spaceRow />
          <div
            v-if="DG.dataHandler?.rowsCount.value === 0"
            class="H_datagrid-noRows"
            h-display="flex"
            h-align-items="end"
            h-justify-content="center"
            h-font-size="1.25em"
            h-height="6em"
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
import { type PropType, onMounted, provide, ref, useSlots, watch } from "vue";
import H_virtualList from "../H_virtualList.vue";
import H_headerRow from "../../SubComponents/datagrid/head/H_headerRow.vue";
import H_dataRow from "../../SubComponents/datagrid/body/H_dataRow.vue";
import H_spaceRow from "../../SubComponents/datagrid/body/H_spaceRow.vue";
import H_datagridFooter from "../../SubComponents/datagrid/H_datagridFooter.vue";
import H_progressBar from "../H_progressBar.vue";
import { Dgrid } from "../../SubComponents/datagrid/provide/Dgrid";
import { datagridClickHandler } from "../../SubComponents/datagrid/provide/datagridClickHandler";
import { type iClickData } from "../../SubComponents/datagrid/provide/datagridTypes";
import { debounce } from "../../utils/debounce";

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
  pagesize: {
    type: Number,
    default: 500,
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
const DG = new Dgrid(slots, P.dataHandler, P);
const selected_Id = ref("");

watch(
  () => P.selectedId,
  () => {
    selected_Id.value = P.selectedId ?? "";
  }
);

provide("DG", DG);
const ClickHandler = new datagridClickHandler(DG);

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
    DebounceFilterstring();
  }
);

const DebounceFilterstring = debounce(() => {
  DG.SeekString = P.filterstring?.toLocaleLowerCase() ?? "";
  DG.updateFilter();
}, 1000);

onMounted(() => {
  DG.Vscroller = vscroll.value!;
  DG.datagridRef = datagridRef.value;
});
</script>

<style>
@layer components {
  .H_datagrid {
    display: grid;
    grid-template-rows: auto auto auto 1fr auto;
    grid-template-columns: 1fr;
    position: relative;
    height: 100%;
    font-size: 0.875rem;
    --dgrid-row-height: v-bind(row_height);
  }

  .H_datagrid-header::-webkit-scrollbar {
    border-radius: 0;
    border-top-right-radius: 4px;
  }

  .H_datagrid-header::-webkit-scrollbar-track {
    border-radius: 0;
    border-top-right-radius: 4px;
    background-color: var(--bgcol-2);
  }

  .H_datagrid-header::-webkit-scrollbar-thumb {
    background-color: transparent;
    opacity: 0;
  }
}
</style>
