<template>
  <H_inputBase
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
    class="H_textarea min-h-[36px] flex-1"
  >
    <textarea
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :rows="Number(rows)"
      :aria-label="label"
      :name="label"
      @input="onInput"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      class="H_textarea__input min-h-[34px] w-full resize-none overflow-hidden border border-none bg-transparent px-2.5 pt-1.5 leading-tight text-txt1 outline-none"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 0 },
  validator: Array,
  rows: { type: String, default: "0" },
  noGrow: { type: Boolean, default: false },
  onStartIconClick: { type: Function, default: null },
  onEndIconClick: { type: Function, default: null },
});

const E = defineEmits([
  "update:modelValue",
  "input_click",
  "startIconClick",
  "endIconClick",
]);

const focused = ref(false);
const input = ref<any>(null);
const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const validate = computed(() => validateFunc(P.validator, P.modelValue));

const focus = () => input.value?.focus();
const handleFocus = () => (focused.value = true);
const handleBlur = () => (focused.value = false);

const stringCounter = computed(() => {
  if (P.counter == "") return P.hintEnd;
  let c = P.modelValue.toString().length;
  return c.toString() + "/" + P.counter;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", val);
}, P.debounce);

defineExpose({ focus });

watch(
  () => P.modelValue,
  () => calculateInputHeight(),
);
onMounted(() => calculateInputHeight());

function calculateInputHeight() {
  if (input.value && !P.noGrow) {
    input.value.style.height = "0";
    const scrollHeight = input.value.scrollHeight;
    input.value.style.minHeight = scrollHeight + "px";
    console.log(input.value.style.height);
  }
}
</script>

<style>
/* .h_inputbase.H_textarea {
  flex: 1 1 40px;
  height: 40px;
} */

/* .H_textarea__input {
  display: inline-block;
  box-sizing: border-box;
  padding: 10px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  background-color: transparent;
  border: none;
  min-height: 40px;
  width: 100%;
  overflow: hidden;
  appearance: none;
  outline: none;
  vertical-align: bottom;
} */

.H_textarea_autoGrow {
  /* overflow-y: hidden; */
  resize: vertical;
}
</style>
