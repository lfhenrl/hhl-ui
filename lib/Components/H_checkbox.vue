<template>
  <label
    class="H_checkbox col-pri"
    :class="{ 'H_checkbox-labelLeft': labelLeft }"
  >
    <input
      type="checkbox"
      class="H_checkbox-input"
      :class="{
        'H_checkbox-input-sm': size === 'sm',
        'H_checkbox-input-lg': size === 'lg',
      }"
      style="accent-color: var(--current-bg-col)"
      :checked="modelValue"
      :name="label"
      @change="
        $emit('update:modelValue', (<HTMLInputElement>$event.target).checked)
      "
    />
    <div class="H_checkbox-label">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md",
  },
});
defineEmits(["update:modelValue", "changed"]);
</script>

<style>
@layer hhl-components {
  .H_checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: var(--col-txt-2);
  }

  .H_checkbox-labelLeft {
    flex-direction: row-reverse;
  }

  .H_checkbox-input {
    aspect-ratio: 1 / 1;
    width: 19px;
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
