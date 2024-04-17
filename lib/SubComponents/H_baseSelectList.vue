<template>
  <div
    ref="selectBox"
    class="H_baseSelectList"
    :class="{
      'H_baseSelectList-row': row,
    }"
    :style="{ gap: listGap }"
    @click.prevent="Click"
    @keyup.enter.prevent="KeyEnter"
    @keydown.up.prevent="KeyUp"
    @keydown.down.prevent="KeyDown"
    tabindex="0"
  >
    <div
      class="H_baseSelectList-item"
      :class="{
        reverse: labelLeft,
        focused: focused(item),
        selected: selected(item.value),
      }"
      :style="{ gap: labelGap }"
      v-for="(item, index) in filterList"
      :selected="selected(item.value)"
      :key="item.value as string"
      :data-value="item.value"
      :data-index="index"
    >
      <div class="H_baseSelectList-icon">
        <H_icon icon="check" size="16px" />
      </div>

      <div class="H_baseSelectList-label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import H_icon from "../Components/H_icon.vue";

const P = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  labelValue: {
    type: String,
    default: "",
  },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "5px" },
  listGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  row: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
});
const E = defineEmits(["update:modelValue", "update:labelValue"]);
defineExpose({
  KeyUp,
  KeyDown,
  KeyEnter,
});
const valueList: any = ref(P.modelValue.split(","));
const sortAlphaNum = (a: any, b: any) => a.localeCompare(b, "en", { numeric: true });

const optionlist = computed(() => {
  return P.list.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele,
      label: ele.label ? ele.label : ele,
    };
  });
});

const selectBox = ref();
const activeItem = ref("");

let activeFocus = -1;

function KeyUp() {
  if (activeFocus > 0) {
    activeFocus = activeFocus - 1;
    activeItem.value = filterList.value[activeFocus].value;
  }
}

function KeyDown() {
  if (activeFocus < filterList.value.length - 1) {
    activeFocus = activeFocus + 1;
    activeItem.value = filterList.value[activeFocus].value;
  }
}

function KeyEnter() {
  if (activeFocus < filterList.value.length && activeFocus >= 0) {
    setValue(filterList.value[activeFocus].value);
  }
}

watch(
  () => P.filter,
  () => {
    activeFocus = -1;
  }
);

watch(
  () => P.modelValue,
  () => {
    valueList.value = P.modelValue.split(",");
    const val = optionlist.value
      .filter((ele: any) => {
        return valueList.value.includes(ele.value);
      })
      .map((ele: any) => ele.label)
      .toString();
    E("update:labelValue", val);
  },
  { immediate: true }
);

const filterFunc = (item: any) => item.label.toLowerCase().includes(P.filter.toLowerCase());
const filterList = computed(() => optionlist.value.filter(filterFunc));

function selected(item: any) {
  if (P.multi) {
    return valueList.value.includes(item);
  } else {
    return item === P.modelValue ? true : null;
  }
}

function focused(item: any) {
  const tt = item.value === activeItem.value ? true : false;
  return tt;
}

function Click(e: any) {
  let T: any = e.target;
  if (!T.classList.contains("H_baseSelectList-item")) T = T.parentElement;
  if (!T.classList.contains("H_baseSelectList-item")) T = T.parentElement;
  const D = T.dataset;
  if (!D) return;
  let val = D.value;
  if (!val) return;
  activeItem.value = val;
  activeFocus = parseInt(D.index) ?? 0;
  setValue(val);
}

function setValue(val: any) {
  if (P.multi) {
    setMultivalue(val);
  } else {
    E("update:modelValue", val);
  }
}

function setMultivalue(val: string) {
  if (P.modelValue === "") {
    valueList.value = [];
    valueList.value.push(val);
    E("update:modelValue", val);
    return;
  }
  valueList.value = P.modelValue.split(",");
  if (valueList.value.includes(val)) {
    const index = valueList.value.indexOf(val);
    valueList.value.splice(index, 1);
  } else {
    valueList.value.push(val);
  }
  const valSort = valueList.value.sort(sortAlphaNum) ?? [];
  E("update:modelValue", valSort.toString());
}
</script>
<style>
@layer hhl-components {
  .H_baseSelectList {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    background-color: transparent;
    padding: 10px 2px;
    outline: none;
  }

  .H_baseSelectList[readonly] {
    pointer-events: none;
  }

  .H_baseSelectList-row {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 49px;
    padding: 0 2px;
    height: 36px;
  }

  .H_baseSelectList-item {
    display: flex;
    align-items: center;
    flex: 1 1 0%;
    width: 100%;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    padding-left: 3px;
    padding-right: 3px;
    color: var(--col-txt-3);
  }

  .H_baseSelectList-item:hover {
    background-color: var(--col-bg-5);
  }

  .H_baseSelectList-item.selected {
    color: var(--col-pri);
  }

  .H_baseSelectList:focus .H_baseSelectList-item.focused {
    outline: 1px solid var(--col-pri);
  }
  .H_baseSelectList-item.reverse {
    flex-direction: row-reverse;
  }

  .H_baseSelectList-icon {
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    font-weight: bolder;
    color: var(--col-pri);
    padding-right: 2px;
  }

  .H_baseSelectList-item.selected .H_baseSelectList-icon {
    opacity: 100%;
  }

  .H_baseSelectList-label {
    pointer-events: none;
    margin-top: -2px;
    flex: 1 1 0%;
    width: 100%;
    font-size: 14px;
  }
}
</style>
