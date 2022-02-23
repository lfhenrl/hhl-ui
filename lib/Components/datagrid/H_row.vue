<template>
  <!-- {{ data.id }} -->
  <H_datagridRowCell
    v-if="data.type === 'data'"
    v-for="(col, cellIndex) in columns"
    :key="String(cellIndex)"
    :column="col"
    :data="data.data"
  />
  <H_datagridMoreRows v-if="data.type === 'loader'" :data="data" />
  <H_datagridGroupRow v-if="data.type === 'group'" :data="data" :expanded="expanded" />
</template>

<script setup lang="ts">
import { inject, PropType } from "vue";
import { iDatagrid } from "./provide";
import H_datagridRowCell from "./sub/H_datagridRowCell.vue";
import H_datagridMoreRows from "./sub/H_datagridMoreRows.vue";
import H_datagridGroupRow from "./sub/H_datagridGroupRow.vue";

const props = defineProps({
  id: { type: String, default: "" },
  data: { type: Object as PropType<any>, default: () => {} },
  name: { type: String, default: "" },
  count: { type: Number, default: 0 },
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
