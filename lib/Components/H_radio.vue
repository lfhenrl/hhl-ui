<template>
  <label
    class="h_radio col-pri bg-transparent flex items-center gap-2 text-txt2"
    :class="{ 'flex-row-reverse': labelLeft }"
  >
    <input
      type="radio"
      class="aspect-square ring-offset-2 ring-offset-pri focus:outline-none focus:ring"
      :class="{
        'w-[15px]': size === 'sm',
        'w-[19px]': size === 'md',
        'w-[24px]': size === 'lg',
      }"
      style="accent-color: var(--current-bg-col)"
      :checked="modelValue === value"
      :value="value"
      :name="label"
      @change="$emit('update:modelValue', value)"
    />
    <div class="label line-clamp-1 text-sm">{{ label }}</div>
  </label>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
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
});

defineEmits(["update:modelValue"]);
</script>
