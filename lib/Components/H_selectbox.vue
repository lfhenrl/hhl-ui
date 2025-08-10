<template>
  <H_inputbase
    class="H_selectbox"
    :label="label"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :disabled
    :narrow
    :ErrorMessage="validate"
    @keydown="keyDown"
    h-color="var(--color-pri)"
  >
    <H_selectbase
      ref="selBase"
      :row="row"
      :multi
      :size
      :color="col.txt"
      v-model="model"
      :filter
      :listGap
      :labelGap
      :labelLeft
      :justifyBetween
      :list
      :variant
      :autofocus
      tabindex="0"
      :readonly
      :disabled
      h-padding="0.4em 0.5em"
    />
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, toRef, useTemplateRef, type PropType } from "vue";
import { sizeProp } from "../SubComponents/props/sizeProp";
import { useColor, colorProps } from "../SubComponents/props/colorProp";
import H_inputbase from "./H_inputbase.vue";
import H_selectbase from "./H_selectbase.vue";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  color: { type: colorProps, default: "pri" },
  size: { type: sizeProp, default: "md" },
  label: { type: String, default: "" },
  row: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  filter: { type: String, default: "" },
  labelGap: { type: String, default: "8px" },
  listGap: { type: String, default: "8px" },
  labelLeft: { type: Boolean, default: false },
  justifyBetween: { type: Boolean, default: false },
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

<style>
@layer components {
  .H_selectbox {
    .H_selectbase {
      &[row] {
        padding-block: 0;
      }
    }
  }
}
</style>
