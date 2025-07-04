<template>
  <button
    :color
    :bgcolor
    type="button"
    :role="variant"
    :data-state="check ? 'checked' : 'unchecked'"
    class="H_switchbase inline-flex items-center border-2"
    :class="{
      'w-[1.2em] h-[1.2em] justify-center rounded  border-txt5 data-[state=checked]:bg-(--switch-color) data-[state=checked]:border-(--switch-color)':
        variant === 'checkbox',
      'w-[1.2em] h-[1.2em] justify-center rounded-full  border-txt5 data-[state=checked]:border-(--switch-color) data-[state=checked]:border-[0.15em]':
        variant === 'radio',
      'w-[2.25em] rounded-full border-transparent data-[state=unchecked]:bg-bg6 data-[state=checked]:bg-(--switch-color)':
        variant === 'switch',
    }"
  >
    <div
      :data-state="check ? 'checked' : 'unchecked'"
      class="border-bg0 flex items-center"
      :class="{
        'w-full h-full rounded-full border-[0.2em]  data-[state=checked]:bg-(--switch-color) ': variant === 'radio',
        'h-[1em] w-[1em] rounded-full bg-bg0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-full':
          variant === 'switch',
      }"
    >
      <H_icon
        v-show="check && variant === 'checkbox'"
        name="check"
        size="1.2em"
        class="text-(--switch-bgcolor) pb-[0.1em] m-0"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import H_icon from "./H_icon.vue";

defineProps({
  check: { type: Boolean, default: false },
  color: { String, default: "var(--color-pri)" },
  bgcolor: { String, default: "var(--color-priTxt)" },
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "radio",
  },
});
const E = defineEmits([]);
</script>

<style>
/* stylelint-disable declaration-property-value-no-unknown */
@layer components {
  .H_switchbase {
    font-size: attr(size type(<length>));
    --switch-color: attr(color type(<color>));
    --switch-bgcolor: attr(bgcolor type(<color>));
  }
}
</style>
