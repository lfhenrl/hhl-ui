<template>
  <H_dialog v-model="open" class="H_menuColumns" movable>
    <template #header>
      <div class="H_menuColumns-header">
        <div>Columns</div>
        <div class="ico-close iconBtn cursor-pointer" @click="open = false" />
      </div>
    </template>
    <div class="H_menuColumns-body">
      <H_inputbase label="Grouping" movelabel>
        <template v-slot:input>
          <H_dragDrop v-model="groupColumns" :max-items="3" class="H_menuColumns-drag H_menuColumns-dragH90">
            <template v-slot:item="{ item, index }">
              <H_columnItem :item="item" :index="index" />
            </template>
          </H_dragDrop>
        </template>
      </H_inputbase>

      <H_inputbase label="Columns" class="" movelabel>
        <template v-slot:input>
          <H_dragDrop v-model="sourceColumns" class="H_menuColumns-drag H_menuColumns-dragH200">
            <template v-slot:item="{ item, index }">
              <H_columnItem :item="item" :index="index" />
            </template>
          </H_dragDrop>
        </template>
      </H_inputbase>
    </div>
    <template #footer>
      <div class="H_menuColumns-footer">
        <H_btn @click="columnsSave" class="bg-ok" :disabled="!canSave">OK</H_btn>
      </div>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import H_dialog from "../../../../Components/H_dialog.vue";
import H_btn from "../../../../Components/H_btn.vue";
import H_dragDrop from "../../../../Components/H_dragDrop.vue";
import H_inputbase from "../../../../Components/H_inputbase.vue";
import H_columnItem from "./H_columnItem.vue";
import { ref, inject, computed } from "vue";
import { iDgrid } from "../../provide/Dgrid";
/* import { iColumn } from "../../provide/Column"; */

// const E = defineEmits([]);

const DG = inject("DG") as iDgrid;
const sourceColumns = ref<any[]>([]);
const groupColumns = ref<any>([]);

defineExpose({ columnsOpen });

const open = ref(false);
const orgSourceArrayString = ref("");
const orgGroupArrayString = ref("");

const sourceColumnsString = computed(() => {
  const x = sourceColumns.value.map((item: any) => item.orgIndex + "-" + item.visibel).toString();
  return x;
});

const groupColumnsString = computed(() => {
  const x = groupColumns.value.map((item: any) => item.orgIndex + "-" + item.visibel).toString();
  return x;
});

const groupHaveChanged = computed(() => {
  return groupColumnsString.value !== orgGroupArrayString.value;
});

const columnsHaveChanged = computed(() => {
  return sourceColumnsString.value !== orgSourceArrayString.value;
});

const canSave = computed(() => {
  return groupHaveChanged.value || columnsHaveChanged.value;
});

function columnsOpen() {
  sourceColumns.value = [];
  groupColumns.value = [];
  const sArray: string[] = [];
  const gArray: string[] = [];
  DG.columns.forEach((item, index) => {
    const it = {
      field: item.props.field,
      title: item.props.title,
      visibel: item.visibel.value,
      index: index,
      orgIndex: item.index,
    };
    const itString = it.orgIndex + "-" + it.visibel;

    if (DG.dataHandler!.groupList.includes(it.field)) {
      groupColumns.value?.push(it);
      gArray.push(itString);
    } else {
      sourceColumns.value?.push(it);
      sArray.push(itString);
    }
  });
  orgSourceArrayString.value = sArray.toString();
  orgGroupArrayString.value = gArray.toString();
  open.value = true;
}

function columnsSave() {
  open.value = false;
  const newColumns: any = [];
  groupColumns.value.forEach((item: any) => {
    const orgCol: any = DG.columns.find((it) => it.index === item.orgIndex);
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });
  sourceColumns.value.forEach((item: any) => {
    const orgCol: any = DG.columns.find((it) => it.index === item.orgIndex);
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });

  if (groupHaveChanged.value) {
    DG.dataHandler!.groupList = groupColumns.value.map((item: any) => item.field);
  }

  if (columnsHaveChanged.value) {
    DG.columns = newColumns;
    DG.columnsChange();
  }

  if (groupHaveChanged.value) {
    DG.dataHandler!.loadData();
  }
}
</script>
<style>
@layer hhl-components {
  .H_menuColumns-header {
    display: flex;
    align-items: center;
    min-width: 200px;
    height: 2.5em;
    width: 100%;
  }
  .H_menuColumns-header div {
    flex: 1 1 100%;
    font-size: 1.2em;
  }

  .H_menuColumns-body {
    display: flex;
    flex-direction: column;
    padding-top: 6px;
    gap: 10px;
    background-color: var(--col-bg-0);
  }
  .H_menuColumns-drag {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    overflow: auto;
    padding: 8px;
    padding-top: 4px;
  }
  .H_menuColumns-dragH90 {
    max-height: 90px;
    min-height: 90px;
  }
  .H_menuColumns-dragH200 {
    max-height: 200px;
    min-height: 200px;
  }
  .H_menuColumns-footer {
    display: flex;
    justify-content: end;
  }
  .H_btn {
    min-width: 5em;
  }
}
</style>
