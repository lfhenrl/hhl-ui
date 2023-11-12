<template>
  <H_inputBase
    class="h_inputNumber max-h-[36px] min-h-[36px] flex-1"
    :label="label"
    :clearable="clearable"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :disabled="disabled"
    :movelabel="move_label"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    :stBtn="onStartIconClick !== null"
    :endBtn="onEndIconClick !== null"
    @clearClick="$emit('update:modelValue', 0)"
    @startIconClick="$emit('startIconClick')"
    @endIconClick="$emit('endIconClick')"
  >
    <div class="flex">
      <input
        type="number"
        class="h_inputNumber-input inline-block max-h-[34px] min-h-[34px] w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent px-2.5 align-bottom text-txt1 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        :value="Numbervalue"
        inputmode="numeric"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
        @click="$emit('inputClick')"
        :readonly="readonly"
        :aria-label="label"
        :name="label"
      />
      <div
        class="h_inputNumber-icons relative flex max-h-[34px] min-h-[34px] flex-col text-txt3"
      >
        <H_icon
          btn
          @click.stop="CountUp"
          :disabled="readonly ? true : null"
          icon="expand_up"
          class="h_inputNumber-iconup -mt-1 text-txt3"
        />
        <H_icon
          btn
          @click.passive="CountDown"
          :disabled="readonly ? true : null"
          icon="expand_down"
          class="h_inputNumber-icondown -my-1 text-txt3"
        />
      </div>
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  step: { type: Number, default: 1 },
  debounce: { type: Number, default: 200 },
  validator: { type: Array, default: [] },
  onStartIconClick: { type: Function, default: null },
  onEndIconClick: { type: Function, default: null },
});

const E = defineEmits([
  "update:modelValue",
  "inputClick",
  "startIconClick",
  "endIconClick",
]);
const focused = ref(false);
const Numbervalue = ref(P.modelValue);

watch(
  () => P.modelValue,
  () => {
    Numbervalue.value = P.modelValue;
  },
);

const move_label = computed(() => {
  if (P.startIcon != "") return true;
  if (P.modelValue != null) return true;
  if (focused.value) return true;
  return false;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", parseFloat(val));
}, P.debounce);

const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const CountUp = () => (
  (Numbervalue.value = Number(Numbervalue.value) + Number(P.step)),
  debouncedUpdate(Numbervalue.value)
);
/*  E("update:modelValue", Number(P.modelValue) + Number(P.step)); */
const CountDown = () => (
  (Numbervalue.value = Number(Numbervalue.value) - Number(P.step)),
  debouncedUpdate(Numbervalue.value)
);
/*  E("update:modelValue", Number(P.modelValue) - Number(P.step)); */
const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>
