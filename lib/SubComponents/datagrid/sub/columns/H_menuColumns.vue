<template>
  <H_dialog v-model="open" movable class="H_menuColumns h_outline-none">
    <div moveable-drag class="H_menuColumns__header h_flex h_items-center h_bg-pri">
      <div class="flex-1" />
      <div class="">Columns</div>
      <div class="flex-1" />
      <H_icon class="h_cursor-pointer" name="close" btn color="white" @click="open = false" />
    </div>

    <div class="H_menuColumns__body h_flex-col">
      <H_inputbase label="Grouping">
        <H_dragDrop v-model="groupColumns" :max-items="3" class="H_menuColumns__body__groups h_flex-col h_w-full">
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>

      <H_inputbase label="Columns">
        <H_dragDrop v-model="sourceColumns" class="H_menuColumns__body__columns h_flex-col h_w-full">
          <template v-slot:item="{ item, index }">
            <H_columnItem :item="item" :index="index" />
          </template>
        </H_dragDrop>
      </H_inputbase>
    </div>

    <div class="H_menuColumns__body__action h_flex h_justify-end">
      <H_btn @click="columnsSave" size="sm" color="pri" :disabled="!canSave">OK</H_btn>
    </div>
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
<style>
@layer components {
  .H_menuColumns {
    .H_menuColumns__header {
      min-width: 16em;
      font-size: 1.125em;
      text-align: center;
      padding-block: 0.25em;
      color: var(--color-priTxt);

      .H_icon {
        margin-right: 0.25em;
      }
    }

    .H_menuColumns__body {
      gap: 2em;
      padding-inline: 1em;
      padding-top: 2em;

      .H_menuColumns__body__groups {
        overflow: auto;
        gap: 0.125em;
        padding: 0.25em;
        max-height: 6em;
        min-height: 6em;
      }

      .H_menuColumns__body__columns {
        overflow: auto;
        gap: 0.125em;
        padding: 0.25em;
        max-height: 20em;
        min-height: 20em;
      }

      .H_columnItem {
        color: var(--color-txt1);
        margin-left: 0.125em;
        &:hover {
          @media (hover: hover) {
            background-color: var(--color-bg2);
          }
        }
      }
    }
    .H_menuColumns__body__action {
      padding: 1em;
    }
  }
}
</style>
