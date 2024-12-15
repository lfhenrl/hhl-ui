<template>
  <div
    class="flex flex-col flex-0 border-r border-bg5 min-h-[34px] w-min"
    ref="headCellRef"
    :data-col-index="index"
    data-type="headcell"
    :style="{
      minWidth: col.head_width.value ?? '',
      maxWidth: col.head_width.value ?? '',
    }"
  >
    <div class="relative flex items-center flex-1 font-bold w-full">
      <div class="w-full overflow-hidden p-1.5 text-ellipsis whitespace-nowrap" data-subtype="title">
        {{ col.props.title }}
      </div>
      <H_menu :index="index" />
      <div
        class="z-2 h-full w-2 min-w-1.5 -right-1 cursor-e-resize overflow-visible absolute"
        @mousedown="resize"
        data-subtype="resize"
      ></div>
    </div>
    <div class="H_HeadCell-space h-0 w-min overflow-x-hidden overflow-y-visible whitespace-nowrap opacity-0 px-2">
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
