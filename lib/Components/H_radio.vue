<template>
  <label class="H_radio" :class="{ 'H_radio-labelLeft': labelLeft }" :disabled="disabled ? '' : undefined">
    <input
      type="radio"
      class="H_radio-input"
      :class="{
        'H_radio-input-sm': size === 'sm',
        'H_radio-input-lg': size === 'lg',
      }"
      :checked="modelValue === value"
      :value="value"
      :aria-label="label === '' ? 'No label' : label"
      :name="label === '' ? 'No name' : label"
      @change="$emit('update:modelValue', value)"
    />
    <div class="H_radio-label">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

const P = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  value: {
    type: [String, Number],
  },
  label: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
  disabled: { type: Boolean, default: false },
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});

defineEmits(["update:modelValue"]);

const Color = computed(() => {
  return `var(--col-${P.color})`;
});
</script>
<style>
@layer hhl-components {
  .H_radio {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: var(--col-txt-2);
    --color: v-bind(Color);
  }

  .H_radio-labelLeft {
    flex-direction: row-reverse;
  }

  .H_radio[disabled] {
    opacity: 0.8;
    pointer-events: none;
    cursor: none;
  }
  .H_radio[disabled] .H_radio-input {
    opacity: 0.5;
  }

  .H_radio-input {
    aspect-ratio: 1 / 1;
    width: 19px;
    background-color: transparent;
    accent-color: var(--color);
  }

  .H_radio-input-sm {
    width: 15px;
  }

  .H_radio-input-lg {
    width: 24px;
  }

  .H_radio-label {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
  }
}
</style>
