<template>
  <H_inputbase
    :label="label"
    :disabled
    :readonly
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    :color="col.txt"
    class="H_range"
  >
    <div class="content">
      <slot> </slot>
      <input
        ref="el"
        :min="min"
        :max="max"
        v-model="model"
        class="H_range-input"
        :readonly="readonly"
        autocomplete="off"
        type="range"
      />
      <span class="H_range-value">{{ model }}</span>
    </div>
  </H_inputbase>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted, toRef } from "vue";
import H_inputbase from "./H_inputbase.vue";
import { validateFunc } from "../utils/validateFunc";
import { colorProps, useColor } from "../SubComponents/props/colorProp";

const P = defineProps({
  label: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  validator: Array,
  color: { type: colorProps, default: "pri" },
});
const E = defineEmits([]);
const el = ref<HTMLInputElement | null>(null);
const model: any = defineModel({ default: 50 });
const col = useColor(toRef(() => P.color));

watchEffect(() => {
  if (el.value) {
    const max = P.max - P.min;
    const progress = ((model.value - P.min) / max) * 100;
    el.value.style.background = `linear-gradient(to right, var(--range-color) ${progress}%, #ccc ${progress}%)`;
  }
});

const validate = computed(() => validateFunc(P.validator, model.value));
onMounted(() => (model.value = model.value));
</script>
<style>
@layer components {
  .H_range {
    --range-color: attr(color type(<color>));
    --range-shadow-hover: 0 0 0 10px color-mix(in srgb, var(--range-color) 10%, transparent);
    --range-shadow-focus: 0 0 0 10px color-mix(in srgb, var(--range-color) 20%, transparent);

    &[readonly] {
      pointer-events: none;
    }

    .H_range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background-color: var(--range-color);
      border: none;
      transition: 0.2s ease-in-out;
    }

    .H_range-input::-moz-range-thumb {
      height: 15px;
      width: 15px;
      background-color: var(--range-color);
      border-radius: 50%;
      border: none;
      transition: 0.2s ease-in-out;
    }

    .H_range-input::-webkit-slider-thumb:hover {
      box-shadow: var(--range-shadow-hover);
      border-radius: 50%;
    }

    .H_range-input::-moz-range-thumb:hover {
      box-shadow: var(--range-shadow-hover);
      border-radius: 50%;
    }

    .H_range-input:focus::-webkit-slider-thumb {
      box-shadow: var(--range-shadow-focus);
      border-radius: 50%;
    }

    .H_range-input:focus::-moz-range-thumb {
      box-shadow: var(--range-shadow-focus);
      border-radius: 50%;
    }

    .content {
      display: flex;
      flex: 1;
      align-items: center;
      width: 100%;
      height: 100%;
      max-height: 1.875em;
      margin-right: 0.5em;
    }

    .H_range-input {
      appearance: none;
      cursor: pointer;
      grid-column-start: 2;
      background-color: transparent;
      border-radius: 0.5em;
      margin-inline: 0.25em;
      border-style: none;
      outline-style: none;
      width: 100%;
      max-height: 0.25em;
      min-height: 0.25em;
    }

    .H_range-value {
      grid-column-start: 3;
      grid-row-start: 1;
      padding-block: 0;
      padding-inline: 0.25em;
      color: var(--color-txt2);
    }
  }
}
</style>
