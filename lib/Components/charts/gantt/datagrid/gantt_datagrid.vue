<template>
  <H_datagrid
    ref="dgrid"
    class="gantt_datagrid"
    data-key="id"
    :groups="['Group']"
    :dataHandler="DataHandler"
    :page-size="100"
    hide-footer
    @rawdata="onData"
  >
    <H_column field="group" title="Group" type="string" filter_type="select" :width="100" :visibel="false" />
    <H_column field="text" title="Title" type="action" />
    <H_column field="days" title="Days" type="action" :width="40" />
    <H_group-row>
      <template v-slot="data">
        <div class="gantt_datagrid_groupRow">
          <div class="H_datagridRowCell" :class="[data.columns[1].className]">
            <H_icon
              class="gantt_datagrid_groupRowExpander"
              :icon="data.props.expanded ? 'expand_down' : 'expand_right'"
              btn
              @click="data.click"
            />
            {{ data.props.name }}
            <span class="H_datagridGroupRow__childCount"> ({{ data.props.childRowsCount }})</span>
          </div>

          <div class="H_datagridRowCell" :class="[data.columns[2].className]">
            {{ data.props.data.days }}
          </div>
        </div>
      </template>
    </H_group-row>
  </H_datagrid>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, inject } from "vue";
import { dataHandler } from "../../../datagrid/dataController";
import { JsonData } from "../../../datagrid/datahandlers/JsonData";
import { iChartGantt } from "../common";

const props = defineProps({
  barHeight: { type: Number, default: 30 },
  timeHeight: { type: Number, default: 22 },
  scrollTop: { type: Number, default: 0 }
});
// const emit = defineEmits([]);
defineExpose({ update });
const json_data = new JsonData();
const gantt = inject("gantt") as iChartGantt;

const dgrid = ref();
let scroller: HTMLElement;

watch(
  () => props.scrollTop,
  () => {
    scroller.scrollTop = props.scrollTop;
  }
);

gantt.Event.on("setGriddata", (val) => {
  json_data.setDataSource(val);
  DataHandler.Load();
});

function update() {
  dgrid.value.update();
}

function onData(data: any) {
  gantt.ganttData.groupData(data);
}

const DataHandler = new dataHandler(
  async (QueryObject?) => {
    return json_data.getData(QueryObject);
  },
  async (QueryObject?) => {
    return await json_data.getCount(QueryObject);
  },
  async (field: string) => {
    return json_data.getSelectList(field);
  }
);

onMounted(() => {
  setTimeout(() => {
    scroller = dgrid.value.$el.querySelector(".H_virtualList") as HTMLElement;
    // DataHandler.Load();
  });
});
</script>

<style>
.gantt_datagrid {
  box-shadow: none;
}
.gantt_datagrid .H_datagrid-header {
  min-height: calc(var(--gantt-time-totalheight) + 1px);
  max-height: calc(var(--gantt-time-totalheight) + 1px);
  margin-bottom: .5px;
  font-size: 0.85em;
}

.gantt_datagrid .H_datagridRow {
  max-height: var(--gantt-bar-height);
  min-height: var(--gantt-bar-height);
}

.gantt_datagrid .H_virtualList {
  overflow-y: hidden !important;
  overflow-x: scroll;
  margin-right: -4px;
}

.gantt_datagrid .H_virtualList-scroller {
  margin-bottom: 4px;
  font-size: 0.85em;
}

.gantt_datagrid_groupRow {
  display: flex;
  background-color: var(--col-bg-3);
}

.gantt_datagrid_groupRowExpander {
  margin-left: -3px;
  margin-right: 6px;
}
</style>
