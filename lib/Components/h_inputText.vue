<template>
  <H_inputBase
    class="H_inputText"
    :label="label"
    :clearable="clearable"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    @clearClick="$emit('update:modelValue', '')"
  >
    <template v-slot:start>
      <slot name="start" />
    </template>
    <template v-slot:end>
      <slot name="end" />
    </template>

    <input
      type="text"
      class="H_inputText-input"
      :maxlength="counter"
      :value="modelValue"
      @input="onInput"
      @click="$emit('inputClick')"
      :readonly="readonly"
      :aria-label="label"
      :name="label"
      autocomplete="off"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { computed } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  validator: Array,
});
const E = defineEmits(["update:modelValue", "inputClick"]);

const stringCounter = computed(() => {
  if (P.counter == "") return P.hintEnd;
  let c = P.modelValue.toString().length;
  return c.toString() + "/" + P.counter;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", val);
}, P.debounce);

const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
@layer hhl-components {
  .H_inputText {
    max-height: 36px;
    min-height: 36px;
    height: 36px;
    flex: 1 1 0%;
  }

  .H_inputText-input {
    display: inline-flex;
    align-items: center;
    width: 100%;
    flex: 1 1 0%;
    appearance: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-style: none;
    background-color: transparent;
    padding-left: 10px;
    padding-right: 10px;
    color: var(--col-txt-1);
    outline: none;
  }
}
</style>
