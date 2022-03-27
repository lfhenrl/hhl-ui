<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "H_column",
  props: {
    field: { type: String, default: "" },
    title: { type: String, default: "" },
    type: { type: String as PropType<"number" | "string" | "date" | "bool" | "action" | "userAction">, required: true },
    width: { type: Number, default: 0 },
    className: String,
    format: { type: Function, default: (v: any) => v },
    cell_style: { type: Function, default: null },
    row_style: { type: Function, default: null },
    select_list: { type: Array, default: null },
    no_sorting: Boolean,
    sorting: { type: String as PropType<"none" | "up" | "down">, default: "none" },
    sortIndex: { type: Number, default: 1000 },
    filter_type: {
      type: String as PropType<"none" | "number" | "string" | "date" | "datetime" | "select" | "bool">,
      default: "none"
    },
    filter_condition: {
      type: String as PropType<
        "none" | "equal" | "not_equal" | "greater" | "less" | "between" | "contain" | "startswith" | "endswith" | "bool_list"
      >,
      default: "none"
    },
    filter_value1: { type: String, default: "" },
    filter_value2: { type: String, default: "" },
    visibel: { type: Boolean, default: true }
  }
});
</script>
<template>&#32;</template>
