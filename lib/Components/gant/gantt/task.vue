<template>
  <div class="task">
    <div class="task-item" :style="{ left: left + 'px', width: width + 'px' }">
      <div class="task-inner" @mousedown="resizeLeft">{{ row.Id }}</div>
      <div class="task-adjust-right" @mousedown="resizeRight" />
    </div>
  </div>
  <task v-if="row.Children.length > 0 && P.row.Expanded" v-for="it in row.Children" :key="it.Id" :row="it" />
</template>

<script setup lang="ts">
import { PropType, inject, onMounted, ref } from "vue";
import { iTask } from "../data/taskModel";
import { iGantt } from "../provide/gantt";
import { TaskResize } from "../gantt/taskResize";

const P = defineProps({
  row: { type: Object as PropType<iTask>, default: null },
});
const E = defineEmits([]);

const GT = inject("GT") as iGantt;
const width = ref(0);
const left = ref(0);

function resizeLeft(e: MouseEvent) {
  TaskResize(left, e);
}

function resizeRight(e: MouseEvent) {
  TaskResize(width, e);
}

onMounted(() => {
  width.value = ((P.row.EndTime.valueOf() - P.row.StartTime.valueOf()) / 1000) * GT.pixelPrSec;
  left.value = ((P.row.StartTime.valueOf() - GT.StartTime.valueOf()) / 1000) * GT.pixelPrSec;
});
</script>

<style>
.task {
  position: relative;
  display: flex;
  max-height: var(--gantt-row-height);
  min-height: var(--gantt-row-height);
  min-width: var(--gantt-scroll-width);
  border-bottom: solid 1px var(--col-bg-3);
  align-items: center;
  z-index: 1;
}
.task-item {
  display: flex;
  position: absolute;
  align-items: center;
  height: 20px;
  font-size: 10px;
  background-color: rgb(13, 101, 101);
  color: white;
  pointer-events: all;
  user-select: auto;
  z-index: 1;
  border-radius: 4px;
}

.task-adjust-right {
  height: 100%;
  width: 4px;
  cursor: col-resize;
  background-color: aqua;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}
.task-adjust-right:hover {
  opacity: 1;
}

.task-inner {
  flex: 1;
  text-align: center;
  cursor: move;
}

.task-item:hover {
  color: red;
}
</style>
