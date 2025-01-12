<template>
  <div class="_page w-full">
    <div style="display: flex; align-items: center">
      <H_btn @click="load" style="width: 100px">Load</H_btn>
      <div style="flex: 1" />
      <H_input v-model="seek" clearable style="max-width: 200px">
        <template v-slot:end>
          <div class="ico-search" />
        </template>
      </H_input>
    </div>
    <H_datagrid :dataHandler="datesData" data-key="id" @row-click="rowClick">
      <H_column type="action" sorting="none" field="id">
        <template #default>
          <div class="ico-edit iconBtn text-pri text-xs" data-subtype="edit" />
        </template>
      </H_column>
      <H_column field="id" title="Id" type="number" />
      <H_column field="name" title="Name" type="string" />
      <H_column field="date" title="Date" type="datetime" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_input from "../../../lib/Components/H_input.vue";
import { serverData } from "../../../lib/Components/datagrid";

import { ref } from "vue";
import { iClickData } from "../../../lib/Components/datagrid";

const seek = ref("");

const datesData = new serverData("http://localhost:5000/dates");

async function load() {
  await datesData.startLoading();
  datesData.loadData();
}

function rowClick(data: iClickData) {
  console.log("rowClick :", data);
}
</script>
