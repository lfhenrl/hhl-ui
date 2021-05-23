<template>
  <hhl-input-base
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
    class="hhl-textarea"
  >
    <textarea
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :rows="Number(rows)"
      :aria-label="label"
      :placeholder="placeholder"
      :class="{ hhl_textarea_autoGrow: !noGrow }"
      @input="$emit('update:modelValue', Object($event.target).value)"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      class="hhl-textarea__input w-100pr col-bg-transparent z-2"
    />
  </hhl-input-base>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import hhlInputBase from "./hhl-input-base.vue";

const hhlTextarea = defineComponent({
  name: "hhl-textarea",
  emits: ["start_icon_click", "end_icon_click", "update:modelValue", "input_click"],
  components: {
    hhlInputBase
  },
  props: {
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    startIcon: { type: String, default: "" },
    endIcon: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    clearable: Boolean,
    validator: Array,
    rows: { type: String, default: "2" },
    noGrow: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const input = ref(<any>null);

    const focus = () => input.value?.focus();
    const handleFocus = () => (focused.value = true);
    const handleBlur = () => (focused.value = false);
    const handleClear = () => emit("update:modelValue", "");

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
      }
    }

    return {
      input,
      focus,
      focused,
      handleFocus,
      handleBlur,
      handleClear,
      scroll
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-textarea": typeof hhlTextarea;
  }
}
export type ihhlTextarea = InstanceType<typeof hhlTextarea>;
export default hhlTextarea;
</script>

<style>
.hhl-textarea__input {
  padding: 7px 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  vertical-align: middle;
  resize: vertical;
}

.hhl-input__input::placeholder {
  color: var(--col-txt-3);
  font-size: 0.9em;
}

.hhl_textarea_autoGrow {
  overflow-y: hidden;
  resize: none;
}
</style>
