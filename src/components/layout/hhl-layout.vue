<template>
  <div class="hhl-layout gridBox" :style="style" :class="{ gridBox_autoName: areaMode }">
    <slot />
    <hhl-gridlines v-if="gridLines" :key="count" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUpdate } from "vue";
import hhlLayout from "./hhl-gridlines.vue";

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

const HhlLayout = defineComponent({
  name: "hhl-layout",
  components: {
    hhlLayout
  },
  props: {
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
  },
  setup(props, {}) {
    const count = ref(0);
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

    onBeforeUpdate(() => {
      count.value = count.value + 1;
    });

    return { style, areaMode, count };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-layout": typeof HhlLayout;
  }
}
export type iHhlLayout = InstanceType<typeof HhlLayout>;
export default HhlLayout;
</script>
