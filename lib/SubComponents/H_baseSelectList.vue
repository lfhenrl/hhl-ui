<template>
  <div
    class="h_baseSelectList col-warn flex flex-col items-start bg-transparent px-2.5 py-2.5"
    :class="{
      '!flex-row flex-wrap items-center': row,
    }"
    :style="{ gap: listGap }"
    @click="Click"
    @keyup.space="Click"
    @keyup.enter="Click"
    :row="row ? 'true' : null"
  >
    <div
      class="h_baseSelectList-item flex cursor-pointer select-none items-center"
      :class="{
        'flex-row-reverse': labelLeft,
      }"
      :style="{ gap: labelGap }"
      v-for="item in filterList"
      :key="item.value as string"
      :data-value="item.value"
    >
      <div class="h_baseSelectList-icon pointer-events-none flex items-center">
        <svg
          v-if="multi"
          viewBox="0 0 24 24"
          class="h_baseSelectList__checkbox h-4 whitespace-nowrap rounded border border-txt5 fill-transparent p-[1px] ring-offset-1 ring-offset-pri transition focus:outline-none focus:ring"
          :class="{
            'border-[var(--current-bg-col)] bg-[var(--current-bg-col)] fill-[var(--current-txt-col)]':
              selected(item.value),
          }"
          tabindex="0"
        >
          <path
            d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
          ></path>
        </svg>

        <svg
          v-else
          class="h_baseSelectList-radio__svg h-[18px] w-[18px] ring-offset-1 ring-offset-pri focus:outline-none focus:ring"
          tabindex="0"
        >
          <circle
            class="h_baseSelectList-radio__box stroke-txt5"
            :class="{
              'stroke-[var(--current-bg-col)]': selected(item.value),
            }"
            cx="50%"
            cy="50%"
            r="44%"
            fill="none"
            stroke-width="8%"
          />
          <circle
            class="h_baseSelectList-radio__box_inner origin-center scale-0 fill-[var(--current-bg-col)] transition"
            :class="{
              'scale-100': selected(item.value),
            }"
            cx="50%"
            cy="50%"
            r="26%"
          />
        </svg>
      </div>

      <div
        class="h_baseSelectList-label text-txtCol-2 pointer-events-none -mt-0.5 text-sm"
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
  labelGap: { type: String, default: "10px" },
  listGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  row: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
});
const E = defineEmits(["update:modelValue", "update:labelValue"]);
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
