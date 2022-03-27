<template>
  <!-- {{ data.id }} -->
  <H_datagridRowCell
    v-if="type === 'data'"
    v-for="(col, cellIndex) in columns"
    :key="String(cellIndex)"
    :column="col"
    :data="data"
  />
  <H_datagridMoreRows v-if="type === 'loader'" :id="id" />
  <H_datagridGroupRow
    v-if="type === 'group'"
    :id="id"
    :data="data"
    :name="name"
    :childRowsCount="childRowsCount"
    :expanded="expanded"
    :level="level"
  />
</template>

<script setup lang="ts">
import { inject, PropType } from "vue";
import { iDatagrid } from "./provide";
import H_datagridRowCell from "./sub/H_datagridRowCell.vue";
import H_datagridMoreRows from "./sub/H_datagridMoreRows.vue";
import H_datagridGroupRow from "./sub/H_datagridGroupRow.vue";

const props = defineProps({
  id: { type: String, default: "" },
  type: { type: String, default: "" },
  data: { type: Object as PropType<any>, default: () => {} },
  name: { type: String, default: "" },
  childRowsCount: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  expanded: { type: Boolean, default: false }
});


const dg = inject("dg") as iDatagrid;
const columns = dg.Columns;
</script>
<style>
.H_row {
  height: 33px;
  width: 100%;
}
</style>
