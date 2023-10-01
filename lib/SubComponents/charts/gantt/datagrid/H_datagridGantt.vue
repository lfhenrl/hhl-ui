<template>
  <div ref="dom" class="H_datagrid H_dataGridGantt" :class="classGuid">
    <div class="H_datagrid-header">
      <H_datagridHeadCell v-for="(col, index) in columns" :key="col.orgIndex" :column="col" :index="index" />
      <div class="H_datagridHeadCell__spacer" />
    </div>
    <div ref="vList" class="H_virtualList" @click="datagridClick" :key="updates">
      <H_rowGantt v-for="(item, index) in gridData" :key="item.id" :index="index" :id="item.id" :data="item" :type="item.type" />
    </div>
    <H_progressBar class="H_virtualList-info" :show="isLoading" />
    <H_datagridPopup />
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, provide, ref, useSlots } from "vue";
import "../../../datagrid/H_datagrid.css";
import { Datagrid } from "../../../datagrid/provide";
import { Columns } from "../../../datagrid/provide/Columns";
import H_rowGantt from "./H_rowGantt.vue";
import H_datagridHeadCell from "../../../datagrid/sub/H_datagridHeadCell.vue";
import H_datagridPopup from "../../../datagrid/sub/popup/H_datagridPopup.vue";
import H_progressBar from "../../../../Components/H_progressBar.vue";

const props = defineProps({
  groups: { type: Array as PropType<string[]>, default: () => [] },
  hideFooter: { type: Boolean, default: false },
  search: String,
  pageSize: { type: Number, default: 20 },
  excelMaxRows: { type: Number, default: 5000 },
  searchFields: {
    type: Array as PropType<string[]>,
    default() {
      return [];
    }
  }
});

const emit = defineEmits(["rawdata", "rowClicked", "loaded"]);
defineExpose({ update });

const slots = useSlots();
const selectedId = ref("");
const dom = ref<HTMLElement | any>({});
const vList = ref<HTMLElement | any>({});
const dg = new Datagrid(dom, slots);
const isLoading = ref(false);
const updates = ref(0);
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

dg.Event.on("isLoading", (val: boolean) => {
  isLoading.value = val;
});

onMounted(() => {
  const ro = new ResizeObserver((entries) => {
    for (const _e of entries) {
      dg.Resize();
    }
  });
  ro?.observe(dom.value);
  dg.Init();
  emit("loaded", { dg, gridData, vList: vList });
});

function update() {
  updates.value = updates.value + 1;
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
  if (ele.dataset && ele.dataset.orgindex && ele.dataset.field) {
    return {
      orgindex: parseInt(ele.dataset.orgindex),
      field: ele.dataset.field,
      id: ele.dataset.id
    };
  }
  return null;
}

function rowClicked(data: any) {
  dg.selectChanged(data.id);
  selectedId.value = data.id;
  emit("rowClicked", data);
}
</script>

<style>
.H_dataGridGantt {
  box-shadow: none;
}

.H_dataGridGantt .H_datagrid-header {
  min-height: var(--gantt-time-totalheight);
  max-height: var(--gantt-time-totalheight);
  font-size: 0.85em;
  margin: 0;
}

.H_dataGridGantt .H_virtualList {
  font-size: 0.85em;
  overflow-y: hidden;
  padding-bottom: 16px;
}

.gridRow:nth-child(even) {
  background-color: var(--col-bg-1);
}
</style>
