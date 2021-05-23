<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "hhl-column",
  props: {
    index: { type: Number, default: -1 },
    field: { type: String, default: "" },
    title: { type: String, default: "" },
    width: { type: Number, default: 0 },
    format: { type: Function, default: null },
    cell_style: { type: Function, default: null },
    select_list: { type: Array, default: null },
    sorting: { type: String, default: "none" }
  }
});
</script>
<template>&#32;</template>
