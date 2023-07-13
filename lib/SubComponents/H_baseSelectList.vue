<template>
  <div class="h_baseSelectList" @click="Click" @keyup.space="Click" @keyup.enter="Click" :row="row ? 'true' : null">
    <div
      class="h_baseSelectList-item"
      v-for="item in filterList"
      :key="(item.value as string)"
      :selected="selected(item.value)"
      :data-value="item.value"
      :label-left="labelLeft"
    >
      <div class="h_baseSelectList-icon">
        <svg v-if="multi" viewBox="0 0 24 24" class="h_baseSelectList__checkbox" tabindex="0">
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
        </svg>

        <svg v-else class="h_baseSelectList-radio__svg" tabindex="0">
          <circle class="h_baseSelectList-radio__box" cx="50%" cy="50%" r="44%" fill="none" stroke-width="8%" />
          <circle class="h_baseSelectList-radio__box_inner" cx="50%" cy="50%" r="26%" />
        </svg>
      </div>

      <div class="h_baseSelectList-label text-txtCol-2">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const P = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  labelValue: {
    type: String,
    default: ""
  },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  listGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  row: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] }
});
const E = defineEmits(["update:modelValue", "update:labelValue"]);
const valueList: any = ref(P.modelValue.split(","));
const sortAlphaNum = (a: any, b: any) => a.localeCompare(b, "en", { numeric: true });

const optionlist = computed(() => {
  return P.list.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele,
      label: ele.label ? ele.label : ele
    };
  });
});

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

function Click(e: any) {
  let T: any = e.target;
  if (!T.classList.contains("h_baseSelectList-item")) T = T.parentElement;
  if (!T.classList.contains("h_baseSelectList-item")) T = T.parentElement;
  const D = T.dataset;
  if (!D) return;
  let val = D.value;
  if (!val) return;
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
.h_baseSelectList {
  display: flex;
  flex-direction: column;
  gap: v-bind(listGap);
  /* border: 1px solid red; */
  align-items: flex-start;
  flex-wrap: wrap;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  padding: 10px;
}

.h_baseSelectList[row="true"] {
  flex-direction: row;
}

.h_baseSelectList-item {
  display: flex;
  align-items: center;
  gap: v-bind(labelGap);
  user-select: none;
}

.h_baseSelectList-item[label-left="true"] {
  flex-direction: row-reverse;
}

.h_baseSelectList-icon {
  pointer-events: none;
  display: flex;
  align-items: center;
}

.h_baseSelectList-label {
  pointer-events: none;
}

.h_baseSelectList__checkbox:focus-visible,
.h_baseSelectList-radio__svg:focus-visible,
.h_baseSelectList-item:hover .h_baseSelectList__checkbox,
.h_baseSelectList-item:hover .h_baseSelectList-radio__svg {
  outline: 3px solid var(--current-bg-col, var(--col-pri));
  outline-offset: 2px;
  opacity: 0.5;
}

.h_baseSelectList__checkbox {
  border: solid 2px var(--col-txt-5, red);
  height: 1.2em;
  fill: transparent;
  transition: all linear 200ms;
  line-height: 1rem;
  border-radius: 4px;
  margin-top: 0;
  white-space: nowrap;
}

.h_baseSelectList-radio__svg {
  height: 1.2em;
  width: 1.2em;
  border-radius: 50%;
  pointer-events: none;
  cursor: pointer;
}

.h_baseSelectList-radio__box {
  stroke: var(--col-txt-5, red);
  cursor: pointer;
  pointer-events: none;
}

.h_baseSelectList-radio__box_inner {
  fill: var(--current-bg-col, var(--col-pri));
  transform: scale3d(0, 0, 0);
  transition: transform 0.3s;
  transform-origin: center;
  cursor: pointer;
  pointer-events: none;
}

.h_baseSelectList-item[selected="true"] .h_baseSelectList__checkbox {
  border-color: var(--current-bg-col, var(--col-pri));
  background-color: var(--current-bg-col, var(--col-pri));
  fill: var(--current-txt-col, var(--col-on-pri));
}

.h_baseSelectList-item[selected="true"] .h_baseSelectList-radio__box_inner {
  transform: scale3d(1, 1, 1);
}

.h_baseSelectList-item[selected="true"] .h_baseSelectList-radio__box {
  stroke: var(--current-bg-col, var(--col-pri));
}
</style>
