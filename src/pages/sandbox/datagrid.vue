<template>
  <div class="_page h-full">
    <H_datagrid
      @head-click="headClick"
      @row-click="rowClick"
      :dataHandler="lData"
      :filter-list="['id', 'val1', 'val2', 'val3', 'val4', 'val7']"
      :filterstring="seek"
      :group-list="[]"
      :row_style="rowStyle"
      data-key="id"
    >
      <template v-slot:head>
        <div style="display: flex; padding: 2px 0; flex: 1">
          <H_btn @click="load" style="width: 100px">Load</H_btn>
          <H_icon name="edit" color="current" />
          <div style="flex: 1" />
          <H_input v-model="seek" clearable style="max-width: 200px">
            <H_icon name="search" set-end color="txt3" />
          </H_input>
        </div>
      </template>
      <H_column field="id" title="Id" type="number" />
      <H_column field="val1" title="Value 1" type="string" />
      <H_column field="val2" title="Value 2" type="string" filter="select" />
      <H_column
        field="val3"
        title="Value 3"
        type="string"
        :auto-height="true"
        class="text-err"
        :cell_style="styleCell"
      />
      <H_column field="val4" title="Value 4" type="string" />
      <H_column field="val5" title="Value 5" type="bool" />
      <H_column field="val6" title="Value 6" type="date" :auto-height="true" />
      <H_column field="val7" title="Value 7" type="string" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_input from "../../../lib/Components/H_input.vue";
import { getData } from "../../testData/data";
import { localData } from "../../../lib/Components/datagrid";
import { ref } from "vue";
import { type iClickData } from "../../../lib/Components/datagrid";

const seek = ref("");
const lData = new localData();

async function load() {
  await lData.startLoading();
  const data = await getData(5000);
  lData.setData(data);
  lData.loadData();
}

function headClick(data: iClickData) {
  if (data.colOrgIndex === 0 && data.subType === "title") {
    console.log("headClick :", data);
  }
}

function rowClick(data: iClickData) {
  if (data.subType === "XX1") {
    console.log("rowClick: ", data);
  }
}

function styleCell(val: string, row: any) {
  if (val === "Row 4 cell 3." || row.id === 2)
    return {
      color: "red",
    };
}

function rowStyle(row: any) {
  if (row.id === 7)
    return {
      color: "red",
    };
}
</script>
