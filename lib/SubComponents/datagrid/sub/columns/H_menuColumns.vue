<template>
  <H_dialog v-model="open" offsetTop="-20px" class="h_menuColumns" movable>
    <template #header>
      <H_row padding="0" align="center">
        <div style="width: 25px"></div>
        <div style="flex: 1">Columns</div>
        <div style="width: 25px"><H_icon btn @click="open = false" /></div>
      </H_row>
    </template>
    <div class="h_menuColumns-body" padding="10px 0 0 0" gap="15px">
      <H_inputbase label="Grouping" class="h_menuColumns-grouping" movelabel>
        <H_dragDrop v-model="groupColumns" :max-items="3" class="h_menuColumns-grouping-dg">
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>

      <H_inputbase label="Columns" class="h_menuColumns-columns" movelabel>
        <div class="h_menuColumns-columnsList">
          <H_dragDrop v-model="sourceColumns" class="h_menuColumns-columns-dg">
            <template v-slot:item="{ item, index }">
              <H_columnItem :item="item" :index="index" />
            </template>
          </H_dragDrop>
        </div>
      </H_inputbase>
    </div>
    <template #footer>
      <H_row justify="end" padding="0">
        <H_btn @click="columnsSave" class="ml-3 bg-ok" :disabled="!canSave">OK</H_btn>
      </H_row>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import H_dialog from "../../../../Components/popup/H_dialog.vue";
import H_btn from "../../../../Components/H_btn.vue";
import H_icon from "../../../../Components/H_icon.vue";
import H_row from "../../../../Components/layout/H_row.vue";
import H_dragDrop from "../../../../Components/H_dragDrop.vue";
import H_inputbase from "../../../../SubComponents/H_inputBase.vue";
import H_columnItem from "./H_columnItem.vue";
import { ref, inject, computed } from "vue";
import { iColumns } from "../../provide/Columns";

// const E = defineEmits([]);

const Columns = inject("Columns") as iColumns;
const sourceColumns = ref<any[]>([]);
const groupColumns = ref<any>([]);

defineExpose({ columnsOpen });

const open = ref(false);
let orgSourceArrayString = "";
let orgGroupArrayString = "";

const sourceColumnsString = computed(() => {
  const x = sourceColumns.value.map((item: any) => item.orgIndex + "-" + item.visibel).toString();
  return x;
});

const groupColumnsString = computed(() => {
  const x = groupColumns.value.map((item: any) => item.orgIndex + "-" + item.visibel).toString();
  return x;
});

const canSave = computed(() => {
  return sourceColumnsString.value !== orgSourceArrayString || groupColumnsString.value !== orgGroupArrayString;
});

function columnsOpen() {
  sourceColumns.value = [];
  groupColumns.value = [];
  const sArray: string[] = [];
  const gArray: string[] = [];
  Columns.columns.forEach((item, index) => {
    const it = {
      field: item.props.field,
      title: item.props.title,
      visibel: item.visibel.value,
      index: index,
      orgIndex: item.index
    };
    const itString = it.orgIndex + "-" + it.visibel;

    if (Columns.groupList.includes(it.field)) {
      groupColumns.value?.push(it);
      gArray.push(itString);
    } else {
      sourceColumns.value?.push(it);
      sArray.push(itString);
    }
  });
  orgSourceArrayString = sArray.toString();
  orgGroupArrayString = gArray.toString();
  open.value = true;
}

function columnsSave() {
  open.value = false;
  const newColumns: any = [];
  sourceColumns.value.forEach((item: any) => {
    const orgCol: any = Columns.columns.find((it) => it.index === item.orgIndex);
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });
  groupColumns.value.forEach((item: any) => {
    const orgCol: any = Columns.columns.find((it) => it.index === item.orgIndex);
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });
  Columns.updateGroupList(groupColumns.value.map((item: any) => item.field));
  Columns.columns = newColumns;
  Columns.columnsChange();
}
</script>

<style>
.h_menuColumns-body {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 400px;
  max-height: 50vh;
  gap: 20px;
}

.h_menuColumns-grouping {
  min-height: 80px;
  padding: 10px;
}

.h_menuColumns-columns .h_inputbase-slot {
  overflow: auto;
}

.h_menuColumns-columnsList {
  min-height: 120px;
  padding: 10px;
  height: 100%;
}

.h_menuColumns-columns-dg,
.h_menuColumns-grouping-dg {
  height: 100%;
}
</style>
