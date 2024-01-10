<template>
  <div class="H_datagridX">
    <H_vscroll
      :row_style="rowStyle"
      :items="DG.dataHandler?.outData.value"
      :selected-index="DG.dataHandler?.selectedIndex.value"
      :estimate-size="30"
      ref="vscroll"
      @click="datagridClick"
    >
      <template v-slot:header-sticky>
        <H_headerRow role="heading" aria-level="2" />
        <H_progressBar :show="DG.dataHandler?.rowsLoading.value" />
      </template>
      <template v-slot:footer><H_datagridFooter /></template>
      <template v-slot="{ item, index }">
        <H_dataRow :row="item" :index="index" />
        <adjustColumnsWidth :row="item" />
      </template>
    </H_vscroll>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, provide, ref, useSlots, watch } from "vue";
import H_vscroll from "../H_vscroll.vue";
import H_headerRow from "./head/H_headerRow.vue";
import H_dataRow from "./body/H_dataRow.vue";
import H_datagridFooter from "./H_datagridFooter.vue";
import H_progressBar from "../H_progressBar.vue";
import { Dgrid } from "./provide/Dgrid";
import { datagridClickHandler } from "./provide/datagridClickHandler";
import { iClickData } from "./provide/datagridTypes";

type iVscroller = InstanceType<typeof H_vscroll>;

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
});

const E = defineEmits<{
  rowClick: [data: iClickData];
  headClick: [data: iClickData];
}>();

const row_styleActive = P.row_style ? true : false;
const vscroll = ref<iVscroller | null>(null);
const slots = useSlots();
const DG = new Dgrid(slots, P.dataHandler);

provide("DG", DG);
const ClickHandler = new datagridClickHandler(DG);
DG.SeekList = P.filterList;
DG.dataHandler!.dataKey = P.dataKey;

function datagridClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("row")) {
    DG.dataHandler!.setSelectedIndex(data?.dataIndex);
    E("rowClick", data);
  }
  if (data && data.type.startsWith("head")) E("headClick", data);
}

function rowStyle(index: number) {
  if (row_styleActive) {
    return P.row_style(index);
  }
}

function adjustColumnsWidth(row: any) {
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
.H_datagridX {
  height: 100%;
  border: 1px solid var(--col-bg-5);
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--col-bg-1);
}

/* .H_datagridX .Odd {
  background-color: var(--col-bg-2);
}
.H_datagridX .Even {
  background-color: var(--col-bg-0);
} */
</style>
