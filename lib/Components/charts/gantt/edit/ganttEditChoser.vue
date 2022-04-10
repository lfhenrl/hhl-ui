<template>
  <H_dialog :modelValue="show">
    <template #header>Action</template>
    <div class="gantt_datagrid_Dialog">
      <H_btn type="outline" @click="addFolder">Add folder</H_btn>
      <H_btn type="outline" @click="addTask">Add task</H_btn>
      <H_btn type="outline" @click="addMileStone">Add milestone</H_btn>
      <H_btn type="outline" @click="edit">Edit</H_btn>
    </div>
    <template #footer>
      <H_btn @click="cancel" class="col-sec">Cancel</H_btn>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import { inject } from "vue";
import H_dialog from "../../../popup/H_dialog.vue";
// import { DateAddDays } from "../../../../utils/dateFunctions";
import { ganttItem } from "../chart/ganttItem";
import { iChartGantt } from "../common";

const props = defineProps({
  activeId: { type: String, default: "" },
  show: { type: Boolean, default: false }
});
const emit = defineEmits(["close"]);

const gantt = inject("gantt") as iChartGantt;

function cancel() {
  emit("close", "cancel");
}

function addFolder() {
  add("group", "Folder", 0);
  emit("close", "addFolder");
}

function addTask() {
  add("data", "Task", 1);
  emit("close", "addTask");
}

function addMileStone() {
  add("data", "Milestone", 1);
  emit("close", "addMileStone");
}

function edit() {
  emit("close", "edit");
}

function add(type: string, subType: string, duration: number) {
  const ID = props.activeId === "root" ? gantt.ganttData.rootId : props.activeId;
  const parent = gantt.ganttData.dataStore[ID];
  const item = {
    id: gantt.ganttData.getGuid(),
    pId: parent.data.id,
    text: "New " + subType,
    type: type,
    subType,
    workLoad: 100,
    progress: 0,
    level: parent.data.level + 1,
    expanded: false,
    startTime: parent.data.startTime,
    endTime: parent.data.startTime + duration * gantt.ganttData.dayInSeconds,
    children: []
  };
  const _bar = new ganttItem(gantt, item, 0);
  gantt.ganttData.dataStore[item.id] = { data: item, bar: _bar };
  parent.data.children.push(item);
  parent.data.expanded = true;
  parent.bar.updateFromChild();
  gantt.ganttData.makeGridData();
  console.log("xxxxxxxx", parent);
  gantt.ganttData.renderChart();
}
// hhl.ignoreEmitPropErrors(props);
</script>
