<template>
  <label class="H_checkbox" :class="{ 'H_checkbox-labelLeft': labelLeft }" :disabled="disabled ? '' : undefined">
    <input
      type="checkbox"
      class="H_checkbox-input"
      :aria-label="label === '' ? 'No label' : label"
      :class="{
        'H_checkbox-input-sm': size === 'sm',
        'H_checkbox-input-lg': size === 'lg',
      }"
      v-model="modelValue"
    />
    <div class="H_checkbox-label">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

const P = defineProps({
  label: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});
const Color = computed(() => {
  return `var(--col-${P.color})`;
});

const modelValue = defineModel<boolean>({ default: false });
</script>

<style>
@layer hhl-components {
  .H_checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: var(--col-txt-2);
    --color: v-bind(Color);
  }

  .H_checkbox-labelLeft {
    flex-direction: row-reverse;
  }

  .H_checkbox-input {
    aspect-ratio: 1 / 1;
    width: 19px;
    accent-color: var(--color);
  }

  .H_checkbox[disabled] {
    opacity: 0.8;
    pointer-events: none;
    cursor: none;
  }
  .H_checkbox[disabled] .H_checkbox-input {
    opacity: 0.5;
  }

  .H_checkbox-input-sm {
    width: 15px;
  }

  .H_checkbox-input-lg {
    width: 24px;
  }

  .H_checkbox-label {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
  }
}
</style>
