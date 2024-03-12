<template>
  <div class="_page">
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
        <div style="display: flex; padding: 10px 0; flex: 1">
          <H_btn @click="load" style="width: 100px" type="outline">Load</H_btn>
          <div style="flex: 1" />
          <H_inputText v-model="seek" :debounce="300" clearable style="max-width: 200px">
            <template v-slot:end>
              <H_icon icon="search"></H_icon>
            </template>
          </H_inputText>
        </div>
      </template>
      <H_column field="id" title="Id" type="action" width="100px" :auto-width="false"
        ><template #default>
          <H_icon icon="edit" btn="standard" size="24px" class="text-pri"></H_icon>
        </template>
      </H_column>
      <H_column field="id" title="Ids" type="number" sorting="desc" />
      <H_column field="val1" type="string" width="auto" />
      <H_column field="val2" title="Value 2" type="string" filter="select" />
      <H_column
        field="val3"
        title="Value 3"
        type="string"
        filter_type="string"
        class="text-err"
        :cell_style="styleCell"
      />
      <H_column field="val4" title="Value 4" type="string" sorting="desc" :sort-index="1" />
      <H_column field="val5" title="Value 5" type="bool" />
      <H_column field="val6" title="Value 6" type="date" :format="formatDate" />
      <H_column field="val7" title="Value 7" type="string" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputText from "../../../lib/Components/H_inputText.vue";
import { getData } from "../../testData/data";
import { localData } from "../../../lib/Components/datagrid";
import { D_01_dec_2021_HHMM } from "../../../lib/utils/dateFormat";
import { ref } from "vue";
import { iClickData } from "../../../lib/Components/datagrid";

const seek = ref("");
const lData = new localData();

async function load() {
  await lData.startLoading();
  const data = await getData(500);
  lData.setData(data);
  lData.loadData();
}

function formatDate(value: any) {
  return D_01_dec_2021_HHMM(value);
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
<style>
._page {
  display: flex;
  padding: 32px;
  gap: 18px;
  background-color: var(--col-bg-0);
  height: 100%;
}

.text1-err {
  color: lime;
}
</style>
