<template>
  <H_inputbase
    :label="label"
    :disabled
    :readonly
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    h-color="var(--color-pri)"
    class="H_range"
  >
    <div
      class="content"
      h-display="flex"
      h-flex="1"
      h-align-items="center"
      h-width="100%"
      h-height="100%"
      h-max-height="1.875em"
      h-margin="0 0.5em 0 0"
    >
      <slot> </slot>
      <input
        ref="el"
        :min="min"
        :max="max"
        v-model="model"
        class="H_range-input"
        h-cursor="pointer"
        h-width="100%"
        h-border-style="none"
        h-bgcolor="transparent"
        h-border-radius="0.5em"
        h-margin="0 0.25em"
        h-max-height="0.25em"
        h-min-height="0.25em"
        :readonly="readonly"
        autocomplete="off"
        type="range"
      />
      <span class="H_range-value" h-padding="0 0.25em" h-color="var(--color-txt2)">{{ model }}</span>
    </div>
  </H_inputbase>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from "vue";
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
});
const E = defineEmits([]);
const el = ref<HTMLInputElement | null>(null);
const model: any = defineModel({ default: 50 });

watchEffect(() => {
  if (el.value) {
    const max = P.max - P.min;
    const progress = ((model.value - P.min) / max) * 100;
    el.value.style.background = `linear-gradient(to right, var(--h-color) ${progress}%, #ccc ${progress}%)`;
  }
});

const validate = computed(() => validateFunc(P.validator, model.value));
onMounted(() => (model.value = model.value));
</script>
<style>
@layer components {
  .H_range {
    --range-shadow-hover: 0 0 0 10px color-mix(in srgb, var(--h-color) 10%, transparent);
    --range-shadow-focus: 0 0 0 10px color-mix(in srgb, var(--h-color) 20%, transparent);

    &[readonly] {
      pointer-events: none;
    }

    .H_range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background-color: var(--h-color);
      border: none;
      transition: 0.2s ease-in-out;
    }

    .H_range-input::-moz-range-thumb {
      height: 15px;
      width: 15px;
      background-color: var(--h-color);
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
  }
}
</style>
