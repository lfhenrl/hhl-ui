<template>
  <GanttEditChoser :show="showChoser" :active-id="activeId" @close="choserClose" />
  <GanttEditEdit :show="showEdit" :active-id="activeId" @close="editClose" />
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { iChartGantt } from "../common";
import GanttEditChoser from "./ganttEditChoser.vue";
import GanttEditEdit from "./ganttEditEdit.vue";

const gantt = inject("gantt") as iChartGantt;
const showChoser = ref(false);
const showEdit = ref(false);
const activeId = ref("");

gantt.Event.on("userAction", (data: any) => {
  if (data === "root") {
    activeId.value = gantt.ganttData.rootId;
    showChoser.value = true;
    return;
  } else {
    activeId.value = data;
  }

  const item = gantt.ganttData.dataStore[activeId.value].data;
  if (item.type === "group") {
    showChoser.value = true;
  } else {
    showEdit.value = true;
  }
});

function choserClose(data: string) {
  console.log("choserClose", data);
  showChoser.value = false;
  if (data === "edit") {
    showEdit.value = true;
  }
}

function editClose(data: string) {
  console.log("editClose", data);
  showEdit.value = false;
}
</script>
