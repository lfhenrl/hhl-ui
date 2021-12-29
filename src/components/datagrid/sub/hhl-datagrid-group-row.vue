<template>
  <div class="hhl-datagrid-group-row">
    <div class="hhl-datagrid-group-row__content">
      <hhl-icon
        :icon="expanded ? 'expand_down' : 'expand_right'"
        btn
        @click="click"
        :style="style"
      />
      {{ name }} <span>({{ count }})</span>
    </div>
    <div class="hhl-datagrid-group-row__spacing">
      <div
        v-for="column in columns"
        class="hhl-datagrid-group-row__spacingCell"
        :class="column.className"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { iDatagrid } from "../provide";

export default defineComponent({
  name: "hhl-datagrid-group-row",
  props: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    count: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    expanded: { type: Boolean, default: false }
  },
  setup(props) {
    const dg = inject("dg") as iDatagrid;
    const columns = dg.Columns;

    function click() {
      dg.Event.emit("groupExpanded", { id: props.id, expanded: !props.expanded });
    }

    const style = computed(() => {
      return {
        marginBottom: "-10px",
        marginTop: "-10px",
        marginLeft: props.level * 10 + "px"
      };
    });

    return { columns, click, style };
  }
});
</script>

<style>
.hhl-datagrid-group-row {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  /* font-weight: bold; */
}

.hhl-datagrid-group-row__content {
  display: flex;
  align-items: center;
}

.hhl-datagrid-group-row__content span {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.hhl-datagrid-group-row__spacing {
  display: flex;
}
</style>
