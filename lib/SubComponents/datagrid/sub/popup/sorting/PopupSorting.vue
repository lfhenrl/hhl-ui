<template>
  <div class="PopupSorting">
    <H_radio label="None" v-model="column.sorting" value="none" />
    <H_radio label="Up" v-model="column.sorting" value="up" />
    <H_radio label="Down" v-model="column.sorting" value="down" />
    <H_inputNumber
      label="priority"
      v-model="sortIndex"
      min="1"
      :max="maxSorting"
      v-show="sortIndex < 1000"
      :validator="[v.numMin(1), v.numMax(maxSorting)]"
    />
    <div />
    <div class="H_datagridPopup__footer">
      <H_btn size="sm" :disabled="!isNotDefault" @click="clear">Clear</H_btn>
      <H_btn size="sm" :disabled="!isChanged" @click="cancel">Cancel</H_btn>
      <H_btn size="sm" :disabled="!isChanged" @click="ok">Ok</H_btn>
    </div>
    <div v-if="column.no_sorting" class="PopupNoSorting">Sorting disabled....</div>
    <div v-if="showNavigateInfo" class="PopupSorting_navigateInfo col-warn">
      Please save or cancel.!! <br />
      before navigating.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, inject } from "vue";
import H_radio from "../../../../../Components/H_radio.vue";
import H_inputNumber from "../../../../../Components/H_inputNumber.vue";
import H_btn from "../../../../../Components/H_btn.vue";
import { validator as v } from "../../../../../utils/validator";
import { deepClone } from "../../../../../utils/deepClone";
import { iDatagrid } from "../../../provide";
import { icolumnSortData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnSortData>, default: null }
});

defineExpose({ CanNavigate });

const dg = inject("dg") as iDatagrid;
const column = ref<icolumnSortData>(deepClone(props.data));
const maxSorting = computed(() => column.value.count() + 1);
const showNavigateInfo = ref(false);

function CanNavigate() {
  if (isChanged.value) {
    showNavigateInfo.value = true;
    setTimeout(() => (showNavigateInfo.value = false), 2000);
    return false;
  }
  return true;
}

const cancel = () => {
  column.value.sorting = props.data.sorting;
  column.value.index = props.data.index;
};

const sortIndex = computed({
  get: () => {
    if (column.value.sorting === "none") {
      column.value.index = 1000;
      return 1000;
    } else {
      if (column.value.index < 1000) {
        return column.value.index + 1;
      } else {
        const count = column.value.count();
        column.value.index = count;
        return count + 1;
      }
    }
  },
  set: (val: any) => {
    column.value.index = parseInt(val) - 1;
  }
});

const ok = () => {
  props.data.sorting = column.value.sorting ?? "none";
  props.data.index = getSortIndex();
  props.data.organize();
  dg.UpdateData();
  column.value = deepClone(props.data);
};

const clear = () => {
  props.data.sorting = column.value.default_sorting ?? "none";
  props.data.index = getDefaultSortIndex();
  props.data.organize();
  dg.UpdateData();
  column.value = deepClone(props.data);
};

const isChanged = computed(() => {
  return props.data.sorting !== column.value.sorting || props.data.index !== column.value.index;
});

const isNotDefault = computed(() => {
  return props.data.default_sorting !== column.value.sorting || props.data.default_index !== column.value.index;
});

const getSortIndex = () => {
  if (column.value.sorting === "none") {
    return 1000;
  } else {
    if (props.data.index > column.value.index) {
      return column.value.index - 0.001;
    } else {
      return column.value.index + 0.001;
    }
  }
};

const getDefaultSortIndex = () => {
  if (column.value.sorting === "none") {
    return 1000;
  } else {
    return column.value.default_index ?? 1000;
  }
};
</script>

<style>
.PopupSorting {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto 1fr auto;
  overflow: hidden;
  gap: 4px;
  padding: 15px 15px 5px 15px;
}

.PopupNoSorting {
  position: absolute;
  text-align: center;
  padding-top: 100px;
  font-size: 1.5em;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--col-bg-0);
}

.PopupSorting .H_input {
  width: 100px;
  margin-top: 20px;
}

.PopupSorting_navigateInfo {
  position: absolute;
  top: 8px;
  right: 6px;
  left: 6px;
  border-radius: 4px;
  z-index: 11;
  text-align: center;
}
</style>
