<template>
  <div>
    <hhl-modal v-model="show" class="hhl-datagrid-popup">
      <div class="col-white shadow-5 border borderColor-comp borderRadius-4 flx-col">
        <div>
          <hhl-tabs>
            <hhl-tab label="Sorting" name="sorting"> Sorting </hhl-tab>
            <hhl-tab icon="filter" name="filter"> filter </hhl-tab>
            <hhl-tab label="Grouping" name="grouping"> Grouping </hhl-tab>
            <hhl-tab label="Columns" name="columns"> Columns </hhl-tab>
          </hhl-tabs>
        </div>
        <hhl-btn size="sm" @click="show = false" class="flx-self-align-end mt-25 col-ok"> CLOSE </hhl-btn>
      </div>
    </hhl-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { iDatagrid } from "../provide";
import { icolumnData } from "../provide/Columns";

const HhlDatagridPopup = defineComponent({
  name: "hhl-datagrid-popup",
  setup() {
    const dg = inject("dg") as iDatagrid;
    const show = ref(false);
    const column = ref();

    dg.Event.on("showDialog", (_column: icolumnData) => {
      column.value = _column;
      show.value = true;
    });

    return { show, column };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-datagrid-popup": typeof HhlDatagridPopup;
  }
}
export type iHhlDatagridPopup = InstanceType<typeof HhlDatagridPopup>;
export default HhlDatagridPopup;
</script>

<style>
.hhl-datagrid-popup .hhl-tab {
  height: 400px;
  width: 400px;
}
</style>
