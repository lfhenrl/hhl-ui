<template>
  <div class="PopupGrouping">
    <div class="PopupGrouping__title">Grouping</div>
    <H_dragDrop v-model="groupColumns" :max-items="3" class="PopupGrouping__selectList PopupGrouping__groups">
      <template v-slot:item="{ item, index }">
        <PopupGroupingItem :item="item" :index="index" />
      </template>
    </H_dragDrop>

    <div class="PopupGrouping__title">Columns</div>
    <H_dragDrop v-model="sourceColumns" class="PopupGrouping__selectList">
      <template v-slot:item="{ item, index }">
        <PopupGroupingItem :item="item" :index="index" />
      </template>
    </H_dragDrop>
    <div class="H_datagridPopup__footer">
      <H_btn size="sm" :disabled="!isNotDefault" @click="Clear">Clear</H_btn>
      <H_btn size="sm" :disabled="!isChanged" @click="cancel">Cancel</H_btn>
      <H_btn size="sm" :disabled="!isChanged" @click="Save">Ok</H_btn>
    </div>
    <div v-if="showNavigateInfo" class="PopupGrouping_navigateInfo col-warn">
      Please save or cancel.!! <br />
      before navigating.
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, PropType, ref, watch } from "vue";
import H_btn from "../../../../H_btn.vue";
import H_dragDrop from "../../../../draggable/H_dragDrop.vue";
import { iDatagrid } from "../../../provide";
import PopupGroupingItem from "./PopupGroupingItem.vue";
import { icolumnData } from "../../../datagridTypes";

const props = defineProps({
  groups: { type: Object as PropType<string[]>, default: ["id", "val1"] }
});

defineExpose({ CanNavigate });

const dg = inject("dg") as iDatagrid;
const isChanged = ref(false);
const isNotDefault = ref(false);
let groups = dg.GroupBy;
let OrgGroups = dg.OrgGroupBy;
const sourceColumns = ref<iGroupdata[]>();
const groupColumns = ref<iGroupdata[]>();
const showNavigateInfo = ref(false);

sourceColumns.value = loadSourceColumns();
groupColumns.value = loadgroupColumns();
updateChanges();

function CanNavigate() {
  if (isChanged.value) {
    showNavigateInfo.value = true;
    setTimeout(() => (showNavigateInfo.value = false), 2000);
    return false;
  }
  return true;
}

const cancel = () => {
  sourceColumns.value = loadSourceColumns();
  groupColumns.value = loadgroupColumns();
};

function Clear() {
  dg.GroupBy = OrgGroups;
  groups = OrgGroups;
  sourceColumns.value = loadOrgSourceColumns();
  groupColumns.value = loadOrgGroupColumns();
  Save();
}

function Save() {
  const newColumns: any = [];
  const newGroups: any = [];
  groupColumns.value?.forEach((item) => {
    const i = dg.Columns.value.findIndex((org: any) => org.orgIndex === item.orgIndex);
    const orgItem = dg.Columns.value[i];
    orgItem.index = item.index;
    orgItem.visibel = item.visibel;
    newColumns.push(orgItem);
    newGroups.push(orgItem.props.title);
  });

  sourceColumns.value?.forEach((item) => {
    const i = dg.Columns.value.findIndex((org: any) => org.orgIndex === item.orgIndex);
    const orgItem = dg.Columns.value[i];
    orgItem.index = item.index;
    orgItem.visibel = item.visibel;
    newColumns.push(orgItem);
  });
  dg.Columns.value = newColumns;
  dg.GroupBy = newGroups;
  dg.UpdateData();
  setTimeout(() => {
    groups = dg.GroupBy;
    groupColumns.value = loadgroupColumns();
    sourceColumns.value = loadSourceColumns();
    updateChanges();
  }, 100);
}

type iGroupdata = {
  field: string;
  title: string;
  visibel: boolean;
  loadVisibel: boolean;
  orgVisibel: boolean;
  index: number;
  loadIndex: number;
  orgIndex: number;
  isGrouped: boolean;
  LoadIsGrouped: boolean;
  orgIsGrouped: boolean;
};

function loadgroupColumns() {
  return dg.Columns.value
    .filter((item: any) => groups.includes(item.props.title))
    .map((item: icolumnData) => {
      return {
        field: item.props.field,
        title: item.props.title,
        visibel: item.visibel,
        loadVisibel: item.visibel,
        orgVisibel: item.props.visibel,
        index: item.index,
        loadIndex: item.index,
        orgIndex: item.orgIndex,
        isGrouped: true,
        LoadIsGrouped: true,
        orgIsGrouped: OrgGroups.includes(item.props.title)
      };
    });
}

