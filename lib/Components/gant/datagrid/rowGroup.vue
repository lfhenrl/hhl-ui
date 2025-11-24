<template>
  <div
    ref="me"
    class="rowGroup"
    :class="dropStyle"
    @drop="drop()"
    @dragover="dragOver($event)"
    @dragleave="dragLeave($event)"
  >
    <div class="rowGroup-content" :style="{ minWidth: thisCol[0]?.Width.value, maxWidth: thisCol[0]?.Width.value }">
      <div draggable="true" @dragstart="startDrag($event)">
        <H_icon name="drag" btn class="cursor-move" style="margin-left: -2px" />
      </div>
      <div class="rowGroup-icon" :style="{ marginLeft: level * 12 + 'px' }">
        <div v-if="row.Children.length > 0" @click="click">
          <H_icon name="expand_down" btn v-if="row.Expanded" style="margin-left: -6px" />
          <H_icon name="expand_right" btn v-else style="margin-left: -6px" />
        </div>
        <H_icon name="event" btn v-else style="margin-left: -1px" />
      </div>
      <div class="rowGroup-title">
        {{ row?.Name }}
      </div>
    </div>
    <body-cell v-for="col in gColumns" :col="col" :row="row" />
  </div>
  <row-group
    v-if="row.Children.length > 0 && P.row.Expanded"
    :level="level + 1"
    :row="item"
    :parent-row="row"
    v-for="item in row?.Children"
    :key="item.Id"
  />
</template>

<script setup lang="ts">
import { type PropType, computed, inject, onMounted, ref } from "vue";
import bodyCell from "../datagrid/bodyCell.vue";
import H_icon from "../../../Components/H_icon.vue";
import { type iGantt } from "../provide/gantt";
import { type iColumn } from "../data/columnModel";
import { debounce } from "../../../utils/debounce";
import { type iRow } from "../data/rowModel";
import { MoveRow } from "../data/moveRowModel";

const P = defineProps({
  row: { type: Object as PropType<iRow>, default: null },
  parentRow: { type: Object as PropType<iRow>, default: null },
  level: { type: Number, default: 0 },
});

const me = ref();
const dropStyle = ref("");
const GT = inject("GT") as iGantt;

const thisCol = computed(() => {
  return GT.Columns.filter((col: iColumn) => col.Field === "Name");
});

const gColumns = computed(() => {
  return GT.Columns.filter((col: iColumn) => col.Field !== "Name");
});

function click() {
  if (!P.row) return;
  P.row.Expanded = !P.row.Expanded;
}

const setDropStyle = debounce((name: string) => {
  dropStyle.value = name;
}, 10);

function startDrag(e: any) {
  e.dataTransfer!.dropEffect = "move";
  e.dataTransfer!.effectAllowed = "move";
  GT.DragSourceRow = new MoveRow(P.row, P.parentRow, me.value);
  e.dataTransfer!.setDragImage(e.target.parentElement, 0, 0);
  //console.log("sss ", e);
}

function drop() {
  setDropStyle("");
  console.log("sss ", GT.DragSourceRow?.row?.Id, P.row?.Id);
  //const item = GT.findId(toRaw(GT.Data), P.row?.Id, null);
  const dest = new MoveRow(P.row, P.parentRow, me.value);
  if (GT.DragSourceRow) GT.dGridDom?.moveDialogOpen(GT.DragSourceRow, dest);

  // console.log("dragOver", "pos:", pos, "target:", props.id, "source:", dg.draggedItemId);
}

function dragOver(e: DragEvent) {
  if (GT.DragSourceRow?.row?.Id === P.row?.Id) return;
  setDropStyle("dropGroup");
  e.preventDefault();
}

function dragLeave(_e: DragEvent) {
  setDropStyle("");
}

onMounted(() => {
  me.value.classList.add("start-remove");
  if (!P.row) return;
  setTimeout(() => {
    me.value.classList.remove("start-remove");
  }, 5);
});
</script>

<style>
@layer components {
  .rowGroup {
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: var(--gantt-row-height);
    max-height: var(--gantt-row-height);
    pointer-events: all;
    border-bottom: 1px solid var(--color-bg4);
    transition: all 300ms;
  }

  .start-remove {
    translate: -100px;
    opacity: 0;
  }

  .rowGroup.dropGroup {
    outline: 2px solid var(--col-pri);
    outline-offset: -1px;
  }

  .rowGroup-content {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-right: 1px solid var(--coler-bg4);
    padding: 3px;
  }

  .rowGroup-icon {
    display: flex;
    align-items: center;
    padding-top: 1px;
    padding-left: 3px;
    width: 18px;
  }
  .rowGroup-icon:hover {
    zoom: 1.1;
  }
}
</style>
../data/rowModel ../data/moveRowModel
