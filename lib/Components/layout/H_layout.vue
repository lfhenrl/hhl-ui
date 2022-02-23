<template>
  <div class="hhl-layout gridBox" :style="style" :class="{ gridBox_autoName: areaMode }">
    <slot />
    <H_gridlines v-if="gridLines" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import H_gridlines from "./H_gridlines.vue";

const props = defineProps({
  autoName: { type: Boolean, default: false },
  gridLines: { type: Boolean, default: false },
  col: String,
  colSm: String,
  colMd: String,
  colLg: String,
  row: String,
  rowSm: String,
  rowMd: String,
  rowLg: String,
  area: String,
  areaSm: String,
  areaMd: String,
  areaLg: String,
  gap: String,
  gapSm: String,
  gapMd: String,
  gapLg: String,
  alignContent: String,
  justifyContent: String,
  alignItems: String,
  justifyItems: String
});

function getCols(col: string | undefined) {
  if (!col) {
    return null;
  }
  if (col.startsWith("autofit")) {
    const autoArray = col.split("-");
    return `repeat(auto-fit, minMax(${autoArray[1] + "px"}, 1fr))`;
  }
  return col;
}

function getArea(area: string | undefined) {
  if (!area) {
    return "";
  }
  const arr = area.split(",");
  let val = "";
  arr.forEach((element) => {
    val = val + `'${element.trim()}'`;
  });
  return val;
}

const style: object = computed(() => {
  return {
    "--grid-col": getCols(props.col),
    "--grid-col-sm": getCols(props.colSm),
    "--grid-col-md": getCols(props.colMd),
    "--grid-col-lg": getCols(props.colLg),
    "--grid-row": props.row || null,
    "--grid-row-sm": props.rowSm || null,
    "--grid-row-md": props.rowMd || null,
    "--grid-row-lg": props.rowLg || null,
    "--grid-area": getArea(props.area),
    "--grid-area-sm": getArea(props.areaSm) || null,
    "--grid-area-md": getArea(props.areaMd) || null,
    "--grid-area-lg": getArea(props.areaLg) || null,
    "--grid-gap": props.gap || null,
    "--grid-gap-sm": props.gapSm || null,
    "--grid-gap-md": props.gapMd || null,
    "--grid-gap-lg": props.gapLg || null,
    "align-content": props.alignContent || null,
    "justify-content": props.justifyContent || null,
    "justify-items": props.justifyItems || null,
    "align-items": props.alignItems || null,
    position: props.gridLines ? "relative" : null
  };
});

const areaMode = computed(() => {
  return props.area || props.areaSm || props.areaMd || props.areaLg;
});
</script>

<style>
.gridBox {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  flex: 1;
  display: grid;
  grid-template-columns: var(--grid-col);
  grid-auto-rows: var(--grid-row);
  grid-template-areas: var(--grid-area);
  --grid-gap: 10px;
  grid-gap: var(--grid-gap, 10px);
}

@media (min-width: 964px) {
  .gridBox {
    grid-template-columns: var(--grid-col-lg, var(--grid-col-md, var(--grid-col-sm, var(--grid-col))));
    grid-auto-rows: var(--grid-row-lg, var(--grid-row-md, var(--grid-row-sm, var(--grid-row))));
    grid-gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, var(--grid-gap))));
    grid-template-areas: var(--grid-area-lg, var(--grid-area-md, var(--grid-area-sm, var(--grid-area))));
  }
  .cell-hide-lg {
    display: none;
  }
  .justSelf-start-lg {
    justify-self: start;
  }
  .justSelf-end-lg {
    justify-self: end;
  }
  .justSelf-center-lg {
    justify-self: center;
  }
  .justSelf-stretch-lg {
    justify-self: stretch;
  }
  .alignSelf-end-lg {
    align-self: end;
  }
  .alignSelf-start-lg {
    align-self: start;
  }
  .alignSelf-center-lg {
    align-self: center;
  }
  .alignSelf-stretch-lg {
    align-self: stretch;
  }
}

