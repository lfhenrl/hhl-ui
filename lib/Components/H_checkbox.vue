<template>
  <label
    class="h_checkbox col-pri bg-transparent flex items-center gap-2 text-txt2"
    :class="{ 'flex-row-reverse': labelLeft }"
  >
    <input
      type="checkbox"
      class="aspect-square ring-offset-2 ring-offset-pri focus:outline-none focus:ring"
      :class="{
        'w-[15px]': size === 'sm',
        'w-[19px]': size === 'md',
        'w-[24px]': size === 'lg',
      }"
      style="accent-color: var(--current-bg-col)"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', (<HTMLInputElement>$event.target).checked)
      "
    />
    <div class="label line-clamp-1 text-sm">{{ label }}</div>
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
const E = defineEmits(["update:modelValue", "changed"]);
</script>
