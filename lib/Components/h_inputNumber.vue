<template>
  <H_inputBase
    class="h_inputNumber"
    :label="label"
    :clearable="clearable"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :HelpTextStart="HelpTextStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :movelabel="move_label"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
  >
    <div class="h_inputNumber-container">
      <input
        type="number"
        class="h_inputNumber-input"
        :maxlength="counter"
        :value="modelValue"
        inputmode="numeric"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
        :readonly="readOnly"
      />
      <div class="h_inputNumber-icons">
        <H_icon btn @click.stop="CountUp" icon="expand_up" class="h_inputNumber-iconup text-txtCol-3" />
        <H_icon btn @click.passive="CountDown" icon="expand_down" class="h_inputNumber-icondown text-txtCol-3" />
      </div>
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  modelValue: {
    type: [Number || null || undefined],
    default: 0
  },
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  step: { type: Number, default: 1 },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  validator: { type: Array, default: [] }
});
const E = defineEmits(["update:modelValue"]);
const focused = ref(false);

const move_label = computed(() => {
  if (P.startIcon != "") return true;
  if (P.modelValue != null) return true;
  if (focused.value) return true;
  return false;
});

const stringCounter = computed(() => {
  if (P.counter == "") return P.HelpTextEnd;
  let c = P.modelValue.toString().length;
  return c.toString() + "/" + P.counter;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", val);
}, P.debounce);

const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const CountUp = () => E("update:modelValue", Number(P.modelValue) + Number(P.step));
const CountDown = () => E("update:modelValue", Number(P.modelValue) - Number(P.step));
const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
.h_inputNumber-container {
  display: flex;
  flex-direction: row;
}

.h_inputNumber-input {
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
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  appearance: textfield;
}

.h_inputNumber-input::-webkit-inner-spin-button,
.h_inputNumber-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.h_inputNumber-icons {
  margin: -3px 0 -4px 0;
}

.h_inputNumber-iconup {
  margin-bottom: -2px;
}

.h_inputNumber-icondown {
  margin-top: -1px;
}
</style>
