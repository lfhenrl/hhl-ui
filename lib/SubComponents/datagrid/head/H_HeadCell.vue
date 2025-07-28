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
