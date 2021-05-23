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

<style>



@keyframes fadeIn {
  0% {
    opacity: 0;
    top: 100px;
  }
  75% {
    opacity: 0.5;
    top: 0px;
  }
  100% {
    opacity: 1;
  }
}
</style>
