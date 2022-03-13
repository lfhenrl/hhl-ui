<template>
  <div class="gantt_datagrid">
    <div class="gantt_datagrid_header" :style="{ minHeight: timeHeight * 2 + 1 + 'px', maxHeight: timeHeight * 2 + 1 + 'px' }">
      <div class="gantt_datagrid_header_item">Title.</div>
      <div class="gantt_datagrid_header_item">Days.</div>
      <div class="gantt_datagrid_header_item">Edit.</div>
    </div>
    <div class="gantt_datagrid_list" ref="scrollBox">
      <div class="gantt_datagrid_list_item" v-for="item in items">
        <div class="gantt_datagrid_item">ID: {{ item.id }}</div>
        <div class="gantt_datagrid_item">{{ item.index }}</div>
        <div class="gantt_datagrid_item">{{ item.fromConnectors }}</div>
      </div>
      <div class="gantt_datagrid_item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { PropType, ref } from "vue";
import { iGanttItem } from "./ganttItem";

const props = defineProps({
  items: { type: Array as PropType<iGanttItem[]>, default: [] },
  barHeight: { type: Number, default: 30 },
  timeHeight: { type: Number, default: 22 },
  scrollTop: { type: Number, default: 0 }
});
// const emit = defineEmits([]);
const scrollBox = ref();
watch(
  () => props.scrollTop,
  () => {
    scrollBox.value.scrollTop = props.scrollTop;
  }
);
</script>

<style>
.gantt_datagrid {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--col-bg-5);
  overflow-x: scroll;
  min-width: 155px;
}
.gantt_datagrid_header {
  display: flex;
  border-bottom: 1px solid var(--col-bg-5);
}
.gantt_datagrid_header_item {
  display: flex;
  align-items: center;
  border-right: 1px solid var(--col-bg-5);
  padding: 0 5px;
}
.gantt_datagrid_header > div:first-child {
  flex: 1;
}
.gantt_datagrid_header > div:last-child {
  border-right: none;
}

.gantt_datagrid_list {
  margin: 1px 0 0 0;
  overflow-y: hidden;
}
.gantt_datagrid_list_item {
  border-bottom: 1px solid var(--col-bg-5);
  min-height: var(--gantt-bar-height);
  max-height: var(--gantt-bar-height);
  display: flex;
}
.gantt_datagrid_item {
  border-right: 1px solid var(--col-bg-5);
  display: flex;
  align-items: center;
  padding: 0 5px;
}
</style>
