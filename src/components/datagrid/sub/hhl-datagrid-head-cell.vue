<template>
  <div ref="dom" class="hhl-datagrid-head-cell" :style="{ maxWidth: column.maxWidth + 'px', minWidth: column.minWidth + 'px' }">
    <div
      class="hhl-datagrid-head-cell__content"
      draggable="true"
      :data-index="index"
      :data-orgindex="column.index"
      @dragstart="reorder.dragStart"
      @dragover="reorder.dragOver"
      @dragleave="reorder.dragLeave"
      @dragend="reorder.dragEnd"
      @drop="reorder.dragDrop"
    >
      {{ title }}
    </div>
    <div class="hhl-datagrid-head-cell__menu">
      <div class="hhl-datagrid-head-cell__sortIcons">
        <hhl-icon icon="arrow_downward" size="16px" color="var(--col-pri)"/>
        <hhl-icon icon="arrow_upward" size="16px" color="var(--col-pri)" />
        <div
          class="hhl-datagrid-head-cell__sortIndex"
          :style="{
            color: 'var(--col-pri)'
          }"
        >
          1
        </div>
      </div>
      <hhl-icon icon="filter" size="16px" color="var(--col-pri)" @click="showDialog"/>
    </div>
    <div class="hhl-datagrid-head-cell__resizer" @mousedown="resize" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";
import { iDatagrid } from "../provide";
import { icolumnData } from "../provide/Columns";
import { ColumnReorder } from "../provide/ColumnReorder";

export default defineComponent({
  name: "hhl-datagrid-head-cell",
  props: {
    field: { type: String, default: "" },
    index: { type: Number, default: 0 }
  },
  setup(props, {}) {
    const dom = ref(<HTMLElement>{});
    const dg = inject("dg") as iDatagrid;
    const column = dg.GetColumnByField(props.field) as icolumnData;
    const reorder = ColumnReorder(column, dg);
    column.index = props.index;

    const title = computed(() => (column.props.title ? column.props.title : column.props.field));
    function resize(e: MouseEvent) {
      dg.rowResize(e, column);
    }

    function showDialog() {
      dg.Event.emit("showDialog", column)
    }

    watch(
      () => props.index,
      (v: number) => (column.index = v)
    );

    onMounted(() => {
      column.dom = dom.value;
    });

    return {
      dom,
      column,
      title,
      resize,
      reorder,
      showDialog
    };
  }
});
</script>

<style></style>
