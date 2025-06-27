<template>
  <H_inputbase
    class="H_selbox"
    :label="label"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :disabled="disabled ? '' : undefined"
    :narrow
    :ErrorMessage="validate"
    @keydown="keyDown"
  >
    <H_selectbase
      ref="selBase"
      :row="row"
      :multi
      size="0.8em"
      :color="col.txt"
      v-model="model"
      :filter="filter"
      :listGap="listGap"
      :labelGap="labelGap"
      :labelLeft="labelLeft"
      :list="list"
      :variant
      :readonly
      :disabled
      class="px-2"
      :class="{ 'py-1': !row }"
    />
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, toRef, useTemplateRef, type PropType } from "vue";
import { sizeProp } from "../SubComponents/props/sizeProp";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import H_inputbase from "./H_inputbase.vue";
import H_selectbase from "./H_selectbase.vue";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  ...useColorProp("pri"),
  ...sizeProp,
  label: { type: String, default: "" },
  row: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "8px" },
  listGap: { type: String, default: "13px" },
  labelLeft: { type: Boolean, default: false },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  narrow: { type: Boolean, default: false },
  validator: Array,
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "checkbox",
  },
});

const model: any = defineModel();
const col = useColor(toRef(() => P.color));
const selBase = useTemplateRef<typeof H_selectbase>("selBase");
const validate = computed(() => validateFunc(P.validator, model.value));

function keyDown(e: KeyboardEvent) {
  if (P.readonly === true || P.disabled) return;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") ArrowDown(e);
  else if (e.key === "ArrowUp" || e.key === "ArrowLeft") ArrowUp(e);
  else return;
}

function ArrowDown(e: KeyboardEvent) {
  e.preventDefault();
  const { ok, focusIndex, list } = getFocusList();
  if (ok === false) return;
  if (focusIndex < 0) list[0]?.focus();
  if (focusIndex >= 0 && focusIndex < list.length - 1) {
    list[focusIndex + 1].focus();
  }
}

function ArrowUp(e: KeyboardEvent) {
  e.preventDefault();
  const { ok, focusIndex, list } = getFocusList();
  if (ok === false) return;
  if (focusIndex > 0 && focusIndex < list.length) {
    list[focusIndex - 1].focus();
  }
}

function getFocusList() {
  let ok = false;
  let focusIndex = -1;
  const list: HTMLElement[] = [];
  const selBaselist = selBase.value?.$el.querySelectorAll("button") || [];
  if (selBaselist && selBaselist.length > 0) {
    ok = true;
    let index = 0;
    selBaselist?.forEach((ele: HTMLElement) => {
      if (document.activeElement === ele) focusIndex = index;
      list.push(ele);
      index++;
    });
  }
  return { ok, focusIndex, list };
}
</script>
