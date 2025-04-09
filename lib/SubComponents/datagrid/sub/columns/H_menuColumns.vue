<template>
  <H_dialog v-model="open" movable>
    <template #header>
      <div class="flex items-center min-w-64 text-lg">
        <div class="flex-1" />
        <div class="">Columns</div>
        <div class="flex-1" />
        <H_icon name="close" btn color="white" class="cursor-pointer" @click="open = false" />
      </div>
    </template>
    <div class="flex flex-col bg-bg0">
      <H_inputbase label="Grouping" movelabel>
        <H_dragDrop
          v-model="groupColumns"
          :max-items="3"
          class="flex flex-col gap-0.5 w-full p-1 overflow-auto max-h-24 min-h-24"
        >
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>

      <H_inputbase label="Columns" class="" movelabel>
        <H_dragDrop v-model="sourceColumns" class="flex flex-col gap-0.5 w-full p-1 overflow-auto max-h-80 min-h-80">
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <H_btn @click="columnsSave" class="bg-ok text-sm" :disabled="!canSave">OK</H_btn>
      </div>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import H_dialog from "../../../../Components/H_dialog.vue";
import H_btn from "../../../../Components/H_btn.vue";
import H_icon from "../../../../Components/H_icon.vue";
import H_dragDrop from "../../../../Components/H_dragDrop.vue";
import H_inputbase from "../../../../Components/H_inputbase.vue";
import H_columnItem from "./H_columnItem.vue";
import { ref, inject, computed } from "vue";
import { type iDgrid } from "../../provide/Dgrid";
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
