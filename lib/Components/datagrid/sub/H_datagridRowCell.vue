<template>
  <div
    class="H_datagridRowCell"
    :class="[column.className, column.props.className]"
    :style="style(data[column.props.field])"
    v-if="column.visibel"
    :data-field="column.props.field"
    :data-orgindex="column.orgIndex"
  >
    <rend :data="data" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { icolumnData } from "../datagridTypes";


const props = defineProps({
  column: { type: Object as PropType<icolumnData>, default: {} },
  data: { type: Object, default: {} }
});

function rend() {
  if (props.column.slot) {
    return props.column.slot?.default({ data: props.data, column: props.column });
  } else {
    return format(props.data[props.column.props.field]);
  }
}

function style(value: any) {
  return props.column.props.cell_style?.(value, props.column) ?? "";
}

function format(value: any) {
  return props.column.props.format?.(value, props.column) ?? value?.toString() ?? "";
}
</script>

<style></style>
