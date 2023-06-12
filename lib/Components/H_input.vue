<template>
  <H_inputBase
    :label="label"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :clearable="clearable"
    :validator="validator"
    :disabled="disabled"
    :readonly="$attrs.readonly"
    :focus="focused"
    :value="modelValue"
    @clear="handleClear"
    @end_icon_click="$emit('end_icon_click')"
    @start_icon_click="$emit('start_icon_click')"
    @isValid="$emit('isValid', $event)"
    class="H_input"
  >
    <input
      ref="input"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :aria-label="label"
      :placeholder="placeholder"
      size="1"
      @input="$emit('update:modelValue', ($event.target as any).value)"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      class="H_input__input"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import H_inputBase from "../SubComponents/H_inputBaseYY.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Boolean],
    default: ""
  },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  setFocus: { type: Boolean, default: false },
  clearable: Boolean,
  validator: Array
});

const emit = defineEmits(["start_icon_click", "end_icon_click", "update:modelValue", "input_click", "isValid"]);

const focused = ref(false);
const input = ref<any>(null);

const focus = () => input.value?.focus();
const handleFocus = () => (focused.value = true);
const handleBlur = () => (focused.value = false);
const handleClear = () => emit("update:modelValue", "");
defineExpose({ focus });

onMounted(() => {
  if (props.setFocus) {
    input.value.focus();
  }
});
</script>

<style>
.H_input__input {
  display: inline-block;
  box-sizing: border-box;
  flex: 1;
  padding: 0.55em 0.1em 0.45em 0.2em;
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
.H_input__input::placeholder {
  color: var(--col-txt-3);
  font-size: 0.9em;
}
</style>
