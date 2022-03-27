<template>
  <div class="datagrid_localdata">
    <div class="datagrid_localdata__box">
      <div class="Datagrid__toolbar">
        <H_btn @click="load" start-icon="zoom_out_map" end-icon="filter">Load</H_btn>
        <H_spacer />
        <H_input v-model="seek" clearable placeholder="Search" endIcon="search" style="max-width: 200px" />
      </div>

      <H_datagridVscroll
        data-key="id"
        :groups="['Value 2', 'Value 4']"
        :search="seek"
        :searchFields="['id', 'val1', 'val2', 'val4']"
        :dataHandler="DataHandler"
        :page-size="100"
      >
        <H_column field="id" title="Action" type="action" :width="80">
          <template v-slot="col">
            <H_btn size="sm">{{ col.data.id }}</H_btn>
          </template>
        </H_column>
        <H_column field="id" title="Id" type="number" filter_type="number" />
        <H_column field="val1" title="Value 1" type="string" filter_type="string" class="sofus" />
        <H_column field="val6" title="Value 6" type="date" filter_type="datetime" :format="formatDate" />
        <H_column
          field="val2"
          title="Value 2"
          type="string"
          filter_type="select"
          filter_condition="equal"
          :select_list="[
            { label: 'G1', value: 'Group 1.' },
            { label: 'G2', value: 'Group 2.' },
            { label: 'G3', value: 'Group 3.' },
            { label: 'G4', value: 'Group 4.' },
            { label: 'G5', value: 'Group 5.' },
            { label: 'G6', value: 'Group 6.' },
            { label: 'G7', value: 'Group 7.' },
            { label: 'G8', value: 'Group 8.' },
            { label: 'G9', value: 'Group 9.' },
            { label: 'G10', value: 'Group 10.' }
          ]"
        />
        <H_column field="val3" title="Value 3" type="string" :cell_style="styleCell" />
        <H_column field="val5" title="Value 5" type="bool" filter_type="bool" filter_condition="bool_list" />
        <H_column field="val4" title="Value 4" type="string" filter_type="select" />
      </H_datagridVscroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { D_01_dec_2021_HHMM } from "../../../lib/utils/dateFormat";
import { dataHandler } from "../../../lib/Components/datagrid/virtualScroll";
import { JsonData } from "../../../lib/Components/datagrid/datahandlers/JsonData";
import { getData } from "../../testData/data";

const seek = ref("");
const json_data = new JsonData();
json_data.setDataSource(getData(100000));

const DataHandler = new dataHandler(
  async (QueryObject?) => {
    return await json_data.getData(QueryObject);
  },
  async (QueryObject?) => {
    return await json_data.getCount(QueryObject);
  },
  async (field: string) => {
    return json_data.getSelectList(field);
  }
);

function formatDate(value: any) {
  return D_01_dec_2021_HHMM(value);
}

function styleCell() {
  return {
    color: "orange"
  };
}

function load() {
  DataHandler.Load();
}
</script>

<style>
.sofus {
  color: red;
}
.datagrid_localdata {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  height: 80vh;
}

.datagrid_localdata__box {
  display: grid;
  padding: 4px;
  grid-template-rows: auto 1fr;
  overflow: hidden;
}

.datagrid_localdata .Datagrid__toolbar {
  display: flex;
  align-items: center;
  padding: 4px;
}

.datagrid_localdata .box .box__headline {
  width: 150px;
  font-size: 18px;
  font-weight: bold;
}
</style>
