<template>
  <div ref="dom" class="hhl-datagrid" :class="classGuid">
    <hhl-virtual-list
      style="overflow-y: scroll; height: 100%; position: relative;"
      :data-key="'id'"
      :data-sources="listData"
      :estimate-size="30"
      :keeps="40"
      item-class="hhl-datagrid-row"
    >
      <template v-slot:header>
        <div class="hhl-datagrid-header">
          <hhl-datagrid-head-cell
            v-for="(col, index) in columns"
            :key="col.orgIndex"
            :field="col.props.field"
            :index="index"
          />
          <div class="hhl-datagrid-head-cell__spacer" />
        </div>
      </template>

      <template v-slot="data">
        <hhl-datagrid-group-row
          v-if="data.item.type === 'group'"
          :id="data.item.id"
          :name="data.item.name"
          :count="data.item.count"
          :expanded="data.item.expanded"
          :level="data.item.level"
        />

        <hhl-datagrid-row-cell
          v-else
          v-for="(col, cellIndex) in columns"
          :key="String(cellIndex)"
          :field="col.props.field"
          :data="data.item"
        />
      </template>
    </hhl-virtual-list>
    <div class="hhl-datagrid-footer ">
      <hhl-btn
        small
        round
        flat
        color="/var(--col-pri)"
        start-icon="zoom_out_map"
        @click="resizeColSize"
      />
    </div>
    <hhl-datagrid-popup/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, provide, ref, watchEffect } from "vue";
import { Datagrid } from "./provide";
import { Columns } from "./provide/Columns";

export default defineComponent({
  name: "hhl-datagrid",
  emits: ["rowExpanded"],
  props: {
    data: { type: Array, default: [] },
    groups: { type: Array as PropType<string[]>, default: () => [] }
  },
  setup(props, { slots, emit }) {
    const dom = ref(<HTMLElement>{});
    const dg = new Datagrid(dom, slots);
    const listData = ref([]);
    provide("dg", dg);
    const columnsHandler = new Columns(slots, dg);
    dg.Columns = columnsHandler.columns;
    const columns = dg.Columns;
    dg.GroupBy = props.groups
    watchEffect(() => (dg.Data = props.data));
    watchEffect(() => (dg.GroupBy = props.groups));

    const classGuid = dg.ClassGuid;
    

    dg.Event.on("newdata", (data: any) => {
      listData.value = data;
    });

    onMounted(() => {
      dg.Init();
    });

    function resizeColSize() {
      dg.setColumnsHeadWidth();
      setTimeout(() => {
        dg.setColumnsBodyWidth();
      });
    }

    function rowExpanded(e: any) {
      emit("rowExpanded", e);
    }

    return {
      dom,
      classGuid,
      columns,
      resizeColSize,
      rowExpanded,
      listData
    };
  }
});
</script>

<style>
.hhl-datagrid {
  margin-top: 5px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  height: 100%;
  /* outline: gray 1px solid; */
  box-shadow: 0 0 1px 1px gray;
  
}

.hhl-virtual-list-scroller {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  border-right: solid 1px gray;
}
.hhl-datagrid-header {
  position: sticky;
  display: flex;
  flex-shrink: 0;
  justify-content: stretch;
  min-width: 0;
  align-items: center;
  height: 33px;
  top: 0;
  margin-right: 2px;
  z-index: 1;
  /* border-right: gray 1px solid;
  border-bottom: gray 1px solid; */
   
    overflow: visible;
}

.hhl-datagrid-head-cell {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 4px;
  flex: 1 1 auto;
  height: 100%;
  min-width: 0;
  border-right: 1px solid gray;
   background-color: rgba(226, 226, 226);

}

.hhl-datagrid-head-cell:hover {
  background-color: rgba(226, 226, 226);
}

.hhl-datagrid-head-cell__spacer {
  height: 100%;
  width: 1px;
  border-right: 1px solid gray;
}

.hhl-datagrid-head-cell:nth-last-child(2) {
  border-right: none;
}

.hhl-datagrid-head-cell__content {
  display: flex;
  align-items: center;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: move;
}

.hhl-datagrid-head-cell__content.pSave-dragActive {
  background-color: aqua;
}

.hhl-datagrid-head-cell__menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20px;
  cursor: pointer;
  /* border: 1px solid red; */
}

.hhl-datagrid-head-cell__content.pSave-dragOver_right::after {
  content: "";
  position: absolute;
  right: -3px;
  top: 1px;
  bottom: 1px;
  width: 6px;
  pointer-events: none;
  background-color: rgb(78, 78, 78);
  z-index: 99;
  border-radius: 50%;
  overflow: hidden;
}

.hhl-datagrid-head-cell__content.pSave-dragOver_left::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 6px;
  top: -2px;
  left: -3px;
  pointer-events: none;
  background-color: rgb(78, 78, 78);
  z-index: 99;
}

.pSave-unselectable {
  user-select: none;
  pointer-events: none;
}

.hhl-datagrid-head-cell__sortIcons {
  display: flex;
}

.hhl-datagrid-head-cell__sortIcons .hhl-icon {
  margin-right: -2px;
  margin-left: -4px;
}
.hhl-datagrid-head-cell__sortIndex {
  line-height: 16px;
  font-size: 13px;
}

.hhl-datagrid-head-cell__resizer {
  position: absolute;
  z-index: 11;
  top: 0;
  width: 6px;
  height: 100%;
  user-select: none;
  cursor: col-resize;
  right: -3px;
}

.hhl-datagrid-row {
  display: flex;
  border-bottom: rgba(128, 128, 128, 0.2) 1px solid;
}

.hhl-datagrid-row:nth-child(even) {
  background-color: rgba(156, 183, 233, 0.1);
}

.hhl-datagrid-row-cell {
  display: flex;
  align-items: center;
  padding: 4px;
  /* border-right: gray 1px solid; */
}
.hhl-datagrid-row-cell:last-child {
  border-right: none;
}
</style>
