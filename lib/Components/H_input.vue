<template>
  <H_inputbase class="H_input" :label :disabled :hintStart :hintEnd="stringCounter" :ErrorMessage="validate">
    <slot />
    <input
      class="H_input_input"
      v-model="model"
      :max
      :min
      :readonly
      :disabled
      :autofocus
      :tabindex
      size="1"
      autocomplete="off"
      :maxlength="counter"
      :type="type"
      :placeholder="placeholder"
      :name="label === '' ? 'No name' : label"
      @click="$emit('input_click')"
    />
    <H_icon name="close" color="txt3" btn v-if="showClear" @click="model = ''" />
  </H_inputbase>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import { validateFunc } from "../utils/validateFunc";
import H_inputbase from "./H_inputbase.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  tabindex: { type: String, default: "" },
  autofocus: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  counter: { type: String, default: "" },
  max: { type: String, default: "" },
  min: { type: String, default: "" },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  refClass: {},
  validator: Array,
  type: {
    type: String as PropType<"string" | "number" | "password" | "color">,
    default: "string",
  },
});
const E = defineEmits(["input_click"]);

const model: any = defineModel();

const showClear = computed(() => {
  if (P.clearable === false) return false;
  if (model.value === null) return false;
  if (model.value === "") return false;
  return true;
});

const stringCounter = computed(() => {
  if (P.counter == "") return P.hintEnd;
  let c = model.value.toString().length;
  return c.toString() + "/" + P.counter;
});
const validate = computed(() => validateFunc(P.validator, model.value));
</script>

<style>
@layer components {
  .H_input {
    padding-inline: 0.3em;
    .H_input_input {
      margin-inline: 0.2em;
      appearance: none;
      outline-style: none;
      width: 100%;

      &[type="color"] {
        height: 1em;
        padding: 0;
      }
    }
    .H_icon {
      --icon-size: 1.3em;
    }

    &:focus-within {
      border-color: var(--color-pri);
    }
  }
}
</style>
