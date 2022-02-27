
<template>
  <div class="datagrid_fetch">
    <h1>datagrid_fetch</h1>
    <div class="datagrid_fetch_box">
      <div class="Datagrid__toolbar">
        <H_btn @click="load" start-icon="zoom_out_map" end-icon="filter">Load</H_btn>
        <H_spacer />
        <H_input v-model="seek" clearable placeholder="Search" endIcon="search" style="max-width: 200px" />
      </div>

      <H_datagrid
        data-key="rec_id"
        :groups="['State']"
        :search="seek"
        :searchFields="['rec_id', 'ent_id', 'mode', 'state']"
        :dataHandler="DataHandler"
        :page-size="100"
      >
        <H_column field="rec_id" title="Id" type="number" filter_type="number" />
        <H_column field="event_time" title="Time" type="date" filter_type="datetime" :format="formatDate" :width="160" />
        <H_column field="ent_id" title="ent_id" type="string" filter_type="string" />
        <H_column field="mode" title="Mode" type="string" filter_type="select" />
        <H_column field="state" title="State" type="string" filter_type="string" />
        <H_column field="is_planned" title="Planned" type="bool" filter_type="bool" />
      </H_datagrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { hhlFetch } from "../../../lib/utils/hhlFetch";
import { D_01_dec_2021_HHMM } from "../../../lib/utils/dateFormat";
import { icolumnData, iQueryObject } from "../../../lib/Components/datagrid/datagridTypes";
import { dataHandler } from "../../../lib/Components/datagrid/dataController";

const seek = ref("");
const _fetch = new hhlFetch("http://localhost:5272/EventLog");

const DataHandler = new dataHandler(getData, getCount, getSelectList);

function formatDate(value: any, row: icolumnData) {
  return D_01_dec_2021_HHMM(new Date(value));
}

function styleCell(value: any, row: icolumnData) {
  return {
    color: "orange"
  };
}

function load() {
  DataHandler.Load();
}

async function getSelectList(field: string): Promise<string[]> {
  const d = await _fetch.get("/selectlist", { field: field });
  if (d.ok) {
    return d.data;
  } else {
    hhl.alert("err", "API Error", d.message);
    return [];
  }
}

async function getCount(QueryObject: iQueryObject): Promise<number> {
  const d = await _fetch.post("/count", QueryObject);
  if (d.ok) {
    return d.data;
  } else {
    hhl.alert("err", "API Error", d.message);
    return 0;
  }
}

async function getData(QueryObject: iQueryObject): Promise<any[]> {
  const d = await _fetch.post("", QueryObject);
  if (d.ok) {
    return d.data;
  } else {
    hhl.alert("err", "API Error", d.message);
    return [];
  }
}
</script>

<style>
.datagrid_fetch {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 80vh;
}

.datagrid_fetch_box {
  display: grid;
  padding: 4px;
  grid-template-rows: auto 1fr;
  overflow: hidden;
}

.datagrid_fetch .Datagrid__toolbar {
  display: flex;
  align-items: center;
  padding: 4px;
}

.datagrid_fetch .box .box__headline {
  width: 150px;
  font-size: 18px;
  font-weight: bold;
}
</style>
