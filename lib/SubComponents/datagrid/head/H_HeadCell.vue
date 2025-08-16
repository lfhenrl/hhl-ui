<template>
  <div
    class="H_headCell"
    ref="headCellRef"
    :data-col-index="index"
    data-type="headcell"
    :style="{
      minWidth: col.head_width.value ?? '',
      maxWidth: col.head_width.value ?? '',
    }"
  >
    <div class="H_headCell__actions">
      <div class="H_headCell__actions_title" data-subtype="title">
        {{ col.props.title }}
      </div>
      <H_menu :index="index" />
      <div class="H_headCell__actions_resize" @mousedown="resize" data-subtype="resize"></div>
    </div>
    <div class="H_HeadCell-space">
      {{ col.maxValueRef.value }}
    </div>
  </div>
</template>

<style>
@layer components {
  .H_headCell {
    display: flex;
    flex-direction: column;
    width: max-content;
    min-height: 34px;
    border-right: 1px solid var(--color-txt8);
  }

  .H_headCell__actions {
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 700;
  }

  .H_headCell__actions_title {
    width: 100%;
    overflow: hidden;
    padding: 0.375em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .H_headCell__actions_resize {
    position: absolute;
    height: 100%;
    overflow: visible;
    right: -4px;
    width: 8px;
    cursor: ew-resize;
    z-index: 2;
  }

  .H_HeadCell-space {
    height: 0;
    overflow-x: hidden;
    overflow-y: visible;
    white-space: nowrap;
    width: fit-content;
    padding: 0 0.5em;
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { type iDgrid } from "../provide/Dgrid";
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
