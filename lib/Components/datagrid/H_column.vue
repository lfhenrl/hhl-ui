<script setup lang="ts">
import { PropType } from "vue";
import { iColumn } from "../../SubComponents/datagrid/provide/Column";

defineOptions({ name: "H_column" });
defineProps({
  field: { type: String, default: "", required: true },
  title: { type: String, default: "" },
  type: {
    type: String as PropType<"number" | "string" | "date" | "datetime" | "bool" | "action">,
    required: true,
    default: "string",
  },
  width: { type: String, default: "auto" },
  autoWidth: { type: Boolean, default: true },
  autoHeight: { type: Boolean, default: false },
  cell_class: { type: String, default: "" },
  format: { type: Function, default: (v: any) => v },
  cell_style: { type: Function, default: null },
  select_list: { type: Array, default: null },
  sorting: {
    type: String as PropType<"none" | "asc" | "desc">,
    default: "none",
  },
  sortIndex: { type: Number, default: 1000 },
  filter: {
    type: String as PropType<"none" | "select">,
    default: "none",
  },
  filter_logical: {
    type: String as PropType<"and" | "or">,
    default: "none",
  },
  filter_condition1: {
    type: String as PropType<
      | "none"
      | "equal"
      | "notEqual"
      | "greater"
      | "greaterOrEqual"
      | "less"
      | "lessOrEqual"
      | "contain"
      | "notContain"
      | "startswith"
      | "notStartwith"
      | "endwith"
      | "notEndwith"
    >,
    default: "none",
  },
  filter_condition2: {
    type: String as PropType<
      | "none"
      | "equal"
      | "notEqual"
      | "greater"
      | "greaterOrEqual"
      | "less"
      | "lessOrEqual"
      | "contain"
      | "notContain"
      | "startswith"
      | "notStartwith"
      | "endwith"
      | "notEndwith"
    >,
    default: "none",
  },
  filter_value1: { type: String, default: "" },
  filter_value2: { type: String, default: "" },
  visibel: { type: Boolean, default: true },
});
const slots = defineSlots<{
  default(props: { col: iColumn; value: any; row: any }): any;
}>();
</script>
<template>&#32;</template>
