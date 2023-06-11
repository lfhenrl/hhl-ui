<template>
  <H_datagridGantt ref="dgrid" class="gantt_datagrid" @row-clicked="rowClicked" @loaded="loaded">
    <H_column field="group" title="Group" type="string" :visibel="false" :width="0" />
    <H_column field="text" title="Title" type="userAction" :width="250">
      <template v-slot="col">
        <div class="gantt_datagrid__colTitle">
          <span>{{ col.data.text }}</span>
          <H_spacer />
          <H_icon icon="menuSmall" :data-id="col.data.id" data-field="userAction" data-orgindex="0" />
        </div>
      </template>
    </H_column>
    <H_column field="workDays" title="Days" type="action" :width="40"  />
  </H_datagridGantt>
</template>

<script setup lang="ts">
import { ref, watch, inject } from "vue";
import { iDatagrid } from "../../../datagrid/provide";
import { iChartGantt } from "../common";

const props = defineProps({
  barHeight: { type: Number, default: 30 },
  timeHeight: { type: Number, default: 22 },
  scrollTop: { type: Number, default: 0 }
});
const emit = defineEmits(["rowClicked", "loaded"]);
defineExpose({ update });

const gantt = inject("gantt") as iChartGantt;
const dgrid = ref();

let dg: iDatagrid;
let gridData: any;
let scroller: any;

watch(
  () => props.scrollTop,
  () => {
    scroller.value.scrollTop = props.scrollTop;
  }
);

gantt.Event.on("setGriddata", (val) => {
  gridData.value = val;
  update();
});

gantt.Event.on("LigtUpdateGriddata", () => {
  dgrid.value.update();
});

gantt.Event.on("gridRowExpanded", () => {
  gantt.ganttData.renderChart();
});


function update() {
  dgrid.value.update();
}

function loaded(grid: any) {
  dg = grid.dg;
  gridData = grid.gridData;
  scroller = grid.vList;
  emit("loaded", grid);
  gantt.dg = dg;

  dg.Event.on("dragDrop", (data) => {
    gantt.ganttData.dragDrop(data);
  });

  dg.Event.on("userAction", (_data) => {
    gantt.Event.emit("userAction", "root");
  });
}

function rowClicked(data: any) {
  emit("rowClicked", data);
  if (data.field === "userAction") {
    gantt.Event.emit("userAction", data.id);
  }
}
</script>

<style>
.gantt_datagrid__colTitle {
  display: flex;
  flex: 1;
  align-items: center;
}
.gantt_datagrid__colTitle span {
  flex: 1;
}

.gantt_datagrid__colTitle .H_icon {
  color: var(--col-pri);
  margin-right: -1px;
}

.gantt_datagrid_Dialog {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
