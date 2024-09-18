<template>
  <div class="task">
    <div ref="task" class="task-item" :data-id="row.Id" data-type="task_container">
      <div class="task-inner" data-type="task">{{ row.Id }}</div>
      <div class="task-adjust-right" data-type="task_adjustRight" />
      <div class="task-connector" data-type="task_connectorRight" />
    </div>
  </div>
  <template v-if="row.Children.length > 0 && P.row.Expanded">
    <task v-for="it in row.Children" :key="it.Id" :row="it" />
  </template>
</template>

<script setup lang="ts">
import { PropType, inject, onMounted, onUpdated, ref } from "vue";
import { iRow } from "../data/rowModel";
import { iGantt } from "../provide/gantt";
import { Task } from "../data/Task";

const P = defineProps({
  row: { type: Object as PropType<iRow>, default: null },
});
const GT = inject("GT") as iGantt;
const task = ref();

onUpdated(() => {
  console.log("UPDATED ", P.row.Name);
});

onMounted(() => {
  const t = new Task(GT, task.value, P.row);
  GT.Tasks[P.row.Id] = t;
});
</script>

<style>
@layer hhl-components {
  .task {
    position: relative;
    display: flex;
    max-height: var(--gantt-row-height);
    min-height: var(--gantt-row-height);
    min-width: var(--gantt-scroll-width);
    border-bottom: solid 1px var(--col-bg-3);
    align-items: center;
    z-index: 1;
    pointer-events: none;
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

  .task-connector {
    position: absolute;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    right: -10px;
  }
  .task-connector:hover {
    background-color: aqua;
  }
}
</style>
../data/rowModel
