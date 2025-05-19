<template>
  <label
    class="H_checkbox"
    :class="{ 'flex-row-reverse': labelLeft }"
    :disabled="disabled ? '' : undefined"
    :style="{ '--checkbox-size': endSize }"
  >
    <div
      class="H_switch-input inline-flex relative items-center justify-center"
      :style="{ '--color-currentBg': txtColor, '--color-current': bgColor }"
    >
      <input
        type="checkbox"
        class="aspect-square h-[1.2em] accent-currentBg"
        :aria-label="label === '' ? 'No label' : label"
        :value="value"
        v-model="modelValue"
      />
    </div>

    <div class="H_checkbox-label overflow-hidden line-clamp-1 text-txt2 text-[.9em]">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { toRef, type PropType } from "vue";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";

const P = defineProps({
  ...useColorProp("pri"),
  ...sizeProp,
  label: { type: String, default: "" },
  labelGap: { type: String, default: "6px" },
  labelLeft: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  switch: { type: Boolean, default: false },
  value: {
    type: [String, Number],
  },
  type: {
    type: String as PropType<"checkbox" | "radio">,
    default: "checkbox",
  },
});
const E = defineEmits([]);

const modelValue = defineModel();
const { bgColor, txtColor } = useColor(toRef(() => P.color));
const { endSize } = useSize(toRef(() => P.size));
</script>

<style>
.H_checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-size: var(--checkbox-size);
}
/* .H_checkbox .H_switch-input input {
  height: 1.2em;
  border-radius: 4px;
  vertical-align: middle;
  border: 2px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
} */

/* .H_checkbox .H_switch-input input:checked {
  background-color: var(--color-currentBg);
  border-color: var(--color-currentBg);
  color: var(--color-current);
} */
</style>
