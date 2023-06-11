<template>
  <div class="popupFilter">
    <component :is="filtComponent" :data="column" />
    <div class="H_datagridPopup__footer sofus">
      <H_btn size="sm" :disabled="!isNotDefault" @click="clear">Clear</H_btn>
      <H_btn size="sm" :disabled="!isChanged" @click="cancel">Cancel</H_btn>
      <H_btn size="sm" :disabled="!isChanged || !column.isValid" @click="ok">Ok</H_btn>
    </div>
    <div v-if="showNavigateInfo" class="popupFilter_navigateInfo col-warn">
      Please save or cancel.!! <br />
      before navigating.
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, inject, reactive, watch, ref } from "vue";
import H_btn from "../../../../../Components/H_btn.vue";
import PopupNoFilter from "./PopupNoFilter.vue";
import PopupFilterNumber from "./PopupFilterNumber.vue";
import PopupFilterString from "./PopupFilterString.vue";
import PopupFilterBool from "./PopupFilterBool.vue";
import PopupFilterDate from "./PopupFilterDate.vue";
import PopupFilterSelect from "./PopupFilterSelect.vue";
import { iDatagrid } from "../../../provide";
import { deepClone } from "../../../../../utils/deepClone";
import { icolumnFilterData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null },
  canNavigate: Object
});

defineExpose({ CanNavigate });

const dg = inject("dg") as iDatagrid;
const column = reactive<icolumnFilterData>(deepClone(props.data));
const showNavigateInfo = ref(false);

function CanNavigate() {
  if (!column.isValid) return false;
  if (isChanged.value) {
    showNavigateInfo.value = true;
    setTimeout(() => (showNavigateInfo.value = false), 2000);
    return false;
  }
  return true;
}

watch(
  () => column.isValid,
  () => {
    props.data.isValid = column.isValid;
  }
);

const cancel = () => {
  column.active = props.data.active;
  column.isValid = props.data.isValid;
  column.condition = props.data.condition;
  column.value1 = props.data.value1;
  column.value2 = props.data.value2;
};

const ok = () => {
  props.data.active = column.active ?? false;
  props.data.condition = column.condition;
  props.data.value1 = column.value1;
  props.data.value2 = column.value2;
  dg.UpdateData();
};

const clear = () => {
  column.active = props.data.default_active ?? false;
  column.condition = props.data.default_condition;
  column.value1 = props.data.default_value1;
  column.value2 = props.data.default_value2;

  props.data.active = column.active ?? false;
  props.data.condition = column.condition;
  props.data.value1 = column.value1;
  props.data.value2 = column.value2;

  dg.UpdateData();
};

const isChanged = computed(() => {
  const filtCondCh = props.data.condition !== column.condition;
  const filtVal1Ch = props.data.value1 !== column.value1;
  const filtVal2Ch = props.data.value2 !== column.value2;
  return filtCondCh || filtVal1Ch || filtVal2Ch;
});

const isNotDefault = computed(() => {
  const filtCondCh = props.data.default_condition !== column.condition;
  const filtVal1Ch = props.data.default_value1 !== column.value1;
  const filtVal2Ch = props.data.default_value2 !== column.value2;
  return filtCondCh || filtVal1Ch || filtVal2Ch;
});

const filtComponent = computed(() => {
  switch (column.type) {
    case "number":
      return PopupFilterNumber;
    case "string":
      return PopupFilterString;
    case "bool":
      return PopupFilterBool;
    case "date":
      return PopupFilterDate;
    case "datetime":
      return PopupFilterDate;
    case "select":
      return PopupFilterSelect;
    default:
      return PopupNoFilter;
  }
});
</script>

<style>
.popupFilter {
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  padding: 15px 15px 5px 15px;
}

.popupFilter_navigateInfo {
  position: absolute;
  top: 8px;
  right: 6px;
  left: 6px;
  border-radius: 4px;
  z-index: 11;
  text-align: center;
}
</style>
