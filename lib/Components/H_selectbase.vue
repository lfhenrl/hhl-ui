<template>
  <div
    ref="baselist"
    class="H_selectbase"
    :class="{ row: row }"
    :h-gap="listGap"
    :row="row ? '' : undefined"
    h-outline="none"
    @click="Click"
  >
    <label
      v-for="item in filterList"
      :key="item.label"
      :labelleft="labelLeft ? '' : undefined"
      :justifybetween="justifyBetween ? '' : undefined"
      class="H_selectbase__label"
      :class="{ labelleft: labelLeft, justifybetween: justifyBetween }"
      h-display="inline-flex"
      h-align-items="center"
      h-border-radius="4px"
      h-width="100%"
      :h-font-size="size"
      :h-gap="labelGap"
    >
      <H_switchbase
        class="H_selectbase__switchbase"
        :check="selected(item.value) ? true : false"
        :aria-label="label"
        :variant
        :value="item.value"
      />
      <span class="H_selectbase__switchbase_label">{{ item.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, type PropType } from "vue";
import H_switchbase from "./H_switchbase.vue";

const P = defineProps({
  size: { type: String, default: "1rem" },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  multi: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  justifyBetween: { type: Boolean, default: false },
  labelLeft: { type: Boolean, default: false },
  labelGap: { type: String, default: "6px" },
  listGap: { type: String, default: "4px" },
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
  if (!T.classList.contains("H_switchbase")) return;

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
@layer components {
  .H_selectbase {
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 100%;
    border-radius: 4px;
    line-height: 0;
  }

  .H_selectbase.row {
    flex-direction: row;
  }

  .H_selectbase__label {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    width: 100%;
  }

  .H_selectbase__label:hover {
    background-color: hsl(from var(--col-pri) h s l / 15%);
  }
  .H_selectbase__label.labelleft {
    flex-direction: row-reverse;
  }
  .H_selectbase__label.justifybetween {
    justify-content: space-between;
    width: 100%;
  }
  .H_selectbase__switchbase {
    pointer-events: none;
  }
  .H_selectbase__switchbase:focus-visible {
    outline: solid 2px var(--col-pri);
    outline-offset: 2px;
  }

  .H_selectbase__switchbase_label {
    pointer-events: none;
    color: var(--col-2);
    white-space: nowrap;
  }
}
</style>
