<template>
  <div class="hhl-gridlines gridBox" :style="st">
    <div class="hhl-gridlines_box" v-for="({}, index) in cells" :key="index"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { debounce } from "../utils/debounce";

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

const HhlGridlines = defineComponent({
  name: "hhl-gridlines",
  setup() {
    let grid: HTMLElement;
    const adjustGrid = debounce(_adjustGrid, 100);
    const cells = ref(0);
    const st = {
      gridTemplateAreas: "",
      gridTemplateColumns: "",
      gridTemplateRows: "",
      justifyContent: "",
      alignContent: "",
      padding: "",
      gap: ""
    };

    function _adjustGrid() {
      const style = getComputedStyle(grid);
      st.gridTemplateAreas = gridArea(style.gridTemplateAreas);
      st.gridTemplateColumns = style.gridTemplateColumns;
      st.gridTemplateRows = style.gridTemplateRows;
      st.justifyContent = style.justifyContent;
      st.alignContent = style.alignContent;
      st.padding = style.padding;
      st.gap = style.gap;
      const countRows = style.gridTemplateRows.split(" ").length;
      const countCols = style.gridTemplateColumns.split(" ").length;
      cells.value = 0;
      setTimeout(() => {
        cells.value = countRows * countCols;
      }, 10);
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

    return { cells, st };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-gridlines": typeof HhlGridlines;
  }
}
export type iHhlGridlines = InstanceType<typeof HhlGridlines>;
export default HhlGridlines;
</script>

<style>
.hhl-gridlines {
  position: absolute !important;
  background-color: transparent !important;
  top: -0.5px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  grid-area: unset;
  pointer-events: none;
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
