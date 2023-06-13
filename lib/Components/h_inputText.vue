<template>
  <H_inputBase
    class="h_inputText"
    :label="label"
    :clearable="clearable"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :movelabel="move_label"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    :stBtn="onStartIconClick !== null"
    :endBtn="onEndIconClick !== null"
    @clearClick="$emit('update:modelValue', '')"
    @startIconClick="$emit('startIconClick')"
    @endIconClick="$emit('endIconClick')"
  >
    <input
      type="text"
      class="h_inputText-input"
      :maxlength="counter"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
      @click="$emit('inputClick')"
      :readonly="readonly"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  validator: Array,
  onStartIconClick: { type: Function, default: null },
  onEndIconClick: { type: Function, default: null },
});
const E = defineEmits(["update:modelValue", "inputClick"]);
const focused = ref(false);

const move_label = computed(() => {
  if (P.startIcon != "") return true;
  if (P.modelValue != "") return true;
  if (focused.value) return true;
  return false;
});

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
.h_inputText-input {
  display: inline-block;
  box-sizing: border-box;
  flex: 1;
  padding: 0 10px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  color: var(--col-txt-1);
  vertical-align: bottom;
  background-color: transparent;
  border: none;
  width: 100%;
  overflow: hidden;
  appearance: none;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
