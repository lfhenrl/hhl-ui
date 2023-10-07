<template>
  <div class="grid h-[80vh] grid-cols-1 overflow-hidden">
    <div class="grid grid-rows-[auto_1fr] overflow-hidden p-1">
      <div class="flex items-center" style="margin-bottom: 16px">
        <H_btn @click="load" start-icon="zoom_out_map" end-icon="filter"
          >Load</H_btn
        >
        <div class="flex-1" />
        <H_inputText
          v-model="seek"
          :debounce="300"
          clearable
          endIcon="search"
          style="max-width: 200px"
        />
      </div>

      <H_datagrid
        data-key="id"
        :dataHandler="lData"
        :filter-list="['id']"
        :filterstring="seek"
        virtualscroll
        :virtualscroll_keeps="50"
        :virtualscroll_rowheight="44"
        @row-click="rowClick"
        @head-click="headClick"
      >
        <H_column field="id" title="Action" type="action" sorting="none">
          <template v-slot="col">
            <div class="flex h-full items-center">
              <H_btn size="sm">{{ col.row.id }}</H_btn>
            </div>
          </template>
        </H_column>
        <H_column
          field="id"
          title="Id"
          type="number"
          filter_type="number"
          cell-class="text-err"
        />
        <H_column
          field="val1"
          title="Value 1"
          type="string"
          filter_type="string"
          class="text-err"
        />
        <H_column
          field="val6"
          title="Value 6"
          type="date"
          filter_type="datetime"
          :format="formatDate"
        />
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
            { label: 'G10', value: 'Group 10.' },
          ]"
        />
        <H_column
          field="val3"
          title="Value 3"
          auto-height
          type="string"
          :cell_style="styleCell"
        />
        <H_column
          field="val5"
          title="Value 5"
          type="bool"
          filter_type="bool"
          filter_condition="bool_list"
        />
        <H_column
          field="val4"
          title="Value 4"
          type="string"
          filter_type="select"
        />
        <H_column
          field="val7"
          title="Value 7"
          type="string"
          filter_type="select"
        />
      </H_datagrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { D_01_dec_2021_HHMM } from "../../../lib/utils/dateFormat";
import { localData } from "../../../lib/Components/datagrid";
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputText from "../../../lib/Components/H_inputText.vue";
import { getData } from "../../testData/data";
import { iClickData } from "../../../lib/SubComponents/datagrid/provide/datagridTypes";

const seek = ref("");
const lData = new localData();

async function loadData() {
  await lData.setDataSource(getData(40000));
}

function formatDate(value: any) {
  return D_01_dec_2021_HHMM(value);
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

async function load() {
  lData.rowsLoading.value = true;
  setTimeout(async () => {
    await loadData();
    lData.loadData();
  }, 20);
}
</script>
