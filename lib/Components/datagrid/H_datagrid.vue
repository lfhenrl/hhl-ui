<template>
  <div class="H_datagrid" ref="H_datagridRef">
    <H_virtualList
      ref="H_datagridVirtualRef"
      :key="columns.changeCounter.value"
      :data-key="dataKey"
      v-if="virtualscroll"
      :data-sources="dataHandler.rows.value"
      item-class="H_dataRow"
      class="H_datagrid-table"
      :estimate-size="28"
      :keeps="20"
      :class="guid"
      :selectedId="selectedId"
      @click="datagridClick"
    >
      <template v-slot:header>
        <H_headerRow role="headitem" />
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
      <H_headerRow role="headitem" />
      <div
        class="H_dataRow"
        v-for="row in dataHandler.rows.value"
        :data-id="row[dataKey]"
        role="listitem"
        :selected="selectedId == row[dataKey] ? true : null"
      >
        <H_dataRow :row="row" />
      </div>
    </div>
    <div class="H_datagrid-footer">
      <H_btn size="sm" round type="icon-text" icon="refresh" title="Reload data" />
      <H_btn size="sm" round type="icon-text" icon="columns" title="Edit Columns" @click="editColumns" />
      <H_btn
        size="sm"
        round
        type="icon-text"
        icon="expand_horizontal"
        title="Auto adjust all columns"
        @click="autoAdjustColumns"
      />
      <H_btn size="sm" round type="icon-text" icon="excel" title="Download to excel" @click="excel" />
      <H_btn size="sm" round type="icon-text" icon="zoom_out_map" title="fullScreen" @click="fullScreen" />
      <H_spacer />
      <div class="H_datagrid__rowcount">
        {{ columns.dataHandler.rowsCount }} Loaded of {{ columns.dataHandler.rowsCountTotal }} Rows.
      </div>
    </div>
  </div>
  <H_menuColumns ref="menuColumnsRef" />
</template>

<script setup lang="ts">
import { PropType, provide, ref, useSlots } from "vue";
// import H_headerRow from "./headerRow/H_headerRow.vue";
import H_headerRow from "../../SubComponents/datagrid/headerRow/H_headerRow.vue";
import H_dataRow from "../../SubComponents/datagrid/dataRow/H_dataRow.vue";
import H_menuColumns from "../../SubComponents/datagrid/sub/columns/H_menuColumns.vue";
import H_btn from "../../Components/H_btn.vue";
import H_spacer from "../../Components/H_spacer.vue";
import { Columns } from "../../SubComponents/datagrid/provide/Columns";
import H_virtualList from "../../Components/H_virtualList.vue";
import { datagridClickHandler } from "../../SubComponents/datagrid/provide/datagridClickHandler";

const P = defineProps({
  dataKey: {
    type: [String, Number],
    required: true
  },
  virtualscroll: { type: Boolean, default: false },
  dataHandler: {
    type: Object as PropType<any>,
    required: true
  }
});
const guid = `g${new Date().getTime().toString()}`;
const slots = useSlots();
const selectedId = ref("");
const H_datagridRef = ref();
const H_datagridVirtualRef = ref();
let scrollPos = 0;
const menuColumnsRef = ref();
const columns = new Columns();
const ClickHandler = new datagridClickHandler(P.dataHandler.rows, P.dataKey, columns);
provide("Columns", columns);

columns.dataHandler = P.dataHandler;
columns.dataHandler.newDataEvent = () => {
  ClickHandler.newData(columns.dataHandler.rows.value);
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

columns.loadColumns(slots, guid, H_datagridRef);

function datagridClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  console.log("click ", data);
  selectedId.value = data?.dataId ?? "";
}

function editColumns() {
  if (P.virtualscroll) {
    scrollPos = H_datagridVirtualRef.value.getOffset();
  } else {
    scrollPos = H_datagridVirtualRef.value.scrollTop;
    console.log("aaaaaaaaaaa ", H_datagridVirtualRef.value.scrollTop);
  }

  menuColumnsRef.value.columnsOpen();
}

function autoAdjustColumns() {
  columns.columns.forEach((col) => {
    col.cssRule.style.minWidth = "";
    col.cssRule.style.maxWidth = "";
  });
}

function excel() {
  columns.dataHandler.toExcel(columns.columns);
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

<style>
.H_datagrid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-height: 100%;
  border: 1px var(--col-bg-3) solid;
  border-radius: 4px;
  font-family: var(--comp-font-family);
  font-size: var(--comp-font-size);
  overflow: hidden;
}
.H_datagrid-table {
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: 100%;
  min-height: 59px;
  overflow: auto;
}

.H_datagrid-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 3px;
  color: var(--col-pri);
  font-size: 0.9em;
  padding-right: 14px;
  gap: 5px;
  background-color: var(--col-bg-3);
  border-top: 1px solid var(--col-bg-5);
}
</style>
