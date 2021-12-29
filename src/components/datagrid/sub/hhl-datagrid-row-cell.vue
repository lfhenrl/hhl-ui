<template>
  <div class="hhl-datagrid-row-cell" :class="column.className">
    {{ data[field] }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { iDatagrid } from "../provide";

export default defineComponent({
  name: "hhl-datagrid-row-cell",
  props: {
    field: { type: String, default: "" },
    data: { type: Object, default: {} }
  },
  setup(props, {}) {
    const dg = inject("dg") as iDatagrid;
    const column = computed(() => dg.GetColumnByField(props.field)) 


    return {
      column
    };
  }
});
</script>
