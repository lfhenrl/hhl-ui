<template>
  <H_inputbase
    :label="label"
    :disabled="disabled ? '' : undefined"
    :readonly="readonly ? '' : undefined"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    class="H_range"
  >
    <slot> </slot>
    <template v-slot:input>
      <input
        ref="el"
        :min="min"
        :max="max"
        v-model="model"
        class="H_inputbase-input no-slot"
        size="30"
        :readonly="readonly"
        autocomplete="off"
        type="range"
      />
    </template>
    <span class="H_range-rangeValue no-slot">{{ model }}</span>
  </H_inputbase>
</template>

<script setup lang="ts">
import { PropType, ref, watchEffect, computed } from "vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  label: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  validator: Array,
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});
const E = defineEmits([]);
const el = ref<HTMLInputElement | null>(null);
const model: any = defineModel();

watchEffect(() => {
  if (el.value) {
    const max = P.max - P.min;
    const progress = ((model.value - P.min) / max) * 100;
    el.value.style.background = `linear-gradient(to right, var(--range-color) ${progress}%, #ccc ${progress}%)`;
  }
});

const bgColor = computed(() => `var(--col-${P.color})`);
const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
.H_range {
  --range-color: v-bind(bgColor);
  --range-shadow-hover: 0 0 0 10px color-mix(in srgb, var(--range-color) var(--transparency, 10%), transparent);
  --range-shadow-focus: 0 0 0 10px color-mix(in srgb, var(--range-color) var(--transparency, 20%), transparent);
}

.H_range[readonly] {
  pointer-events: none;
  cursor: none;
}

.H_range-rangeValue {
  grid-column-start: 3;
  grid-row-start: 1;
  font-size: 1.1em;
  line-height: 1em;
  padding: 0 5px 0 5px;
  color: var(--col-txt-0);
}

.H_range .H_inputbase-input {
  cursor: pointer;
  border-radius: 15px;
  max-height: 6px;
  min-height: 6px;
  background: #ccc;
  padding: 0;
  margin: 0 5px;
}

.H_range .H_inputbase-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  background-color: var(--range-color);
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}

.H_range .H_inputbase-input::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: var(--range-color);
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}

.H_range .H_inputbase-input::-webkit-slider-thumb:hover {
  box-shadow: var(--range-shadow-hover);
}

.H_range .H_inputbase-input:focus::-webkit-slider-thumb {
  box-shadow: var(--range-shadow-focus);
}

.H_range .H_inputbase-input::-moz-range-thumb:hover {
  box-shadow: var(--range-shadow-hover);
}

.H_range .H_inputbase-input:focus::-moz-range-thumb {
  box-shadow: var(--range-shadow-focus);
}
</style>
