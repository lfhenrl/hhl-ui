<template>
  <div
    class="H_HeaderCell"
    ref="headCellRef"
    :data-col-index="index"
    data-type="headcell"
    :style="{
      minWidth: col.width.value ?? '',
      maxWidth: col.width.value ?? '',
    }"
  >
    <div class="H_HeaderCell-inner">
      <div class="H_HeadCell-text" data-subtype="title">
        {{ col.props.title }}
      </div>
      <H_menu :index="index" />
      <div class="H_HeadCell-resize" @mousedown="resize" data-subtype="resize"></div>
    </div>
    <div class="H_HeadCell-space">
      {{ col.maxValueRef.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { iDgrid } from "../provide/Dgrid";
import { ColResize } from "./ColResize";
import H_menu from "./H_menu.vue";

const P = defineProps({
  index: { type: Number, default: 0 },
});
// const E = defineEmits([]);
const headCellRef = ref();
const DG = inject("DG") as iDgrid;
const col = DG.columns[P.index];

function resize(e: MouseEvent) {
  ColResize(col, e);
}

onMounted(() => {
  col.dom = headCellRef.value;
});
</script>
<style>
@layer hhl-components {
  .H_HeaderCell {
    display: flex;
    flex-direction: column;
    min-height: 33px;
    border-right: 1px solid var(--col-bg-5);
    border-bottom: 1px solid var(--col-bg-3);
  }

  .H_HeaderCell-inner {
    position: relative;
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    font-weight: bold;
    width: 100%;
  }
  .H_HeadCell-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 6px;
  }
  .H_HeadCell-resize {
    z-index: 10;
    height: 100%;
    width: 8px;
    right: -4px;
    min-width: 6px;
    cursor: w-resize;
    overflow: visible;
    position: absolute;
    z-index: 2;
  }
  .H_HeadCell-space {
    height: 0;
    width: min-content;
    overflow: visible;
    white-space: nowrap;
    opacity: 0;
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
