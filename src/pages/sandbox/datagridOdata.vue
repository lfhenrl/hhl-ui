<template>
  <div class="datagrid_localdata">
    <div class="datagrid_localdata__box">
      <div class="Datagrid__toolbar" style="margin-bottom: 16px">
        <H_btn @click="load" start-icon="zoom_out_map" end-icon="filter">Load</H_btn>
        <H_spacer />
        <H_inputText v-model="seek" :debounce="300" clearable endIcon="search" style="max-width: 200px" />
      </div>

      <H_datagrid
        data-key="id"
        :dataHandler="lData"
        :filter-list="['id']"
        :filterstring="seek"
        virtualscroll
        :virtualscroll_keeps="55"
        :virtualscroll_rowheight="44"
        :row_style="rowStyle"
        @row-click="rowClick"
        @head-click="headClick"
      >
        <H_column field="Id" title="Id" type="number" filter_type="number" cell-class="sofus" />
        <H_column field="FirstName" title="FirstName" type="string" filter_type="string" class="sofus" />
        <H_column field="LastName" title="LastName" type="string" filter_type="string" />
      </H_datagrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { odata } from "../../../lib/Components/datagrid";
import H_datagrid from "../../../lib/Components/datagrid/H_datagrid.vue";
import H_column from "../../../lib/Components/datagrid/H_column.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputText from "../../../lib/Components/H_inputText.vue";
import { iClickData } from "../../../lib/SubComponents/datagrid/provide/datagridTypes";

const seek = ref("");
const lData = new odata("http://localhost:5108/api/users");

async function loadData() {
  await lData.setDataSource();
}

function headClick(data: iClickData) {
  console.log("headClick :", data);
}

function rowClick(data: iClickData) {
  console.log("rowClick :", data);
}

function rowStyle(row: any) {
  if (row._type !== "row") return;
  if (row.id > 5) {
    return {
      color: "orange"
    };
  }
}

async function load() {
  lData.rowsLoading.value = true;
  setTimeout(async () => {
    await loadData();
    lData.loadData();
  }, 20);
}
</script>

<style>
.sofus {
  color: red;
}

.slotBtn {
  display: flex;
  align-items: center;
  height: 100%;
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
  gap: 10px;
}

.datagrid_localdata .box .box__headline {
  width: 150px;
  font-size: 18px;
  font-weight: bold;
}
</style>
