<template>
  <div
    class="rowGroup"
    :class="dropStyle"
    draggable="true"
    @dragstart="startDrag($event)"
    @drop="drop($event)"
    @dragover="dragOver($event)"
    @dragleave="dragLeave($event)"
  >
    <div class="rowGroup-content" :style="{ minWidth: thisCol[0].Width.value, maxWidth: thisCol[0].Width.value }">
      <div class="rowGroup-icon" :style="{ marginLeft: level * 12 + 'px' }">
        <div v-if="row.Children.length > 0" @click="click">
          <H_icon v-if="row.Expanded" icon="expand_down" size="24px" style="margin-left: -6px" />
          <H_icon v-else icon="expand_right" size="24px" style="margin-left: -6px" />
        </div>
        <H_icon v-else icon="event" size="12px" style="margin-left: 1px" />
      </div>
      <div class="rowGroup-title">
        {{ row.Name }}
      </div>
    </div>
    <body-cell v-for="col in gColumns" :col="col" :row="row" />
  </div>
  <row-group
    v-if="row.Children.length > 0 && P.row.Expanded"
    :level="level + 1"
    :row="item"
    v-for="item in row.Children"
    :key="item.Id"
  />
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, toRaw } from "vue";
import H_icon from "../../H_icon.vue";
import bodyCell from "../datagrid/bodyCell.vue";
import { iGantt } from "../provide/gantt";
import { iColumn } from "../data/columnModel";
import { debounce } from "../../../utils/debounce";

const P = defineProps({
  row: { type: Object, default: {} },
  level: { type: Number, default: 0 },
});

const dropStyle = ref("");
const GT = inject("GT") as iGantt;

const thisCol = computed(() => {
  return GT.Columns.filter((col: iColumn) => col.Field === "Name");
});

const gColumns = computed(() => {
  return GT.Columns.filter((col: iColumn) => col.Field !== "Name");
});

function click() {
  P.row.Expanded = !P.row.Expanded;
}

const setDropStyle = debounce((name: string) => {
  dropStyle.value = name;
}, 10);

function startDrag(e: DragEvent) {
  e.dataTransfer!.dropEffect = "move";
  e.dataTransfer!.effectAllowed = "move";
  GT.DragSourceId = P.row.Id;
  console.log("sss ", GT.DragSourceId, P.row.Id);
}

function drop(e: DragEvent) {
  setDropStyle("");
  console.log("sss ", GT.DragSourceId, P.row.Id);
  const item = GT.findId(toRaw(GT.Data), P.row.Id, null);
  console.log("node ", item);
  // console.log("dragOver", "pos:", pos, "target:", props.id, "source:", dg.draggedItemId);
}

function dragOver(e: DragEvent) {
  if (GT.DragSourceId === P.row.Id) return;

  setDropStyle("dropGroup");
  e.preventDefault();
}

function dragLeave(_e: DragEvent) {
  setDropStyle("");
}

onMounted(() => {
  GT.ActiveRows.value[P.row.Id] = 0;
  GT.ActiveRows.value = { ...GT.ActiveRows.value };
});

onUnmounted(() => {
  delete GT.ActiveRows.value[P.row.Id];
  GT.ActiveRows.value = { ...GT.ActiveRows.value };
});
</script>

<style>
.rowGroup {
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: var(--gantt-row-height);
  max-height: var(--gantt-row-height);
  pointer-events: all;
  border-bottom: 1px solid var(--col-bg-4);
}

.rowGroup.dropGroup {
  outline: 2px solid var(--col-pri);
  outline-offset: 1px;
}

.rowGroup-content {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-right: 1px solid var(--col-bg-4);
  padding: 3px;
}

.rowGroup-icon {
  width: 18px;
  pointer-events: all;
}
.rowGroup-icon:hover {
  zoom: 1.1;
}
</style>
