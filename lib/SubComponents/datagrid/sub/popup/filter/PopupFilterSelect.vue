<template>
  <div class="PopupFilterSelect">
    <H_input v-model="searchValue" placeholder="Search" end-icon="search" type="text" clearable />
    <div class="PopupFilterSelect__mainSelect">
      <H_checkbox label="Select all." v-model="selectAll" />
      <div style="flex: 1" />
      <H_checkbox label="No filter." v-model="nofilter" />
    </div>

    <div class="PopupFilterSelect__selectList" v-if="dataReady">
      <H_checkbox :label="item.label" class="selectSize" v-model="selectedItems" :value="item.value" v-for="item in filter" />
    </div>
    <div class="PopupFilterSelect____error" v-if="!data.isValid">All selected!! Same as no filter.</div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, PropType, ref, watch } from "vue";
import H_checkbox from "../../../../../Components/H_checkbox.vue";
import H_input from "../../../../../Components/H_input.vue";
import { icolumnFilterData } from "../../../datagridTypes";
import { iDatagrid } from "../../../provide";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null }
});
const dg = inject("dg") as iDatagrid;
const searchValue = ref("");
const selectedItems = ref<string[]>([]);
const dataReady = ref(false);
let selectListLength = 0;
let selList: any;
let cleanSelList: any;

onMounted(async () => {
  if (props.data.autoSelectList && props.data.selectList.length < 1) {
    props.data.selectList = await dg.getSelectlist(props.data.field);
    setValues();
  } else {
    setValues();
  }
});

function setValues() {
  selectListLength = props.data.selectList.length;
  selList = props.data.selectList.map((item: any) => {
    return {
      label: item.label ? item.label : item,
      value: item.value ? item.value : item
    };
  });
  cleanSelList = selList.map((item: any) => item.value);
  dataReady.value = true;
}

watch(
  () => props.data.value1,
  () => {
    if (props.data.value1 !== "") {
      const sList = props.data.value1.split(",");
      if (props.data.condition === "equal") {
        selectedItems.value = sList;
      } else {
        selectedItems.value = cleanSelList.filter((x: any) => !sList.includes(x));
      }
    } else {
      selectedItems.value = [];
    }
  },
  { immediate: true }
);

const filterFunc = (item: any) => item.value.toLowerCase().includes(searchValue.value.toLowerCase());
const filter = computed(() => selList.filter(filterFunc));

const selectAll = computed({
  get: () => selectedItems.value.length === selectListLength,
  set: (val: boolean) => {
    if (val === true) {
      selectedItems.value = [...cleanSelList] as any;
    } else {
      selectedItems.value = [];
    }
  }
});

const nofilter = computed({
  get: () => selectedItems.value.length === 0,
  set: () => {
    selectedItems.value = [""];
    setTimeout(() => {
      selectedItems.value = [];
    });
  }
});

watch(
  () => [selectedItems.value],
  () => {
    let activ = !nofilter.value;
    const isvalid = nofilter.value || (selectedItems.value.length > 0 && selectedItems.value.length < selectListLength);
    props.data.isValid = isvalid;
    if (selectedItems.value.length === 0) {
      props.data.condition = "none";
    }

    if (activ) {
      if (selectListLength / 2 > selectedItems.value.length - 1) {
        props.data.value1 = selectedItems.value.toString();
        props.data.condition = "equal";
      } else {
        const diffList = cleanSelList.filter((x: any) => !selectedItems.value.includes(x));
        props.data.condition = "not_equal";
        if (diffList.length > 0) {
          props.data.value1 = diffList.toString();
        }
      }
      props.data.value2 = "";
      props.data.active = true;
      if (selectedItems.value.length === 0) {
        props.data.condition = "none";
      }
    } else {
      props.data.value1 = "";
      props.data.value2 = "";
      props.data.active = false;
    }
  }
);
</script>

<style>
.PopupFilterSelect {
  padding-top: 10px;
  display: grid;
  grid-auto-rows: min-content;
  align-items: center;
  justify-content: center;
}

.PopupFilterSelect .PopupFilterSelect__selectList {
  display: grid;
  grid-auto-rows: min-content;
  overflow: auto;
  max-height: 260px;
  height: 260px;
  border: solid 1px var(--comp-border-color);
  padding: 3px 0 3px 3px;
}

.PopupFilterSelect > .H_input {
  margin-top: 5px;
  margin-bottom: 2px;
  width: 220px;
}

.PopupFilterSelect > .PopupFilterSelect__mainSelect {
  display: flex;
}

.PopupFilterSelect > .PopupFilterSelect__selectList > .H_checkbox {
  height: 20px;
}

.PopupFilterSelect____error {
  font-size: 0.8em;
  color: var(--col-err);
}
</style>
