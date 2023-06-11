<template>
  <div class="H_datagridGroupRow" data-field="text" data-orgindex="0">
    <rend v-if="useTemplate" />

    <div class="H_datagridGroupRowDefault" v-else>
      <div class="H_datagridGroupRow__content" :style="style">
        <H_icon :icon="expanded ? 'expand_down' : 'expand_right'" btn @click="click" />{{ name }}
        <span class="H_datagridGroupRow__childCount"> ({{ childRowsCount }})</span>
      </div>
      <div class="H_datagridGroupRow__spacing">
        <div v-for="column in columns" class="H_datagridGroupRow__spacingCell" :class="column.className" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from "vue";
import { iDatagrid } from "../provide";
import H_icon from "../../../Components/H_icon.vue";

const props = defineProps({
  name: { type: String, default: "" },
  expanded: { type: Boolean, default: false },
  childRowsCount: { type: Number, default: 0 },
  id: { type: String, default: "" },
  level: { type: Number, default: 0 },
  data: { type: Object as PropType<any>, default: () => {} }
});

function rend() {
  if (dg.groupRowTemplate.length > 0) {
    return dg.groupRowTemplate[0].children.default({
      props,
      columns: columns.value,
      click
    });
  }
}

const dg = inject("dg") as iDatagrid;
const columns = dg.Columns;
const useTemplate = dg.groupRowTemplate.length > 0;

function click() {
  dg.Event.emit("groupExpanded", { id: props.id, expanded: !props.expanded });
}

const style = computed(() => {
  return {
    marginLeft: props.level * 10 + "px"
  };
});
</script>
<style>
.H_datagridGroupRow {
  display: flex;
  padding: 4px 0;
}

.H_datagridGroupRowDefault {
  display: flex;
  flex-direction: column;
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
