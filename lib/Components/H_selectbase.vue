<template>
  <div
    ref="baselist"
    :size
    class="H_selBase border-solid rounded"
    :class="{ '!flex-row ': row, '!flex-col': !row }"
    :style="{ gap: listGap }"
    @click="Click"
  >
    <label
      v-for="item in filterList"
      class="inline-flex items-center justify-items-center hover:bg-bg3 rounded focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-pri w-fit"
      :class="{ 'flex-row-reverse': labelLeft, 'justify-between w-full': justifyBetween }"
      :style="{ gap: labelGap }"
    >
      <H_switchbase
        :check="selected(item.value) ? true : false"
        :variant
        :color
        :bgcolor
        :value="item.value"
        class="H_selectbase-item pointer-events-none outline-none"
      />
      <span class="text-txt2 whitespace-nowrap pointer-events-none">{{ item.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, type PropType } from "vue";
import H_switchbase from "./H_switchbase.vue";

const P = defineProps({
  color: { String, default: "var(--color-pri)" },
  bgcolor: { String, default: "var(--color-priTxt)" },
  size: { type: String, default: "1em" },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  multi: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  justifyBetween: { type: Boolean, default: false },
  labelLeft: { type: Boolean, default: false },
  labelGap: { type: String, default: "6px" },
  listGap: { type: String, default: "2px" },
  row: { type: Boolean, default: false },
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "switch",
  },
});

const E = defineEmits(["keyupTop"]);
const modelValue: any = defineModel();
const label: any = defineModel("label");

const optionlist = computed(() => {
  return P.list.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele,
      label: ele.label ? ele.label : ele,
    };
  });
});

const filterFunc = (item: any) => item.label.toLowerCase().includes(P.filter.toLowerCase());
const filterList = computed(() => {
  if (P.filter && P.filter !== "") {
    return optionlist.value.filter(filterFunc);
  } else {
    return optionlist.value;
  }
});

watch(
  modelValue,
  () => {
    const valueList = modelValue.value ? modelValue.value.split(",") : [];
    const val = optionlist.value
      .filter((ele: any) => {
        return valueList.includes(ele.value);
      })
      .map((ele: any) => ele.label);
    setTimeout(() => {
      label.value = val.toString();
    }, 0);
  },
  { immediate: true }
);

function selected(item: any) {
  if (P.multi) {
    if (modelValue.value) {
      return modelValue.value.split(",").includes(item);
    }
  } else {
    return item === modelValue.value ? true : null;
  }
}

function Click(e: any) {
  if (P.readonly || P.disabled) return;
  let T: HTMLElement = e.target;
  if (!T.classList.contains("H_selectbase-item")) return;

  setValue(T.getAttribute("value"));
}

function setValue(val: any) {
  if (P.multi) {
    const valueList = modelValue.value ? modelValue.value.split(",") : [];
    if (valueList.includes(val)) {
      const index = valueList.indexOf(val);
      valueList.splice(index, 1);
    } else {
      valueList.push(val);
    }
    //const valSort = valueList.sort(sortAlphaNum) ?? [];
    modelValue.value = valueList.toString();
  } else {
    modelValue.value = val;
  }
}
</script>

<style>
/* stylelint-disable declaration-property-value-no-unknown */
.H_selBase {
  display: flex;
  width: 100%;
  outline-style: none;
  font-size: attr(size type(<length>));
}
</style>
