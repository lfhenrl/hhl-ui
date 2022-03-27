<template>
  <div
    v-if="type === 'data'"
    :class="itemClass"
    class="H_rowGantt_data oddEven"
    draggable="true"
    :data-id="data.id"
    :data-type="data.type"
    data-field="text"
    @dragstart="startDrag($event)"
    @drop="drop($event)"
    @dragover="dragOver($event)"
    @dragleave="dragLeave($event)"
  >
    <H_datagridRowCell
      v-for="(col, cellIndex) in columns"
      :key="String(cellIndex)"
      :column="col"
      :data="data"
      :data-id="data.id"
      :style="{ paddingLeft: levelAdjust(data, col.props) }"
    />
  </div>
  <GroupRowGantt v-else :id="id" :data="data" :type="type" :index="index" />
  <!-- </div> -->
</template>

<script setup lang="ts">
import { computed, inject, PropType, ref } from "vue";
import { debounce } from "../../../../utils/debounce";
import { iDatagrid } from "../../../datagrid/provide";
import H_datagridRowCell from "../../../datagrid/sub/H_datagridRowCell.vue";
import GroupRowGantt from "./GroupRowGantt.vue";

const props = defineProps({
  id: { type: String, default: "" },
  type: { type: String, default: "" },
  index: { type: Number, default: -1 },
  data: { type: Object as PropType<any>, default: () => {} }
});

const dg = inject("dg") as iDatagrid;
const columns = dg.Columns;
const dropStyle = ref("");

const setDropStyle = debounce((name: string) => {
  dropStyle.value = name;
}, 10);

const itemClass = computed(() => {
  const isData = props.type === "data";
  const rowSelector = isData ? dg.SelectClassName : "";
  return `${rowSelector} ${dropStyle.value}`;
});

function levelAdjust(data: any, props: any) {
  if (props.field !== "text") return "";

  let padding = 25 + (data.level - 2) * 15;

  return padding - 1 + "px";
}

function startDrag(e: DragEvent) {
  e.dataTransfer!.dropEffect = "move";
  e.dataTransfer!.effectAllowed = "move";
  dg.draggedItemId = props.id;
  dg.draggedItemPid = props.data.pId;
  dg.draggedItemType = props.type;
}

function drop(e: DragEvent) {
  setDropStyle("");
  const pos = getPosition(e);
  dg.Event.emit("dragDrop", {
    sourceId: dg.draggedItemId,
    targetId: props.id,
    pos
  });
  console.log("dragOver", "pos:", pos, "target:", props.id, "source:", dg.draggedItemId);
}

let dragOverActive = false;
function dragOver(e: DragEvent) {
  if (props.id === dg.draggedItemId) return;
  if (dg.draggedItemType === "group") return;
  const pos = getPosition(e);
  if (dragOverActive) {
    if (pos === "over") return;
  }
  setDropStyle("dropGroup");
  dragOverActive = true;
  // console.log("dragOver", "pos:", pos, "target:", props.id, "source:", dg.draggedItemId);
  e.preventDefault();
}

function dragLeave(_e: DragEvent) {
  setDropStyle("");
  dragOverActive = false;
}

function getPosition(e: DragEvent) {
  const height = (e.target! as HTMLElement).clientHeight;
  const top = e.offsetY;
  if (top > 0 && top <= height) return "over";
  if (top < 0) return "before";
  if (top > height) return "after";

  return "";
}
</script>
<style>
.H_rowGantt_data {
  display: flex;
  max-height: var(--gantt-bar-height);
  min-height: var(--gantt-bar-height);
  border-bottom: var(--col-bg-3) 1px solid;
  position: relative;
}

.H_rowGantt_data:hover {
  background-color: var(--col-bg-3);
}

.dropGroup {
  margin: 25px 0;
  border-top: var(--col-bg-3) 1px solid;
  transition: all 300ms;
  border-color: var(--comp-border-color-focus);
}

.dropGroup::before {
  content: "";
  background-color: transparent;
  border-bottom: var(--col-bg-3) 1px solid;
  border-top: var(--col-bg-3) 1px solid;
  border-color: var(--comp-border-color-focus);
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  bottom: -25px;
}
</style>