function loadOrgGroupColumns() {
  return dg.Columns.value
    .filter((item: any) => OrgGroups.includes(item.props.title))
    .map((item: icolumnData) => {
      return {
        field: item.props.field,
        title: item.props.title,
        visibel: item.props.visibel,
        loadVisibel: item.props.visibel,
        orgVisibel: item.props.visibel,
        index: item.orgIndex,
        loadIndex: item.orgIndex,
        orgIndex: item.orgIndex,
        isGrouped: true,
        LoadIsGrouped: true,
        orgIsGrouped: true
      };
    });
}

function loadSourceColumns() {
  return dg.Columns.value
    .filter((item: any) => !groups.includes(item.props.title))
    .map((item: icolumnData) => {
      return {
        field: item.props.field,
        title: item.props.title,
        visibel: item.visibel,
        loadVisibel: item.visibel,
        orgVisibel: item.props.visibel,
        index: item.index,
        loadIndex: item.index,
        orgIndex: item.orgIndex,
        isGrouped: false,
        LoadIsGrouped: false,
        orgIsGrouped: OrgGroups.includes(item.props.title)
      };
    });
}

function loadOrgSourceColumns() {
  return dg.Columns.value
    .filter((item: any) => !OrgGroups.includes(item.props.title))
    .map((item: icolumnData) => {
      return {
        field: item.props.field,
        title: item.props.title,
        visibel: item.props.visibel,
        loadVisibel: item.props.visibel,
        orgVisibel: item.props.visibel,
        index: item.orgIndex,
        loadIndex: item.orgIndex,
        orgIndex: item.orgIndex,
        isGrouped: false,
        LoadIsGrouped: false,
        orgIsGrouped: false
      };
    });
}

watch(
  [groupColumns, sourceColumns],
  () => {
    updateChanges();
  },
  { deep: true }
);

function updateChanges() {
  let index = 0;
  let _isChanged = false;
  let _isNotDefault = false;

  groupColumns.value?.forEach((item) => {
    item.index = index;
    item.isGrouped = true;
    _isChanged = checkChanged(_isChanged, item);
    _isNotDefault = defaultChanged(_isNotDefault, item);
    index = index + 1;
  });
  sourceColumns.value?.forEach((item) => {
    item.index = index;
    item.isGrouped = false;
    _isChanged = checkChanged(_isChanged, item);
    _isNotDefault = defaultChanged(_isNotDefault, item);
    index = index + 1;
  });

  isChanged.value = _isChanged;
  isNotDefault.value = _isNotDefault;
}

function checkChanged(lastValue: boolean, item: iGroupdata) {
  if (lastValue === true) return true;
  if (item.index !== item.loadIndex) return true;
  if (item.visibel !== item.loadVisibel) return true;
  if (item.isGrouped !== item.LoadIsGrouped) return true;

  return false;
}

function defaultChanged(lastValue: boolean, item: iGroupdata) {
  if (lastValue === true) return true;
  if (item.index !== item.orgIndex) return true;
  if (item.visibel !== item.orgVisibel) return true;
  if (item.isGrouped !== item.orgIsGrouped) return true;
  return false;
}
</script>

<style>
.PopupGrouping {
  padding: 15px 15px 5px 15px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto 1fr auto;
  overflow: hidden;
}

.PopupGrouping__title {
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
  font-weight: normal;
  font-family: var(--comp-font-family);
  justify-self: start;
}

.PopupGrouping__selectList {
  overflow: auto;
  border: solid 1px var(--comp-border-color);
  padding: 5px 0 5px 5px;
  border-radius: 4px;
  overflow: auto;
}

.PopupGrouping__groups {
  min-height: 30px;
  max-height: 74px;
  height: 74px;
  margin-bottom: 10px;
}

.PopupGrouping__listItem > .H_checkbox {
  height: 20px;
  max-width: 20px;
  line-height: 0.4;
}

.PopupGrouping .PopupGrouping__info {
  display: flex;
  align-items: center;
  margin: 2px 0 2px 4px;
}

.PopupGrouping_navigateInfo {
  position: absolute;
  top: 8px;
  right: 6px;
  left: 6px;
  border-radius: 4px;
  z-index: 11;
  text-align: center;
}
</style>
