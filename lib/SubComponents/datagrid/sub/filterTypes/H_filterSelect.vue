<template>
  <div class="H_filterSelect">
    <H_inputText v-model="searchValue" end-icon="search" clearable />
    <H_checkbox
      size="sm"
      label="Select All."
      :model-value="AllSelected"
      @click.prevent="SelectToggle"
    />
    <H_selectBox
      multi
      list-gap="2px"
      label-gap="2px"
      label-left
      v-model="value1"
      :list="filter"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import H_inputText from "../../../../Components/H_inputText.vue";
import H_checkbox from "../../../../Components/H_checkbox.vue";
import H_selectBox from "../../../../Components/select/H_selectBox.vue";
import { iDgrid } from "../../provide/Dgrid";
import { iColumn } from "../../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

const list = ref<any>([]);
const value1 = ref<any>();

const searchValue = ref("");

function SelectToggle() {
  if (AllSelected.value) {
    value1.value = "";
  } else {
    value1.value = list.value.toString();
  }
}

const AllSelected = computed(() => {
  return value1.value === list.value.toString();
});

const valueList = computed(() => {
  return value1.value?.split(",") ?? [];
});

const endCondition = computed(() => {
  const listCount = list.value.length ?? 0;
  if (listCount / 2 > valueList.value.length) {
    return "equal";
  }
  return "not_equal";
});

const endValue = computed(() => {
  if (endCondition.value === "equal") {
    return value1.value;
  } else {
    return list.value
      .filter((x: any) => !valueList.value.includes(x))
      .toString();
  }
});

const filterFunc = (item: any) =>
  item.toLowerCase().includes(searchValue.value.toLowerCase());
const filter = computed(() => list.value?.filter(filterFunc));

const canSave = computed(() => {
  if (col.filter.value1 === "" && AllSelected.value) return false;
  if (col.filter.value1 === endValue.value) return false;
  return true;
});

function save() {
  col.filter.condition1 = endCondition.value;
  col.filter.value1 = endValue.value;
  col.filter.active = col.filter.value1 !== "";
}

function clear() {
  col.filter.condition1 = "equal";
  col.filter.condition2 = "equal";
  col.filter.value1 = "";
  col.filter.active = false;
}

async function open() {
  list.value = await DG.dataHandler?.getSelectList(col.props.field);
  if (col.filter.value1 === "") {
    value1.value = list.value.toString();
  } else {
    if (col.filter.condition1 === "equal") {
      return value1.value;
    } else {
      const ValList = value1.value.split(",");
      return list.value
        .filter((x: any) => ValList.includes(x))
        .toString()
        .toString();
    }
  }
}

function close() {}

onMounted(() => {
  col.filter.condition1 =
    col.filter.condition1 === "" ? "equal" : col.filter.condition1;
  col.filter.condition2 =
    col.filter.condition2 === "" ? "equal" : col.filter.condition2;
  col.filter.value1 = col.filter.value1 === "" ? "" : col.filter.value1;
  col.filter.value2 = col.filter.value2 === "" ? "null" : col.filter.value2;
});

defineExpose({ save, clear, open, close, canSave });
</script>
<style>
@layer hhl-components {
  .H_filterSelect {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
    gap: 12px;
    overflow: hidden;
    padding: 20px 20px 0 20px;
  }

  .H_filterSelect .H_selectBox {
    border: 1px solid var(--col-txt-5);
    overflow: auto;
    max-height: 320px;
  }
}
</style>
