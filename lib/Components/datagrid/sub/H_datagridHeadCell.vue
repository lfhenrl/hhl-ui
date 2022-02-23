<template>
  <div
    ref="dom"
    class="H_datagridHeadCell"
    :style="{ maxWidth: column.maxWidth + 'px', minWidth: column.minWidth + 'px' }"
    v-if="column.visibel"
  >
    <div class="H_datagridHeadCell__content" :data-index="index" :data-orgindex="column.index">
      {{ title }}
    </div>
    <div class="H_datagridHeadCell__menu" @click="showDialog" v-if="column.props.type !== 'action'">
      <div class="H_datagridHeadCell__sortIcons">
        <H_icon icon="arrow_downward" size="17px" color="var(--col-pri-light)" v-if="column.sort.sorting === 'up'" />
        <H_icon icon="arrow_upward" size="17px" color="var(--col-pri-light)" v-if="column.sort.sorting === 'down'" />
        <div
          class="H_datagridHeadCell__sortIndex"
          v-if="column.sort.index < 1000"
          :style="{
            color: 'var(--col-pri-light)'
          }"
        >
          {{ column.sort.index + 1 }}
        </div>
      </div>
      <H_icon icon="filter" size="17px" color="var(--col-pri-light)" v-if="column.filt.active" />
      <H_icon icon="menu" size="18px" color="var(--col-pri-light)" v-if="!column.filt.active && column.sort.sorting === 'none'" />
    </div>
    <div class="H_datagridHeadCell__resizer" @mousedown="resize" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch, onUpdated, PropType } from "vue";
import { iDatagrid } from "../provide";
import H_icon from "../../H_icon.vue";
import { icolumnData } from "../datagridTypes";

const props = defineProps({
  column: { type: Object as PropType<icolumnData>, default: {} },
  index: { type: Number, default: 0 }
});

const dom = ref(<HTMLElement>{});
const dg = inject("dg") as iDatagrid;
props.column.index = props.index;

const title = computed(() => (props.column.props.title ? props.column.props.title : props.column.props.field));
function resize(e: MouseEvent) {
  dg.rowResize(e, props.column);
}

function showDialog() {
  dg.Event.emit("showDialog", props.column);
}

watch(
  () => props.index,
  (v: number) => (props.column.index = v)
);

onUpdated(() => {
  props.column.dom = dom.value;
});

onMounted(() => {
  props.column.dom = dom.value;
});
</script>
