<template>
  <div class="H_filterSelect">
    <H_input v-model="searchValue" clearable>
      <H_icon name="search" set-end />
    </H_input>
    <H_switch h-font-size="sm" label="Select All." :model-value="AllSelected" @click.prevent="SelectToggle" />
    <div class="H_filterSelect_list">
      <H_selectbase multi v-model="value1" :list="filter" variant="checkbox" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import H_input from "../../../../Components/H_input.vue";
import H_switch from "../../../../Components/H_switch.vue";
import H_selectbase from "../../../../Components/H_selectbase.vue";
import H_icon from "../../../../Components/H_icon.vue";
import { type iDgrid } from "../../provide/Dgrid";
import { type iColumn } from "../../provide/Column";

const P = defineProps({
  index: { type: Number, default: 0 },
});

const DG = inject("DG") as iDgrid;
const col: iColumn = DG.columns[P.index];

const list = ref<any>([]);
const value1 = ref<any>();

const searchValue = ref("");

function SelectToggle() {
  setTimeout(() => {
    if (AllSelected.value) {
      value1.value = "";
    } else {
      value1.value = list.value.map((x: any) => x.value).toString();
    }
  });
}

const AllSelected = computed(() => {
  return value1.value === list.value.map((x: any) => x.value).toString();
});

const valueList = computed(() => {
  return value1.value?.split(",") ?? [];
});

const endCondition = computed(() => {
  const listCount = list.value.length ?? 0;
  if (listCount / 2 > valueList.value.length) {
    return "equal";
  }
  return "notEqual";
});

const endValue = computed(() => {
  if (endCondition.value === "equal") {
    return value1.value;
  } else {
    return list.value
      .filter((x: any) => !valueList.value.includes(x.value))
      .map((x: any) => x.value)
      .toString();
  }
});

const filterFunc = (item: any) => item.value?.toLowerCase().includes(searchValue.value.toLowerCase());
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
  let arr: any = [];
  if (col.props.select_list) {
    arr = col.props.select_list;
  } else {
    arr = await DG.dataHandler?.getSelectList(col.props.field);
  }
  list.value = arr.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele === "" ? " " : ele,
      label: ele.label ? ele.label : ele === "" ? "No Value" : ele,
    };
  });
  if (col.filter.value1 === "") {
    value1.value = list.value.map((x: any) => x.value).toString();
  } else {
    value1.value = col.filter.value1;
    if (col.filter.condition1 === "equal") {
      return value1.value;
    } else {
      const ValList = value1.value.split(",");
      value1.value = list.value
        .filter((x: any) => !ValList.includes(x.value))
        .map((x: any) => x.value)
        .toString();
    }
  }
}

function close() {}

onMounted(() => {
  col.filter.condition1 = col.filter.condition1 === "" ? "equal" : col.filter.condition1;
  col.filter.condition2 = col.filter.condition2 === "" ? "equal" : col.filter.condition2;
  col.filter.value1 = col.filter.value1 === "" ? "" : col.filter.value1;
  col.filter.value2 = col.filter.value2 === "" ? "null" : col.filter.value2;
});

defineExpose({ save, clear, open, close, canSave });
</script>
<style>
@layer components {
  .H_filterSelect {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    padding: 0.2em 0;
  }

  .H_filterSelect_list {
    overflow: auto;
    max-height: 600px;
  }
}
</style>
