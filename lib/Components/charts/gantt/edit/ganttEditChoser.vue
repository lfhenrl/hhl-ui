<template>
  <H_dialog :modelValue="show">
    <template #header>Action</template>
    <div class="gantt_datagrid_Dialog">
      <H_btn type="outline" size="sm" @click="addFolder">Add folder</H_btn>
      <H_btn type="outline" size="sm" @click="addTask">Add task</H_btn>
      <H_btn type="outline" size="sm" @click="addMileStone">Add milestone</H_btn>
      <H_btn type="outline" size="sm" @click="edit">Edit</H_btn>
    </div>
    <template #footer>
      <H_btn @click="cancel" type="outline" size="sm">Cancel</H_btn>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import { inject } from "vue";
import H_dialog from "../../../popup/H_dialog.vue";
import { DateAddDays } from "../../../../utils/dateFunctions";
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
  add("data", "milestone", 0);
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
    level: 0,
    expanded: false,
    startTime: new Date(parent.data.startTime),
    endTime: new Date(DateAddDays(parent.data.startTime, duration)),
    children: []
  };
  const _bar = new ganttItem(gantt, item, 0);
  gantt.ganttData.dataStore[item.id] = { data: item, bar: _bar };
  parent.data.children.push(item);
  parent.data.expanded = true;
  parent.bar.updateFromChild();
  gantt.ganttData.makeGridData();
  console.log("xxxxxxxx", parent);
  gantt.ganttData.groupData();
}

// hhl.ignoreEmitPropErrors(props);
</script>
