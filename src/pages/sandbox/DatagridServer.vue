<template>
  <div class="_page">
    <div style="display: flex; align-items: center">
      <H_btn @click="load" style="width: 100px">Load</H_btn>
      <div style="flex: 1" />
      <H_inputText v-model="seek" :debounce="300" clearable style="max-width: 200px">
        <template v-slot:end>
          <H_icon icon="search"></H_icon>
        </template>
      </H_inputText>
    </div>
    <H_datagridX
      @head-click="headClick"
      @row-click="rowClick"
      :dataHandler="sData"
      :filter-list="['id', 'val1', 'val2', 'val3', 'val4', 'val7']"
      :filterstring="seek"
      data-key="id"
      :group-list="['val2', 'val4', 'val7']"
    >
      <H_column field="id" title="Id" type="number" filter_type="number" cell-class="text-err" />
      <H_column field="val1" title="Value 1" type="string" filter_type="string" width="auto" />
      <H_column field="val2" title="Value 2" type="string" filter_type="select" />
      <H_column
        field="val3"
        title="Value 3"
        type="string"
        filter_type="string"
        class="text-err"
        :cell_style="styleCell"
      />
      <H_column field="val4" title="Value 4" type="string" filter_type="select" />
      <H_column field="val5" title="Value 5" type="bool" filter_type="bool" filter_condition="bool_list" />
      <H_column field="val6" title="Value 6" type="date" filter_type="datetime" />
      <H_column field="val7" title="Value 7" type="string" filter_type="select" />
    </H_datagridX>
  </div>
</template>

<script setup lang="ts">
import H_datagridX from "../../../lib/Components/datagridX/H_datagridX.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputText from "../../../lib/Components/H_inputText.vue";
import { serverData } from "../../../lib/Components/datagridX/datahandlers/server";

import { ref } from "vue";
import { iClickData } from "../../../lib/Components/datagridX/provide/datagridTypes";

const seek = ref("");
const sData = new serverData("http://localhost:5000/hhl");

async function load() {
  await sData.startLoading();
  sData.loadData();
}

function headClick(data: iClickData) {
  console.log("headClick :", data);
}

function rowClick(data: iClickData) {
  console.log("rowClick :", data);
}

function styleCell(val: string) {
  if (val === "Row 4 cell 3.")
    return {
      color: "red",
    };
}
</script>
<style scoped>
._page {
  display: flex;
  padding: 32px;
  gap: 18px;
  background-color: var(--col-bg-0);
  height: 100%;
}
</style>
