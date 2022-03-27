<template>
  <div
    class="GroupRowGantt oddEven"
    draggable="true"
    :class="[dg.SelectClassName, dropStyle]"
    @dragstart="startDrag($event)"
    @drop="drop($event)"
    @dragover="dragOver($event)"
    @dragleave="dragLeave($event)"
    :data-id="data.id"
    data-field="text"
    data-orgindex="0"
  >
    <div class="GroupRowGantt__content H_datagridRowCell" :class="[columns[1].className]" :style="style">
      <H_icon
        :disabled="data.children.length < 1 ? true : null"
        :icon="data.expanded ? 'expand_down' : 'expand_right'"
        btn
        @click="expanded"
        class="GroupRowGantt_Expander"
      />
      {{ data.text }}
      <span class="GroupRowGantt__childCount"> ({{ data.children.length }})</span>
      <H_spacer />
      <H_icon icon="menuSmall" btn class="GroupRowGantt_Menu" :data-id="data.id" data-field="userAction" data-orgindex="0" />
    </div>
    <H_datagridRowCell :key="2" :column="columns[2]" :data="data" :data-id="data.id" />
  </div>

  <H_rowGantt
    v-if="data.expanded && data.children.length > 0"
    v-for="item in data.children"
    :id="item.id"
    :data="item"
    :type="item.type"
  />
</template>

<script setup lang="ts">
import { computed, inject, PropType, ref } from "vue";
import { debounce } from "../../../../utils/debounce";
import { iDatagrid } from "../../../datagrid/provide";
import H_icon from "../../../H_icon.vue";
import { iChartGantt } from "../common";
// import H_rowGantt from "./H_rowGantt.vue";

const props = defineProps({
  id: { type: String, default: "" },
  type: { type: String, default: "" },
  index: { type: Number, default: -1 },
  data: { type: Object as PropType<any>, default: () => {} }
});

const dg = inject("dg") as iDatagrid;
const gantt = inject("gantt") as iChartGantt;
const columns = dg.Columns;
const dropStyle = ref("");

const setDropStyle = debounce((name: string) => {
  dropStyle.value = name;
}, 10);

function expanded() {
  props.data.expanded = !props.data.expanded;
  gantt.Event.emit("gridRowExpanded");
}

const style = computed(() => {
  return {
    paddingLeft: (props.data.level - 1) * 15 + "px"
  };
});

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
    pos });
  // console.log("dragOver", "pos:", pos, "target:", props.id, "source:", dg.draggedItemId);
}

function dragOver(e: DragEvent) {
  if (props.id === dg.draggedItemId) return;
  if (props.data.id === dg.draggedItemPid) return;
  setDropStyle("dropGroup");
  e.preventDefault();
}

function dragLeave(_e: DragEvent) {
  setDropStyle("");
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
.GroupRowGantt {
  display: flex;
  max-height: var(--gantt-bar-height);
  min-height: var(--gantt-bar-height);
  border-bottom: var(--col-bg-3) 1px solid;
  position: relative;
}

.GroupRowGantt:hover {
  background-color: var(--col-bg-3);
}

.GroupRowGantt__content {
  display: flex;
  align-items: center;
}

.GroupRowGantt__content *[disabled] {
  opacity: 0.3;
}

.GroupRowGantt_Expander {
  /* margin-left: -3px; */
  min-width: 20px;
}

.GroupRowGantt__childCount {
  font-size: 0.9em;
  margin-left: 5px;
  opacity: 0.7;
}

.GroupRowGantt_Add {
  display: none;
  min-width: 20px;
  z-index: 11;
}
.GroupRowGantt_AddIcon {
  min-width: 20px;
  background-color: lime;
  border-radius: 50%;
  pointer-events: none;
}

.H_rowGantt.groupRow.dropGroup .GroupRowGantt_Add {
  display: flex;
  align-items: center;
}

.GroupRowGantt_Menu {
  min-width: 20px;
  margin-right: -1px;
  color: var(--col-pri-light);
}
</style>
