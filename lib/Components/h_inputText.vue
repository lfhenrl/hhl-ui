<template>
  <H_inputBase
    class="h_inputText max-h-[36px] min-h-[36px] flex-1"
    :label="label"
    :clearable="clearable"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    :stBtn="onStartIconClick !== null"
    :endBtn="onEndIconClick !== null"
    @clearClick="$emit('update:modelValue', '')"
    @startIconClick="$emit('startIconClick')"
    @endIconClick="$emit('endIconClick')"
  >
    <template v-slot:start>
      <slot name="start" />
    </template>
    <template v-slot:end>
      <slot name="end" />
    </template>

    <input
      type="text"
      class="h_inputText-input inline-block max-h-[34px] min-h-[34px] w-full flex-1 appearance-none overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent px-2.5 align-bottom text-txt1 outline-none"
      :maxlength="counter"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
      @click="$emit('inputClick')"
      :readonly="readonly"
      :aria-label="label"
      :name="label"
      autocomplete="off"
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
    default: "",
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
const E = defineEmits([
  "update:modelValue",
  "inputClick",
  "startIconClick",
  "endIconClick",
]);
const focused = ref(false);

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
