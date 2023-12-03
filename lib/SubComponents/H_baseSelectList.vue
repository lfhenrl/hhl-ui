<template>
  <div
    ref="selectBox"
    class="h_baseSelectList flex flex-col items-stretch bg-transparent px-1 py-2.5 focus-within:border-pri focus:outline-none"
    :class="{
      '!flex-row flex-wrap items-center': row,
    }"
    :style="{ gap: listGap }"
    @click.prevent="Click"
    @keyup.enter.prevent="KeyEnter"
    :row="row ? 'true' : null"
    @keydown.up.prevent="KeyUp"
    @keydown.down.prevent="KeyDown"
    tabindex="0"
  >
    <div
      class="h_baseSelectList-item group flex w-full flex-1 cursor-pointer select-none items-center rounded px-1 pr-2 text-txt3 data-[selected=true]:text-pri"
      :class="{
        'flex-row-reverse': labelLeft,
        'border border-pri': focused(item),
      }"
      :style="{ gap: labelGap }"
      v-for="(item, index) in filterList"
      :data-selected="selected(item.value)"
      :key="item.value as string"
      :data-value="item.value"
      :data-index="index"
    >
      <div
        class="h_baseSelectList-icon pointer-events-none flex items-center opacity-0 group-data-[selected=true]:opacity-100"
      >
        ✓
      </div>

      <div
        class="h_baseSelectList-label pointer-events-none -mt-0.5 w-full flex-1 text-sm"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

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
const sortAlphaNum = (a: any, b: any) =>
  a.localeCompare(b, "en", { numeric: true });

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
  { immediate: true },
);

const filterFunc = (item: any) =>
  item.label.toLowerCase().includes(P.filter.toLowerCase());
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
  e.preventDefault = true;
  let T: any = e.target;
  if (!T.classList.contains("h_baseSelectList-item")) T = T.parentElement;
  if (!T.classList.contains("h_baseSelectList-item")) T = T.parentElement;
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
