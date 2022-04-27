<template>
  <div class="hhl-gridlines H_grid" :style="styl">
    <div class="hhl-gridlines_box" v-for="({}, index) in cells" :key="index" :title="'C' + (index + 1)"></div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { debounce } from "../../utils/debounce";

function gridArea(a: string) {
  if (a === "none") {
    return a;
  }
  let newArea = "";
  let i = 1;
  const arr = a.split(`" "`);

  arr.forEach((ele) => {
    const arrEle = ele.split(" ");
    newArea = newArea + "'";
    let str = "";
    arrEle.forEach(() => {
      str = str + ` c${i}`;
      i = i + 1;
    });
    newArea = newArea + str.trim() + "' ";
  });
  return newArea;
}

let grid: HTMLElement;
const adjustGrid = debounce(_adjustGrid, 100);
const cells = ref(0);
const styl = ref({
  gridTemplateAreas: "",
  gridTemplateColumns: "",
  gridTemplateRows: "",
  justifyContent: "",
  alignContent: "",
  padding: "",
  gap: "",
  gridArea: "" as any
});

function _adjustGrid() {
  const style = getComputedStyle(grid);
  const grid_area: any = gridArea(style.gridTemplateAreas);
  styl.value.gridTemplateAreas = gridArea(style.gridTemplateAreas);
  styl.value.gridTemplateColumns = style.gridTemplateColumns;
  styl.value.gridTemplateRows = style.gridTemplateRows;
  styl.value.justifyContent = style.justifyContent;
  styl.value.alignContent = style.alignContent;
  styl.value.padding = style.padding;
  styl.value.gap = style.gap;
  styl.value.gridArea = grid_area === "none" ? null : "none";
  const countRows = style.gridTemplateRows.split(" ").length;
  const countCols = style.gridTemplateColumns.split(" ").length;
  cells.value = 0;
  cells.value = countRows * countCols;
}

onMounted(() => {
  const instance = getCurrentInstance();
  grid = instance?.parent?.vnode.el as HTMLElement;
  adjustGrid();
  window.addEventListener("resize", adjustGrid);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustGrid);
});
</script>

<style>
.hhl-gridlines {
  /* grid-area: none !important; */
  position: absolute !important;
  background-color: transparent !important;
  top: -0.5px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  grid-area: unset;
  pointer-events: all;
}
.hhl-gridlines_box {
  outline: 1px dashed gray !important;
  outline-offset: 1px;
  background-color: transparent !important;
  height: auto !important;
  width: auto !important;
  min-height: auto !important;
  min-width: auto !important;
}
</style>
