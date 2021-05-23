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
    class="hhl-input"
  >
    <input
      ref="input"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :aria-label="label"
      :placeholder="placeholder"
      size="1"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      class="hhl-input__input w-100pr col-bg-transparent txt-truncate txt-nowrap z-2"
    />
  </hhl-input-base>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import hhlInputBase from "./hhl-input-base.vue";

const hhlInput = defineComponent({
  name: "hhl-input",
  emits: ["start_icon_click", "end_icon_click", "update:modelValue", "input_click"],
  components: {
    hhlInputBase
  },
  props: {
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
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const input = ref<any>(null);
    const larsen = ref<any>(null);

    const focus = () => input.value?.focus();
    const handleFocus = () => (focused.value = true);
    const handleBlur = () => (focused.value = false);
    const handleClear = () => emit("update:modelValue", "");

    onMounted(() => {
      if (props.setFocus) {
        input.value.focus();
      }
    });

    return {
      input,
      focus,
      focused,
      handleFocus,
      handleBlur,
      handleClear,
      larsen
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-input": typeof hhlInput;
  }
}
export type ihhlInput = InstanceType<typeof hhlInput>;
export default hhlInput;
</script>

<style>
.hhl-input__input {
  display: inline-block;
  padding: 0.55em 0.1em 0.45em 0.2em;
  font-size: 1em;
  vertical-align: bottom;
}
.hhl-input__input::placeholder {
  color: var(--col-txt-3);
  font-size: 0.9em;
}
</style>
