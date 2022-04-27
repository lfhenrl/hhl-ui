<template>
  <div class="H_grid" :style="style" :class="{ H_grid_autoName: areaMode }">
    <slot />
    <H_gridlines v-if="gridLines" :key="changeCount" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from "vue";
import H_gridlines from "./H_gridlines.vue";
import "./self_just_align.css";

const props = defineProps({
  gridLines: { type: Boolean, default: false },
  grid_col: { type: String, default: "auto" },
  grid_col_sm: { type: String, default: "" },
  grid_col_md: { type: String, default: "" },
  grid_col_lg: { type: String, default: "" },
  grid_row: { type: String, default: "auto" },
  grid_row_sm: { type: String, default: "" },
  grid_row_md: { type: String, default: "" },
  grid_row_lg: { type: String, default: "" },
  grid_area: { type: String, default: "" },
  grid_area_sm: { type: String, default: "" },
  grid_area_md: { type: String, default: "" },
  grid_area_lg: { type: String, default: "" },
  grid_gap: { type: String, default: "10px" },
  grid_gap_sm: { type: String, default: "" },
  grid_gap_md: { type: String, default: "" },
  grid_gap_lg: { type: String, default: "" },
  grid_al_content: {
    type: String as PropType<"stretch" | "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">,
    default: "stretch"
  },
  grid_js_content: {
    type: String as PropType<"stretch" | "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">,
    default: "stretch"
  },
  grid_al_items: {
    type: String as PropType<"stretch" | "start" | "end" | "center">,
    default: "stretch"
  },
  grid_js_items: {
    type: String as PropType<"stretch" | "start" | "end" | "center">,
    default: "stretch"
  },
  grid_padding: {
    type: String,
    default: "0"
  }
});

const changeCount = ref(0);
const columns = ref(props.grid_col);
const rows = ref(props.grid_row);
const areas = ref(props.grid_area);
const gap = ref(props.grid_gap);

const observedSizes: Array<any> = [];

function sizing() {
  columns.value = props.grid_col;
  rows.value = props.grid_row;
  areas.value = props.grid_area;
  gap.value = props.grid_gap;

  observedSizes.forEach((_size) => {
    if (_size.q.matches) {
      if (_size.col !== "") {
        columns.value = _size.col;
      }
      if (_size.row !== "") {
        rows.value = _size.row;
      }
      if (_size.area !== "") {
        areas.value = _size.area;
      }
      if (_size.gap !== "") {
        gap.value = _size.gap;
      }
    }
  });
}

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

const areaMode = computed(() => {
  return props.grid_area || props.grid_area_sm || props.grid_area_md || props.grid_area_lg;
});

const style: object = computed(() => {
  changeCount.value = changeCount.value + 1;
  return {
    gridTemplateColumns: getCols(columns.value),
    gridAutoRows: rows.value,
    gridTemplateAreas: getArea(areas.value),
    gap: gap.value,
    alignContent: props.grid_al_content || null,
    justifyContent: props.grid_js_content || null,
    justifyItems: props.grid_js_items || null,
    alignItems: props.grid_al_items || null,
    padding: props.grid_padding,
    position: props.gridLines ? "relative" : null
  };
});

onMounted(() => {
  if (props.grid_col_sm !== "" || props.grid_row_sm !== "" || props.grid_area_sm !== "" || props.grid_gap_sm !== "") {
    const small = {
      q: window.matchMedia("(min-width: 400px)"),
      col: props.grid_col_sm,
      row: props.grid_row_sm,
      area: props.grid_area_sm,
      gap: props.grid_gap_sm,
      size: "sm"
    };
    small.q.onchange = sizing;
    observedSizes.push(small);
  }

  if (props.grid_col_md !== "" || props.grid_row_md !== "" || props.grid_area_md !== "" || props.grid_gap_md !== "") {
    const medium = {
      q: window.matchMedia("(min-width: 700px)"),
      col: props.grid_col_md,
      row: props.grid_row_md,
      area: props.grid_area_md,
      gap: props.grid_gap_md,
      size: "md"
    };
    medium.q.onchange = sizing;
    observedSizes.push(medium);
  }

  if (props.grid_col_lg !== "" || props.grid_row_lg !== "" || props.grid_area_lg !== "" || props.grid_gap_lg !== "") {
    const large = {
      q: window.matchMedia("(min-width: 1100px)"),
      col: props.grid_col_lg,
      row: props.grid_row_lg,
      area: props.grid_area_lg,
      gap: props.grid_gap_lg,
      size: "lg"
    };
    large.q.onchange = sizing;
    observedSizes.push(large);
  }
  sizing();
});
</script>

<style>
.H_grid {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  display: grid;
}

.H_grid_autoName > :nth-child(1) {
  grid-area: c1;
}

.H_grid_autoName > :nth-child(2) {
  grid-area: c2;
}

.H_grid_autoName > :nth-child(3) {
  grid-area: c3;
}

.H_grid_autoName > :nth-child(4) {
  grid-area: c4;
}

.H_grid_autoName > :nth-child(5) {
  grid-area: c5;
}

.H_grid_autoName > :nth-child(6) {
  grid-area: c6;
}

.H_grid_autoName > :nth-child(7) {
  grid-area: c7;
}

.H_grid_autoName > :nth-child(8) {
  grid-area: c8;
}

.H_grid_autoName > :nth-child(9) {
  grid-area: c9;
}

.H_grid_autoName > :nth-child(10) {
  grid-area: c10;
}

.H_grid_autoName > :nth-child(11) {
  grid-area: c11;
}

.H_grid_autoName > :nth-child(12) {
  grid-area: c12;
}

.H_grid_autoName > :nth-child(13) {
  grid-area: c13;
}

.H_grid_autoName > :nth-child(14) {
  grid-area: c14;
}

.H_grid_autoName > :nth-child(15) {
  grid-area: c15;
}

.H_grid_autoName > :nth-child(16) {
  grid-area: c16;
}

.H_grid_autoName > :nth-child(17) {
  grid-area: c17;
}

.H_grid_autoName > :nth-child(18) {
  grid-area: c18;
}

.H_grid_autoName > :nth-child(19) {
  grid-area: c19;
}

.H_grid_autoName > :nth-child(20) {
  grid-area: c20;
}

.H_grid_autoName > :nth-child(21) {
  grid-area: c21;
}

.H_grid_autoName > :nth-child(22) {
  grid-area: c22;
}

.H_grid_autoName > :nth-child(23) {
  grid-area: c23;
}

.H_grid_autoName > :nth-child(24) {
  grid-area: c24;
}
</style>
