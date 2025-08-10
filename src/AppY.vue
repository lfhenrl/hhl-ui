<template>
  <div h-height="600px">
    <H_datagrid
      :dataHandler="lData"
      :filter-list="['id', 'val1', 'val2', 'val3', 'val4', 'val7']"
      :group-list="[]"
      data-key="id"
    >
      <template v-slot:head>
        <div h-display="flex" h-flex="1" h-align-items="center" h-padding="10px 0">
          <H_btn @click="load" style="width: 100px">Load</H_btn>
          <div style="flex: 1" />
        </div>
      </template>
      <H_column field="id" title="Id" type="number" />
      <H_column field="val1" title="Value 1" type="string" />
      <H_column field="val2" title="Value 2" type="string" filter="select" />
      <H_column field="val3" title="Value 3" type="string" :auto-height="true" class="text-err" />
      <H_column field="val4" title="Value 4" type="string" />
      <H_column field="val5" title="Value 5" type="bool" />
      <H_column field="val6" title="Value 6" type="date" :auto-height="true" />
      <H_column field="val7" title="Value 7" type="string" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import { getData } from "./testData/data";
import { localData } from "../lib/Components/datagrid";

const lData = new localData();

async function load() {
  await lData.startLoading();
  const data = await getData(5000);
  lData.setData(data);
  lData.loadData();
}
</script>
<style>
.pagex {
  display: flex;
}
@layer utilities {
}
</style>
