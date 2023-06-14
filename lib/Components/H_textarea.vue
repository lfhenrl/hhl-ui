<template>
  <H_inputBase
    :label="label"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :movelabel="true"
    :clearable="clearable"
    :validator="validator"
    :disabled="disabled"
    :readonly="$attrs.readonly"
    :focus="focused"
    :value="modelValue"
    @clearClick="$emit('update:modelValue', '')"
    @end_icon_click="$emit('end_icon_click')"
    @start_icon_click="$emit('start_icon_click')"
    class="H_textarea"
  >
    <textarea
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :rows="Number(rows)"
      :aria-label="label"
      :placeholder="placeholder"
      :class="{ H_textarea_autoGrow: !noGrow }"
      @input="$emit('update:modelValue', Object($event.target).value)"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      class="H_textarea__input"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  clearable: Boolean,
  validator: Array,
  rows: { type: String, default: "1" },
  noGrow: { type: Boolean, default: false }
});

defineEmits(["start_icon_click", "end_icon_click", "update:modelValue", "input_click", "isValid"]);

const focused = ref(false);
const input = ref<any>(null);

const focus = () => input.value?.focus();
const handleFocus = () => (focused.value = true);
const handleBlur = () => (focused.value = false);

defineExpose({ focus });

watch(
  () => props.modelValue,
  () => calculateInputHeight()
);
onMounted(() => calculateInputHeight());

function calculateInputHeight() {
  if (input.value && !props.noGrow) {
    input.value.style.height = "0";
    const scrollHeight = input.value.scrollHeight;
    input.value.style.height = scrollHeight + "px";
    console.log(input.value.style.height);
  }
}
</script>

<style>
.h_inputbase.H_textarea {
  flex: 1 1 40px;
  /* height: 40px; */
}

.H_textarea__input {
  display: inline-block;
  box-sizing: border-box;
  padding: 10px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  background-color: transparent;
  border: none;
  min-height: 40px;
  /* width: 100%; */
  overflow: hidden;
  appearance: none;

  outline: none;

  vertical-align: bottom;
}

.H_textarea_autoGrow {
  overflow-y: hidden;
  resize: none;
}
</style>
