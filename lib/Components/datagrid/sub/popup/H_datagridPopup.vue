<template>
  <div>
    <H_modal v-model="show" class="H_datagridPopup" offset="50%" no-persistent :movable="true">
      <div ref="draggableContainer" class="H_datagridPopup__container">
        <div class="H_datagridPopup__title" moveable-drag>
          <div>{{ title }}</div>
          <H_icon btn class="col-txt-pri" size="1.9em" @click="show = false" />
        </div>
        <H_tabs :will-change="canChange">
          <H_tab icon="sorting" name="sorting" :tab_class="sortTabClass">
            <PopupSorting :data="sortData" ref="sortingPopUp" />
          </H_tab>
          <H_tab icon="filter" name="filter" :tab_class="filtTabClass">
            <PopupFilter :data="filtData" ref="filterPopUp" />
          </H_tab>
          <H_tab icon="tree" name="grouping">
            <PopupGrouping ref="groupingPopUp" />
          </H_tab>
        </H_tabs>
      </div>
    </H_modal>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { iDatagrid } from "../../provide";
import H_modal from "../../../popup/H_modal.vue";
import H_icon from "../../../H_icon.vue";
import H_tabs from "../../../navigation/H_tabs.vue";
import H_tab from "../../../navigation/H_tab.vue";
import PopupSorting from "./sorting/PopupSorting.vue";
import PopupFilter from "./filter/PopupFilter.vue";
import PopupGrouping from "./columns/PopupGrouping.vue";
import { icolumnData, icolumnFilterData, icolumnSortData } from "../../datagridTypes";

const dg = inject("dg") as iDatagrid;
const show = ref(false);
const title = ref("");
const sortData = ref<icolumnSortData>();
const filtData = ref<icolumnFilterData>();
const sortingPopUp = ref();
const filterPopUp = ref();
const groupingPopUp = ref();

dg.Event.on("showDialog", (_column: icolumnData) => {
  title.value = _column.props.title;
  sortData.value = _column.sort;
  filtData.value = _column.filt;
  show.value = true;
});

const canChange = (from: string, _to: string) => {
  if (from === "sorting") return sortingPopUp.value?.CanNavigate();
  if (from === "filter") return filterPopUp.value?.CanNavigate();
  if (from === "grouping") return groupingPopUp.value?.CanNavigate();
  return true;
};

const sortTabClass = computed(() => {
  return sortData.value?.sorting !== "none" ? "col-txt-pri" : "";
});

const filtTabClass = computed(() => {
  return !filtData.value?.isValid ? "col-txt-err" : filtData.value?.active ? "col-txt-pri" : "";
});

// Dragg popup ****************

const draggableContainer = ref<HTMLElement>();

// const positions = ref({
//   clientX: 0,
//   clientY: 0,
//   movementX: 0,
//   movementY: 0
// });

// function dragMouseDown(event: MouseEvent) {
//   event.preventDefault();
//   // get the mouse cursor position at startup:
//   positions.value.clientX = event.clientX;
//   positions.value.clientY = event.clientY;
//   document.onmousemove = elementDrag;
//   document.onmouseup = closeDragElement;
// }

// function elementDrag(event: MouseEvent) {
//   event.preventDefault();
//   positions.value.movementX = positions.value.clientX - event.clientX;
//   positions.value.movementY = positions.value.clientY - event.clientY;

//   positions.value.clientX = event.clientX;
//   positions.value.clientY = event.clientY;
//   // set the element's new position:
//   draggableContainer.value!.style.top = draggableContainer.value!.offsetTop - positions.value.movementY + "px";
//   draggableContainer.value!.style.left = draggableContainer.value!.offsetLeft - positions.value.movementX + "px";
// }

// function closeDragElement() {
//   document.onmouseup = null;
//   document.onmousemove = null;
// }
</script>

<style>
.H_datagridPopup__container {
  display: grid;
  /* position: absolute; */
  grid-template-rows: auto 1fr auto;
  box-shadow: var(--comp-shadow);
  background-color: var(--col-bg-2);
  border-radius: 4px;
  padding: 3px;
  height: 500px;
  max-height: 500px;
  width: 270px;
}

.H_datagridPopup__container .H_tabs__tab .H_icon {
  margin: 0 9px;
}
.H_datagridPopup__title {
  display: flex;
  align-items: center;
  padding: 2px;
  font-weight: bold;
  font-size: 1.1em;
}
.H_datagridPopup__title > div {
  width: 100%;
  text-align: center;
}
.H_datagridPopup__footer {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  padding: 8px 2px 4px 2px;
}
.H_datagridPopup__footer > .H_btn {
  width: 60px;
}
</style>
