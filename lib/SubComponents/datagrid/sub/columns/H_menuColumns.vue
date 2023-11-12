<template>
  <H_dialog v-model="open" offsetTop="-20px" class="h_menuColumns" movable>
    <template #header>
      <div class="flex min-w-[200px]">
        <div class="flex-1">Columns</div>
        <div class="overflow-hidden">
          <H_icon btn @click="open = false" />
        </div>
      </div>
    </template>
    <div class="mt-3 flex flex-col gap-4">
      <H_inputbase label="Grouping" movelabel>
        <H_dragDrop
          v-model="groupColumns"
          :max-items="3"
          class="max-h-[90px] min-h-[90px] overflow-auto p-2 pt-1"
        >
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>

      <H_inputbase label="Columns" class="mt-3 h-full" movelabel>
        <div class="">
          <H_dragDrop
            v-model="sourceColumns"
            class="max-h-[200px] min-h-[200px] overflow-auto p-2 pt-1"
          >
            <template v-slot:item="{ item, index }">
              <H_columnItem :item="item" :index="index" />
            </template>
          </H_dragDrop>
        </div>
      </H_inputbase>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <H_btn @click="columnsSave" class="ml-3 bg-ok" :disabled="!canSave"
          >OK</H_btn
        >
      </div>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import H_dialog from "../../../../Components/popup/H_dialog.vue";
import H_btn from "../../../../Components/H_btn.vue";
import H_icon from "../../../../Components/H_icon.vue";
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
  const x = sourceColumns.value
    .map((item: any) => item.orgIndex + "-" + item.visibel)
    .toString();
  return x;
});

const groupColumnsString = computed(() => {
  const x = groupColumns.value
    .map((item: any) => item.orgIndex + "-" + item.visibel)
    .toString();
  return x;
});

const canSave = computed(() => {
  return (
    sourceColumnsString.value !== orgSourceArrayString ||
    groupColumnsString.value !== orgGroupArrayString
  );
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
      orgIndex: item.index,
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
  groupColumns.value.forEach((item: any) => {
    const orgCol: any = Columns.columns.find(
      (it) => it.index === item.orgIndex,
    );
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });
  sourceColumns.value.forEach((item: any) => {
    const orgCol: any = Columns.columns.find(
      (it) => it.index === item.orgIndex,
    );
    orgCol.visibel.value = item.visibel;
    newColumns.push(orgCol);
  });

  Columns.updateGroupList(groupColumns.value.map((item: any) => item.field));
  Columns.columns = newColumns;
  Columns.columnsChange();
}
</script>