@media (min-width: 700px) and (max-width: 964px) {
  .gridBox {
    grid-template-columns: var(--grid-col-md, var(--grid-col-sm, var(--grid-col)));
    grid-auto-rows: var(--grid-row-md, var(--grid-row-sm, var(--grid-row)));
    grid-gap: var(--grid-gap-md, var(--grid-gap-sm, var(--grid-gap)));
    grid-template-areas: var(--grid-area-md, var(--grid-area-sm, var(--grid-area)));
  }
  .cell-hide-md {
    display: none;
  }
  .justSelf-start-md {
    justify-self: start;
  }
  .justSelf-end-md {
    justify-self: end;
  }
  .justSelf-center-md {
    justify-self: center;
  }
  .justSelf-stretch-md {
    justify-self: stretch;
  }
  .alignSelf-end-md {
    align-self: end;
  }
  .alignSelf-start-md {
    align-self: start;
  }
  .alignSelf-center-md {
    align-self: center;
  }
  .alignSelf-stretch-md {
    align-self: stretch;
  }
}

@media (min-width: 390px) and (max-width: 700px) {
  .gridBox {
    grid-template-columns: var(--grid-col-sm, var(--grid-col));
    grid-auto-rows: var(--grid-row-sm, var(--grid-row));
    grid-gap: var(--grid-gap-sm, var(--grid-gap));
    grid-template-areas: var(--grid-area-sm, var(--grid-area));
  }

  .cell-hide-sm {
    display: none;
  }
  .justSelf-start-sm {
    justify-self: start;
  }
  .justSelf-end-sm {
    justify-self: end;
  }
  .justSelf-center-sm {
    justify-self: center;
  }
  .justSelf-stretch-sm {
    justify-self: stretch;
  }
  .alignSelf-end-sm {
    align-self: end;
  }
  .alignSelf-start-sm {
    align-self: start;
  }
  .alignSelf-center-sm {
    align-self: center;
  }
  .alignSelf-stretch-sm {
    align-self: stretch;
  }
}

@media (max-width: 390px) {
  .gridBox {
    grid-template-columns: var(--grid-col);
    grid-auto-rows: var(--grid-row);
    grid-gap: var(--grid-gap);
    grid-template-areas: var(--grid-area);
  }

  .cell-hide-xm {
    display: none;
  }
  .justSelf-start-xm {
    justify-self: start;
  }
  .justSelf-end-xm {
    justify-self: end;
  }
  .justSelf-center-xm {
    justify-self: center;
  }
  .justSelf-stretch-xm {
    justify-self: stretch;
  }
  .alignSelf-end-xm {
    align-self: end;
  }
  .alignSelf-start-xm {
    align-self: start;
  }
  .alignSelf-center-xm {
    align-self: center;
  }
  .alignSelf-stretch-xm {
    align-self: stretch;
  }
}

.gridBox_autoName > :nth-child(1) {
  grid-area: c1;
}

.gridBox_autoName > :nth-child(2) {
  grid-area: c2;
}

.gridBox_autoName > :nth-child(3) {
  grid-area: c3;
}

.gridBox_autoName > :nth-child(4) {
  grid-area: c4;
}

.gridBox_autoName > :nth-child(5) {
  grid-area: c5;
}

.gridBox_autoName > :nth-child(6) {
  grid-area: c6;
}

.gridBox_autoName > :nth-child(7) {
  grid-area: c7;
}

.gridBox_autoName > :nth-child(8) {
  grid-area: c8;
}

.gridBox_autoName > :nth-child(9) {
  grid-area: c9;
}

.gridBox_autoName > :nth-child(10) {
  grid-area: c10;
}

.gridBox_autoName > :nth-child(11) {
  grid-area: c11;
}

.gridBox_autoName > :nth-child(12) {
  grid-area: c12;
}

.gridBox_autoName > :nth-child(13) {
  grid-area: c13;
}

.gridBox_autoName > :nth-child(14) {
  grid-area: c14;
}

.gridBox_autoName > :nth-child(15) {
  grid-area: c15;
}

.gridBox_autoName > :nth-child(16) {
  grid-area: c16;
}

.gridBox_autoName > :nth-child(17) {
  grid-area: c17;
}

.gridBox_autoName > :nth-child(18) {
  grid-area: c18;
}

.gridBox_autoName > :nth-child(19) {
  grid-area: c19;
}

.gridBox_autoName > :nth-child(20) {
  grid-area: c20;
}

.gridBox_autoName > :nth-child(21) {
  grid-area: c21;
}

.gridBox_autoName > :nth-child(22) {
  grid-area: c22;
}

.gridBox_autoName > :nth-child(23) {
  grid-area: c23;
}

.gridBox_autoName > :nth-child(24) {
  grid-area: c24;
}
</style>
