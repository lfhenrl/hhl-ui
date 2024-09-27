<template>
  <div
    ref="selectbox"
    class="H_selectbase flex p-0 focus:outline-none"
    :class="{ '!flex-row gap-4': row, '!flex-col': !row }"
    @click="Click"
    tabindex="0"
    @keydown.up.prevent="KeyUp"
    @keydown.down.prevent="KeyDown"
    @keyup.enter.prevent="KeyEnter"
    @keyup.space.prevent="KeyEnter"
  >
    <div
      class="H_selectbase-item flex items-center p-0 gap-2 hover:bg-bg3 [&[focused]]:bg-bg2"
      :class="{
        'flex-row-reverse': labelLeft,
      }"
      v-for="(item, index) in filterList"
      :key="item.value as string"
      :focused="activeFocus === index ? '' : undefined"
      :selected="selected(item.value) ? '' : undefined"
      :value="item.value"
    >
      <div class="pointer-events-none">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const P = defineProps({
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  multi: { type: Boolean, default: true },
  filter: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  row: { type: Boolean, default: false },
});

const model: any = defineModel();
const label: any = defineModel("label");
const sortAlphaNum = (a: any, b: any) => a.localeCompare(b, "en", { numeric: true });
const selectbox = ref<HTMLInputElement | null>(null);
const activeFocus = ref(-1);

const optionlist = computed(() => {
  return P.list.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele,
      label: ele.label ? ele.label : ele,
    };
  });
});

const listOfValues = computed(() => {
  return optionlist.value.map((ele: any) => {
    return ele.value;
  });
});

watch(
  model,
  () => {
    const valueList = model.value ? model.value.split(",") : [];
    const val = optionlist.value
      .filter((ele: any) => {
        return valueList.includes(ele.value);
      })
      .map((ele: any) => ele.label);
    label.value = val.toString();
  },
  { immediate: true }
);

const filterFunc = (item: any) => item.label.toLowerCase().includes(P.filter.toLowerCase());
const filterList = computed(() => {
  if (P.filter && P.filter !== "") {
    return optionlist.value.filter(filterFunc);
  } else {
    return optionlist.value;
  }
});

function Click(e: any) {
  if (P.readonly) return;
  let T: HTMLElement = e.target;
  if (!T.classList.contains("H_selectbase-item")) return;
  setValue(T.getAttribute("value"));
}

function setValue(val: any) {
  if (P.multi) {
    const valueList = model.value ? model.value.split(",") : [];
    if (valueList.includes(val)) {
      const index = valueList.indexOf(val);
      valueList.splice(index, 1);
    } else {
      valueList.push(val);
    }
    const valSort = valueList.sort(sortAlphaNum) ?? [];
    model.value = valSort.toString();
  } else {
    model.value = val;
  }
}

function selected(item: any) {
  if (P.multi) {
    if (model.value) {
      return model.value.split(",").includes(item);
    }
  } else {
    return item === model.value ? true : null;
  }
}

function KeyUp() {
  if (P.readonly) return;
  if (activeFocus.value > 0) {
    activeFocus.value = activeFocus.value - 1;
  }
}

function KeyDown() {
  if (P.readonly) return;
  if (activeFocus.value < P.list.length - 1) {
    activeFocus.value = activeFocus.value + 1;
  }
}

function KeyEnter() {
  if (P.readonly) return;
  if (activeFocus.value < P.list.length && activeFocus.value >= 0) {
    setValue(listOfValues.value[activeFocus.value]);
  }
}
</script>

<style>
@layer hhl-components {
  .H_selectbase-item::before {
    content: "";
    font-size: 0.9em;
    font-weight: bold;
    line-height: 1.2em;
    font-family: monospace;
    max-height: 1.4em;
    min-height: 1.4em;
    max-width: 1.4em;
    min-width: 1.4em;
    border-radius: 4px;
    text-align: center;
    border: 1px solid var(--col-bg-5);
  }

  .H_selectbase-item[selected]::before {
    content: "✓";
    color: white;
    background-color: var(--col-pri);
    border-color: var(--col-pri);
  }
}
</style>
