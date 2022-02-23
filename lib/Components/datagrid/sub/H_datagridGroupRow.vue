<template>
  <div class="H_datagridGroupRow">
    <div class="H_datagridGroupRow__content" :style="style">
      <H_icon :icon="expanded ? 'expand_down' : 'expand_right'" btn @click="click" />
      {{ data.name }} <span class="H_datagridGroupRow__childCount"> ({{ data.childRowsCount }})</span>
    </div>
    <div class="H_datagridGroupRow__spacing">
      <div v-for="column in columns" class="H_datagridGroupRow__spacingCell" :class="column.className" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, PropType } from "vue";
import { iDatagrid } from "../provide";
import H_icon from "../../H_icon.vue";

const props = defineProps({
  data: { type: Object as PropType<any>, default: () => {} },
  expanded: { type: Boolean, default: false }
});

const dg = inject("dg") as iDatagrid;
const columns = dg.Columns;

function click() {
  dg.Event.emit("groupExpanded", { id: props.data.id, expanded: !props.expanded });
}

const style = computed(() => {
  return {
    marginLeft: props.data.level * 10 + "px"
  };
});
</script>
<style>
.H_datagridGroupRow {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  /* font-weight: bold; */
}

.H_datagridGroupRow__content {
  display: flex;
  align-items: center;
}

.H_datagridGroupRow__childCount {
  font-size: 0.9em;
  margin-left: 5px;
  opacity: 0.7;
}

.H_datagridGroupRow__content span {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.H_datagridGroupRow__spacing {
  display: flex;
}
</style>
