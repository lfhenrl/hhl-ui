<template>
  <div class="h-[90%] w-full">
    <div style="display: flex; align-items: center">
      <H_btn @click="load" style="width: 100px">Load</H_btn>
      <div style="flex: 1" />
      <H_input v-model="seek" clearable style="max-width: 200px">
        <template v-slot:end>
          <H_iconSearch set-end color="txt3" />
        </template>
      </H_input>
    </div>
    <H_datagrid
      :dataHandler="datesData"
      data-key="Id"
      @row-click="rowClick"
      :keeps="100"
      :pagesize="100"
      :filter-list="['Group1', 'Group2', 'Group3', 'Group4', 'Text']"
      :filterstring="seek"
    >
      <H_column field="Id" title="Id" type="number" />
      <H_column field="Msg_nr" title="Msg_nr" type="number" />
      <H_column field="MsgType" title="MsgType" type="string" filter="select" :select_list="['Alert', 'Warning']" />
      <H_column field="StartTime" title="StartTime" type="datetime" />
      <H_column field="EndTime" title="EndTime" type="datetime" />
      <H_column field="Group1" title="Group1" type="string" filter="select" />
      <H_column field="Group2" title="Group2" type="string" filter="select" />
      <H_column field="Group3" title="Group3" type="string" filter="select" />
      <H_column field="Group4" title="Group4" type="string" filter="select" />
      <H_column field="Text" title="Text" type="string" />
      <H_column field="State" title="State" type="string" filter="select" :select_list="['active', 'history']" />
      <H_column field="DurProd" title="DurProd" type="number" filter_condition1="greater" filter_value1="0" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_input from "../../../lib/Components/H_input.vue";
import { serverData } from "../../../lib/Components/datagrid";

import { ref } from "vue";
import { type iClickData } from "../../../lib/Components/datagrid";

const seek = ref("");

const datesData = new serverData("http://localhost:5000/alerts");

async function load() {
  await datesData.startLoading();
  datesData.loadData();
}

function rowClick(data: iClickData) {
  console.log("rowClick :", data);
}
</script>
