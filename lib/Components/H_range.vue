<template>
  <H_inputbase
    :label="label"
    :disabled="disabled ? '' : undefined"
    :readonly
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    class="H_range"
  >
    <div class="grid grid-cols-[auto_1fr_auto] items-center w-full h-full *:row-start-1 mr-2 max-h-[1.875em]">
      <slot> </slot>
      <input
        ref="el"
        :min="min"
        :max="max"
        v-model="model"
        class="H_inputbase-input cursor-pointer rounded-lg mx-1 max-h-1 min-h-1 col-start-2 w-full bg-transparent border-none appearance-none focus:outline-none"
        :readonly="readonly"
        autocomplete="off"
        type="range"
      />
    </div>
    <span class="col-start-3 row-start-1 text-txt-0 py-0 px-1 min-[2em]">{{ model }}</span>
  </H_inputbase>
</template>

<script setup lang="ts">
import { type PropType, ref, watchEffect, computed, onMounted } from "vue";
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
const model: any = defineModel({ default: 50 });

watchEffect(() => {
  if (el.value) {
    const max = P.max - P.min;
    const progress = ((model.value - P.min) / max) * 100;
    el.value.style.background = `linear-gradient(to right, var(--range-color) ${progress}%, #ccc ${progress}%)`;
  }
});

const bgColor = computed(() => `var(--color-${P.color})`);
const validate = computed(() => validateFunc(P.validator, model.value));
onMounted(() => (model.value = model.value));
</script>
<style>
@layer components {
  .H_range {
    --range-color: v-bind(bgColor);
    --range-shadow-hover: 0 0 0 10px color-mix(in srgb, var(--range-color) var(--transparency, 10%), transparent);
    --range-shadow-focus: 0 0 0 10px color-mix(in srgb, var(--range-color) var(--transparency, 20%), transparent);
  }

  .H_range[readonly] {
    pointer-events: none;
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
}
</style>
